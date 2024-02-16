<script setup lang="ts">
import type { ComponentSlidersSlider } from '~/types/global.type'
import RightButton from '~/components/ui/RightButton.vue'
import LeftButton from '~/components/ui/LeftButton.vue'
import { Autoplay } from 'swiper/modules'

defineProps<{
    data: ComponentSlidersSlider
}>()

var config = useAppConfig()
var swiper = ref(null)
</script>

<template>
    <div class="" v-if="data.banner.data.length">
        <ClientOnly>
            <Swiper
                :modules="[Autoplay]"
                @swiper="swiper = $event"
                rewind
                :autoplay="{
                    delay: 7000,
                    disableOnInteraction: true,
                }"
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
                <SwiperSlide v-for="item of data.banner.data" :key="item.id">
                    <img
                        class="object-cover block object-center aspect-[4/5] lg:aspect-[17/21]"
                        :src="
                            config.assetsUri +
                            item?.attributes.formats.medium.url
                        "
                        :alt="item.attributes.alternativeText"
                        :title="item.attributes.caption"
                    />
                </SwiperSlide>
                <template #container-end>
                    <div class="flex justify-center pt-5 lg:pt-12" v-if="data.banner.data.length > 1">
                        <LeftButton @click="swiper.slidePrev(300)" />
                        <RightButton @click="swiper.slideNext(300)" />
                    </div>
                </template>
            </Swiper>
        </ClientOnly>
    </div>
</template>

<style scoped></style>
