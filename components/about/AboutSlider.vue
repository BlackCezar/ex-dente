<script setup lang="ts">
import type { ComponentSlidersSlider } from '~/types/global.type'
import { Autoplay, EffectCoverflow, Pagination } from 'swiper/modules'
import 'swiper/css/effect-coverflow'

defineProps<{
    list: ComponentSlidersSlider[]
}>()

var config = useAppConfig()
</script>

<template>
    <div class="pb-[3.75rem]">
        <ClientOnly>
            <Swiper
                class="container"
                space-between="40"
                centeredSlides
                loop
                slidesPerView="auto"
                :effect="'coverflow'"
                :autoplay="{
                    delay: 7000,
                    disableOnInteraction: true,
                }"
                :modules="[Autoplay, Pagination, EffectCoverflow]"
                :coverflowEffect="{
                    rotate: 0,
                    stretch: 0,
                    scale: 0.7,
                    depth: 100,
                    modifier: 1,
                    slideShadows: true,
                }"
            >
                <SwiperSlide
                    v-for="slide of [...list, ...list]"
                    :key="slide.id"
                    class="!w-[calc(100vw_-_1rem)] px-4 lg:px-0 lg:!w-[52rem] aspect-[20/16] lg:aspect-[52/42]"
                >
                    <template v-for="img of slide.banner.data" :key="img.id">
                        <picture class="w-full block h-full">
                            <source
                                media="(min-width: 480px)"
                                :srcset="
                                    config.assetsUri +
                                    img.attributes?.formats.small_x2.url
                                "
                            />
                            <source
                                media="(max-width: 479px)"
                                :srcset="
                                    config.assetsUri +
                                    img.attributes?.formats.small.url
                                "
                            />
                            <img
                                :src="
                                    config.assetsUri +
                                    img.attributes?.formats.small_x2.url
                                "
                                :alt="img.attributes?.alternativeText"
                            />
                        </picture>
                    </template>
                </SwiperSlide>
                <template v-slot:container-end>
                    <AboutSliderPagination />
                </template>
            </Swiper>
        </ClientOnly>
    </div>
</template>

<style scoped>
picture > * {
    height: 100%;
    width: 100%;
    object-fit: cover;
    object-position: center;
}
</style>
