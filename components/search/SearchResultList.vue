<script setup lang="ts">
defineProps<{
    title: string
    list: {
        label: string
        path: string
    }[]
}>()
</script>
<template>
    <article class="">
        <section class="font-[Mignon] text-[1.75rem] lg:mb-8 mb-5 text-accent text-opacity-70">{{ title }}</section>
        <ul class="flex flex-col gap-4 lg:gap-6">
            <li v-for="item of list" :key="item.path">
                <nuxt-link :to="item.path" class="flex hover:bg-secondary-before active:bg-secondary transition-colors items-center justify-between gap-2 rounded-[0.375rem] py-4 lg:py-8 lg:pl-7 lg:pr-8 pl-4 pr-3 bg-gray">
                    <span class="text-opacity-70 lg:text-[1.375rem] text-accent">{{ item.label }}</span>
                    <svgo-arrow-right filled class="text-[1.5rem] lg:text-[2rem]" />    
                </nuxt-link>
            </li>
        </ul>
    </article>
</template>