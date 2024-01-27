<script setup lang="ts">
import ConsultForm from '~/components/forms/ConsultForm.vue';
import ToServicesButton from '~/components/common/toServicesButton.vue'

var container = ref<HTMLDivElement | null>(null)

useListen('scroll:callBack', () => {
    if (container.value) {
        container.value.scrollIntoView({
            behavior: 'smooth'
        })
    }
})
</script>bottom-[calc(50%_+_1.5rem)]
<template>
<div class="pt-12 gap-10 pb-[3.75rem] bg-accent" ref="container">
    <div class="container mx-auto lg:items-center gap-4 lg:gap-12 grid grid-cols-1 lg:grid-cols-2">
        <div class="w-full aspect-square relative flex items-center justify-center">
            <div class="slider-wrapper">
                <div class="slider-inner"></div>
            </div>
            <img src="~/assets/imgs/dentists-instruments.png" loading="lazy" class="absolute block -ml-4 lg:-ml-[12.5rem] " alt="Изображение инструментов">
            <ToServicesButton class="lg:left-[66%] lg:bottom-[8%] bottom-0" />
        </div>
        <ConsultForm />
    </div>
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
</style>