<script setup lang="ts">
import vueMarkdown from 'vue-markdown-render'
import BreadCrumbs from '~/components/common/BreadCrumbs.vue'
import type { CustomerPage, IBreadCrumb } from '~/types/global.type'
import { useSeoMeta } from '#imports'

var { customerPageQuery } = useQueries()
var route = useRoute()
var { data } = await useAsyncQuery<CustomerPage>(customerPageQuery, {
    filters: {
        slug: {
            eq: route.params.slug,
        },
    },
})
var breadCrumbs = markRaw<IBreadCrumb[]>([
    {
        title: 'Главная',
        path: '/',
    },
    {
        title: 'Для пациентов',
        path: '/customers',
    },
    {
        title: data.value?.textPages?.data?.[0]?.attributes.title ?? '',
        path: '/customers/' + route.params.slug,
    },
])

if (data.value?.textPages.data?.[0]?.attributes.seo) {
    var seo = data.value?.textPages.data?.[0].attributes.seo
    useSeoMeta({
        ogImage: seo?.sharedImage?.media?.data?.attributes.url,
        ogImageUrl: seo?.sharedImage?.media?.data?.attributes.url,
        ogImageAlt: seo?.sharedImage?.alt,
        title: data.value.textPages.data[0].attributes.title,
        keywords: seo.keywords,
        description: seo.metaDescription,
        ogDescription: seo.metaDescription,
        ogTitle: seo.metaTitle,
    })
} else
    useHead({
        title: 'Для пациентов',
    })
</script>

<template>
    <div class="vertical-padding bg-white">
        <div class="container mx-auto" v-if="data.textPages.data.length">
            <BreadCrumbs
                :list="breadCrumbs"
                is-dark
                class="mb-7 lg:mb-[3.75rem]"
            />
            <h1 class="h2 mb-10 lg:mb-[3.75rem] text-accent font-[Mignon]">
                {{ data.textPages.data[0].attributes.title }}
            </h1>
            <section class="content text-accent">
                <vue-markdown
                    :source="data.textPages.data[0].attributes.textRich"
                />
            </section>
        </div>
    </div>
</template>

<style scoped></style>
