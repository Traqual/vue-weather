<template>
    <div>
        <h1>Weather App</h1>
        <p class="error" v-if="error">Veuillez accepter la géolocation dans votre navigateur</p>
        <div class="row">
            <div class="col">
                <label for="latInput">Renseignez une latitude</label>
                <input v-model="latitude" name="latInput" type="number"/>
            </div>
            <div class="col">
                <label for="longInput">Renseignez une longitude</label>
                <input v-model="longitude" id="longInput" name="longInput" type="number"/>
            </div>
            <button @click="getMeteo()">Météo pour ces coordonnéess</button>
            <button @click="getMeteoGeoloc(coords.latitude, coords.longitude, locatedAt)">Météo à votre Position GPS</button>
        </div>
        
        <div class="dayList">
            <Day v-for="day in days" :dayModel="day" @selectDay="selectDay(day)" :isSelected="selectedDay === day"/>
        </div>

        <div class="hourList">
            <Hours :dayModel="selectedDay"/>
        </div>
    </div>
</template>

<script setup lang="ts">
    import { useGeolocation } from '@vueuse/core'
    import Day from '@/components/Day.vue'
    import type { DayModel } from '@/models/DayModel'
    import { onMounted, ref } from 'vue'
    import { useWeatherApi } from '@/services/useWeatherApi'
    import Hours from '@/components/Hours.vue'

    const days = ref<Array<DayModel>>()
    const selectedDay = ref<DayModel|null>(null)
    const latitude = ref<number>(52.52)
    const longitude = ref<number>(13.41)

    const { isSupported, coords, locatedAt, error } = useGeolocation()

    onMounted(async () => {
        await getMeteo()
    });

    function selectDay(day: DayModel)
    {
        selectedDay.value = day
    }

    async function getMeteo(lat?:number, long?:number)
    {
        days.value = await useWeatherApi().callWeatherApi(lat ? lat : latitude.value, long ? long : longitude.value)
        selectedDay.value = days.value[0]
    }

    async function getMeteoGeoloc(lat:number, long:number, locatedAtValue:number|null)
    {
        if(locatedAtValue) {
            latitude.value = lat;
            longitude.value = long;
            getMeteo(lat, long);
        }
    }
</script>

<style scoped>
    h1 {
        text-align: center;
        margin-bottom: 40px;
    }

    button {
        background-color: transparent;
        border: 1px solid var(--color-text);
        border-radius: 10px;
    }

    button:hover {
        cursor: pointer;
        scale: 1.05;
        background-color: white;
    }

    label, input {
        width: 100%;
        font-weight: bold;
    }

    .error {
        margin: auto;
        width: fit-content;
        padding: 10px 20px;
        text-align: center;
        background-color: red;
        border-radius: 10px;
        color: white;
        margin-bottom: 15px;
    }

    .inputDiv {
        margin-bottom: 40px;
    }

    .dayList {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        gap: 10px;
        margin: 30px 0;
    }

    .hourList {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        border: 1px solid var(--color-text);
        border-radius: 10px;
    }
</style>