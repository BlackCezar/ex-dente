<script setup lang="ts">
import type { GalleryBannerItem } from '~/types/services.type'
import RightButton from '~/components/ui/RightButton.vue'
import LeftButton from '~/components/ui/LeftButton.vue'
import { VueImageZoomer } from 'vue-image-zoomer'
import 'vue-image-zoomer/dist/style.css'

defineProps<{
    list?: GalleryBannerItem[]
}>()

var swiper = ref(null)
var config = useAppConfig()
</script>

<template>
    <div v-if="list?.length">
        <div class="flex items-center justify-between lg:mb-[3rem] mb-7">
            <h3 class="h3 text-accent lg:text-[2.5rem] font-serif">
                Галерея
            </h3>
            <div class="hidden lg:block">
                <LeftButton @click="swiper.slidePrev(300)" />
                <RightButton @click="swiper.slideNext(300)" />
            </div>
        </div>
        <div>
            <ClientOnly>
                <Swiper
                    @swiper="swiper = $event"
                    space-between="20"
                    :breakpoints="{
                        320: {
                            slidesPerView: 1,
                            spaceBetween: 16,
                        },
                        768: {
                            slidesPerView: 2,
                            spaceBetween: 20,
                        },
                        1024: {
                            slidesPerView: 3,
                            spaceBetween: 40,
                        },
                    }"
                >
                    <SwiperSlide v-for="item of list" :key="item.id">
                        <vue-image-zoomer
                            click-zoom
                            lazyload
                            :regular="
                                config.assetsUri +
                                item.attributes.formats.medium.url
                            "
                            :zoom-amount="3"
                            :zoom="
                                config.assetsUri +
                                item.attributes.formats.large_x2.url
                            "
                            click-message="Нажмите для зума"
                        />
                    </SwiperSlide>
                </Swiper>
            </ClientOnly>
        </div>
    </div>
</template>

<style>
img.vh--image.vh--abs {
    max-width: unset;
}
</style>
