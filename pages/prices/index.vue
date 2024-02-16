<script setup lang="ts">
import { useQueries, useAsyncQuery } from '#imports'
import {PublicationState, type IBreadCrumb, type IPricesPage, type SelectOption} from '~/types/global.type'
import BreadCrumbs from '~/components/common/BreadCrumbs.vue'
import * as yup from 'yup'

const {pricesPageQuery} = useQueries()
const paginationVariables =ref({
    publicationState: PublicationState.LIVE,
    subServicesPublicationState2: PublicationState.LIVE,
    priceSectionsPublicationState2: PublicationState.LIVE,
    filters: {
        id: {
            eq: undefined
        }
    }
})
const {data, pending, execute} = await useAsyncQuery<IPricesPage>(pricesPageQuery, paginationVariables.value)

const breadCrumbs = markRaw<IBreadCrumb[]>([{
    path: '/',
    title: 'Главная'
}, {
    path: '/prices',
    title: data.value?.prices?.data?.attributes?.title ?? 'Цены'
}])

var {values} = useForm({
    validationSchema: yup.object().shape({
        directions: yup.string().optional()
    })
})


watch(
    () => values.directions,
    () => {
        if (values.directions) paginationVariables.value.filters.id.eq = values.directions;
        else {
            paginationVariables.value.filters.id.eq = undefined
        }
            
        execute()
    },
    {
        deep: true,
    },
)

useSeo(data.value?.prices?.data?.attributes?.title, data.value?.prices?.data?.attributes?.seo)

const subServicesList = computed(() => {
    const list = []

    for (const service of data.value.prices.data.attributes.services.data) {
        for (const subService of service.attributes.sub_services.data) {
            for (const price of subService.attributes.price_sections.data) {
                list.push({
                    ...price.attributes,
                    parent: service.attributes.slug,
                    subService: subService.attributes.slug
                })
            }
        }
    }
    return list
})

const url = useRequestURL()

useJsonld(() => ({
    '@context': 'https://schema.org',
    "@type": "ItemList",
    itemListElement: subServicesList.value.map(item => ({
        '@type': 'Product',
        name: item.label,
        url: `${url.origin}/services/${item.parent}/${item.subService}`,
        priceCurrency: 'RUB',
        offers: {
            "@type": 'AggregateOffer',
            offerCount: item.price.length,
            offers: item.price.map(price => ({
                '@type': 'Offer',
                name: price.description,
                price: price.price
            }))
        }
    }))
}))

var directionOptions = ref<SelectOption[]>([])

onMounted(() => {
    const list = data.value.prices.data.attributes.services.data.map(service => ({
        value: service.id,
        label: service.attributes.title,
        children: service.attributes.sub_services.data.map(subS => ({
            value: subS.id,
            label: subS.attributes.title
        }))
    }))

    list.unshift({
        value: undefined,
        label: 'Все направления'
    })
    directionOptions.value = list
})

</script>
<template>
    <div class="bg-white vertical-padding">
        <div class="container mx-auto">
            <BreadCrumbs
                    is-dark
                    :list="breadCrumbs"
                    class="lg:mb-[3.75rem] mb-7"
                />
            <div class="flex flex-col lg:flex-row gap-6 lg:items-center justify-between mb-8 lg:mb-[5rem]">
                <h1 class="h2 lg:h1 text-accent  !font-serif">
                    {{ data.prices.data.attributes.title ?? 'Цены' }}
                </h1>
                <UiSelect 
                class="max-w-[25rem]"
                name="directions" :options="directionOptions" placeholder="Все направления" />
            </div>
            <div v-if="pending" class="flex justify-center py-10 lg:py-36"> 
                <UiPageSpinner />
            </div>
            <div v-if="!pending" class="flex flex-col gap-12 lg:gap-[5rem]">
                <template v-for="service of data.prices.data.attributes.services.data" :key="service.id">
                    <article v-if="service.attributes.sub_services.data.length">
                        <h2 class="font-serif title font-semibold text-[1.75rem] text-accent mb-4 lg:mb-7 lg:text-[3rem]">{{ service.attributes.title }}</h2>
                        <section class="grid grid-cols-1 gap-10 lg:gap-15">
                            <template v-for="subService of service.attributes.sub_services.data" :key="subService.id">
                                <article>
                                    <h3 class="mb-4 text-lg lg:mb-6 lg:text-[1.75rem] title">{{ subService.attributes.title }}</h3>
                                    <div class="grid grid-cols-1 gap-3 lg:gap-5">
                                        <template v-for="item of subService.attributes.price_sections.data" :key="item.id">
                                                <PricesRow :item="item" />
                                        </template>
                                    </div>
                                </article>
                            </template>
                        </section>
                    </article>
                </template>
            </div>
        </div>
    </div>
</template>