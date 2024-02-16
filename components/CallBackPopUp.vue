<script setup lang="ts">
import CommonCallBackForm from '~/components/forms/CommonCallBackForm.vue'

var isOpen = ref(false)
var isDone = ref(false)
var router = useRouter()
var route = useRoute()


useListen('call:callBackForm', () => {
    isOpen.value = true
})

function closeModal() {
    useEvent('close:callBackForm')
    isDone.value = false;
    isOpen.value = false
}

function toMainPage() {
    useEvent('close:callBackForm')
    isOpen.value = false
    router.push('/')
    isDone.value = false;
}

watch(() => route.path, closeModal)
</script>
<template>
    <div class="call-back-popup" :data-open="isOpen">
        <Transition
            enter-active-class="duration-300 ease-out"
            enter-from-class="transform opacity-0 -translate-y-4"
            enter-to-class="opacity-100 translate-y-0"
            leave-active-class="duration-200 ease-in"
            leave-from-class="opacity-100 translate-y-0"
            leave-to-class="transform opacity-0 -translate-y-4"
        >
            <div
                v-if="isOpen"
                :data-modal="isOpen"
                class="w-full h-screen fixed z-40 bg-white"
            >
                <div
                    v-if="!isDone"
                    class="grid gap-[6rem] w-full pt-[4.5rem] lg:pt-[8.5rem] h-full mx-auto grid-cols-1 lg:grid-cols-2 container"
                >
                    <div
                        class="relative hidden h-full lg:flex items-center justify-center w-full"
                    >
                        <div
                            class="aspect-square w-full flex items-center justify-center"
                        >
                            <div class="slider-wrapper">
                                <div class="slider-inner" />
                            </div>
                        </div>
                        <img
                            class="absolute right-[6.25rem] top-1/2 -translate-y-1/2 w-[50vw] object-contain"
                            src="~/assets/imgs/dentists-instruments.png"
                            alt=""
                        />
                    </div>
                    <div
                        class="pt-[4.25rem] flex items-center flex-col justify-center overflow-y-auto lg:pt-[3.81rem] relative z-[60]"
                    >
                        <button
                            @click="closeModal"
                            class="absolute top-5 right-0 lg:top-[3.81rem]"
                        >
                            <svgo-close
                                filled
                                class="text-[2.25rem] text-accent !mb-0 lg:text-[4rem]"
                            />
                        </button>
                        <CommonCallBackForm @done="isDone = true" />
                    </div>
                </div>
                <div v-else class="w-full pt-[4.5rem] lg:pt-[8.5rem] h-full mx-auto container">
                    <div class="relative flex flex-col items-center justify-center h-full w-full">
                    <span class="mb-6 lg:mb-7 font-serif font-semibold text-accent text-[1.75rem] lg:text-[3rem]">Ваша заявка отправлена</span>
                    <svgo-check class="mb-[4rem] text-[5rem] lg:text-[8.75rem] text-secondary-before lg:mb-12" filled />
                    <UiButton @click="toMainPage">На главную</UiButton>
                    <button
                        @click="closeModal"
                        class="absolute mt-[4.25rem] lg:mt-[3.81rem] top-5 right-0 lg:top-[3.81rem]"
                    >
                        <svgo-close
                            filled
                            class="text-[2.25rem] text-accent !mb-0 lg:text-[4rem]"
                        />
                    </button>
                </div>
                </div>
            </div>
        </Transition>
    </div>
</template>
<style scoped>
.slider-wrapper {
    width: 80%;
    height: 80%;
}
.slider-inner {
    width: 65%;
    height: 65%;
}

.slider-wrapper::before,
.slider-inner::before,
.slider-wrapper::after,
.slider-inner::after {
    border-color: rgba(11, 28, 49, 0.25);
}
</style>
