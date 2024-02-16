<script setup lang="ts">
import type { ITextItems } from '~/types/global.type'
import ParagraphBlock from '~/components/common/blocks/ParagraphBlock.vue'
import HeadingBlock from '~/components/common/blocks/HeadingBlock.vue'
import ListBlock from '~/components/common/blocks/ListBlock.vue'
import RenderBlocks from '~/components/common/RenderBlocks.vue'

defineProps<{
    list: ITextItems[]
}>()

var isShort = ref(true)
</script>

<template>
    <div class="bg-accent" v-if="list">
        <div
            class="lg:pt-[5rem] lg:pb-[7.5rem] pt-[3.75rem] pb-[5rem] mx-auto container text-white grid seo-text-wrapper"
            :class="{
                'is-short': isShort,
                'is-full': !isShort,
            }"
        >
            <div v-if="list?.length" class="flex flex-col md text-ellipsis overflow-hidden gap-2">
                <RenderBlocks :text="list" />
            </div>
            <button
                @click="isShort = false"
                class="flex gap-2 mt-7 lg:mt-10 text-opacity-50 transition-colors text-white items-center hover:text-opacity-100"
            >
                <span class="text-[0.875rem] uppercase">развернуть</span>
                <svgo-arrow-right-bold class="text-[1.5rem]" />
            </button>
        </div>
    </div>
</template>

<style scoped></style>
