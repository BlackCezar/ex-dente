<script setup lang="ts">
import type { ICert } from '~/types/doctors.type'
import RightButton from '~/components/ui/RightButton.vue'
import LeftButton from '~/components/ui/LeftButton.vue'
import { VueImageZoomer } from 'vue-image-zoomer'
import 'vue-image-zoomer/dist/style.css'

defineProps<{
    certs: ICert[]
}>()

var swiper = ref(null)
var config = useAppConfig()
</script>

<template>
    <div>
        <div
            class="flex justify-between mb-7 lg:mb-[2.375rem] items-center flex-col lg:flex-row"
        >
            <h2
                class="lg:text-[2.5rem] font-[Mignon] text-[1.25rem] font-semibold uppercase text-accent"
            >
                Сертификаты
            </h2>
            <div class="hidden lg:flex justify-center lg:justify-end">
                <LeftButton @click="swiper.slidePrev(300)" />
                <RightButton @click="swiper.slideNext(300)" />
            </div>
        </div>
        <div class="w-screen mb-5 lg:w-full -ml-4 lg:ml-0">
            <ClientOnly>
                <Swiper
                    @swiper="swiper = $event"
                    space-between="20"
                    class="aspect-[22.5/17.25] lg:aspect-[108/26]"
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
                    <SwiperSlide v-for="item of certs" :key="item.id" class="">
                        <div
                            class="rounded-[0.375rem] cert p-[1.85rem] lg:p-10 bg-gray flex justify-between items-center w-full h-full"
                        >
                            <vue-image-zoomer
                                click-zoom
                                class="object-contain"
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
                        </div>
                    </SwiperSlide>
                </Swiper>
            </ClientOnly>
        </div>
        <div class="lg:hidden flex justify-center">
            <LeftButton @click="swiper.slidePrev(300)" />
            <RightButton @click="swiper.slideNext(300)" />
        </div>
    </div>
</template>

<style>
.cert .vh--outer.vh--rel {
    display: flex;
}
.cert .vh--outer.vh--rel,
.cert .vh--holder.vh--rel.vh--flex.vh--jc.vh--no-click {
    max-height: 100%;
}
.cert picture:first-child,
.cert picture:first-child img {
    height: 100%;
    width: 100%;
    object-fit: contain;
}
img.vh--image.vh--abs {
    max-width: unset;
}
</style>
