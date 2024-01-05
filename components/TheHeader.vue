<script setup lang="ts">
import useQueries from '~/composables/useQueries'
import HeaderLogo from '~/components/common/header/HeaderLogo.vue'
import type { Header } from '~/types/global.type'
import { useGlobalStore } from '~/store/global.store'
import { storeToRefs } from 'pinia'

var { headerQuery } = useQueries()

var { data: header } = await useAsyncQuery<Header>(headerQuery)

var globalStore = useGlobalStore()
var { phoneNumber, mainMenu } = storeToRefs(globalStore)

var normalizedMainMenu = computed(
    () => mainMenu.value?.menuTest?.data?.attributes?.body ?? [],
)
var isOpen = ref(false)
var route = useRoute()
var isLight = ref(false)
var headerWrapper = ref<HTMLDivElement | null>(null)

onMounted(() => {
    isLight.value =
        !!headerWrapper.value?.nextElementSibling?.classList.contains(
            'bg-white',
        )
})

watch(
    () => route.path,
    () => {
        isLight.value =
            !!headerWrapper.value?.nextElementSibling?.classList.contains(
                'bg-white',
            )
    },
)
watchEffect(() => {
    if (!isLight.value) isLight.value = isOpen.value
})
</script>

<template>
    <div
        ref="headerWrapper"
        class="header-wrapper container absolute left-0 lg:left-1/2 lg:-translate-x-1/2 z-50 top-0"
        :data-open="isOpen"
        :data-light="isLight"
    >
        <div
            class="py-4 flex h-fit items-center header justify-end gap-3 lg:gap-12"
        >
            <HeaderLogo :light="isLight" />

            <a
                :href="`tel:${phoneNumber}`"
                class="ml-auto hidden lg:block text-[1.125rem]"
            >
                <span>{{ phoneNumber }}</span></a
            >
            <button class="ml-auto lg:hidden w-9 h-9 text-4xl">
                <svgo-search />
            </button>
            <button
                @click="isOpen = !isOpen"
                class="w-9 lg:hidden text-4xl h-9"
            >
                <svgo-menu v-if="!isOpen" />
                <svgo-close v-else />
            </button>
            <template
                v-for="button of header.header.data?.attributes.request_button"
            >
                <UiButton
                    class="hidden lg:grid h-12"
                    @click="useEvent(button.url)"
                    variant="secondary"
                    >{{ button.label }}</UiButton
                >
            </template>
        </div>
        <div
            class="header-list lg:flex-row py-7 lg:py-4 items-center flex flex-col gap-9"
        >
            <template
                v-for="button of header.header.data?.attributes.request_button"
            >
                <UiButton
                    full
                    class="h-12 lg:hidden"
                    @click="useEvent(button.url)"
                    :variant="button.style"
                    >{{ button.label }}</UiButton
                >
            </template>
            <nav>
                <ul
                    class="flex flex-col lg:gap-16 items-center lg:justify-start lg:flex-row gap-7 lg:text-[1.375rem] uppercase"
                >
                    <template
                        v-for="(item, index) of normalizedMainMenu"
                        :key="index"
                    >
                        <li
                            role="menuitem"
                            v-if="item.__typename === 'ComponentMenuLink'"
                        >
                            <nuxt-link :to="item.url">{{
                                item.label
                            }}</nuxt-link>
                        </li>
                        <template
                            v-else-if="
                                item.__typename === 'ComponentMenuDropdown'
                            "
                        >
                            <template v-for="section of item.sections?.data">
                                <li
                                    role="menuitem"
                                    class="hidden group cursor-pointer relative lg:flex whitespace-nowrap items-center gap-2"
                                >
                                    <span>
                                        {{ section.attributes.label }}
                                    </span>
                                    <svgo-chevron-down />

                                    <nav
                                        class="bg-white before:absolute before:w-full before:h-full before:-left-4 before:z-0 before:-top-8 hidden group-hover:block absolute z-10 top-[calc(100%_+_1rem)] max-w-[25rem]"
                                    >
                                        <ul
                                            class="px-8 py-10 flex relative z-10 flex-col gap-8"
                                        >
                                            <li
                                                v-for="link of section
                                                    .attributes?.links"
                                            >
                                                <nuxt-link
                                                    class="text-accent-half hover:text-accent transition-colors gap-2 flex justify-between items-center"
                                                    :to="link.url"
                                                >
                                                    <span>{{
                                                        link.label
                                                    }}</span>
                                                    <svgo-chevron-right
                                                        class="text-[1.5rem]"
                                                    />
                                                </nuxt-link>
                                            </li>
                                        </ul>
                                    </nav>
                                </li>
                                <li
                                    role="menuitem"
                                    v-for="link of section.attributes?.links"
                                    class="lg:hidden"
                                >
                                    <nuxt-link :to="link.url">{{
                                        link.label
                                    }}</nuxt-link>
                                </li>
                            </template>
                        </template>
                    </template>
                </ul>
            </nav>
            <div
                class="mt-1 lg:ml-auto w-full flex flex-col lg:flex-row gap-3 lg:gap-5 lg:pb-0 lg:mt-0 pb-12 items-start lg:justify-end"
            >
                <a
                    :href="`tel:${phoneNumber}`"
                    class="flex gap-3 items-center lg:hidden"
                    ><svgo-phone class="text-[1.75rem]" />
                    <span>{{ phoneNumber }}</span></a
                >
                <button class="hidden lg:block text-[2rem]">
                    <svgo-search />
                </button>
                <button class="flex gap-3 items-center">
                    <svgo-eye class="text-[1.75rem] lg:text-[2rem]" />
                    <span class="lg:hidden">Версия для слабовидящих</span>
                </button>
            </div>
        </div>
    </div>
</template>

<style>
.header-wrapper {
    @apply grid grid-rows-[4.5rem_0fr] lg:grid-rows-[auto_auto] transition-all overflow-hidden lg:overflow-visible text-white;
}
.header-wrapper[data-light='true'] {
    @apply text-accent;
}
.header-wrapper .header {
    @apply transition-colors;
}
.header-wrapper[data-open='true'] {
    @apply bg-white grid-rows-[4.5rem_1fr];
}

.header-wrapper[data-open='true'] {
    @apply text-accent text-opacity-80;
}

.header-list {
    max-height: unset;
    min-height: 0;
}
</style>
