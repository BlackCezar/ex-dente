<script setup lang="ts">
import vueMarkdown from 'vue-markdown-render'
import BreadCrumbs from '~/components/common/BreadCrumbs.vue'
import type { CustomerPage, IBreadCrumb } from '~/types/global.type'
import MDLinkAttrs from 'markdown-it-link-attributes'
import type MarkdownIt from 'markdown-it';

var { customerPageQuery } = useQueries()
var route = useRoute()
var { data } = await useAsyncQuery<CustomerPage>(customerPageQuery, {
    filters: {
        slug: {
            eq: route.params.slug,
        },
    },
})

if (!data.value || data.value?.textPages?.data.length === 0) throw createError({
    statusCode: 404,
    fatal: true,
    message: 'Страница не найдена'
})

var MDLinkAttrsPlugin = (vueMarkdownItInstance: MarkdownIt) => {
    vueMarkdownItInstance.use(MDLinkAttrs, {
        attrs: {
            rel: 'nofollow'
        }
    })
}
var plugins = [MDLinkAttrsPlugin]

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
console.log(data.value.textPages.data[0].attributes.seo)
useSeo(data.value.textPages.data[0].attributes.title ?? 'Для пациентов', data.value?.textPages.data?.[0].attributes.seo)
</script>

<template>
    <div class="vertical-padding customer-page bg-white">
        <div class="container mx-auto" v-if="data.textPages.data.length">
            <BreadCrumbs :list="breadCrumbs" is-dark class="mb-7 lg:mb-[3.75rem]" />
            <h1 class="h2 mb-10 lg:mb-[3.75rem] text-accent font-serif">
                {{ data.textPages.data[0].attributes.title }}
            </h1>
            <section class="content text-accent">
                <vue-markdown :source="data.textPages.data[0].attributes.textRich" :plugins="plugins" :options="{

                }" />
            </section>
        </div>
    </div>
</template>

<style>
.customer-page .content li {
    @apply text-[1.125rem] lg:text-[1.375rem];
}

.customer-page .content a {
    color: hsla(213, 63%, 12%, 0.7);
    text-decoration: none;
}
</style>
