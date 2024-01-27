<script setup lang="ts">
import BreadCrumbs from '~/components/common/BreadCrumbs.vue'
import type {
    IBreadCrumb,
    NewsPostsQuery,
    NewsQuery,
} from '~/types/global.type'
import useQueries from '~/composables/useQueries'
import UiPageSpinner from '~/components/ui/PageSpinner.vue'
import UiPagePagination from '~/components/ui/PagePagination.vue'

var { newsQuery, newsPosts } = useQueries()
var { data } = await useAsyncQuery<NewsQuery>(newsQuery)
var route = useRoute()
var router = useRouter()
var paginationVariables = ref({
    pagination: {
        pageSize: 9,
        page: route.query.page ? Number(route.query.page) : 1,
    },
})
var {
    data: posts,
    execute,
    error,
    pending,
} = await useAsyncQuery<NewsPostsQuery>(newsPosts, paginationVariables.value)

var breadCrumbs = markRaw<IBreadCrumb[]>([
    {
        path: '/',
        title: 'Главная',
    },
    {
        path: '/news',
        title: data.value?.newsListing?.data?.attributes?.title ?? 'Новости',
    },
])

function showMore() {
    paginationVariables.value.pagination.pageSize += 9
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
onMounted(execute)

useSeo(data.value.newsListing.data.attributes.title ?? 'Новости', data.value.newsListing.data.attributes.seo)
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
                class="uppercase text-accent lg:text-[3.75rem] lg:leading-[5rem] lg:font-bold text-[1.5rem] font-[Mignon] leading-[2rem] font-semibold"
            >
                {{ data?.newsListing?.data?.attributes.title }}
            </h1>
            <div class="pt-6 lg:pt-[5rem]">
                <div v-if="pending" class="flex justify-center">
                    <UiPageSpinner />
                </div>
                <div v-else>
                    <div
                        class="grid pb-[3.25rem] lg:pb-[3.75rem] grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-y-[3rem] gap-x-10 lg:gap-y-[7.5rem]"
                    >
                        <template
                            v-for="item of posts?.newsPosts.data"
                            :key="item.id"
                        >
                            <NewsItem is-dark :article="item" />
                        </template>
                    </div>
                    <UiPagePagination
                        @show-more="showMore"
                        @set-page="setPage"
                        :page="paginationVariables.pagination.page"
                        :page-count="
                            posts?.newsPosts.meta.pagination.pageCount ?? 0
                        "
                    />
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped></style>
