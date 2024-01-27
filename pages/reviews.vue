<script setup lang="ts">
import BreadCrumbs from '~/components/common/BreadCrumbs.vue'
import type {
    IBreadCrumb,
    ReviewPostsQuery,
    ReviewsPage,
    SelectOption,
} from '~/types/global.type'
import { useQueries } from '#imports'
import ReviewsFilters from '~/components/reviews/ReviewsFilters.vue'
import ReviewItem from '~/components/reviews/ReviewItem.vue'
import * as yup from 'yup'

var breadCrumbs = markRaw<IBreadCrumb[]>([
    {
        path: '/',
        title: 'Главная',
    },
    {
        path: '/reviews',
        title: 'Отзывы',
    },
])

var { reviewsPageQuery } = useQueries()
var router = useRouter()
var container = ref<HTMLDivElement | null>(null)
var { data } = await useAsyncQuery<ReviewsPage>(reviewsPageQuery)

var { values, setFieldValue } = useForm({
    validationSchema: {
        page: yup.string().optional(),
        pageSize: yup.string().optional(),
        sort: yup.string().optional(),
        doctorId: yup.string().optional(),
        serviceId: yup.string().optional(),
        clinicId: yup.string().optional(),
        reviewType: yup.array().of(yup.string().optional()),
    },
    initialValues: {
        page: 1,
        pageSize: 5,
        sort: 'publishedAt:desc',
        doctorId: null,
        serviceId: null,
        clinicId: null,
        reviewType: ['clinic', 'doctor'],
    },
})

useSeo(data.value.straniczaOtzyvov.data.attributes.title ?? 'Отзывы', data.value.straniczaOtzyvov.data.attributes.seo)

var sortOptions = markRaw<SelectOption[]>([
    {
        value: 'review.name:asc',
        label: 'По алфавиту',
    },
    {
        value: 'publishedAt:desc',
        label: 'По дате',
    },
])

var { reviewsPosts } = useQueries()
var filters = ref({
    sort: values.sort,
    filters: {
        review: {
            reviewType: {
                in: values.reviewType ?? [],
            },
        },
    },
    pagination: {
        page: values.page,
        pageSize: values.pageSize,
    },
})

var {
    result: reviews,
    refetch,
    error,
    loading,
    fetchMore,
} = useQuery<ReviewPostsQuery>(reviewsPosts, filters.value)

function showMore() {
    setFieldValue('pageSize', values.pageSize + 5)
    filters.value.pagination.pageSize = values.pageSize
    fetchMore({
        variables: filters.value,
    })
}

async function setPage(val: number) {
    setFieldValue('page', val)
    router.push({
        query: {
            page: val,
        },
    })
    reFetch()
}

var isOpen = ref(false)

watch(
    () => values.sort,
    async (val, oldValue) => {
        if (typeof val === 'undefined') {
            setFieldValue('sort', oldValue)
        } else if (val !== oldValue && typeof oldValue !== 'undefined') {
            setFieldValue('sort', val)

            reFetch()
        }
    },
)
watch(() => values.doctorId, () => {
    setPage(1)
    reFetch()
})

watch(() => values.serviceId, () => {
    setPage(1)
    reFetch()
})

watch(() => values.clinicId, () => {
    setPage(1)
    reFetch()
})

watch(() => values.reviewType, () => {
    setPage(1)
    reFetch()
})

function reFetch() {
    filters.value = {
        sort: values.sort,
        filters: {
            review: {
                reviewType: {
                    in: values.reviewType ?? [],
                },
            },
        },
        pagination: {
            page: values.page,
            pageSize: values.pageSize,
        },
    }
    if (values.serviceId)
        filters.value.filters.review = {
            ...filters.value.filters.review,
            sub_service: {
                id: {
                    eq: values.serviceId,
                },
            },
        }

    if (values.doctorId)
        filters.value.filters.review = {
            ...filters.value.filters.review,
            doctor: {
                id: {
                    eq: values.doctorId,
                },
            },
        }

    if (values.clinicId)
        filters.value.filters.review = {
            ...filters.value.filters.review,
            clinic: {
                id: {
                    eq: values.clinicId,
                },
            },
        }

    refetch(filters.value)
    if (container.value) container.value.scrollIntoView({
        behavior: 'smooth'
    })
}
</script>

<template>
    <div class="vertical-padding bg-white">
        <div class="container mx-auto" ref="container">
            <BreadCrumbs
                is-dark
                :list="breadCrumbs"
                class="mb-[1.75rem] lg:mb-[3.75rem]"
            />
            <div class="flex gap-5 justify-between items-center relative">
                <h1 class="h2 lg:h1 !font-[Mignon]">
                    {{ data.straniczaOtzyvov.data.attributes.title }}
                </h1>
                <div class="">
                    <div
                        class="lg:flex hidden flex-col lg:flex-row lg:items-center gap-3 lg:gap-8"
                    >
                        <span class="lg:text-[1.125rem]">Сортировать:</span>
                        <UiSelect
                            name="sort"
                            :options="sortOptions"
                            class="lg:w-[25rem]"
                        />
                    </div>
                    <div class="lg:hidden">
                        <button
                            @click="isOpen = !isOpen"
                            class="w-10 h-10 flex items-center justify-center rounded-[0.25rem] bg-secondary-before"
                        >
                            <svgo-filter
                                filled
                                class="text-[1.5rem]"
                                v-if="!isOpen"
                            />
                            <svgo-close filled class="text-[1.5rem]" v-else />
                        </button>
                        <transition
                            enter-active-class="duration-300 ease-out"
                            enter-from-class="transform opacity-0 -translate-y-4"
                            enter-to-class="opacity-100 translate-y-0"
                            leave-active-class="duration-200 ease-in"
                            leave-from-class="opacity-100 translate-y-0"
                            leave-to-class="transform opacity-0 -translate-y-4"
                        >
                            <div
                                v-show="isOpen"
                                class="absolute top-full right-0 w-[calc(100%_+_2rem)] bg-white py-4 mt-2 -mr-4 px-4"
                            >
                                <ReviewsFilters with-sort class="flex" />
                            </div>
                        </transition>
                    </div>
                </div>
            </div>

            <div
                class="pt-10 justify-between lg:pt-[5.81rem] gap-10 grid grid-cols-1 lg:grid-cols-[minmax(15rem,_25rem)_minmax(auto,_70rem)]"
            >
                <ReviewsFilters class="hidden lg:flex" />
                <div class="w-full h-full">
                    <div v-if="loading" class="flex justify-center">
                        <UiPageSpinner />
                    </div>
                    <div v-if="!loading">
                        <div
                            v-if="reviews?.reviews?.data?.length"
                            class="grid grid-cols-1 gap-[3.25rem] lg:gap-24 mb-10 lg:mb-[6.25rem]"
                        >
                            <template
                                v-for="item of reviews?.reviews.data"
                                :key="item.id"
                            >
                                <ReviewItem :review="item" />
                            </template>
                        </div>
                        <h3 v-else class="h3 text-accent font-[Mignon] text-center">Нет отзывов</h3>

                        <UiPagePagination
                            @show-more="showMore"
                            @set-page="setPage"
                            :page="values.page"
                            :page-count="
                                reviews?.reviews.meta.pagination.pageCount ?? 0
                            "
                        />
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped></style>
