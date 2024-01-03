<script setup lang="ts">
import ParagraphBlock from '~/components/common/blocks/ParagraphBlock.vue'
import HeadingBlock from '~/components/common/blocks/HeadingBlock.vue'
import ListBlock from '~/components/common/blocks/ListBlock.vue'
import type { ITextItems } from '~/types/global.type'

defineProps<{
    text: ITextItems[]
}>()
</script>

<template>
    <template v-for="(item, index) of text" :key="index">
        <ParagraphBlock
            v-if="
                item.type === 'paragraph' &&
                item.children.length &&
                item.children[0].text
            "
            :data="item"
        />
        <HeadingBlock v-else-if="item.type === 'heading'" :data="item" />
        <ListBlock v-else-if="item.type === 'list'" :data="item" />
    </template>
</template>

<style scoped></style>
