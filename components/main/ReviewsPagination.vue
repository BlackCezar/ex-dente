<script setup lang="ts">
import LeftButton from '~/components/ui/LeftButton.vue'
import RightButton from '~/components/ui/RightButton.vue'

defineProps<{
    swiper: any
}>()
</script>

<template>
    <div class="text-white">
        <LeftButton @click="swiper.slidePrev(300)" />
        <RightButton @click="swiper.slideNext(300)" />
    </div>
</template>

<style scoped></style>
