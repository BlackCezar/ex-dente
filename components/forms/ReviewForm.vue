<script setup lang="ts">
import { useForm } from 'vee-validate'
import * as yup from 'yup'
import UiTextArea from '~/components/ui/UiTextArea.vue'
import UiRadio from '~/components/ui/UiRadio.vue'

defineProps<{
    doctor?: {
        id: string
        name: string
    }
}>()

var { handleSubmit, isSubmitting } = useForm({
    validationSchema: yup.object().shape({
        name: yup.string().required(),
        reviewText: yup.string().optional(),
        reviewType: yup.string().required().oneOf(['clinic', 'doctor']),
        doctor: yup.string().optional(),
        clinic: yup.string().optional(),
        sub_service: yup.string().optional(),
    }),
})
var onProcess = handleSubmit(async (values) => {})

var radioOptions = markRaw([
    {
        value: 'clinic',
        label: 'Отзыв о клинике',
    },
    {
        label: 'Отзыв о враче',
        value: 'doctor',
    },
])
</script>

<template>
    <form @submit.prevent="onProcess" class="px-4">
        <h4
            class="font-[Mignon] text-accent lg:font-semibold lg:text-[3rem] text-[1.75rem] mb-10 lg:mb-12"
        >
            Оставьте свой отзыв о враче
        </h4>
        <UiInput
            placeholder="Иван Иванов"
            name="name"
            type="text"
            mode="light"
            label="Ваше имя*"
            class="mb-6 lg:mb-10"
        />
        <UiTextArea
            class="mb-7 lg:mb-[2.69rem]"
            placeholder="Текст отзыва"
            name="reviewText"
            mode="light"
        />
        <UiRadio
            class="mb-7 lg:mb-[2.56rem]"
            :options="radioOptions"
            name="reviewType"
        />
        <div class="flex flex-col lg:flex-row gap-5 lg:gap-10 lg:mb-12 mb-8">
            <UiSelect
                class="w-full"
                name="sub_service"
                label="Направление"
                placeholder="Любое направление"
            />
            <UiSelect
                class="w-full"
                name="sub_service"
                label="ФИО врача"
                placeholder="Любой врач"
            />
        </div>
        <div class="flex flex-col gap-6 lg:flex-row lg:gap-10">
            <p
                class="text-accent text-opacity-50 text-[0.875rem] lg:leading-[1.75rem] lg:text-base"
            >
                Нажимая на кнопку «Отправить», вы даете свое согласие на
                обработку персональных данных
            </p>
            <UiButton
                mode="light"
                type="submit"
                variant="primary"
                class="!w-full lg:!w-[18rem]"
                >Отправить</UiButton
            >
        </div>
    </form>
</template>

<style scoped></style>
