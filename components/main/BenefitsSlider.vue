<script setup lang="ts">
import type {IHomePageBenefitSlide} from "~/types/global.type";
import BenefitsPagination from "~/components/main/BenefitsPagination.vue";
import {Autoplay, Pagination} from "swiper/modules";

var props = defineProps<{
	slides: IHomePageBenefitSlide[];
}>()

var activeSlide = ref<IHomePageBenefitSlide>(props.slides?.[0])
var appConfig = useAppConfig()

function onSlideChange(swiper: any) {
	activeSlide.value = props.slides[swiper.activeIndex]
}
</script>

<template>
<div class="flex gap-[2.81rem] lg:items-end pt-8 flex-col lg:flex-row lg:gap-10">
	<div class="max-w-full lg:max-w-[15rem] text-opacity-50 text-[0.875rem] text-accent">
		{{activeSlide.label}}
	</div>
	<Swiper :slides-per-view="1.6"
	        space-between="16"
	        :modules="[Autoplay, Pagination]"
	        centeredSlidesBounds
	        :autoplay="{
				delay: 7000,
				disableOnInteraction: false,
			}"
	        centeredSlides
	        :breakpoints="{
				1024: {
					spaceBetween: 40
				}
	        }"
	        class="max-w-[100%] lg:!flex flex-col items-col lg:flex-col-reverse"
	        @slideChange="onSlideChange">
		<template v-for="slide of slides" :key="slide.id">
			<SwiperSlide>
				<img :src="`${appConfig.assetsUri}${slide.banner?.data.attributes.url}`" :alt="slide.banner?.data.attributes.alternativeText" :title="slide.banner?.data.attributes.caption" />
			</SwiperSlide>
		</template>
		<BenefitsPagination />
	</Swiper>
</div>
</template>

<style scoped>

</style>