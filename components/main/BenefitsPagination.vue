<script setup lang="ts">
import LeftButton from '~/components/ui/LeftButton.vue'
import RightButton from '~/components/ui/RightButton.vue'

var swiper = useSwiper()
</script>

<template>
    <div class="flex justify-center lg:justify-end lg:pt-0 pt-5 lg:pb-4">
        <LeftButton @click="swiper.slidePrev(300)" />
        <RightButton @click="swiper.slideNext(300)" />
    </div>
</template>

<style scoped></style>
