<script setup lang="ts">
import type { TSlide } from '~/types/global.type'
import ToServicesButton from '~/components/common/toServicesButton.vue'
import MainSliderPagination from '~/components/main/MainSliderPagination.vue'

const props = defineProps<{
    slides: TSlide[]
}>()

var config = useAppConfig()
var bannerEl = ref<HTMLDivElement | null>(null)
var router = useRouter()

var onSwiperInit = (swiper: any) => {
    swiper.on('slideChange', onSlideChange)
}
function onSlideChange(swiper: any) {
    const slide = props.slides[swiper.activeIndex]
    if (bannerEl.value && slide && slide.bgColor) {
        bannerEl.value.style.setProperty('--bg', slide.bgColor)
        useEvent('call:changeHeaderColor', slide.bgColor)
    }
}

function onClick(url: string) {
    if (url.startsWith('/')) router.push(url); else useEvent(url)
}
</script>

<template>
    <div
        class="h-screen flex items-center justify-center lg:pt-[10rem] lg:min-h-[calc(100dvh_-_10rem)] lg:h-auto"
        ref="bannerEl"
        :class="{}"
        :style="{
            backgroundColor: `var(--bg)`,
            '--bg': '#0B1C31',
        }"
    >
            <Swiper
                :modules="[SwiperAutoplay]"
                @swiper="onSwiperInit"
                :autoplay="{
                    delay: 7000,
                    disableOnInteraction: true,
                }"
            >
                <SwiperSlide v-for="(slide, index) of slides" :key="index">
                    <div
                        class="grid gap-12 grid-cols-1 lg:grid-cols-2 items-center justify-items-center justify-center container mx-auto"
                    >
                        <div
                            class="aspect-square order-1 lg:order-2 slider-wrapper w-full max-w-[60vw]"
                        >
                            <div class="slider-inner aspect-square w-[70%] flex items-center justify-center">
                                <picture class="w-full  relative z-30">
                                    <source
                                        media="(min-width: 1440px)"
                                        :srcset="
                                            config.assetsUri +
                                            slide.image?.data.attributes
                                                ?.formats.large_x2.url
                                        "
                                    />
                                    <source
                                        media="(min-width: 1024px)"
                                        :srcset="
                                            config.assetsUri +
                                            slide.image?.data.attributes
                                                ?.formats.medium_x2.url
                                        "
                                    />
                                    <source
                                        media="(min-width: 720px)"
                                        :srcset="
                                            config.assetsUri +
                                            slide.image?.data.attributes
                                                ?.formats.small_x2.url
                                        "
                                    />
                                    <source
                                        media="(min-width: 480px)"
                                        :srcset="
                                            config.assetsUri +
                                            slide.image?.data.attributes
                                                ?.formats.medium.url
                                        "
                                    />
                                    <source
                                        media="(max-width: 479px)"
                                        :srcset="
                                            config.assetsUri +
                                            slide.image?.data.attributes
                                                ?.formats.small.url
                                        "
                                    />
                                    <img
                                        :src="
                                            config.assetsUri +
                                            slide.image?.data.attributes
                                                ?.formats.medium_x2.url
                                        "
                                        class="object-contain slider-img"
                                        :alt="
                                            slide.image?.data?.attributes
                                                ?.caption
                                        "
                                        :title="
                                            slide.image?.data?.attributes
                                                ?.caption
                                        "
                                    />
                                </picture>
                            </div>
                        </div>
                        <article
                            class="slide-hero text-white order-2 lg:order-1 px-4 lg:px-0 items-center flex flex-col lg:items-start"
                        >
                            <h1
                                class="text-[1.75rem] text-center mb-3 lg:mb-8 font-bold lg:text-[3.75rem] uppercase font-serif lg:text-left"
                            >
                                {{ slide.title }}
                            </h1>
                            <p
                                class="text-[1.125rem] lg:text-[1.75rem] text-center text-[#FCFCFC] text-opacity-80 mb-12 lg:text-left"
                            >
                                {{ slide.subtitle }}
                            </p>
                            <UiButton
                                :mode="!slide.isLight ? 'light' : 'dark'"
                                v-if="slide.button"
                                :variant="slide.button.style"
                                @click="onClick(slide.button.url)"
                                >{{ slide.button.label }}</UiButton
                            >
                        </article>
                    </div>
                </SwiperSlide>
                <ToServicesButton class="bottom-[calc(50%_+_2rem)]" />
                <MainSliderPagination
                    class="mx-auto justify-center mt-7 lg:mt-0 lg:justify-start lg:container"
                    :length="slides.length"
                />
            </Swiper>
    </div>
</template>

<style>
.slider-wrapper,
.slider-inner {
    position: relative;
}
.slider-wrapper {
    @apply flex items-center justify-center;
}
.slider-wrapper::before,
.slider-inner::before {
    content: '';
    position: absolute;
    width: 100%;
    top: 0;
    left: 0;
    border-radius: 50%;
    z-index: 0;
    height: 100%;
    border: 1px solid hsla(0, 0%, 99%, 0.25);
    animation: spin 10s linear infinite;
    clip-path: polygon(0% 0%, 100% 0%, 100% 35%, 0% 35%);
}

.slider-wrapper::after,
.slider-inner::after {
    content: '';
    position: absolute;
    width: 100%;
    top: 0;
    left: 0;
    border-radius: 50%;
    z-index: 0;
    height: 100%;
    border: 1px solid hsla(0, 0%, 99%, 0.25);
    clip-path: polygon(0% 70%, 100% 70%, 100% 100%, 0% 100%);
    animation: spin 10s linear infinite;
}

.slider-img {
    animation: scale 3.5s linear infinite alternate-reverse;
}

.slider-inner::after,
.slider-inner::before {
    animation: spin 10s linear infinite reverse;
}

@keyframes scale {
    from {
        transform: scale(1);
    }
    to {
        transform: scale(1.4);
    }
}
@keyframes spin {
    from {
        transform: rotate(0deg);
    }
    to {
        transform: rotate(360deg);
    }
}
</style>
