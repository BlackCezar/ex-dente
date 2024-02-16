<script setup lang="ts">
import BreadCrumbs from '~/components/common/BreadCrumbs.vue'
import type { IBreadCrumb } from '~/types/global.type'
import type { DoctorsPage, DoctorsPosts } from '~/types/doctors.type'
import UiPageSpinner from '~/components/ui/PageSpinner.vue'
import DoctorItem from '~/components/doctors/DoctorItem.vue'
import UiPagePagination from '~/components/ui/PagePagination.vue'
import { useGlobalStore } from '~/store/global.store'
import { storeToRefs } from '#imports'
import {useSeo} from '~/composables/useSeo'
import * as yup from 'yup'

var route = useRoute()
var router = useRouter()
var {values} = useForm({
    validationSchema: yup.object().shape({
        doctorsService: yup.string().optional()
    })
})
var paginationVariables = ref({
    filters: {
        sub_services: undefined,
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

var servicesOptions = computed(() =>{
    const list = services.value.map((service) => {
        return {
            value: service.id,
            label: service.attributes.title,
            children: service.attributes.sub_services.data.map((subS) => ({
                value: subS.id,
                label: subS.attributes.title,
            })),
        }
    })
    list.unshift({
        value: undefined,
        label: 'Все направления'
    })
    return list
})

watch(
    () => values.doctorsService,
    () => {
        if (values.doctorsService) paginationVariables.value.filters.sub_services = 
        { 
            id: {
                eq: values.doctorsService
            }
        }; else {
            paginationVariables.value.filters.sub_services = undefined
        }
            
        execute()
    },
    {
        deep: true,
    },
)

useSeo(data.value.doctorsListing.data.attributes.title ?? 'Наши врачи', data.value.doctorsListing.data.attributes.seo)
useJsonld(() => ({
    '@context': 'https://schema.org',
    "@type": "ItemList",
    itemListElement: posts.value?.doctors?.data.map(doc => ({
        "@type": "Person",
        "@id": doc.id,
        name: doc.attributes.name,
        jobTitle: doc.attributes.specification,
        url: `/doctors/${doc.attributes.slug}`,
        image: doc.attributes.image.data?.attributes.formats.medium.url,
        memberOf: {
            "@type": "Hospital",
            name: doc.attributes.clinicAddress,
            address: {
                "@type": "PostalAddress",
                "addressLocality": doc.attributes.clinicAddress,
                addressRegion: "Красноярск"
            }
        }

    }))
}))
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
                    class="uppercase text-left text-accent lg:text-[3.75rem] lg:leading-[5rem] lg:font-bold text-[1.5rem] font-serif leading-[2rem] font-semibold"
                >
                    {{ data.doctorsListing.data.attributes.title }}
                </h1>
                    <UiSelect
                        class="max-w-[25rem]"
                        name="doctorsService"
                        :options="servicesOptions"
                        placeholder="Все направления"
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
                            <DoctorItem :id="item.id" :article="item.attributes" />
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
