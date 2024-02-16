<script setup lang="ts">
import type { IArticle } from '~/types/article.type';

defineProps<{
    post: Omit<IArticle, 'seo' | 'content'>
}>()

var appConfig = useAppConfig()
</script>
<template>
    <article class="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-20">
        <nuxt-link :to="`/articles/${post.slug}`" class="aspect-[328/196] lg:aspect-[733/344]">
            <img class="w-full h-full object-cover object-center" :src="appConfig.assetsUri + post.banner.data.attributes.url" :title="post.banner.data.attributes.caption" :alt="post.banner.data.attributes.alternativeText" />
        </nuxt-link>
        <nuxt-link class="flex flex-col gap-3 cursor-pointer lg:cursor-auto" :to="`/articles/${post.slug}`">
            <h1 class="text-accent text-opacity-70 font-serif font-semibold text-[1.75rem] lg:text-[3rem]">{{ post.title }}</h1>
            <time
                class="hidden mb-2 lg:block text-accent text-lg text-opacity-50"
                :datetime="post.publishedAt"
                >{{
                    new Date(
                        post.publishedAt,
                    ).toLocaleDateString('ru-RU')
                }}</time
            >
            <p class="text-base lg:text-[1.375rem] line-clamp-3 font-sans text-accent text-opacity-50">
                {{ post.description }}
            </p>
            <nuxt-link class="hidden group font-sans textlg text-opacity-50 mt-auto text-accent lg:flex items-center gap-3" :to="`/articles/${post.slug}`">
                <span>ЧИТАТЬ</span>
                <SvgoArrowRightBold filled class="text-2xl !mb-0 group-hover:translate-x-1 translate-x-0 transition-transform" />
            </nuxt-link>
        </nuxt-link>
    </article>
</template>