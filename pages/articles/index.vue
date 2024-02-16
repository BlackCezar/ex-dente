<script setup lang="ts">
import useQueries from '~/composables/useQueries'
import UiPageSpinner from '~/components/ui/PageSpinner.vue'
import UiPagePagination from '~/components/ui/PagePagination.vue'
import type {IArticlePostsQuery, IArticleQuery} from '~/types/article.type'
import type { IBreadCrumb } from '~/types/global.type';
import BreadCrumbs from '~/components/common/BreadCrumbs.vue'
import ArticlePost from '~/components/common/ArticlePost.vue'

var {articleQuery, articlePosts} = useQueries()
var {data} = await useAsyncQuery<IArticleQuery>(articleQuery)
var route = useRoute()
var router = useRouter()
var paginationVariables = ref({
    pagination: {
        pageSize: 5,
        page: route.query.page ? Number(route.query.page) : 1,
    },
})

var {data: posts, execute, pending} = await useAsyncQuery<IArticlePostsQuery>(articlePosts, paginationVariables.value)


var breadCrumbs = markRaw<IBreadCrumb[]>([
    {
        path: '/',
        title: 'Главная',
    },
    {
        path: '/articles',
        title: data.value?.articlePage?.data?.attributes?.title ?? 'СТАТЬИ',
    },
])

function showMore() {
    paginationVariables.value.pagination.pageSize += 5
    execute()
}
function setPage(val: number) {
    paginationVariables.value.pagination.page = val
    router.push({
        query: {
            page: val,
        },
    })
    execute()
}

useSeo(data.value?.articlePage?.data?.attributes?.title, data.value?.articlePage?.data?.attributes?.seo)
</script>
<template>
<div class="vertical-padding bg-white">
    <div class="container mx-auto">
            <BreadCrumbs
                is-dark
                :list="breadCrumbs"
                class="mb-[1.75rem] lg:mb-[3.75rem]"
            />
            <h1
                class="uppercase text-accent lg:text-[3.75rem] lg:leading-[5rem] lg:font-bold text-[1.5rem] font-serif leading-[2rem] font-semibold"
            >
            {{data.articlePage.data.attributes.title}}
            </h1>
            <div class="pt-6 lg:pt-[5rem]">
                <div v-if="pending" class="flex justify-center">
                    <UiPageSpinner />
                </div>
                <div v-if="!pending">
                    <div class="grid mb-10 lg:mb-20 grid-cols-1 lg:gap-[7.5rem] gap-12">
                        <template v-for="post of posts.articles.data" :key="post.id">
                            <ArticlePost :post="post.attributes" />
                        </template>
                    </div>
                    <UiPagePagination
                        @show-more="showMore"
                        @set-page="setPage"
                        :page="paginationVariables.pagination.page"
                        :page-count="
                            posts?.articles.meta.pagination.pageCount ?? 0
                        "
                    />
                </div>
            </div>
    </div>
</div>
</template>