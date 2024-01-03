<script setup lang="ts">
import LeftButton from '~/components/ui/LeftButton.vue'
import RightButton from '~/components/ui/RightButton.vue'

var swiper = useSwiper()
</script>

<template>
    <div class="flex justify-center pt-5 lg:pt-10">
        <LeftButton @click="swiper.slidePrev(300)" />
        <RightButton @click="swiper.slideNext(300)" />
    </div>
</template>

<style scoped></style>
