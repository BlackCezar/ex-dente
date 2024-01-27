<script setup lang="ts">
import type { IReview } from '~/types/global.type'
import ReviewsPagination from '~/components/main/ReviewsPagination.vue'
import ReviewItem from '~/components/reviews/ReviewItem.vue'

defineProps<{
    list: IReview[]
}>()
var swiper = ref(null)
</script>

<template>
    <div v-if="list?.length">
        <div class="flex items-center justify-between lg:mb-[5rem] mb-7">
            <h2
                class="font-[Mignon] font-semibold text-[1.5rem] lg:text-[2.5rem] uppercase text-accent"
            >
                Отзывы пациентов
            </h2>
            <ReviewsPagination class="hidden lg:flex" :swiper="swiper" />
        </div>
        <ClientOnly>
            <Swiper
                @swiper="swiper = $event"
                auto-height
                :breakpoints="{
                    320: {
                        spaceBetween: 16,
                        slidesPerView: 1,
                    },
                    1024: {
                        spaceBetween: 40,
                        slidesPerView: 3,
                    },
                }"
            >
                <template v-for="review of list" :key="review.id">
                    <SwiperSlide>
                        <ReviewItem :review="review" />
                    </SwiperSlide>
                </template>
            </Swiper>
        </ClientOnly>
        <div
            class="mt-5 lg:mt-[3.75rem] flex items-center justify-between lg:justify-end"
        >
            <nuxt-link
                class="text-accent text-opacity-50 group hover:text-opacity-100 transition-opacity flex gap-2 uppercase items-center"
                to="/reviews"
            >
                <span class="text-[1.125rem]">Все отзывы</span>
                <svgo-arrow-right-bold
                    filled
                    class="text-[1.5rem] transition-transform group-hover:translate-x-1 !mb-0"
                />
            </nuxt-link>
            <ReviewsPagination class="lg:hidden" :swiper="swiper" />
        </div>
    </div>
</template>

<style scoped></style>
