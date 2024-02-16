<script setup lang="ts">
import type { IDoctor } from '~/types/doctors.type'

defineProps<{
    doctor: IDoctor
}>()

var config = useAppConfig()
function toRecordForm() {
    useEvent('scroll:callBack')
}
</script>

<template>
    <div
        class="flex flex-col lg:flex-row lg:justify-between lg:items-center mt-7 pb-[3.75rem] lg:pb-[12rem] gap-8 lg:gap-12 lg:-mt-[1.5rem]"
    >
        <section>
            <h1
                class="mb-3 text-white text-[1.75rem] font-semibold lg:text-[3rem] font-serif"
            >
                {{ doctor.name }}
            </h1>
            <h2
                class="text-white text-opacity-50 lg:text-[1.75rem] text-[1.125rem]"
            >
                Ведет прием на {{ doctor.clinicAddress }}
            </h2>
            <div class="hidden lg:block pt-[4rem]">
                <UiButton @click="toRecordForm" mode="dark" class="">Записаться на прием</UiButton>
            </div>
        </section>
        <section class="lg:max-w-[34rem]">
            <picture class="aspect-[20/25] lg:aspect-[34/42]">
                <source
                    media="(min-width: 1440px)"
                    :srcset="
                        config.assetsUri +
                        doctor.image?.data?.attributes.formats.medium.url
                    "
                />
                <img
                    :src="
                        config.assetsUri +
                        doctor.image?.data?.attributes.formats.small.url
                    "
                    class="w-full h-full object-cover rounded-[0.375rem] lg:rounded-[0.5rem]"
                    :alt="doctor.image?.data?.attributes?.alternativeText"
                    :title="doctor.image?.data?.attributes?.caption"
                />
            </picture>
        </section>
        <div class="lg:hidden">
            <UiButton mode="dark" class="!w-full">Записаться на прием</UiButton>
        </div>
    </div>
</template>

<style scoped></style>
