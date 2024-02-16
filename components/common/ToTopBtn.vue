<script setup lang="ts">
function scrollTop() {
    if (window) {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        })
    }
}</script>
<template>
    <button @click="scrollTop" class="absolute right-4 lg:right-[6.25rem] z-10 lg:rounded-[0.25rem] lg:w-[3.75rem] lg:h-[3.75rem] top-5 lg:top-12 bg-secondary-before hover:bg-secondary transition-colors w-8 h-8 flex items-center justify-center rounded-[0.125rem]">
        <svgo-arrow-right-bold filled class="text-accent -rotate-90 lg:text-[2rem] text-[1rem]" />
    </button>
</template>