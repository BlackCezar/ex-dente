<script setup lang="ts">
import type { IDoctor } from '~/types/doctors.type'
import DirectionsList from '~/components/common/DirectionsList.vue'
import RenderBlocks from '~/components/common/RenderBlocks.vue'

defineProps<{
    doctor: IDoctor
}>()
</script>

<template>
    <div
        class="flex flex-col lg:flex-row gap-[3.75rem] lg:justify-between lg:gap-[5rem]"
    >
        <div class="flex flex-col gap-10 lg:gap-[6.25rem] info max-w-[62rem]">
            <section v-if="doctor?.specification">
                <h2>Специализация</h2>
                <p>{{ doctor?.specification }}</p>
            </section>
            <section v-if="doctor?.experience">
                <h2>Опыт работы</h2>
                <p>{{ doctor.experience }}</p>
            </section>
            <section v-if="doctor?.education">
                <h2>Образование</h2>
                <div class=" text-accent text-opacity-70 text-[1.125rem] leading-[1.75rem] lg:leading-[2.875rem] lg:text-[1.75rem]">
                    <RenderBlocks :text="doctor.education" />
                </div>
            </section>
            <section v-if="doctor?.information">
                <h2>Информация</h2>
                <p>{{ doctor?.information }}</p>
            </section>
        </div>
        <div v-if="doctor?.sub_services.data?.length">
            <h3
                class="text-[1.25rem] font-semibold font-serif text-accent lg:text-[1.75rem] mb-6 lg:mb-8"
            >
                Услуги
            </h3>
            <nav>
                <ul
                    class="flex flex-col w-full lg:max-w-[25rem] gap-4 lg:gap-6"
                >
                    <li
                        v-for="item of doctor.sub_services.data"
                        :key="item.id"
                        class="pl-5 lg:pr-8 lg:pl-7 pr-4 py-3 lg:rounded-[0.375rem] rounded-[0.25rem] bg-gray transition-colors hover:bg-secondary-before active:bg-secondary"
                    >
                        <nuxt-link
                            class="gap-2 flex items-center justify-between"
                            :to="`/services/${item?.attributes.service.data?.attributes.slug}/${item?.attributes.slug}`"
                        >
                            <span
                                class="text-opacity-70 lg:text-[1.375rem] text-accent"
                                >{{ item?.attributes.title }}</span
                            >
                            <svgo-arrow-right filled class="text-[1.5rem]" />
                        </nuxt-link>
                    </li>
                </ul>
            </nav>
        </div>
    </div>
</template>

<style scoped>
.info section h2 {
    @apply font-semibold mb-4 text-accent lg:mb-5 text-[1.75rem] lg:text-[3rem] font-serif;
}
.info section p {
    @apply text-opacity-70 text-accent text-[1.125rem] leading-[1.75rem] lg:leading-[2.875rem] lg:text-[1.75rem];
}
</style>
