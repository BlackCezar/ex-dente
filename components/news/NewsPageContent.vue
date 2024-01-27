<script setup lang="ts">
import type { NewsPageItem } from '~/types/news.type'
import RenderBlocks from '~/components/common/RenderBlocks.vue'
import RenderSlider from '~/components/common/RenderSlider.vue'

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
            class="block lg:col-span-2 col-start-1"
            v-else-if="item.__typename === 'ComponentSlidersSlider'"
        >
            <RenderSlider class="mb-10 lg:mb-[5rem]" :data="item" />
        </div>
    </template>
</template>

<style></style>
