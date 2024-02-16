<script setup lang="ts">
import BreadCrumbs from '~/components/common/BreadCrumbs.vue'
import type { IBreadCrumb } from '~/types/global.type'
import type { IArticlePage} from '~/types/article.type'
import RenderBlocks from '~/components/common/RenderBlocks.vue'

var route = useRoute()
var { articlePageQuery } = useQueries()
var variables = ref({
    filters: {
        slug: {
            eq: route.params.slug,
        },
    },
})

var {data} = await useAsyncQuery<IArticlePage>(articlePageQuery, variables.value)

if (!data.value || data.value?.articles?.data.length === 0) throw createError({
    statusCode: 404,
    fatal: true,
    message: 'Страница не найдена'
})


var breadCrumbs = markRaw<IBreadCrumb[]>([
    {
        path: '/',
        title: 'Главная',
    },
    {
        path: '/articles',
        title: 'Статьи',
    },
    {
        path: '/articles/' + route.params.slug,
        title: data.value?.articles.data?.[0].attributes.title ?? '',
    },
])

useSeo(data.value?.articles?.data[0].attributes.title ?? 'Статья', data.value?.articles?.data[0].attributes.seo)
var banner = computed(() => data.value?.articles?.data?.[0]?.attributes.banner?.data ?? null)
var appConfig = useAppConfig()
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
                class="grid grid-cols-1 news-content items-start lg:grid-cols-[0.5fr_1fr] xl:grid-cols-[1fr_2fr] justify-between gap-6 lg:gap-10"
            >
             
                <img :src="banner ? `${appConfig.assetsUri}${banner.attributes.url}` : ''" />
                <div class="lg:col-start-2">
                    <h1
                        class="font-serif mb-3 lg:mb-5 text-[1.75rem] lg:text-[3rem] font-semibold leading-[2.375rem] lg:leading-[3.625rem]"
                    >
                        {{ data?.articles.data[0].attributes.title }}
                    </h1>
                    <time
                        class="text-accent block text-opacity-50 lg:text-[1.125rem] mb-5 lg:mb-10"
                        :datetime="
                            data?.articles.data[0].attributes.publishedAt
                        "
                        >{{
                            new Date(
                                data?.articles.data[0].attributes.publishedAt,
                            ).toLocaleDateString('ru-RU')
                        }}</time
                    >
                    <div class="content article">
                        <RenderBlocks :text="data?.articles.data[0].attributes.content" />
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<style>
.article.content p, .article.content ul, .article.content li, .article.content h1, .article.content h2, .article.content h3, .article.content h4, .article.content h5 {
    @apply text-accent text-opacity-70;
}
</style>
