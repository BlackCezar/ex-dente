<script setup lang="ts">
import BreadCrumbs from '~/components/common/BreadCrumbs.vue'
import type { IBreadCrumb } from '~/types/global.type'
import type { SalePage } from '~/types/sales.type'
import RenderSlider from '~/components/common/RenderSlider.vue'
import RenderBlocks from '~/components/common/RenderBlocks.vue'

var route = useRoute()
var { salesPageQuery } = useQueries()
var variables = ref({
    filters: {
        slug: {
            eq: route.params.slug,
        },
    },
})

var { data } = await useAsyncQuery<SalePage>(salesPageQuery, variables.value)

if (!data.value || data.value?.promos?.data.length === 0) throw createError({
    statusCode: 404,
    fatal: true,
    message: 'Страница не найдена'
})


var breadCrumbs = markRaw<IBreadCrumb[]>([
    {
        path: '/',
        title: 'Главная',
    },
    {
        path: '/sales',
        title: 'Акции',
    },
    {
        path: '/sales/' + route.params.slug,
        title: data.value?.promos.data?.[0].attributes.title ?? '',
    },
])


useSeo(data.value.promos.data[0].attributes.title ?? 'Акция', data.value.promos.data[0].attributes.seo)
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
                class="flex gap-6 lg:gap-12 flex-col lg:flex-row justify-between"
            >
                <NewsPageAvatar
                    :avatar="data.promos.data[0].attributes.image"
                />
                <article class="ml-auto max-w-[62rem]">
                    <h1
                        class="mb-6 text-[1.75rem] font-semibold font-serif lg:text-[3rem]"
                    >
                        {{ data.promos.data[0].attributes.title }}
                    </h1>
                    <h2
                        class="text-[1.125rem] text-opacity-60 text-accent mb-6 lg:mb-7 lg:text-[1.75rem]"
                    >
                        {{ data.promos.data[0].attributes.subtitle }}
                    </h2>
                    <section class="content mb-10 lg:mb-[3.75rem]">
                        <RenderBlocks
                            :text="data.promos.data[0].attributes.description"
                        />
                    </section>
                    <UiButton class="!w-full lg:!w-auto" @click="useEvent('call:callBackForm')" variant="primary">Записаться на прием</UiButton>
                </article>
            </div>
        </div>
    </div>
</template>

<style scoped></style>
