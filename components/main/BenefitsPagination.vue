<script setup lang="ts">
var swiper = useSwiper()
</script>

<template>
<div class=" flex justify-center lg:justify-end lg:pt-0 pt-5 lg:pb-4">
	<button type="button"  @click="swiper.slidePrev(300)">
		<svgo-pagination-left filled class="text-[3.5rem] svgo-pagination-left text-accent hover:text-opacity-100 text-opacity-60 lg:text-[5rem]" />
	</button>
	<button type="button" @click="swiper.slideNext(300)">
		<svgo-pagination-right filled class="text-[3.5rem] svgo-pagination-right text-accent hover:text-opacity-100 text-opacity-60 lg:text-[5rem]" />
	</button>
</div>
</template>

<style scoped>

</style>