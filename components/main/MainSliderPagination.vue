<script setup lang="ts">
import RightButton from '~/components/ui/RightButton.vue'
import LeftButton from '~/components/ui/LeftButton.vue'

defineProps<{
    length: number
}>()
const slider = useSwiper()
const activeIndex = ref(slider.value.activeIndex)

slider.value.on('slideChange', (swiper: any) => {
    activeIndex.value = swiper.activeIndex
})
</script>

<template>
    <div class="flex items-center gap-2">
        <LeftButton @click="slider.slidePrev(300)" is-light />
        <div class="flex gap-2 lg:gap-3">
            <template v-for="item in length" :key="item">
                <div
                    class="w-px h-4 lg:h-5 bg-[#FCFCFC]"
                    :class="{
                        'bg-opacity-100': activeIndex === item - 1,
                        'bg-opacity-30': activeIndex !== item - 1,
                    }"
                ></div>
            </template>
        </div>
        <RightButton @click="slider.slideNext(300)" is-light />
    </div>
</template>

<style scoped></style>
