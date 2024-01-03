<script setup lang="ts">
defineProps<{
    active?: boolean
    title: number | string
}>()
</script>

<template>
    <button
        class="page-button"
        :class="{
            active: active,
        }"
    >
        {{ title }}
    </button>
</template>

<style scoped></style>
