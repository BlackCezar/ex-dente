<script setup lang="ts">
import BreadCrumbs from '~/components/common/BreadCrumbs.vue'
import type { IBreadCrumb } from '~/types/global.type'
import type { ServicePage } from '~/types/services.type'
import RenderBlocks from '~/components/common/RenderBlocks.vue'
import DirectionsList from '~/components/common/DirectionsList.vue'

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


useSeo(data.value.services.data[0].attributes.title ?? 'Услуги', data.value.services.data[0].attributes.seo)
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
                <DirectionsList
                    title="Направления"
                    :parent="route.params.slug"
                    :list="data.services.data[0].attributes.sub_services.data"
                />
            </div>
            <ServicesDoctorsScreen
                :list="data.services.data[0].attributes.doctors.data"
            />
        </div>
    </div>
</template>

<style scoped></style>
