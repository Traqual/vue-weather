<template>
    <div class="hour-element" v-for="hour in dayModel?.hours">
        <p>{{hour.hour}}</p>
        <p :style="{ 'color': getColor(hour)}">{{hour.temperature}}°C</p>
        <SunOrRain :weathercode="hour.weathercode"/>
    </div>
</template>

<script setup lang="ts">
import type { DayModel } from '@/models/DayModel';
import type { HourModel } from '@/models/HourModel';
import SunOrRain from '@/components/SunOrRain.vue';

const props = defineProps<{
    dayModel: DayModel|null
}>();

function getColor(hour: HourModel): string {
    if(hour.temperature == props.dayModel?.tempMin) {
        return 'blue';
    } else if(hour.temperature == props.dayModel?.tempMax) {
        return 'red';
    }
    return 'black';
}

</script>

<style scoped>
    .hour-element {
        display: flex;
        flex-direction: column;
        padding: 10px;
        max-width: 45px;
    }

    .hour-element:not(:first-child) {
        border-left: 1px solid var(--color-text);
    }

    p {
        font-size: 10px;
        text-align: center;
        font-weight: bold;
        margin: 10px 0;
    }
</style>