<script setup lang="ts">
import type {
    ComponentButtonButton,
    IBreadCrumb,
    TImageFormats,
} from '~/types/global.type'
import BreadCrumbs from '~/components/common/BreadCrumbs.vue'

var props = defineProps<{
    title?: string
    slogan?: string
    videoUrl?: string
    poster?: TImageFormats
    button?: ComponentButtonButton
}>()

var breadCrumbs = markRaw<IBreadCrumb[]>([
    {
        path: '/',
        title: 'Главная',
    },
    {
        path: '/about',
        title: props.title ?? 'О клинике',
    },
])

var videoRef = ref<HTMLVideoElement | null>(null)
var isPlaying = ref<boolean | undefined>(undefined)
var config = useAppConfig()
var localPoster = ref('')
var { isMobile, isTablet } = useDevice()

function onStart() {
    if (videoRef.value) {
        if (isPlaying.value) {
            videoRef.value.pause()
        } else if (typeof isPlaying.value === 'undefined') {
            videoRef.value.play()
            videoRef.value.addEventListener('play', () => {
                isPlaying.value = true
            })
            videoRef.value.addEventListener('pause', () => {
                isPlaying.value = false
            })
        } else {
            videoRef.value.play()
        }
    }
}

function onVideoClick() {
    if (videoRef.value && isPlaying.value) videoRef.value.pause()
}

watchEffect(() => {
    if (!props.poster) return
    if (isMobile) localPoster.value = config.assetsUri + props.poster.medium.url
    else if (isTablet)
        localPoster.value = config.assetsUri + props.poster.large.url
    else localPoster.value = config.assetsUri + props.poster.large_x2.url
})
</script>

<template>
    <div class="pt-[6.5rem] lg:pt-[15.25rem] lg:pb-[12.5rem] pb-[3.75rem]">
        <div
            class="flex lg:grid lg:items-start grid-cols-[4fr_6fr] flex-col gap-10 mx-auto"
        >
            <div class="lg:flex h-full flex-col">
                <BreadCrumbs :list="breadCrumbs" class="mb-7 lg:-mt-7" />
                <div class="lg:my-auto">
                    <h1
                        class="font-semibold text-white font-[Mignon] text-[1.75rem] lg:text-[3rem] lg:leading-[3.625rem] leading-[2.375rem]"
                    >
                        {{ slogan ?? '' }}
                    </h1>
                    <div class="hidden lg:block lg:pt-16">
                        <UiButton
                            v-if="button"
                            mode="dark"
                            :variant="button.style"
                            @click="useEvent(button.url)"
                            >{{ button.label }}</UiButton
                        >
                    </div>
                </div>
            </div>
            <div
                class="w-screen lg:ml-0 lg:w-full -ml-4 flex items-center justify-center"
            >
                <video
                    ref="videoRef"
                    playsinline
                    class="aspect-video w-full"
                    :src="videoUrl"
                    preload="metadata"
                    :poster="localPoster"
                    @click="onVideoClick"
                    :class="{
                        'cursor-pointer': isPlaying,
                    }"
                ></video>
                <button
                    v-if="!isPlaying"
                    @click="onStart"
                    type="button"
                    class="w-[6rem] group lg:w-[10rem] transition-colors lg:h-[10rem] h-[6rem] absolute flex items-center justify-center rounded-full disabled:bg-secondary-disabled hover:bg-secondary bg-secondary-before"
                >
                    <span
                        class="text-[0.875rem] transition-colors group-hover:text-white group-disabled:text-opacity-30 lg:text-[1.125rem] uppercase text-accent"
                        >showreel</span
                    >
                </button>
            </div>
        </div>
    </div>
</template>

<style scoped></style>
