<script setup lang="ts">
import UiPagePagination from '~/components/ui/PagePagination.vue'
import UiPageSpinner from '~/components/ui/PageSpinner.vue'
import BreadCrumbs from '~/components/common/BreadCrumbs.vue'
import type { IBreadCrumb } from '~/types/global.type'
import { useSeoMeta } from '#imports'
import type { SalesPosts, SalesQuery } from '~/types/sales.type'
import SaleItem from '~/components/sales/SaleItem.vue'

var { salesPage, salesPosts } = useQueries()
var { data } = await useAsyncQuery<SalesQuery>(salesPage)
var route = useRoute()
var router = useRouter()

var paginationVariables = ref({
    pagination: {
        pageSize: 10,
        page: route.query.page ? Number(route.query.page) : 1,
    },
})

var {
    data: posts,
    execute,
    pending,
    error,
} = await useAsyncQuery<SalesPosts>(salesPosts, paginationVariables.value)
console.log(error.value)
var breadCrumbs = markRaw<IBreadCrumb[]>([
    {
        path: '/',
        title: 'Главная',
    },
    {
        path: '/sales',
        title: data.value?.promoListing?.data?.attributes?.title ?? 'Акции',
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

if (data.value.promoListing.data.attributes.seo) {
    useSeoMeta({
        ogImage:
            data.value.promoListing.data.attributes.seo.sharedImage?.media?.data
                ?.attributes.url,
        ogImageUrl:
            data.value.promoListing.data.attributes.seo.sharedImage?.media?.data
                ?.attributes.url,
        ogImageAlt:
            data.value.promoListing.data.attributes.seo.sharedImage?.alt,
        title: data.value.promoListing.data.attributes.title,
        keywords: data.value.promoListing.data.attributes.seo.keywords,
        description:
            data.value.promoListing.data.attributes.seo.metaDescription,
        ogDescription:
            data.value.promoListing.data.attributes.seo.metaDescription,
        ogTitle: data.value.promoListing.data.attributes.seo.metaTitle,
    })
} else {
    useHead({
        title: 'Акции',
    })
}
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
                {{ data?.promoListing?.data?.attributes.title }}
            </h1>
            <div class="pt-6 lg:pt-[5rem]">
                <div v-if="pending" class="flex justify-center">
                    <UiPageSpinner />
                </div>
                <div v-else>
                    <div
                        class="grid pb-[3.25rem] lg:pb-[3.75rem] grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-y-[3rem] gap-x-10 lg:gap-y-[7.5rem]"
                    >
                        <template
                            v-for="(item, index) of posts?.promos.data"
                            :key="item.id"
                        >
                            <SaleItem
                                :article="item"
                                :is-width="
                                    index === 0 ||
                                    index === posts.promos.data.length - 1
                                "
                                :class="{
                                    '2xl:col-span-2':
                                        index === 0 ||
                                        index === posts.promos.data.length - 1,
                                }"
                            />
                        </template>
                    </div>
                    <UiPagePagination
                        @show-more="showMore"
                        @set-page="setPage"
                        :page="paginationVariables.pagination.page"
                        :page-count="
                            posts?.promos.meta.pagination.pageCount ?? 0
                        "
                    />
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped></style>
