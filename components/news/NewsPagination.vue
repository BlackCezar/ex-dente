<script setup lang="ts">
import LeftButton from '~/components/ui/LeftButton.vue'
import RightButton from '~/components/ui/RightButton.vue'

defineProps<{
    swiper: any
}>()
</script>

<template>
    <div class="flex justify-center lg:justify-end">
        <LeftButton @click="swiper.slidePrev(300)" is-light />
        <RightButton @click="swiper.slideNext(300)" is-light />
    </div>
</template>

<style scoped></style>
