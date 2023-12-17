<script setup lang="ts">
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
	<button @click="slider.slidePrev(300)">
		<svgo-pagination-left class="text-[3.5rem] svgo-pagination-left transition-all hover:text-opacity-100 text-white text-opacity-60 lg:text-[5rem]" filled />
	</button>
	<div class="flex gap-2 lg:gap-3">
		<template v-for="item in length" :key="item">
		<div class="w-px h-4 lg:h-5 bg-[#FCFCFC]" :class="{
			'bg-opacity-100': activeIndex === item - 1,
			'bg-opacity-30': activeIndex !== item - 1,
		}"></div>
		</template>
	</div>
	<button @click="slider.slideNext(300)">
		<svgo-pagination-right class="text-[3.5rem] svgo-pagination-right transition-all hover:text-opacity-100 text-white text-opacity-60 lg:text-[5rem]" filled />
	</button>
</div>
</template>

<style scoped>

</style>