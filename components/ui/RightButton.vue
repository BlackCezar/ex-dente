<script setup lang="ts">
import type { ButtonHTMLAttributes } from 'vue'

defineProps<{
    disabled?: ButtonHTMLAttributes['disabled']
    type?: ButtonHTMLAttributes['type']
    isLight?: boolean
}>()
</script>

<template>
    <button type="button" class="group" :disabled="disabled">
        <svgo-pagination-right
            filled
            :class="{
                'text-white': isLight,
                'text-accent': !isLight,
            }"
            class="text-[3.5rem] group-disabled:text-opacity-20 svgo-pagination-right hover:text-opacity-100 text-opacity-60 lg:text-[5rem]"
        />
    </button>
</template>

<style>
.nuxt-icon.svgo-pagination-right {
    margin-bottom: 0 !important;
}
.svgo-pagination-right path {
    @apply transition-transform;
    transform-origin: center;
}
.svgo-pagination-right:hover path:first-child {
    transform: rotate(180deg);
}
.svgo-pagination-right:active path:last-child {
    transform: translateX(10px);
}
</style>
