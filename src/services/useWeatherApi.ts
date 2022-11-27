import axios from 'axios';
import type { DayModel } from '@/models/DayModel';
import type { HourModel } from "@/models/HourModel";
import { format, parseISO } from 'date-fns';

let days: Array<DayModel> = [];

async function callWeatherApi(lat?: number, long?:number): Promise<Array<DayModel>>
{
    days = [];

    lat = lat ? lat : 52.52;
    long = long ? long : 13.41;
    const response = await axios.get(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${long}&hourly=temperature_2m,weathercode&daily=temperature_2m_max,temperature_2m_min,weathercode&timezone=auto`);
    const data = response.data;

    for (let dayIndex = 0; dayIndex < data.daily.time.length; dayIndex++) {
        const dayTime = parseISO(data.daily.time[dayIndex]);
        const dayElement = {
            dayOfWeek: format(dayTime, 'EEEE'),
            day: dayTime.getDate(),
            month: dayTime.getMonth(),
            year: dayTime.getFullYear(),
            tempMin: data.daily.temperature_2m_min[dayIndex],
            tempMax: data.daily.temperature_2m_max[dayIndex],
            weathercode: data.daily.weathercode[dayIndex],
            hours: []
        };
        days.push(dayElement);
        
        for (let hourIndex = dayIndex * 24; hourIndex < (dayIndex * 24) + 24; hourIndex++) {
            const hourTime = parseISO(data.hourly.time[hourIndex]);
            
            const hourString = hourTime.getHours() < 10 ? `0${hourTime.getHours()}` : `${hourTime.getHours()}`;
            const minuteString = hourTime.getMinutes() < 10 ? `0${hourTime.getMinutes()}` : `${hourTime.getMinutes()}`;
    
            const hourElement: HourModel = {
                hour: `${hourString}:${minuteString}`,
                temperature: data.hourly.temperature_2m[hourIndex],
                weathercode: data.hourly.weathercode[hourIndex]
            };
    
            dayElement.hours.push(hourElement);
        }
    }
    

    return days;
}

export function useWeatherApi()
{
    return {
        callWeatherApi
    }
}