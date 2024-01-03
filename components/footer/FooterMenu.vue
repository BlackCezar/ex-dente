<script setup lang="ts">
import { useGlobalStore } from '~/store/global.store'
import { storeToRefs } from '#imports'

var globalStore = useGlobalStore()
var { mainMenu } = storeToRefs(globalStore)
</script>

<template>
    <div>
        <nav>
            <ul class="flex items-center lg:items-start flex-col gap-4 lg:gap-5">
                <li class="-mb-4 lg:-mb-5">
                    <nuxt-link
                        class="footer-main-link mx-auto text-center lg:text-left"
                        to="#menu"
                        >Меню</nuxt-link
                    >
                </li>
                <template
                    v-for="link of mainMenu?.menuTest?.data.attributes.body"
                >
                    <li
                        role="menuitem"
                        v-if="link?.__typename === 'ComponentMenuLink'"
                    >
                        <nuxt-link class="text-[0.875rem] lg:text-[1.125rem] uppercase text-white text-opacity-80" :to="link.url">{{ link.label }}</nuxt-link>
                    </li>
                    <template
                        v-else-if="link.__typename === 'ComponentMenuDropdown'"
                    >
                        <template v-for="section of link.sections?.data">
                            <li
                                role="menuitem"
                                class="hidden group cursor-pointer relative lg:flex whitespace-nowrap items-center gap-2"
                            >
                                <span class="text-white uppercase text-opacity-80">
                                    {{ section.attributes.label }}
                                </span>
                                <svgo-chevron-down class="text-[1.5rem] -rotate-90 !mb-0 text-white text-opacity-80" />

                                <nav
                                    class="bg-white before:absolute before:w-full before:h-full before:-left-4 before:z-0 before:-top-8 hidden group-hover:block absolute z-10 top-[calc(100%_+_1rem)] max-w-[25rem]"
                                >
                                    <ul
                                        class="px-8 py-10 flex relative z-10 flex-col gap-8"
                                    >
                                        <li
                                            v-for="link of section.attributes
                                                ?.links"
                                        >
                                            <nuxt-link
                                                class="text-accent-half  hover:text-accent transition-colors gap-2 flex justify-between items-center"
                                                :to="link.url"
                                            >
                                                <span class="text-[1.375rem] leading-[1.75rem] uppercase">{{ link.label }}</span>
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
                                class="lg:hidden text-[0.875rem] uppercase text-white  text-opacity-80"
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
    </div>
</template>

<style scoped></style>
