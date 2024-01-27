<script setup lang="ts">
import ReviewForm from '~/components/forms/ReviewForm.vue'

defineProps<{
    doctor?: {
        id: string
        name: string
    }
}>()
</script>

<template>
    <div
        class="w-full grid grid-cols-1 max-w-[1920px] mx-auto lg:grid-cols-2 gap-8 lg:gap-16 items-center"
    >
        <div class="hidden lg:block">
            <img src="~/assets/imgs/dentists-instruments.png" alt="" />
        </div>
        <ReviewForm :doctor="doctor" />
    </div>
</template>

<style scoped></style>
