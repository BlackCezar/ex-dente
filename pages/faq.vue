<script setup lang="ts">
import BreadCrumbs from '~/components/common/BreadCrumbs.vue'
import type { AnswersQuery, FAQPage, IBreadCrumb } from '~/types/global.type'
import FaqFilters from '~/components/answers/FaqFilters.vue'
import PagePagination from '~/components/ui/PagePagination.vue'
import Accardion from '~/components/ui/Accardion.vue'

var { faqPageQuery, answersQuery } = useQueries()
var route = useRoute()
var router = useRouter()
var variables = ref({
    filters: {
        tag: {
            id: {
                in: [] as string[],
            },
        },
    },
    pagination: {
        pageSize: 10,
        page: route.query.page ? Number(route.query.page) : 1,
    },
})
var { data } = await useAsyncQuery<FAQPage>(faqPageQuery)
var {
    data: posts,
    pending,
    execute,
} = useAsyncQuery<AnswersQuery>(answersQuery, variables.value)
var breadCrumbs = markRaw<IBreadCrumb[]>([
    {
        title: 'Главная',
        path: '/',
    },
    {
        path: '/faq',
        title: data.value?.answersListing.data.attributes.title,
    },
])

function showMore() {
    variables.value.pagination.pageSize += 10
    variables.value.pagination.page = 1
    router.push({
        query: {
            page: 1,
        },
    })
    execute()
}

function setTags(tags: string[]) {
    variables.value.filters.tag.id.in = tags
    variables.value.pagination.page = 1
    variables.value.pagination.pageSize = 10
    console.log(variables.value)
    router.push({
        query: {
            page: 1,
        },
    })
    execute()
}

function setPage(val: number) {
    variables.value.pagination.page = val
    router.push({
        query: {
            page: val,
        },
    })
    execute()
}

useJsonld(() => ({
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: posts.value?.answers?.data.map(item => ({
        '@type': 'Question',
        name: item.attributes.title,
        acceptedAnswer: {
            '@type': 'Answer',
            text: item.attributes.text
        }
    }))
}))

useHead({
    title: 'Вопрос-ответ'
})

function onDetailsContentClick() {
    
}
</script>

<template>
    <div class="vertical-padding bg-white">
        <div class="container mx-auto">
            <BreadCrumbs
                :list="breadCrumbs"
                is-dark
                class="mb-7 lg:mb-[3.75rem]"
            />
            <h1 class="h2 mb-10 lg:mb-[3.75rem] text-accent font-serif">
                {{ data.answersListing.data.attributes.title }}
            </h1>
            <div>
                <FaqFilters
                    class="mb-10 lg:mb-[7.2rem]"
                    :tags="data.tags.data"
                    @update="setTags"
                />
                <div v-if="pending" class="flex justify-center">
                    <UiPageSpinner />
                </div>
                <div v-else>
                    <div
                        class="flex flex-col gap-4 lg:gap-6 lg:mb-[3.75rem] mb-10"
                    >
                        <Accardion 
                            v-for="post of posts?.answers?.data"
                            :key="post.id"
                            :post="post"
                        />
                    </div>
                    <PagePagination
                        @show-more="showMore"
                        @set-page="setPage"
                        :page-count="posts?.answers?.meta.pagination.pageCount"
                        :page="variables.pagination.page"
                    />
                </div>
            </div>
        </div>
    </div>
</template>