<script setup lang="ts">
import type { HTMLAttributes } from 'vue';
import type { IHeadingItem } from '~/types/global.type'

defineProps<{
    data: IHeadingItem
    class?: HTMLAttributes['class']
}>()
</script>

<template>
    <template v-for="(text, index) of data.children" :key="index">
        <h1 v-if="data.level === 1" :class="class">
            {{ text.text }}
        </h1>
        <h2 v-else-if="data.level === 2" :class="class">
            {{ text.text }}
        </h2>
        <h3 v-else-if="data.level === 3" :class="class">
            {{ text.text }}
        </h3>
        <h4 v-else-if="data.level === 4" :class="class">
            {{ text.text }}
        </h4>
        <h5 v-else-if="data.level === 5" :class="class">
            {{ text.text }}
        </h5>
        <h6 v-else :class="class">
            {{ text.text }}
        </h6>
    </template>
</template>

<style scoped></style>
