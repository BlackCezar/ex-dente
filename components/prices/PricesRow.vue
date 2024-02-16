<script setup lang="ts">
import type { PriceSectionEntity } from '~/types/global.type';

defineProps<{
    item: PriceSectionEntity
}>()
</script>
<template>
        <details class="cursor-pointer">
            <summary
                class="bg-secondary-before flex p-4 lg:py-6 lg:px-10 gap-2"
            >
                <svgo-chevron-down
                    class="arrow-down text-[1.5rem] lg:text-[2rem]"
                    filled
                />
                <svgo-chevron-left
                    class="arrow-left text-[1.5rem] lg:text-[2rem]"
                    filled
                />
                <span
                    class="lg:text-[1.375rem] text-accent lg:leading-[2.25rem]"
                >
                    {{ item.attributes.label }}
                </span>
            </summary>
            <div>
                <div
                    v-for="subItem of item.attributes.price"
                    :key="subItem.id"
                    class="flex justify-between gap-4 p-4 lg:px-10 price-row"
                >
                    <p class="lg:text-[1.375rem]">
                        {{ subItem.description }}
                    </p>
                    <span class="lg:text-[1.375rem]">{{
                        new Intl.NumberFormat('ru-RU', {
                            style: 'currency',
                            currency: 'RUB',
                            maximumFractionDigits: 0,
                        }).format(subItem.price)
                    }}</span>
                </div>
            </div>
        </details>
</template>
<style scoped>
details summary {
    transition: margin 150ms ease-out;
}

details[open] summary {
    cursor: pointer;
    margin-bottom: 12px;
}

details .arrow-left {
    display: none;
}

details[open] .arrow-left {
    display: block;
}

details[open] .arrow-down {
    display: none;
}
</style>