<script setup lang="ts">
import BreadCrumbs from '~/components/common/BreadCrumbs.vue'
import type { CustomersPage, IBreadCrumb } from '~/types/global.type'

var { customersPageQuery } = useQueries()
var { data } = await useAsyncQuery<CustomersPage>(customersPageQuery)

var breadCrumbs = markRaw<IBreadCrumb[]>([
    {
        path: '/',
        title: 'Главная',
    },
    {
        path: '/customers',
        title:
            data.value.clientInformation.data.attributes.title ??
            'Для пациентов',
    },
])


useSeo(data.value.clientInformation.data.attributes.title ?? 'Для пациентов', data.value.clientInformation.data.attributes.seo)
</script>

<template>
    <div class="vertical-padding bg-white">
        <div class="container mx-auto">
            <BreadCrumbs
                :list="breadCrumbs"
                is-dark
                class="lg:mb[3.5rem] mb-7"
            />
            <h1 class="font-serif h2 mb-7 lg:mb-[3.75rem]">
                {{
                    data.clientInformation.data.attributes.title ??
                    'для пациентов'
                }}
            </h1>
            <nav>
                <ul class="flex flex-col gap-4 lg:gap-6">
                    <li
                        v-for="item of data.clientInformation.data.attributes
                            .informationPagesListing"
                        :key="item.id"
                    >
                        <nuxt-link
                            class="p-4 lg:pl-7 lg:py-8 lg:pr-8 rounded-[0.375rem] hover:bg-secondary-before transition-colors bg-gray flex gap-2 justify-between items-center"
                            :to="`/customers/${item.url}`"
                        >
                            <span
                                class="text-accent lg:text-[1.375rem] text-opacity-70"
                            >
                                {{ item.label }}
                            </span>
                            <svgo-arrow-right
                                filled
                                class="lg:text-[2rem] text-[1.5rem]"
                            />
                        </nuxt-link>
                    </li>
                </ul>
            </nav>
        </div>
    </div>
</template>

<style scoped></style>
