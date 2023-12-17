<script setup lang="ts">
defineProps<{
	swiper: any
}>()
</script>

<template>
<div>
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