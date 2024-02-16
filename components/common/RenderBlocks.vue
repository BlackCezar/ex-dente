<script setup lang="ts">
import ParagraphBlock from '~/components/common/blocks/ParagraphBlock.vue'
import HeadingBlock from '~/components/common/blocks/HeadingBlock.vue'
import ListBlock from '~/components/common/blocks/ListBlock.vue'
import type { ITextItems } from '~/types/global.type'
import type { HTMLAttributes } from 'vue';

defineProps<{
    text: ITextItems[]
    class?: HTMLAttributes['class']
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
            :class="class"
        />
        <HeadingBlock v-else-if="item.type === 'heading'" :class="class" :data="item" />
        <ListBlock v-else-if="item.type === 'list'" :class="class" :data="item" />
    </template>
</template>

<style scoped></style>
