<script setup lang="ts">
import BreadCrumbs from '~/components/common/BreadCrumbs.vue'
import type { IBreadCrumb } from '~/types/global.type'
import type { NewsPage } from '~/types/news.type'
import { useSeoMeta } from '#imports'
import NewsPageAvatar from '~/components/news/NewsPageAvatar.vue'

var route = useRoute()
var { newsPageQuery } = useQueries()
var variables = ref({
    filters: {
        slug: {
            eq: route.params.slug,
        },
    },
})
var { data } = await useAsyncQuery<NewsPage>(newsPageQuery, variables)
var breadCrumbs = markRaw<IBreadCrumb[]>([
    {
        path: '/',
        title: 'Главная',
    },
    {
        path: '/news',
        title: 'Новости',
    },
    {
        path: '/news/' + route.params.slug,
        title: data.value?.newsPosts.data?.[0].attributes.title ?? '',
    },
])
if (data.value?.newsPosts.data[0].attributes.seo)
    useSeoMeta({
        ogImage:
            data.value.newsPosts.data[0].attributes.seo.sharedImage.media?.data
                ?.attributes.url,
        ogImageUrl:
            data.value.newsPosts.data[0].attributes.seo.sharedImage.media?.data
                ?.attributes.url,
        ogImageAlt: data.value.newsPosts.data[0].attributes.seo.sharedImage.alt,
        title: data.value.newsPosts.data[0].attributes.title,
        keywords: data.value.newsPosts.data[0].attributes.seo.keywords,
        description:
            data.value.newsPosts.data[0].attributes.seo.metaDescription,
        ogDescription:
            data.value.newsPosts.data[0].attributes.seo.metaDescription,
        ogTitle: data.value.newsPosts.data[0].attributes.seo.metaTitle,
    })
</script>

<template>
    <div class="vertical-padding bg-white">
        <div class="container mx-auto">
            <BreadCrumbs
                is-dark
                :list="breadCrumbs"
                class="mb-[1.75rem] lg:mb-[3.75rem]"
            />
            <div
                class="grid grid-cols-1 items-start lg:grid-cols-[0.5fr_1fr] xl:grid-cols-[1fr_2fr] justify-between gap-6 lg:gap-10"
            >
                <NewsPageAvatar
                    class="lg:row-span-2"
                    v-if="data.newsPosts.data?.[0].attributes.avatar"
                    :avatar="data.newsPosts.data[0].attributes.avatar"
                />
                <div class="lg:col-start-2">
                    <h1
                        class="font-[Mignon] mb-3 lg:mb-5 text-[1.75rem] lg:text-[3rem] font-semibold leading-[2.375rem] lg:leading-[3.625rem]"
                    >
                        {{ data.newsPosts.data[0].attributes.title }}
                    </h1>
                    <time
                        class="text-accent block text-opacity-50 lg:text-[1.125rem] mb-5 lg:mb-10"
                        :datetime="
                            data.newsPosts.data[0].attributes.publishedAt
                        "
                        >{{
                            new Date(
                                data.newsPosts.data[0].attributes.publishedAt,
                            ).toLocaleDateString()
                        }}</time
                    >
                </div>
                <NewsPageContent :data="data.newsPosts.data?.[0].attributes" />
            </div>
        </div>
    </div>
</template>

<style scoped></style>
