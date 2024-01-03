<script setup lang="ts">
import type { IListItem } from '~/types/global.type'

defineProps<{
    data: IListItem
}>()
</script>

<template>
    <ol v-if="data.format === 'ordered'">
        <li v-for="(item, index) of data.children" :key="index">
            <span v-for="(text, ind) of item.children" :key="ind">
                {{ text.text }}
            </span>
        </li>
    </ol>
    <ul v-else>
        <li v-for="(item, index) of data.children" :key="index">
            <span v-for="(text, ind) of item.children" :key="ind">
                {{ text.text }}
            </span>
        </li>
    </ul>
</template>

<style scoped></style>
