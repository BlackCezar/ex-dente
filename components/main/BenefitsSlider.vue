<script setup lang="ts">
import type { IHomePageBenefitSlide } from '~/types/global.type'
import BenefitsPagination from '~/components/main/BenefitsPagination.vue'
import { Autoplay, Pagination } from 'swiper/modules'

var props = defineProps<{
    slides: IHomePageBenefitSlide[]
}>()

var activeSlide = ref<IHomePageBenefitSlide>(props.slides?.[0])
var appConfig = useAppConfig()

function onSlideChange(swiper: any) {
    activeSlide.value = props.slides[swiper.activeIndex]
}
</script>

<template>
    <div
        class="flex gap-[2.81rem] lg:items-end pt-8 flex-col lg:flex-row lg:gap-10"
    >
        <div
            class="max-w-full lg:max-w-[15rem] text-opacity-50 text-[0.875rem] text-accent"
        >
            {{ activeSlide.label }}
        </div>
        <Swiper
            :slides-per-view="1.6"
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
                    spaceBetween: 40,
                },
            }"
            class="max-w-[100%] lg:!flex flex-col items-col lg:flex-col-reverse"
            @slideChange="onSlideChange"
        >
            <template v-for="slide of slides" :key="slide.id">
                <SwiperSlide class="aspect-[13/15] lg:aspect-[52.5/38.5]">
                    <picture class="h-full w-full">
                        <source
                            media="(min-width: 1440px)"
                            :srcset="
                                appConfig.assetsUri +
                                slide.banner?.data?.attributes?.formats
                                    ?.large_x2.url
                            "
                        />
                        <source
                            media="(min-width: 1024px)"
                            :srcset="
                                appConfig.assetsUri +
                                slide.banner?.data?.attributes?.formats
                                    ?.medium_x2.url
                            "
                        />
                        <source
                            media="(min-width: 720px)"
                            :srcset="
                                appConfig.assetsUri +
                                slide.banner?.data?.attributes?.formats
                                    ?.small_x2.url
                            "
                        />
                        <source
                            media="(min-width: 480px)"
                            :srcset="
                                appConfig.assetsUri +
                                slide.banner?.data?.attributes?.formats?.medium
                                    .url
                            "
                        />
                        <source
                            media="(max-width: 479px)"
                            :srcset="
                                appConfig.assetsUri +
                                slide.banner?.data?.attributes?.formats?.small
                                    .url
                            "
                        />
                        <img
                            :src="
                                appConfig.assetsUri +
                                slide.banner?.data?.attributes?.formats
                                    ?.medium_x2.url
                            "
                            class="object-cover object-center h-full w-full"
                            :alt="
                                slide.banner?.data?.attributes?.alternativeText
                            "
                        />
                    </picture>
                </SwiperSlide>
            </template>
            <BenefitsPagination />
        </Swiper>
    </div>
</template>

<style scoped></style>
