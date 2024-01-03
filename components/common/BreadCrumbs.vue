<script setup lang="ts">
import type { IBreadCrumb } from '~/types/global.type'
import { useJsonld } from '#jsonld'

var props = defineProps<{
    list: IBreadCrumb[]
    isDark?: boolean
}>()

useJsonld(() => ({
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: props.list.map((item, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        name: item.title,
        item: item.path,
    })),
}))
</script>

<template>
    <nav
        class="breadcrumbs"
        :class="{
            'is-dark': isDark,
        }"
    >
        <ol>
            <li v-for="item of list" :key="item.path">
                <nuxt-link :to="item.path">{{ item.title }}</nuxt-link>
                <span>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        viewBox="0 0 16 16"
                        fill="none"
                    >
                        <g opacity="0.4">
                            <rect
                                width="14"
                                height="1"
                                transform="matrix(1 0 0 -1 1 9)"
                                fill="currentColor"
                            />
                        </g>
                    </svg>
                </span>
            </li>
        </ol>
    </nav>
</template>

<style>
.breadcrumbs ol {
    @apply flex flex-row items-center gap-3;
}
.breadcrumbs li {
    @apply flex flex-row items-center gap-3 text-[0.875rem] lg:text-[1.125rem] leading-[1.5rem];
}

.breadcrumbs li:last-child span {
    display: none;
}

.breadcrumbs li a {
    @apply text-opacity-40 text-white;
}
.breadcrumbs.is-dark li a {
    @apply text-accent text-opacity-40;
}
.breadcrumbs li a.router-link-active {
    @apply text-opacity-100;
}
.breadcrumbs svg {
    @apply text-white text-opacity-40;
}
.breadcrumbs.is-dark svg {
    @apply text-accent text-opacity-40;
}
</style>
