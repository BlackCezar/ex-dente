<script setup lang="ts">
import type { NewsPageItem } from '~/types/news.type'
import RenderBlocks from '~/components/common/RenderBlocks.vue'
import RenderSlider from '~/components/common/RenderSlider.vue'
import { Autoplay } from 'swiper/modules'

defineProps<{
    data: NewsPageItem['attributes']
}>()
</script>

<template>
    <template v-for="item of data.body" :key="item.id">
        <article
            v-if="item.__typename === 'ComponentTextText'"
            class="content lg:col-start-2"
        >
            <RenderBlocks :text="item.text" />
        </article>
        <div
            class="block col-span-2 col-start-1"
            v-else-if="item.__typename === 'ComponentSlidersSlider'"
        >
            <RenderSlider class="mb-10 lg:mb-[5rem]" :data="item" />
        </div>
    </template>
</template>

<style>
.content p {
    @apply text-accent text-opacity-70 text-[1.125rem] lg:text-[1.375rem] leading-[1.75rem] lg:leading-[2.25rem];
}
.content p:has(+ h1),
.content p:has(+ h2),
.content p:has(+ h3),
.content p:has(+ h4),
.content p:has(+ h5),
.content p:has(+ h6) {
    @apply mb-10 lg:mb-12;
}

.content h1,
.content h2,
.content h3,
.content h4,
.content h5,
.content h6 {
    @apply mb-5 lg:mb-7 font-[Mignon] font-medium  text-[1.125rem]  lg:font-normal lg:text-[1.75rem];
}
</style>
