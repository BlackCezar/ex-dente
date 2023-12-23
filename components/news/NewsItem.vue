<script setup lang="ts">
import type { INewsItem } from '~/types/global.type'

defineProps<{
    article: INewsItem
}>()

var appConfig = useAppConfig()
</script>

<template>
    <nuxt-link :to="`/news/${article.attributes.slug}`">
        <article class="flex flex-col gap-1" :title="article.attributes.title">
            <img
                :src="`${appConfig.assetsUri}${article.attributes.avatar.data?.attributes.url}`"
                :alt="
                    article.attributes.avatar.data?.attributes?.alternativeText
                "
                class="mb-2 aspect-square object-cover object-center"
            />
            <time
                class="text-[0.875rem] lg:text-[1.125rem] text-opacity-50 text-white"
                :datetime="article.attributes.createdAt"
                >{{
                    new Date(article.attributes.createdAt).toLocaleDateString()
                }}</time
            >
            <h3 class="text-white text-opacity-70 lg:text-[1.75rem]">
                {{ article.attributes.title }}
            </h3>
        </article>
    </nuxt-link>
</template>

<style scoped></style>
