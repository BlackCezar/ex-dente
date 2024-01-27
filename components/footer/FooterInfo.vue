<script setup lang="ts">
import type { Socials } from '~/types/global.type'

defineProps<{
    socials: Socials
    copyright?: string
}>()

var appConfig = useAppConfig()
</script>

<template>
    <div class="flex flex-col items-center lg:items-start row-start-4 lg:row-start-1">
        <FooterLogo class="order-2 lg:order-1 mb-4 lg:mb-7" />
        <section
            class="text-[0.875rem] text-center lg:text-left order-3 lg:mb-7 lg:order-2 text-opacity-50 text-white lg:text-base"
        >
            {{ copyright }}
        </section>
        <nav class="order-1 lg:order-3 mb-10 lg:mb-0">
            <ul class="flex gap-4">
                <li
                    v-for="social of socials?.socialNetworkSection.data
                        .attributes.socialNetwork"
                    :key="social.id"
                >
                    <a
                        v-if="social?.url"
                        :href="social.url"
                        class="bg-[#F0F1F2] hover:bg-[#CBE6F1CC] active:bg-[#A7D6E9CC] transition-colors rounded-[0.25rem] p-2 flex items-center justify-center w-10 h-10"
                    >
                        <template
                            v-for="img of social.icon.data"
                            :key="img.attributes.url"
                        >
                            <img
                                :src="`${appConfig.assetsUri}${img.attributes.url}`"
                                :alt="img.attributes.alternativeText"
                                :title="img.attributes.caption"
                            />
                        </template>
                    </a>
                </li>
            </ul>
        </nav>
    </div>
</template>

<style scoped></style>
