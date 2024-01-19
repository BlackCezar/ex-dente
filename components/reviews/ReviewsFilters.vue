<script setup lang="ts">
import UiCheckbox from '~/components/ui/UiCheckbox.vue'
import type { SelectOption } from '~/types/global.type'
import { storeToRefs, useGlobalStore } from '#imports'

defineProps<{
    withSort?: boolean
}>()

var sortOptions = markRaw<SelectOption[]>([
    {
        value: 'review.name:asc',
        label: 'По алфавиту',
    },
    {
        value: 'publishedAt:desc',
        label: 'По дате',
    },
])

var globalStore = useGlobalStore()
var { services, doctors } = storeToRefs(globalStore)

var servicesOptions = computed(() =>
    services.value.map((service) => {
        return {
            value: service.id,
            label: service.attributes.title,
            children: service.attributes.sub_services.data.map((subS) => ({
                value: subS.id,
                label: subS.attributes.title,
            })),
        }
    }),
)

var doctorsOptions = computed(() =>
    doctors.value.map((doctor) => ({
        value: doctor.id,
        label: doctor.attributes.name,
    })),
)
</script>

<template>
    <div class="gap-10 flex-col">
        <div v-if="withSort" class="flex flex-col gap-3">
            <span>Сортировать:</span>
            <UiSelect name="sort" :options="sortOptions" class="lg:w-[25rem]" />
        </div>
        <div class="flex flex-col gap-4">
            <UiCheckbox
                name="reviewType"
                label="Отзывы о клинике"
                value="clinic"
            />
            <UiCheckbox
                name="reviewType"
                label="Отзывы о врачах"
                value="doctor"
            />
        </div>
        <div class="flex flex-col gap-4">
            <UiSelect
                name="serviceId"
                :options="servicesOptions"
                placeholder="Все направления"
            />
            <UiSelect
                name="doctorId"
                :options="doctorsOptions"
                placeholder="Все врачи"
            />
        </div>
    </div>
</template>

<style scoped></style>
