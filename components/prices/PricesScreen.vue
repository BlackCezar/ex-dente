<script setup lang="ts">
import type { PriceSectionEntity } from '~/types/global.type'
import PriceRow from './PricesRow.vue'

defineProps<{
    list: PriceSectionEntity[]
}>()
</script>

<template>
    <h2
        class="font-serif px-4 text-[1.25rem] mb-5 font-semibold uppercase lg:mb-12 lg:text-[2.5rem] text-accent"
    >
        цены
    </h2>
    <div class="flex flex-col gap-3 pb-[3.75rem] lg:pb-[8.75rem]">
        <template v-for="item of list" :key="item.id">
            <PriceRow :item="item" />
        </template>
    </div>
</template>

<style>
.price-row:nth-child(even) {
    @apply bg-gray text-accent;
}
</style>
