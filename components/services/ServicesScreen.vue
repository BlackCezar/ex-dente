<style scoped lang="css">
.snap-x::-webkit-scrollbar {
    display: none;
}
.snap-x {
    -ms-overflow-style: none;
    scrollbar-width: none;
}
</style>
<script setup lang="ts">
import type { ServicesItem } from '~/types/global.type'
import { useGlobalStore } from '~/store/global.store'

var globalStore = useGlobalStore()
var { services } = storeToRefs(globalStore)
var activeService = ref(services.value?.[0])

function toService(service: ServicesItem) {
    activeService.value = service
}
</script>
<template>
    <div class="bg-white pb-10 pt-[3.75rem] lg:py-[10rem]">
        <div class="container mx-auto">
            <div
                class="flex mb-6 lg:mb-[4.5rem] flex-col lg:items-center lg:gap-[8rem] lg:flex-row gap-5"
            >
                <h2
                    class="font-[Mignon] text-[1.5rem] lg:text-[2.5rem] font-semibold uppercase text-accent"
                >
                    Услуги
                </h2>
                <p
                    class="text-accent opacity-[0.5] lg:text-[1.125rem] lg:max-w-[34rem]"
                >
                    В своей работе мы используем передовые технологии, новейшее
                    оборудование и материалы
                </p>
            </div>
            <div class="grid gap-8 grid-cols-1 justify-start lg:grid-cols-2">
                <nav>
                    <ul
                        class="flex snap-mandatory gap-3 snap-x lg:items-start lg:flex-col lg:gap-8 overflow-x-auto"
                    >
                        <li
                            v-for="service of services"
                            :key="service.id"
                            class="snap-end lg:flex lg:items-center lg:gap-5"
                        >
                            <a
                                @click.prevent="toService(service)"
                                class="text-[1.125rem] h-full transition-colors hover:lg:text-opacity-100 lg:text-left lg:text-[2.5rem] lg:px-0 flex items-center justify-center text-center lg:bg-transparent text-[#0B1C31] rounded-[0.25rem] px-5 py-2"
                                :href="`/services/${service.attributes.slug}`"
                                :class="{
                                    'text-opacity-100 bg-[#A7D6E9CC] ':
                                        service.id === activeService?.id,
                                    'text-opacity-70 bg-[#F0F1F2]':
                                        service.id !== activeService?.id,
                                }"
                            >
                                {{ service.attributes.title }}
                            </a>
                            <a
                                v-if="service.id === activeService?.id"
                                class="hidden lg:block lg:text-[2.5rem]"
                                :href="`/services/${service.attributes.slug}`"
                            >
                                <svgo-arrow-right-bold filled />
                            </a>
                        </li>
                    </ul>
                </nav>
                <div class="block h-full">
                <div class="sticky top-4">
                    <div class="flex flex-col-reverse lg:flex-col">
                        <UiButton
                            variant="primary"
                            mode="light"
                            class="!w-full lg:!w-fit"
                            @click="useEvent('scroll:callBack')"
                            >Записаться на прием</UiButton
                        >
                        <nav
                            class="mb-8 lg:mb-0 lg:mt-14"
                            v-if="
                                activeService?.attributes?.sub_services.data.length
                            "
                        >
                            <ul class="flex flex-col gap-3 lg:gap-4">
                                <li class="hidden lg:block lg:mb-1">
                                    <a
                                        href="#subServices"
                                        class="text-accent text-[1.75rem]"
                                        >Направления</a
                                    >
                                </li>
                                <li
                                    v-for="service of activeService?.attributes
                                        .sub_services.data"
                                        class="sub-service"
                                >
                                    <a
                                        class="text-opacity-70  hover:text-opacity-100 text-[1.125rem] lg:text-[1.375rem] text-[#0B1C31]"
                                        :href="`/services/${activeService?.attributes.slug}/${service.attributes.slug}`"
                                        >
                                        <span class="uppercase">{{service.attributes?.title?.[0] ?? ''}}</span>
                                        <span class="lowercase">{{ service.attributes?.title?.slice(1) ?? '' }}</span></a
                                    >
                                </li>
                            </ul>
                        </nav>
                    </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
