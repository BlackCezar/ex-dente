<script setup lang="ts">
import type { DoctorItem } from '~/types/services.type'
import DoctorItemSlide from '~/components/doctors/DoctorItem.vue'
import LeftButton from '~/components/ui/LeftButton.vue'
import RightButton from '~/components/ui/RightButton.vue'

defineProps<{
    list?: DoctorItem[]
}>()

var swiper = ref(null)
var config = useAppConfig()
</script>

<template>
    <div v-if="list?.length">
        <div class="flex items-center justify-between lg:mb-[3rem] mb-7">
            <h3 class="h3 text-accent lg:text-[2.5rem] font-[Mignon]">
                НАШИ ВРАЧИ
            </h3>
            <div class="hidden lg:block">
                <LeftButton @click="swiper.slidePrev(300)" />
                <RightButton @click="swiper.slideNext(300)" />
            </div>
        </div>
        <div>
            <ClientOnly>
                <Swiper
                    class="w-[calc(100%_+_2rem)] lg:w-full !pl-4 !-ml-4 lg:!px-0 lg:!ml-0 overflow-x-hidden max-w-screen"
                    @swiper="swiper = $event"
                    space-between="20"
                    :breakpoints="{
                        320: {
                            slidesPerView: 1.3,
                        },
                        768: {
                            slidesPerView: 2,
                        },
                        1024: {
                            slidesPerView: 3,
                        },
                        1536: {
                            slidesPerView: 4,
                        },
                    }"
                >
                    <SwiperSlide v-for="item of list" :key="item.id">
                        <DoctorItemSlide :id="item.id" :article="item.attributes" />
                    </SwiperSlide>
                </Swiper>
            </ClientOnly>
        </div>
    </div>
</template>

<style scoped></style>
