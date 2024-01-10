<script setup lang="ts">
import BreadCrumbs from '~/components/common/BreadCrumbs.vue'
import type { IBreadCrumb } from '~/types/global.type'
import type { DoctorsPage, DoctorsPosts } from '~/types/doctors.type'
import UiPageSpinner from '~/components/ui/PageSpinner.vue'
import DoctorItem from '~/components/doctors/DoctorItem.vue'
import UiPagePagination from '~/components/ui/PagePagination.vue'
import { useGlobalStore } from '~/store/global.store'
import { storeToRefs } from '#imports'

var route = useRoute()
var router = useRouter()
var activeService = ref(null)
var paginationVariables = ref({
    filters: {
        sub_services: {
            id: {
                eq: activeService.value,
            },
        },
    },
    pagination: {
        pageSize: 8,
        page: route.query.page ? Number(route.query.page) : 1,
    },
})
var { doctorsPageQuery, doctorsPosts } = useQueries()

var breadCrumbs = markRaw<IBreadCrumb[]>([
    {
        path: '/',
        title: 'Главная',
    },
    {
        path: '/doctors',
        title: 'Врачи',
    },
])
var { data } = await useAsyncQuery<DoctorsPage>(doctorsPageQuery)
var {
    data: posts,
    pending,
    execute,
} = useAsyncQuery<DoctorsPosts>(doctorsPosts, paginationVariables.value)

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
var globalStore = useGlobalStore()
var { services } = storeToRefs(globalStore)

var servicesOptions = computed(() =>
    services.value.map((service) => {
        return {
            value: service.id,
            label: service.attributes.title,
            children: service.attributes.sub_services.data.map((subS) => ({
                value: subS.id,
                label: subS.attributes.title,
            })),
        }
    }),
)

watch(
    () => activeService.value,
    () => {
        paginationVariables.value.filters.sub_services.id.eq =
            activeService.value
        execute()
    },
    {
        deep: true,
    },
)
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
                class="flex flex-col lg:flex-row justify-between lg:items-center gap-6 lg:gap-12"
            >
                <h1
                    class="uppercase text-left text-accent lg:text-[3.75rem] lg:leading-[5rem] lg:font-bold text-[1.5rem] font-[Mignon] leading-[2rem] font-semibold"
                >
                    {{ data.doctorsListing.data.attributes.title }}
                </h1>
                <UiSelect
                    class="max-w-[25rem]"
                    name="service"
                    :options="servicesOptions"
                    placeholder="Все направления"
                    v-model="activeService"
                />
            </div>
            <div class="pt-6 lg:pt-[5rem]">
                <div v-if="pending" class="flex justify-center">
                    <UiPageSpinner />
                </div>
                <div v-else>
                    <div
                        class="grid gap-y-[3.5rem] lg:gap-x-10 gap-x-5 lg:gap-y-[5rem] grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
                    >
                        <template
                            v-for="item of posts.doctors.data"
                            :key="item.id"
                        >
                            <DoctorItem :article="item.attributes" />
                        </template>
                    </div>
                    <UiPagePagination
                        @show-more="showMore"
                        @set-page="setPage"
                        :page="paginationVariables.pagination.page"
                        :page-count="
                            posts?.doctors.meta.pagination.pageCount ?? 0
                        "
                    />
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped></style>
