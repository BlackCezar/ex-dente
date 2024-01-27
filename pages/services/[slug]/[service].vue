<script setup lang="ts">
import useQueries from '~/composables/useQueries'
import type { SubServicePage, SubServicesList } from '~/types/services.type'
import type { IBreadCrumb } from '~/types/global.type'
import BreadCrumbs from '~/components/common/BreadCrumbs.vue'
import ServiceMainBanner from '~/components/services/ServiceMainBanner.vue'
import RenderBlocks from '~/components/common/RenderBlocks.vue'
import DirectionsList from '~/components/common/DirectionsList.vue'
import PricesScreen from '~/components/prices/PricesScreen.vue'
import DoctorsScreen from '~/components/services/DoctorsScreen.vue'
import GallaryScreen from '~/components/common/GallaryScreen.vue'

var route = useRoute()
var { subServicePageQuery, subServicesQuery } = useQueries()
var variables = ref({
    filters: {
        slug: {
            eq: route.params.service,
        },
    },
})

var { data } = await useAsyncQuery<SubServicePage>(
    subServicePageQuery,
    variables.value,
)

var { data: subServices } = await useAsyncQuery<SubServicesList>(
    subServicesQuery,
    {
        filters: {
            service: {
                slug: {
                    eq: route.params.slug,
                },
            },
        },
    },
)

var breadCrumbs = markRaw<IBreadCrumb[]>([
    {
        path: '/',
        title: 'Главная',
    },
    {
        path: '/services',
        title: 'Услуги',
    },
    {
        path: `/services/${route.params.slug}`,
        title:
            data.value.subServices.data[0].attributes.service.data?.attributes
                .title ?? '',
    },
    {
        path: `/services/${route.params.slug}/${route.params.service}`,
        title: data.value.subServices.data[0].attributes.title ?? '',
    },
])

useSeo(data.value.subServices.data[0].attributes.title ?? 'Услуга', data.value.subServices.data[0].attributes.seo)

</script>

<template>
    <div class="vertical-padding pb-0 bg-accent">
        <div class="container mx-auto" v-if="data.subServices.data[0]">
            <BreadCrumbs
                :list="breadCrumbs"
                class="mb-[1.75rem] lg:mb-[3.75rem]"
            />
            <div>
                <ServiceMainBanner
                    :data="data.subServices.data[0].attributes"
                />
            </div>
        </div>
        <div
            class="mx-auto lg:bg-white container lg:py-[8.75rem] content flex flex-col gap-0 lg:gap-[4rem] lg:flex-row justify-between"
        >
            <div
                class="content text-white text-opacity-70 lg:text-accent pb-[3.75rem] lg:pb-0"
            >
                <RenderBlocks
                    :text="data.subServices.data[0]?.attributes.description"
                />
            </div>
            <div
                class="bg-white w-screen lg:w-full -ml-4 lg:ml-0 px-4 pt-12 lg:pt-0 lg:pb-0 pb-[3.75rem]"
            >
                <DirectionsList
                    title="Другие направления"
                    :parent="route.params.slug"
                    :list="subServices.subServices.data"
                />
            </div>
        </div>
        <div class="mx-auto bg-white lg:container">
            <PricesScreen
                v-if="
                    data.subServices.data[0].attributes.price_sections.data
                        .length
                "
                :list="data.subServices.data[0].attributes.price_sections.data"
            />
            <DoctorsScreen
                :list="data.subServices.data[0].attributes.doctors.data"
                class="px-4 lg:px-0 pb-[3.75rem] lg:pb-[8.75rem]"
            />
            <GallaryScreen
                :list="data.subServices.data[0].attributes.galary?.banner.data"
                class="pb-[3.75rem] lg:pb-[8.75rem]"
            />
        </div>
        <MainCallBackForm />
    </div>
</template>

<style scoped>
details summary {
    transition: margin 150ms ease-out;
}
details[open] summary {
    margin-bottom: 12px;
    cursor: pointer;
}
details .arrow-left {
    display: none;
}
details[open] .arrow-left {
    display: block;
}
details[open] .arrow-down {
    display: none;
}
.price-row:nth-child(even) {
    @apply bg-gray text-accent;
}
</style>
