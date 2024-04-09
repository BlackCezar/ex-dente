<script setup lang="ts">
import type { IParagraphItem } from '~/types/global.type'

defineProps<{
    data: IParagraphItem
}>()
</script>

<template>
    <p>
        <template v-for="text of data?.children">
            <b v-if="text.bold">{{ text.text }}</b>
            <i v-else-if="text.italic">{{ text.text }}</i>
            <u v-else-if="text.underline">{{ text.text }}</u>
            <s v-else-if="text.strikethrough">{{ text.text }}</s>
            <code v-else-if="text.code">{{ text.text }}</code>
            <template v-else>
                {{ text.text }}
            </template>
        </template>
    </p>
</template>

<style scoped></style>
