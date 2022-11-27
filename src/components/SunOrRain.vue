<template>
    <img :src="imageUrl">
</template>

<script setup lang="ts">
import { computed } from '@vue/reactivity';

    const props = defineProps<{
        weathercode: number
    }>();

    const imageUrl = computed(() => {
        let png = 'cloudy';
        if(props.weathercode == 0)
            png = 'sunny';
        else if(props.weathercode > 0 && props.weathercode < 4)
            png = 'sun'
        else if(props.weathercode > 50 && props.weathercode < 58)
            png = 'wind'
        else if(props.weathercode > 57 && props.weathercode < 68)
            png = 'rain'
        else if(props.weathercode > 70 && props.weathercode < 87)
            png = 'snow'
        else if(props.weathercode > 94)
            png = 'thunder'

        return `images/${png}.png`;
    });
</script>

<style scoped>
    img {
        max-width: 50px;
        min-width: 25px;
        transform: translateX(-50%);
        margin-left: 50%;
    }
</style>