import type { HourModel } from "./HourModel";

export interface DayModel {
    dayOfWeek: String,
    day: number,
    month: number,
    year: number,
    tempMin: number,
    tempMax: number,
    weathercode: number,
    hours: Array<HourModel>
}