<script setup lang="ts">
import type { ServiceItem } from '~/types/services.type'

defineProps<{
    title: string
    parent: string
    list: ServiceItem['attributes']['sub_services']['data']
}>()
</script>

<template>
    <div
        class="directions-list max-w-[34rem] lg:min-w-[25rem]"
        v-if="list.length"
    >
        <h3
            class="h3 mb-6 text-accent lg:mb-8 lg:text-[1.75rem] font-serif lg:font-normal"
        >
            {{ title }}
        </h3>
        <nav>
            <ul class="flex flex-col gap-4 lg:gap-6">
                <li v-for="item of list" :key="item.id">
                    <nuxt-link
                        class="pl-5 lg:pr-8 lg:pl-7 py-3 pr-4 rounded-[0.25rem] lg:rounded-[0.375rem] hover:bg-secondary-before transition-colors bg-gray flex items-center justify-between gap-4"
                        :to="`/services/${parent}/${item.attributes.slug}`"
                    >
                        <span
                            class="lg:text-[1.375rem] text-accent text-opacity-70"
                        >
                            {{ item.attributes.title }}
                        </span>
                        <svgo-arrow-right filled class="text-[1.5rem]" />
                    </nuxt-link>
                </li>
            </ul>
        </nav>
    </div>
</template>

<style scoped>
.directions-list ul {
    @apply pl-0 mb-0;
}

.directions-list li {
    @apply list-none;
}

.directions-list li a {
    @apply no-underline;
}
</style>
