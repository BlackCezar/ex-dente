<script setup lang="ts">
import useQueries from '~/composables/useQueries'
import HeaderLogo from '~/components/common/header/HeaderLogo.vue'
import type { Header } from '~/types/global.type'
import { useGlobalStore } from '~/store/global.store'
import { storeToRefs } from 'pinia'
import SearchForm from '~/components/forms/SearchForm.vue'

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
var isShowSearch = ref(false)
var headerWrapper = ref<HTMLDivElement | null>(null)

useListen('call:callBackForm', () => {
    isLight.value = true;
})

useListen('close:callBackForm', () => {
    isLight.value =
        !!headerWrapper.value?.nextElementSibling?.classList.contains(
            'bg-white',
        )
})


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
        
        isOpen.value = false;
        closeSearch()
    },
)
watch(
    () => isOpen.value,
    () => {
        if (isOpen.value) isLight.value = true
        else {
            isLight.value =
                !!headerWrapper.value?.nextElementSibling?.classList.contains(
                    'bg-white',
                )
        }
    },
)

function buttonHandle(button) {
    isOpen.value = false;
    useEvent(button.url);
    if (button.url.startsWith('call:')) {
        // nextTick(() => {
        //     isLight.value = true;
        // })
    }
}

function openSearch() {
    isShowSearch.value = true;
    isLight.value = true;
    useEvent('call:searchOpen')
}

function closeSearch() {
    isShowSearch.value = false;
    isLight.value =
                !!headerWrapper.value?.nextElementSibling?.classList.contains(
                    'bg-white',
                )
}

function handleIndex() {
    isOpen.value = false;
    closeSearch()
    useEvent('close:callBackForm')
}

</script>

<template>
    <div
        ref="headerWrapper"
        class="header-wrapper container left-0 lg:left-1/2 lg:-translate-x-1/2 z-50 top-0"
        :data-open="isOpen"
        :data-light="isLight"
    >
        <div
            class="py-4 relative z-10 flex h-fit items-center header justify-end gap-3 lg:gap-12"
        >
            <HeaderLogo @click.native="handleIndex" :light="isLight" />

            <a
                :href="`tel:${phoneNumber}`"
                class="ml-auto hidden lg:block text-[1.125rem]"
            >
                <span>{{ phoneNumber }}</span></a
            >
            <button @click="openSearch" class="ml-auto lg:hidden w-9 h-9 text-4xl">
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
                v-for="button of header?.header?.data?.attributes.request_button"
            >
                <UiButton
                    class="hidden lg:grid h-12 !bg-transparent"
                    :mode="isLight ? 'dark' : 'light'"
                    @click="buttonHandle(button)"
                    variant="secondary"
                    >{{ button.label }} </UiButton
                >
            </template>
        </div>
        <div class="header-list z-10 relative lg:flex-row items-center flex flex-col gap-9">
            <template
                v-for="button of header?.header?.data?.attributes.request_button"
            >
                <UiButton
                    full
                    class="h-12 lg:hidden"
                    @click="buttonHandle(button)"
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
                                    <nuxt-link v-if="section.attributes.url" :to="section.attributes.url">{{ section.attributes.label }}</nuxt-link>
                                    <span v-else>
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
                class="mt-1 lg:ml-auto w-full flex flex-col lg:flex-row gap-3 lg:gap-5 lg:pb-4 lg:mt-0 pb-12 items-start lg:justify-end"
            >
                <a
                    :href="`tel:${phoneNumber}`"
                    class="flex gap-3 items-center lg:hidden"
                    ><svgo-phone class="text-[1.75rem]" />
                    <span>{{ phoneNumber }}</span></a
                >
                <button @click="openSearch" class="hidden lg:block text-[2rem]">
                    <svgo-search />
                </button>
                <a href="#" class="flex gap-3 items-center bvi-open">
                    <svgo-eye class="text-[1.75rem] lg:text-[2rem]" />
                    <span class="lg:hidden">Версия для слабовидящих</span>
                </a>
            </div>
        </div>
        <Transition
        enter-active-class="duration-300 ease-out"
            enter-from-class="transform opacity-0 -translate-y-4"
            enter-to-class="opacity-100 translate-y-0"
            leave-active-class="duration-200 ease-in"
            leave-from-class="opacity-100 translate-y-0"
            leave-to-class="transform opacity-0 -translate-y-4">
            <div v-if="isShowSearch" class="bg-white h-full search-wrapper pt-[4.5rem] flex flex-col lg:pt-[8.3125rem]">
                <SearchForm />
                <div class="flex  search-close  justify-center pt-4 pb-10  lg:py-12">
                    <button @click="closeSearch" class=""><svgo-close filled class="text-accent text-[2.5rem] lg:text-[5rem]" /></button>
                </div>
            </div>
        </Transition>
    </div>
</template>

<style>
.search-wrapper {
    @apply w-full h-[100dvh] bg-white fixed left-0 top-0;
}

.header-wrapper {
    @apply grid absolute grid-rows-[4.5rem_0fr] lg:grid-rows-[auto_auto] transition-all overflow-hidden lg:overflow-visible text-white;
}
.header-wrapper[data-light='true'] {
    @apply text-accent ;
}
.header-wrapper .header {
    @apply transition-colors;
}
.header-wrapper[data-open='true'] {
    @apply bg-white grid-rows-[4.5rem_1fr] ;
}
.call-back-popup[data-open="true"] + .header-wrapper {
    @apply fixed;
}

.header-wrapper:has(.search-wrapper) {
    @apply fixed;
}

.header-wrapper[data-open='true'] {
    @apply text-accent text-opacity-80;
}

.header-list {
    @apply py-7 lg:py-4;

    max-height: unset;
    min-height: 0;
}
.header-wrapper[data-open='false'] .header-list {
    @apply py-0;
}
</style>
