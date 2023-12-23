<script setup lang="ts">
import NewsPagination from './NewsPagination.vue'
import ReviewsPagination from '~/components/main/ReviewsPagination.vue'
import type { NewsList } from '~/types/global.type'
import NewsItem from '~/components/news/NewsItem.vue'

var swiper = ref(null)
var { mainPageNewsQuery } = useQueries()
var { data } = await useAsyncQuery<NewsList>(mainPageNewsQuery, {
    pagination: {
        limit: 6,
    },
})
</script>

<template>
    <div class="pt-[3.75rem] bg-accent lg:pt-[10rem] lg:pb-[7.5rem] pb-10">
        <div class="container mx-auto">
            <div
                class="mb-10 lg:mb-[4.37rem] flex items-center justify-between text-white"
            >
                <h2
                    class="text-white font-[Mignon] lg:text-[2.5rem] text-[1.5rem] font-semibold uppercase"
                >
                    Новости
                </h2>
                <NewsPagination class="hidden lg:flex" :swiper="swiper" />
            </div>
            <ClientOnly>
                <Swiper
                    centeredSlides
                    centeredSlidesBounds
                    class="w-[calc(100%_+_2rem)] !px-4 !-ml-4"
                    @swiper="swiper = $event"
                    :breakpoints="{
                        320: {
                            spaceBetween: 20,
                            slidesPerView: 1.2,
                        },
                        1024: {
                            spaceBetween: 40,
                            slidesPerView: 3,
                        },
                    }"
                >
                    <template
                        v-for="article of data.newsPosts.data"
                        :key="article.id"
                    >
                        <SwiperSlide>
                            <NewsItem :article="article" />
                        </SwiperSlide>
                    </template>
                </Swiper>
            </ClientOnly>
            <div
                class="mt-5 lg:mt-[3.75rem] flex items-center justify-between lg:justify-end"
            >
                <nuxt-link
                    class="text-white lg:text-[1.125rem] text-opacity-50 group hover:text-opacity-100 transition-opacity flex gap-2 uppercase items-center"
                    to="/news"
                >
                    <span>Все новости</span>
                    <svgo-arrow-right-bold
                        filled
                        class="text-[1.5rem] transition-transform group-hover:translate-x-1 !mb-0"
                    />
                </nuxt-link>
                <NewsPagination class="lg:hidden text-white" :swiper="swiper" />
            </div>
        </div>
    </div>
</template>

<style scoped></style>
