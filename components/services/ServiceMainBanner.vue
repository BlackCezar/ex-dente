<script setup lang="ts">
import type { SubServiceEntity } from '~/types/services.type'

defineProps<{
    data: SubServiceEntity['attributes']
}>()

var config = useAppConfig()
var isDragging = ref(false)
var container = ref<HTMLDivElement | null>(null)
var button = ref<HTMLButtonElement | null>(null)
var newImg = ref<HTMLImageElement | null>(null)

function onDrag(ev: any) {
    if (ev instanceof TouchEvent) {
        if (
            isDragging.value &&
            container.value &&
            ev.touches.length &&
            button.value
        ) {
            const parentRect = container.value.getBoundingClientRect()
            let newX = ev.touches[0]?.clientX - parentRect.left
            newX = Math.max(0, Math.min(newX, parentRect.width))
            if (button.value.parentElement)
                button.value.parentElement.style.left = newX + 'px'
            if (newImg.value)
                newImg.value.style.clipPath = `polygon(${newX}px 0%, 100% 0%, 100% 100%, ${newX}px 100%)`
        }
        console.log(ev.touches)
    }
    if (isDragging.value && container.value && button.value) {
        const parentRect = container.value.getBoundingClientRect()

        let newX = ev.clientX - parentRect.left
        newX = Math.max(0, Math.min(newX, parentRect.width))
        if (button.value.parentElement)
            button.value.parentElement.style.left = newX + 'px'
        if (newImg.value)
            newImg.value.style.clipPath = `polygon(${newX}px 0%, 100% 0%, 100% 100%, ${newX}px 100%)`
    }
}

function onMouseUp() {
    isDragging.value = false
}
function onMouseDown() {
    isDragging.value = true
}
function setInitialButtonPosition() {
    const newX = 50
    if (button.value?.parentElement)
        button.value.parentElement.style.left = newX + 'px'
    if (newImg.value)
        newImg.value.style.clipPath = `polygon(${newX}px 0%, 100% 0%, 100% 100%, ${newX}px 100%)`
}
onMounted(() => {
    document.addEventListener('mouseup', onMouseUp)
    container.value?.addEventListener('touchmove', onDrag)
    button.value?.addEventListener('touchstart', onMouseDown)
    button.value?.addEventListener('touchend', onMouseUp)
    button.value?.addEventListener('touchcancel', onMouseUp)
    window.addEventListener('resize', setInitialButtonPosition)

    setInitialButtonPosition()
})
onUnmounted(() => {
    container.value?.removeEventListener('touchmove', onDrag)
    button.value?.removeEventListener('touchstart', onMouseDown)
    document.removeEventListener('mouseup', onMouseUp)
    button.value?.removeEventListener('touchend', onMouseUp)
    button.value?.removeEventListener('touchcancel', onMouseUp)
    window.removeEventListener('resize', setInitialButtonPosition)
})
</script>

<template>
    <div
        class="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-[5rem] items-center bg-accent pb-10 lg:pb-[10rem]"
    >
        <section class="max-w-[52rem]">
            <h1 class="h1 font-serif mb-6 lg:mb-[3rem] text-white">
                {{ data.title }}
            </h1>
            <h2
                class="lg:text-[1.75rem] text-[1.125rem] text-opacity-80 text-white"
            >
                {{ data.subtitle }}
            </h2>
        </section>
        <div class="flex items-center justify-center lg:justify-end w-full">
            <section class="max-w-[43rem] relative">
                <div
                    v-if="data.image.data.length"
                    class="aspect-[20/11] lg:aspect-[43/24]"
                >
                    <img
                        class="w-full h-full object-cover pointer-events-none"
                        :alt="data.image.data[0].attributes.alternativeText"
                        :title="data.image.data[0].attributes.caption"
                        :src="
                            config.assetsUri + data.image.data[0].attributes.url
                        "
                    />
                </div>
                <div
                    v-if="data.image.data.length > 1"
                    class="absolute top-0 right-0 w-full h-full"
                >
                    <div
                        class="relative -z-1 w-full h-full"
                        @mousemove="onDrag"
                        ref="container"
                        @mouseup="isDragging = false"
                    >
                        <div
                            class="absolute z-20 w-[2px] flex justify-center items-center lg:w-[5px] h-full bg-white top-0 left-0"
                        >
                            <button
                                ref="button"
                                @dragstart="false"
                                @mousedown="isDragging = true"
                                type="button"
                                class="w-10 lg:w-[3.75rem] lg:min-w-[3.75rem] lg:h-[3.75rem] h-10 flex min-w-[2.5rem] items-center rounded-full bg-white justify-center"
                            >
                                <svgo-chevron-double
                                    class="text-[1.3rem] lg:text-[2rem]"
                                    filled
                                />
                            </button>
                        </div>
                        <img
                            ref="newImg"
                            class="w-full h-full object-cover pointer-events-none relative z-10"
                            :alt="data.image.data[1].attributes.alternativeText"
                            :title="data.image.data[1].attributes.caption"
                            :src="
                                config.assetsUri +
                                data.image.data[1].attributes.url
                            "
                        />
                    </div>
                </div>
            </section>
        </div>
    </div>
</template>

<style scoped></style>
