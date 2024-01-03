<script setup lang="ts">
import type { ComponentTextBenefit } from '~/types/global.type'
import { useJsonld } from '#jsonld'

var props = defineProps<{
    list: ComponentTextBenefit[]
}>()

useJsonld(() => ({
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Наши преимущества',
    itemListElement: props.list.map((item, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        name: item.title,
        description: item.text,
    })),
}))
</script>

<template>
    <div class="pb-10 pt-[3.75rem] lg:pt-[10rem] lg:pb-[12.5rem]">
        <div
            class="container grid grid-cols-1 lg:gap-[9rem] lg:grid-cols-[1fr_2fr] gap-8"
        >
            <h2
                class="font-semibold text-accent lg:text-[3rem] text-[1.75rem] font-[Mignon]"
            >
                Наши преимущества
            </h2>
            <div class="flex flex-col gap-7 lg:gap-[7.5rem]">
                <article
                    v-for="item of list"
                    :key="item.id"
                    class="flex flex-col gap-3 lg:gap-4"
                >
                    <h2
                        class="font-[Mignon] lg:text-[1.75rem] lg:leading-[2.5rem] lg:font-normal leading-[1.5rem] text-[1.125rem] text-accent font-medium"
                    >
                        {{ item.title }}
                    </h2>
                    <p
                        class="text-accent lg:text-[1.375rem] text-opacity-70 leading-[1.5rem] lg:leading-[2.25rem]"
                    >
                        {{ item.text }}
                    </p>
                </article>
            </div>
        </div>
    </div>
</template>

<style scoped></style>
