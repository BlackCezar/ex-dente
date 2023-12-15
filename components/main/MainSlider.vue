<script setup lang="ts">
import type { TSlide } from '~/types/global.type'
import ToServicesButton from '~/components/common/toServicesButton.vue'
import MainSliderPagination from "~/components/main/MainSliderPagination.vue";

const props = defineProps<{
    slides: TSlide[]
}>()

var config = useAppConfig()
var bannerEl = ref<HTMLDivElement | null>(null)

var onSwiperInit = (swiper: any) => {
	swiper.on('slideChange', onSlideChange)
}
function onSlideChange(swiper: any) {
	const slide = props.slides[swiper.activeIndex]
	if (bannerEl.value && slide) bannerEl.value.style.setProperty('--bg', slide.bgColor)
}
</script>

<template>
    <div class="h-screen flex items-center justify-center lg:pt-[10rem] lg:min-h-screen lg:h-auto" ref="bannerEl" :class="{
    }" :style="{
		backgroundColor: `var(--bg)`,
		'--bg': '#0B1C31'
    }">
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
                        <div class="slider-inner aspect-square w-[70%]">
                            <img
                                :src="`${config.assetsUri}${slide.image?.data.attributes.url}`"
                                class="w-full slider-img h-full object-contain relative z-30"
                                alt=""
                            />
                        </div>
                    </div>
                    <article class="text-white order-2 lg:order-1 px-4 lg:px-0 items-center flex flex-col lg:items-start">
	                    <h1 class="text-[1.75rem] text-center mb-3 lg:mb-8 font-bold lg:text-[3.75rem] uppercase font-[Mignon] lg:text-left">{{slide.title}}</h1>
	                    <p class="text-[1.125rem] lg:text-[1.75rem] text-center text-[#FCFCFC] text-opacity-80 mb-12 lg:text-left">{{slide.subtitle}}</p>
	                    <UiButton :mode="!slide.isLight ? 'light' : 'dark'" v-if="slide.button" :variant="slide.button.style" @click="useEvent(slide.button.url)">{{slide.button.label}}</UiButton>
                    </article>
                </div>
            </SwiperSlide>
            <ToServicesButton />
	        <MainSliderPagination class="mx-auto justify-center mt-7 lg:mt-0 lg:justify-start lg:container" :length="slides.length" />
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
