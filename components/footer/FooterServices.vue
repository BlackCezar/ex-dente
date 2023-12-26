<script setup lang="ts">
import { useGlobalStore } from '~/store/global.store'
import { storeToRefs } from '#imports'

var globalStore = useGlobalStore()
var { services } = storeToRefs(globalStore)
</script>

<template>
    <div>
        <nav>
            <ul>
                <li>
                    <nuxt-link
                        class="footer-main-link mx-auto text-center lg:text-left"
                        to="/services"
                        >Направления</nuxt-link
                    >
                </li>
            </ul>
            <ul class="columns-1 lg:columns-2 lg:gap-x-[2.87rem]">
                <li
                    v-for="service of services"
                    class="mb-4 lg:mb-5"
                    :key="service.id"
                >
                    <nuxt-link
                        class="text-[0.875rem] lg:text-left lg:text-[1.125rem] text-white block text-opacity-80 text-center uppercase"
                        :to="`/services/${service.attributes.slug}`"
                        >{{ service.attributes.title }}</nuxt-link
                    >
                </li>
            </ul>
        </nav>
    </div>
</template>

<style scoped></style>
