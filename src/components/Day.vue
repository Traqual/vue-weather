<template>
    <div @click="$emit('selectDay')" :class="{ 'selected': isSelected }">
        <h3>{{ dayModel?.dayOfWeek }}</h3>
        <p>{{ dayNumber }}/{{ monthNumber }}</p>
        <SunOrRain :weathercode="dayModel.weathercode" />
    </div>
</template>

<script setup lang="ts">
    import type { DayModel } from '@/models/DayModel';
    import { computed } from 'vue';
import SunOrRain from './SunOrRain.vue';

    const props = defineProps<{
        dayModel: DayModel,
        isSelected: Boolean
    }>();

    const dayNumber = computed(() => props.dayModel.day < 10 ? `0${props.dayModel.day}` : props.dayModel.day);
    const monthNumber = computed(() => props.dayModel.month < 10 ? `0${props.dayModel.month}` : props.dayModel.month);
</script>

<style scoped>
div {
    width: 200px;
    display: flex;
    flex-direction: column;
    border: 1px solid var(--color-text);
    border-radius: 10px;
    height: 110px;
}

div:hover {
    background-color: white;
    scale: 1.05;
    cursor: pointer;
}

div.selected {
    background-color: white;
}

h3, p {
    width: 100%;
    text-align: center;
}
</style>