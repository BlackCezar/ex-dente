<script setup lang="ts">
import type { IHeadingItem } from '~/types/global.type'

defineProps<{
    data: IHeadingItem
}>()
</script>

<template>
    <template v-for="(text, index) of data.children" :key="index">
        <h1 v-if="data.level === 1">
            {{ text.text }}
        </h1>
        <h2 v-if="data.level === 2">
            {{ text.text }}
        </h2>
        <h3 v-if="data.level === 3">
            {{ text.text }}
        </h3>
        <h4 v-if="data.level === 4">
            {{ text.text }}
        </h4>
        <h5 v-if="data.level === 5">
            {{ text.text }}
        </h5>
        <h6 v-if="data.level === 6">
            {{ text.text }}
        </h6>
    </template>
</template>

<style scoped></style>
