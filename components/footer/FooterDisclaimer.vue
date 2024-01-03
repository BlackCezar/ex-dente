<script setup lang="ts">
import type { Footer } from '~/types/global.type'

defineProps<{
    data: Footer['footer']['data']['attributes']
}>()
</script>

<template>
    <footer>
        <div
            class="text-center text-opacity-10 text-white uppercase leading-[2rem] lg:leading-normal lg:text-[3.5rem] lg:mb-5 text-[1.25rem] lg:tracking-[0.675rem] tracking-[0.0875rem] mb-4"
        >
            {{ data.warning }}
        </div>
        <div
            class="text-white text-justify text-[0.75rem] lg:text-[1.125rem] lg:leading-[1.625rem] leading-[1.25rem] text-opacity-30"
        >
            {{ data.disclaimer }}
        </div>
    </footer>
</template>

<style scoped></style>
