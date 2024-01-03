<script setup lang="ts">
defineProps<{
    title: string
}>()
</script>

<template>
    <button
        class="flex gap-2 text-accent group justify-center text-opacity-50 hover:text-opacity-100 transition-colors items-center"
    >
        <span class="text-[0.875rem] lg:text-[1.125rem] uppercase">{{
            title
        }}</span>
        <svgo-arrow-right-bold
            filled
            class="text-[1.5rem] transition-transform group-hover:translate-x-1 !mb-0"
        />
    </button>
</template>

<style scoped></style>
