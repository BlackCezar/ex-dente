<script setup lang="ts">
import ConsultForm from '~/components/forms/ConsultForm.vue';
import ToServicesButton from '~/components/common/toServicesButton.vue'
</script>
<template>
<div class="pt-12 gap-10 pb-[3.75rem] bg-accent">
    <div class="container mx-auto lg:items-center gap-4 lg:gap-12 grid grid-cols-1 lg:grid-cols-2">
        <div class="w-full aspect-square relative flex items-center justify-center">
            <div class="slider-wrapper">
                <div class="slider-inner"></div>
            </div>
            <img src="~/assets/imgs/dentists-instruments.png" class="absolute" alt="">
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