<script setup lang="ts">
defineProps<{
    active?: boolean
}>()
</script>

<template>
    <button
        class="page-button"
        :class="{
            active: active,
        }"
    >
        1
    </button>
</template>

<style scoped></style>
