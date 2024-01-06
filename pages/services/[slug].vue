<script setup lang="ts">
import BreadCrumbs from '~/components/common/BreadCrumbs.vue'
import type { IBreadCrumb } from '~/types/global.type'
import type { ServicePage } from '~/types/services.type'
import { useSeoMeta } from '#imports'
import RenderBlocks from '~/components/common/RenderBlocks.vue'

var route = useRoute()
var { servicePageQuery } = useQueries()
var variables = ref({
    filters: {
        slug: {
            eq: route.params.slug,
        },
    },
})
var { data } = await useAsyncQuery<ServicePage>(
    servicePageQuery,
    variables.value,
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
        title: data.value.services.data[0].attributes.title ?? '',
    },
])

if (data.value?.services.data[0].attributes.seo)
    useSeoMeta({
        ogImage:
            data.value.services.data[0].attributes.seo.sharedImage.media?.data
                ?.attributes.url,
        ogImageUrl:
            data.value.services.data[0].attributes.seo.sharedImage.media?.data
                ?.attributes.url,
        ogImageAlt: data.value.services.data[0].attributes.seo.sharedImage.alt,
        title: data.value.services.data[0].attributes.title,
        keywords: data.value.services.data[0].attributes.seo.keywords,
        description: data.value.services.data[0].attributes.seo.metaDescription,
        ogDescription:
            data.value.services.data[0].attributes.seo.metaDescription,
        ogTitle: data.value.services.data[0].attributes.seo.metaTitle,
    })
</script>

<template>
    <div class="vertical-padding bg-white">
        <div class="container mx-auto" v-if="data.services.data?.[0]">
            <BreadCrumbs
                is-dark
                :list="breadCrumbs"
                class="mb-[1.75rem] lg:mb-[3.75rem]"
            />
            <h2 class="h2 lg:mb-[3rem] mb-6 font-[Mignon] text-accent">
                {{ data.services.data?.[0].attributes.title }}
            </h2>
            <div
                class="flex flex-col lg:flex-row gap-[3.75rem] lg:gap-[6rem] justify-between mb-[3.75rem] lg:mb-[8.75rem]"
            >
                <div>
                    <div class="max-w-[62rem]">
                        <section
                            class="text-[1.125rem] text-accent lg:text-[1.75rem] lg:mb-10 mb-5"
                        >
                            {{ data.services.data[0].attributes.subtitle }}
                        </section>
                        <article class="content">
                            <RenderBlocks
                                :text="
                                    data.services.data[0].attributes.description
                                "
                            />
                        </article>
                    </div>
                </div>
                <div
                    class="max-w-[34rem]"
                    v-if="
                        data.services.data[0].attributes.sub_services.data
                            .length
                    "
                >
                    <h3
                        class="h3 mb-6 text-accent lg:mb-8 lg:text-[1.75rem] font-[Mignon] lg:font-normal"
                    >
                        Направления
                    </h3>
                    <nav>
                        <ul class="flex flex-col gap-4 lg:gap-6">
                            <li
                                v-for="item of data.services.data[0].attributes
                                    .sub_services.data"
                                :key="item.id"
                            >
                                <nuxt-link
                                    class="pl-5 lg:pr-8 lg:pl-7 py-3 pr-4 rounded-[0.25rem] lg:rounded-[0.375rem] hover:bg-secondary-before transition-colors bg-gray flex items-center justify-between gap-4"
                                    :to="`/services/${route.params.slug}/${item.attributes.slug}`"
                                >
                                    <span
                                        class="lg:text-[1.375rem] text-accent text-opacity-70"
                                    >
                                        {{ item.attributes.title }}
                                    </span>
                                    <svgo-arrow-right
                                        filled
                                        class="text-[1.5rem]"
                                    />
                                </nuxt-link>
                            </li>
                        </ul>
                    </nav>
                </div>
            </div>
            <ServicesDoctorsScreen
                :list="data.services.data[0].attributes.doctors.data"
            />
        </div>
    </div>
</template>

<style scoped></style>
