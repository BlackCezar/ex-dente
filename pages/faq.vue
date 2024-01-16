<script setup lang="ts">
import BreadCrumbs from '~/components/common/BreadCrumbs.vue'
import type { AnswersQuery, FAQPage, IBreadCrumb } from '~/types/global.type'
import FaqFilters from '~/components/answers/FaqFilters.vue'
import PagePagination from '~/components/ui/PagePagination.vue'

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
</script>

<template>
    <div class="vertical-padding bg-white">
        <div class="container mx-auto">
            <BreadCrumbs
                :list="breadCrumbs"
                is-dark
                class="mb-7 lg:mb-[3.75rem]"
            />
            <h1 class="h2 mb-10 lg:mb-[3.75rem] text-accent font-[Mignon]">
                {{ data.answersListing.data.attributes.title }}
            </h1>
            <div>
                <FaqFilters
                    class="mb-10 lg:mb-[7.2rem]"
                    :tags="data.tags.data"
                    @update="setTags"
                />
                <UiPageSpinner v-if="pending" />
                <div v-else>
                    <div>
                        <details
                            v-for="post of posts.answers.data"
                            :key="post.id"
                        >
                            <summary>
                                <span>{{ post.attributes.title }}</span>
                            </summary>
                            <p>
                                {{ post.attributes.text }}
                            </p>
                        </details>
                    </div>
                    <PagePagination
                        @show-more="showMore"
                        @set-page="setPage"
                        :page-count="posts?.answers.meta.pagination.pageCount"
                        :page="variables.pagination.page"
                    />
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped></style>
