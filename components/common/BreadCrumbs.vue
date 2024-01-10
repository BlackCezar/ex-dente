<script setup lang="ts">
import type { IBreadCrumb } from '~/types/global.type'
import { useJsonld } from '#jsonld'

var props = defineProps<{
    list: IBreadCrumb[]
    isDark?: boolean
}>()

var scrollContainer = ref<HTMLOListElement | null>(null)

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

function onScroll(ev: Event) {
    if (scrollContainer.value)
        scrollContainer.value.classList.add('scroll-blur')
}
function onScrollEnd(ev: Event) {
    if (
        scrollContainer.value &&
        scrollContainer.value?.children[0].scrollWidth -
            scrollContainer.value?.children[0].clientWidth ===
            scrollContainer.value?.children[0].scrollLeft
    )
        scrollContainer.value.classList.remove('scroll-blur')
}
</script>

<template>
    <nav
        class="breadcrumbs scroll-blur"
        :class="{
            'is-dark': isDark,
        }"
        ref="scrollContainer"
    >
        <ol
            class="overflow-x-auto lg:flex lg:flex-wrap"
            @scroll="onScroll"
            @scrollend="onScrollEnd"
        >
            <li v-for="(item, index) of list" :key="item.path">
                <nuxt-link class="whitespace-nowrap" :to="item.path">{{
                    item.title
                }}</nuxt-link>
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
    @apply text-opacity-40 text-white lowercase;
}
.breadcrumbs.is-dark li a {
    @apply text-accent text-opacity-40 lowercase;
}
.breadcrumbs li a::first-letter {
    text-transform: capitalize;
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

.breadcrumbs {
    position: relative;
}
@media (min-width: 1024px) {
    .breadcrumbs::after {
        display: none;
    }
}
.breadcrumbs::after {
    content: '';
    position: absolute;
    right: -4px;
    top: 0;
    background: linear-gradient(
        270deg,
        #0b1c31 11.84%,
        rgba(11, 28, 49, 0) 100%
    );
    width: 20%;
    height: 100%;
    opacity: 0;
    transition: opacity 0.2s ease-out;
}
body:has(.header-wrapper[data-light='true']) .breadcrumbs::after {
    background: linear-gradient(270deg, white 11.84%, white 100%);
}
.scroll-blur::after {
    opacity: 1;
}
</style>
