<script setup lang="ts">
import ReviewsPagination from "~/components/main/ReviewsPagination.vue";
import {useQueries} from "#imports";
import type {ReviewsList} from "~/types/global.type";
import ReviewItem from "~/components/reviews/ReviewItem.vue";

var {mainPageReviewsListQuery} = useQueries()
var {data} = await useAsyncQuery<ReviewsList>(mainPageReviewsListQuery, {
	pagination: {
		limit: 6
	}
})
var swiper = ref(null)
</script>

<template>
<div class="container bg-white pt-[3.75rem] pb-10 lg:py-[9rem] ">
	<div class="flex items-center justify-between lg:mb-[5rem] mb-7">
		<h2 class="font-[Mignon] font-semibold lg:text-[2.5rem] uppercase text-accent">Отзывы пациентов</h2>
		<ReviewsPagination class="hidden lg:flex" :swiper="swiper" />
	</div>
	<ClientOnly>
		<Swiper @swiper="swiper = $event"
		        :breakpoints="{
				320: {
					spaceBetween: 16
				},
				1024: {
					spaceBetween: 40,
					slidesPerView: 3
				}
	        }"
		>
			<template v-for="review of data.reviews.data" :key="review.id">
				<SwiperSlide>
					<ReviewItem :review="review" />
				</SwiperSlide>
			</template>
		</Swiper>
	</ClientOnly>
	<div>
		<nuxt-link to="/reviews">
			<span>Все отзывы</span>
			<svgo-arrow-right-bold />
		</nuxt-link>
		<ReviewsPagination :swiper="swiper" />
	</div>
</div>
</template>

<style scoped>

</style>