<script setup lang="ts">
import BreadCrumbs from '~/components/common/BreadCrumbs.vue'
import type { ContactPage, IBreadCrumb, IClinic } from '~/types/global.type'
import useQueries from '~/composables/useQueries'
import LegalInfo from '~/components/common/LegalInfo.vue'
import {
    YandexMap,
    YandexMapDefaultFeaturesLayer,
    YandexMapDefaultSchemeLayer,
    YandexMapEntity,
    YandexMapMarker,
} from 'vue-yandex-maps'
import {VueYandexMaps} from 'vue-yandex-maps'
import type { YMap } from '@yandex/ymaps3-types'
import RenderBlocks from '~/components/common/RenderBlocks.vue'

var isLoading = ref(true)
var breadCrumbs = markRaw<IBreadCrumb[]>([
    {
        path: '/',
        title: 'Главная',
    },
    {
        path: '/contacts',
        title: 'Контакты',
    },
])

var { contactsPageQuery } = useQueries()
var { data } = await useAsyncQuery<ContactPage>(contactsPageQuery)

function transformCoords(coords: string): number[] {
    return coords
        .split(',')
        .map((item) => parseFloat(item))
        .reverse()
}

var activeClinic = ref<IClinic | null>(null)
var map = shallowRef<null | YMap>(null)

function selectClinic(clinic: IClinic) {
    if (map.value) {
        map.value.setLocation({
            center: transformCoords(clinic.attributes.coordinates),
            zoom: 15,
            duration: 400,
        })
    }
    activeClinic.value = clinic
}

var config = useAppConfig()

watch(VueYandexMaps.loadStatus, (val) => {
    if (val === 'loaded') isLoading.value = false
})

useHead({
    title: 'Контакты'
})
</script>

<template>
    <div class="vertical-padding bg-white">
        <div
            class="container mx-auto"
            v-if="data?.contactPage?.data?.attributes"
        >
            <BreadCrumbs
                is-dark
                :list="breadCrumbs"
                class="lg:mb-[3.75rem] mb-7"
            />
            <h1 class="h2 lg:h1 text-accent mb-8 lg:mb-[5rem] !font-serif">
                {{ data.contactPage.data.attributes.title ?? 'Контакты' }}
            </h1>
            <div class="mb-16 lg:mb-[7.5rem]">
                <div class="relative">
                    <yandex-map
                        v-model="map"
                        class="ymaps"
                        :settings="{
                            location: {
                                center: [92.869, 56.021],
                                zoom: 12,
                            },
                        }"
                    >
                        <yandex-map-default-scheme-layer />
                        <yandex-map-default-features-layer />
                        <yandex-map-entity>
                            <div class="map-list">
                                <div class="map-list-inner flex flex-col">
                                    <section
                                        class="px-7 font-serif h4 pt-[2.75rem] pb-8 lg:block hidden"
                                    >
                                        Филиалы exellentDENT
                                    </section>
                                    <div
                                        class="flex flex-col overflow-y-auto max-h-auto"
                                    >
                                        <article
                                            v-for="item of data.contactPage.data
                                                .attributes.clinics.data"
                                            :key="item.id"
                                            class="px-5 lg:pl-7 lg:pr-8 lg:rounded-[0.375rem] py-8 lg:flex flex-col gap-1 cursor-pointer hover:bg-secondary transition-colors"
                                            :class="{
                                                'lg:bg-secondary-before':
                                                    item.id ===
                                                    activeClinic?.id,
                                                'bg-white hidden':
                                                    item.id !==
                                                    activeClinic?.id,
                                            }"
                                            @click="selectClinic(item)"
                                        >
                                            <address
                                                class="not-italic text-accent text-opacity-70 lg:text-[1.375rem]"
                                            >
                                                {{ item.attributes.address }}
                                            </address>
                                            <div v-if="item.attributes.phone" class="phone-blocks text-accent text-opacity-50 lg:text-[1.125rem]">
                                                <RenderBlocks :text="item.attributes.phone" />
                                            </div>
                                        </article>
                                    </div>
                                </div>
                            </div>
                        </yandex-map-entity>
                        <template
                            v-for="clinic of data.contactPage.data.attributes
                                .clinics.data"
                            :key="clinic.id"
                        >
                            <yandex-map-marker
                                :settings="{
                                    coordinates: transformCoords(
                                        clinic.attributes.coordinates,
                                    ),
                                    id: clinic.id,
                                }"
                            >
                                <div
                                    @click="selectClinic(clinic)"
                                    class="marker"
                                    :class="{
                                        active: activeClinic?.id === clinic.id,
                                    }"
                                ></div>
                            </yandex-map-marker>
                        </template>
                    </yandex-map>
                    <Transition name="fade" >
                        <div v-if="isLoading" class="absolute bg-white left-0 top-0 w-full h-full flex items-center justify-center">
                            <UiPageSpinner />
                        </div>
                    </Transition>
                </div>
            </div>
            <div class="mb-[4.5rem] lg:mb-[7.5rem]">
                <div class="flex flex-col lg:gap-y-16 gap-y-[3.75rem]">
                    <div
                        v-for="item of data.contactPage.data.attributes.clinics
                            .data"
                        :key="item.id"
                        class="grid text-accent lg:gap-10 gap-4 grid-cols-1 lg:grid-cols-5"
                    >
                        <section
                            class="h4 mb-1 lg:flex lg:flex-col lg:mb-0 lg:col-start-1 lg:col-end-2 font-serif lg:font-sans lg:text-[1.375rem] lg:leading-[2.25rem]"
                        >
                            <span>
                                {{ item.attributes.address }}
                            </span>
                            <span v-if="item.attributes.busStation" class="text-base font-sans">Автобусная остановка: {{ item.attributes.busStation }}</span>
                        </section>
                        <section
                            v-if="item.attributes.phone"
                            class="lg:col-start-2 lg:col-end-3 flex flex-col gap-1"
                        >
                            <span
                                class="lg:hidden text-accent text-[0.875rem] text-opacity-50"
                                >Телефон</span
                            >
                            <div class="phone-blocks lg:text-[1.375rem]" v-if="item.attributes.phone">
                                <RenderBlocks :text="item.attributes.phone" />
                            </div>
                        </section>
                        <section
                            v-if="item.attributes.email"
                            class="lg:col-start-4 lg:col-end-5 flex flex-col gap-1"
                        >
                            <span
                                class="lg:hidden text-accent text-[0.875rem] text-opacity-50"
                                >Почта</span
                            >
                            <a
                                class="lg:text-[1.375rem]"
                                :href="'mailto:' + item.attributes.email"
                                >{{ item.attributes.email }}</a
                            >
                        </section>
                        <section
                            class="lg:col-start-3 lg:col-end-4 mb-4 lg:mb-0 lg:row-start-1 flex flex-col gap-1"
                        >
                            <span
                                class="lg:hidden text-accent text-[0.875rem] text-opacity-50"
                                >Режим работы</span
                            >
                            <div class="content" v-if="item.attributes.workingHours">
                                <RenderBlocks
                                    :text="item.attributes.workingHours"
                                ></RenderBlocks>
                            </div>
                        </section>
                        <section class="lg:col-start-5">
                            <nav class="">
                                <ul class="flex gap-3">
                                    <li v-for="link of item.attributes.socials">
                                        <a
                                            :href="link.url"
                                            :title="link.label"
                                            class="w-10 h-10 hover:bg-secondary transition-colors rounded-[0.5rem] flex items-center justify-center bg-secondary-before"
                                        >
                                            <img
                                                class="grayscale contrast-200 invert"
                                                :src="
                                                    config.assetsUri +
                                                    link.icon.data?.[0]?.attributes?.url
                                                "
                                            />
                                        </a>
                                    </li>
                                </ul>
                            </nav>
                        </section>
                    </div>
                </div>
            </div>
            <LegalInfo :info="data?.contactPage?.data?.attributes?.legalInfo" />
        </div>
    </div>
</template>

<style scoped>
.ymaps {
    @apply lg:aspect-[107/48] aspect-[20/35] w-full h-full;
}

.marker {
    @apply w-9 lg:w-[4.25rem] cursor-pointer h-9 lg:h-[4.25rem] transition-all;
    background-image: url(~/assets/imgs/marker.svg);
    background-repeat: no-repeat;
    background-size: cover;
    transform: translate(-50%, -100%);
    background-position: center;
}

.marker.active {
    @apply w-16 h-16 lg:h-[7.25rem] lg:w-[7.25rem];
}

.map-list {
    @apply w-[calc(100%_-_2rem)] lg:w-[26%] lg:pb-24 lg:h-full block absolute left-4 lg:left-12 top-auto bottom-4 lg:bottom-auto lg:top-12;
}

.map-list-inner {
    @apply w-full h-full bg-white lg:p-4 rounded-[0.25rem] lg:rounded-[0.375rem] overflow-hidden;
}


.phone-blocks p {
    display: inline-block;
}
</style>
