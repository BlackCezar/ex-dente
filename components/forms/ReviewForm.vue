<script setup lang="ts">
import { useForm } from 'vee-validate'
import * as yup from 'yup'

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
        <h4 class="font-[Mignon] text-[1.75rem] mb-10">
            Оставьте свой отзыв о враче
        </h4>
        <UiInput
            placeholder="Иван Иванов"
            name="name"
            type="text"
            mode="light"
            label="Ваше имя*"
        />
        <UiTextArea placeholder="Текст отзыва" name="reviewText" mode="light" />
        <UiRadio :options="radioOptions" name="reviewType" />
        <UiSelect
            class="w-full mb-5"
            name="sub_service"
            label="Направление"
            placeholder="Любое направление"
        />
        <UiSelect
            class="w-full mb-8"
            name="sub_service"
            label="ФИО врача"
            placeholder="Любой врач"
        />
        <div class="flex flex-col gap-6">
            <p>
                Нажимая на кнопку «Отправить», вы даете свое согласие на
                обработку персональных данных
            </p>
            <UiButton
                mode="light"
                type="submit"
                variant="primary"
                class="!w-full"
                >Отправить</UiButton
            >
        </div>
    </form>
</template>

<style scoped></style>
