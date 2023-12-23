<script setup lang="ts">
defineProps<{
    swiper: any
}>()
</script>

<template>
    <div class="flex justify-center lg:justify-end">
        <button type="button" @click="swiper.slidePrev(300)">
            <svgo-pagination-left
                filled
                class="text-[3.5rem] svgo-pagination-left hover:text-opacity-100 text-opacity-60 lg:text-[5rem]"
            />
        </button>
        <button type="button" @click="swiper.slideNext(300)">
            <svgo-pagination-right
                filled
                class="text-[3.5rem] svgo-pagination-right hover:text-opacity-100 text-opacity-60 lg:text-[5rem]"
            />
        </button>
    </div>
</template>

<style scoped></style>
