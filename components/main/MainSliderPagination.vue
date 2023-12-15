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
		<svg class="lg:w-[5rem] lg:h-[5rem]" width="57" height="56" viewBox="0 0 57 56" fill="none" xmlns="http://www.w3.org/2000/svg">
			<path opacity="0.6" d="M45.0494 32.8893C43.7046 36.8015 41.0172 40.1108 37.4643 42.2299C33.9113 44.349 29.7226 45.1409 25.6412 44.4651C21.5599 43.7893 17.8499 41.6895 15.1696 38.5383C12.4894 35.387 11.0121 31.3882 11.0001 27.2513C10.988 23.1144 12.4419 19.107 15.1037 15.9401C17.7655 12.7733 21.4632 10.6519 25.5405 9.95226C29.6178 9.25265 33.8112 10.0201 37.3764 12.1184C40.9417 14.2168 43.6483 17.5103 45.016 21.4146" stroke="#FCFCFC"/>
			<g opacity="0.6">
				<path fill-rule="evenodd" clip-rule="evenodd" d="M27.8177 32.9752L22.67 28.1068C22.3541 27.8081 22.3541 27.3237 22.67 27.025L27.8177 22.1566C28.1336 21.8579 28.6458 21.8579 28.9617 22.1566C29.2776 22.4554 29.2776 22.9397 28.9617 23.2385L25.1948 26.8009H34.5664V28.3309H25.1948L28.9617 31.8933C29.2776 32.1921 29.2776 32.6764 28.9617 32.9752C28.6458 33.2739 28.1336 33.2739 27.8177 32.9752Z" fill="#FCFCFC"/>
			</g>
		</svg>
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
		<svg class="lg:w-[5rem] lg:h-[5rem]" width="57" height="56" viewBox="0 0 57 56" fill="none" xmlns="http://www.w3.org/2000/svg">
			<path opacity="0.6" d="M11.9506 32.8893C13.2954 36.8015 15.9828 40.1108 19.5357 42.2299C23.0887 44.349 27.2774 45.1409 31.3588 44.4651C35.4401 43.7893 39.1501 41.6895 41.8304 38.5383C44.5106 35.387 45.9879 31.3882 45.9999 27.2513C46.012 23.1144 44.5581 19.107 41.8963 15.9401C39.2345 12.7733 35.5368 10.6519 31.4595 9.95226C27.3822 9.25265 23.1888 10.0201 19.6236 12.1184C16.0583 14.2168 13.3517 17.5103 11.984 21.4146" stroke="#FCFCFC"/>
			<g opacity="0.6">
				<path fill-rule="evenodd" clip-rule="evenodd" d="M29.1823 32.9752L34.33 28.1068C34.6459 27.8081 34.6459 27.3237 34.33 27.025L29.1823 22.1566C28.8664 21.8579 28.3542 21.8579 28.0383 22.1566C27.7224 22.4554 27.7224 22.9397 28.0383 23.2385L31.8052 26.8009H22.4336V28.3309H31.8052L28.0383 31.8933C27.7224 32.1921 27.7224 32.6764 28.0383 32.9752C28.3542 33.2739 28.8664 33.2739 29.1823 32.9752Z" fill="#FCFCFC"/>
			</g>
		</svg>

	</button>
</div>
</template>

<style scoped>

</style>