<script setup lang="ts">
import type { DoctorItem } from '~/types/services.type'
import LeftButton from '~/components/ui/LeftButton.vue'
import RightButton from '~/components/ui/RightButton.vue'

defineProps<{
    list: DoctorItem[]
}>()

var swiper = ref(null)
var config = useAppConfig()
</script>

<template>
    <div>
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
                    class="w-screen !px-4 !-ml-4"
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
                        <article class="group">
                            <nuxt-link :to="'/doctors/' + item.attributes.slug">
                                <div
                                    class="aspect-[3/4] relative overflow-hidden lg:aspect-[5/6] mb-5 rounded-[0.5rem] lg:mb-6"
                                >
                                    <img
                                        class="group-hover:scale-105 w-full h-full transition-transform origin-top object-cover object-center"
                                        :src="
                                            config.assetsUri +
                                            item.attributes.image.data
                                                ?.attributes.formats.medium.url
                                        "
                                        :alt="
                                            item.attributes.image.data
                                                ?.attributes.alternativeText
                                        "
                                        :title="
                                            item.attributes.image.data
                                                ?.attributes.caption
                                        "
                                    />
                                    <UiButton
                                        class="absolute right-4 transition-opacity bottom-4 opacity-0 group-hover:opacity-100"
                                        type="button"
                                        variant="primary"
                                        mode="dark"
                                        @click.stop=""
                                        >Записаться на прием</UiButton
                                    >
                                </div>
                                <h3 class="h4 mb-1 font-[Mignon] text-accent">
                                    {{ item.attributes.name }}
                                </h3>
                                <section
                                    class="text-accent text-[0.875rem] text-opacity-50 lg:text-[1.125rem]"
                                >
                                    {{ item.attributes.specification }}
                                </section>
                            </nuxt-link>
                        </article>
                    </SwiperSlide>
                </Swiper>
            </ClientOnly>
        </div>
    </div>
</template>

<style scoped></style>
