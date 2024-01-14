<script setup lang="ts">
import ToServicesButton from '~/components/common/toServicesButton.vue'

defineProps<{
    doctor: {
        id: string
        img: string
        name: string
    }
}>()
var config = useAppConfig()
</script>

<template>
    <div class="bg-accent">
        <div
            class="container mx-auto lg:items-center gap-4 lg:gap-12 grid-cols-1 grid lg:grid-cols-2"
        >
            <div
                class="w-full aspect-square relative flex items-center justify-center"
            >
                <div class="slider-wrapper">
                    <div class="slider-inner"></div>
                </div>
                <img
                    :src="config.assetsUri + doctor.img"
                    class="absolute rounded-full aspect-square w-[35%] object-cover object-top"
                    alt="Изображение доктора"
                />
            </div>
            <RecordForm />
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
