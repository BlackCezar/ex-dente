<script setup lang="ts">
import BreadCrumbs from '~/components/common/BreadCrumbs.vue'
import type { IBreadCrumb, ServicesItem } from '~/types/global.type'
import { useGlobalStore } from '~/store/global.store'
import { storeToRefs } from '#imports'

var breadCrumbs = markRaw<IBreadCrumb[]>([
    {
        path: '/',
        title: 'Главная',
    },
    {
        path: '/services',
        title: 'Услуги',
    },
])

var globalStore = useGlobalStore()
const {mainServicePageQuery} = useQueries()
var {data} = await useAsyncQuery(mainServicePageQuery)
var { services } = storeToRefs(globalStore)

var activeService = ref<ServicesItem | null>(null)

function selectService(service: ServicesItem) {
    if (activeService.value) {
        if (activeService.value.id === service.id) activeService.value = null
        else activeService.value = service
    } else {
        activeService.value = service
    }
}


useSeo(data.value?.serviceListing?.data?.attributes?.title, data.value?.serviceListing?.data?.attributes?.seo)
</script>

<template>
    <div class="vertical-padding bg-white">
        <div class="container mx-auto">
            <BreadCrumbs
                is-dark
                :list="breadCrumbs"
                class="mb-[1.75rem] lg:mb-[3.75rem]"
            />
            <h1 class="h2 lg:mb-[4.5rem] mb-6 font-serif text-accent">
                {{data.serviceListing.data.attributes.title}}
            </h1>
            <div>
                <div class="hidden lg:grid grid-cols-2">
                    <nav>
                        <ul class="flex flex-col gap-8">
                            <li
                                v-for="service of services"
                                :key="service.id"
                                class="flex items-center transition-colors hover:text-opacity-100 text-[2.5rem] text-accent gap-5"
                                :class="{
                                    'text-opacity-100':
                                        activeService?.id === service.id,
                                    'text-opacity-50':
                                        activeService?.id !== service.id,
                                }"
                            >
                                <button
                                    type="button"
                                    class="text-left"
                                    @click="activeService = service"
                                >
                                    {{ service.attributes.title }}
                                </button>
                                <nuxt-link
                                    class="transition-opacity"
                                    :class="{
                                        'opacity-100':
                                            activeService?.id === service.id,
                                        'opacity-0':
                                            activeService?.id !== service.id,
                                    }"
                                    :to="'/services/' + service.attributes.slug"
                                >
                                    <svgo-arrow-right-bold filled />
                                </nuxt-link>
                            </li>
                        </ul>
                    </nav>
                    <div v-if="activeService">
                        <h2 class="text-[1.75rem] text-accent mb-5" v-if="activeService?.attributes.sub_services.data.length">
                            Направления
                        </h2>
                        <nav>
                            <ul class="flex flex-col gap-4">
                                <li
                                    v-for="subService of activeService
                                        .attributes.sub_services.data"
                                >
                                    <nuxt-link
                                        class="text-opacity-70 transition-colors hover:text-opacity-100 text-[1.375rem] text-accent"
                                        :to="`/services/${activeService.attributes.slug}/${subService.attributes.slug}`"
                                    >
                                        {{ subService.attributes.title }}
                                    </nuxt-link>
                                </li>
                            </ul>
                        </nav>
                    </div>
                </div>
                <nav class="lg:hidden">
                    <ul
                        v-for="service of services"
                        :key="service.id"
                        class="flex flex-col gap-3 transition-colors -ml-4 w-screen px-4"
                        :class="{
                            'bg-secondary-before  pb-3':
                                service.id === activeService?.id,
                        }"
                    >
                        <li
                            class="py-3"
                            :class="{
                                '-mb-3': service.id === activeService?.id,
                            }"
                        >
                            <button
                                type="button"
                                class="w-full flex items-center justify-between"
                                @click="selectService(service)"
                            >
                                <nuxt-link
                                    class="text-[1.125rem]"
                                    :to="`/services/${service.attributes.slug}`"
                                    >{{ service.attributes.title }}</nuxt-link
                                >
                                <svgo-plus
                                    v-if="activeService?.id === service.id"
                                />
                                <svgo-minus v-else />
                            </button>
                        </li>
                        <transition-group name="slide">
                            <template v-if="activeService?.id === service.id">
                                <template
                                    v-for="(subService, index) of service
                                        .attributes.sub_services.data"
                                    :key="subService.attributes.id"
                                >
                                    <li>
                                        <nuxt-link
                                            class="text-opacity-70 text-accent"
                                            :to="`/services/${subService.attributes.slug}`"
                                            >{{
                                                subService.attributes.title
                                            }}</nuxt-link
                                        >
                                    </li>
                                </template>
                            </template>
                        </transition-group>
                    </ul>
                </nav>
            </div>
        </div>
    </div>
</template>

<style>
.slide-enter {
    opacity: 0;
}
.slide-enter-active {
    animation: slide-in 0.3s ease-out forwards;
    transition: opacity 0.5s;
}

.slide-leave-active {
    animation: slide-out 0.3s ease-out forwards;
    transition: opacity 1s;
    opacity: 0;
    position: absolute;
}
.slide-move {
    transition: transform 1s;
}

@keyframes slide-in {
    from {
        transform: translateY(20px);
    }
    to {
        transform: translateY(0px);
    }
}

@keyframes slide-out {
    from {
        transform: translateY(0px);
    }
    to {
        transform: translateY(20px);
    }
}
</style>
