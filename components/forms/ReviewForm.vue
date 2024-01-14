<script setup lang="ts">
import { useForm } from 'vee-validate'
import * as yup from 'yup'
import UiTextArea from '~/components/ui/UiTextArea.vue'
import UiRadio from '~/components/ui/UiRadio.vue'
import { useGlobalStore } from '~/store/global.store'
import { storeToRefs } from '#imports'

var props = defineProps<{
    doctor?: {
        id: string
        name: string
    }
}>()

var { handleSubmit, setFieldValue } = useForm({
    validationSchema: yup.object().shape({
        reviewName: yup.string().required(),
        reviewText: yup.string().optional(),
        reviewType: yup.string().required().oneOf(['clinic', 'doctor']),
        reviewDoctor: yup.string().optional(),
        reviewClinic: yup.string().optional(),
        reviewService: yup.string().optional(),
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
var globalStore = useGlobalStore()
var { services, doctors } = storeToRefs(globalStore)
var servicesOptions = computed(() =>
    services.value?.map((service) => {
        return {
            value: service.id,
            label: service.attributes.title,
            children: service.attributes.sub_services.data?.map((subS) => ({
                value: subS.id,
                label: subS.attributes.title,
            })),
        }
    }),
)

var doctorsOptions = computed(() =>
    doctors.value.map((doc) => ({
        value: doc.id,
        label: doc.attributes.name,
    })),
)

watch(
    () => props.doctor,
    () => {
        console.log(props.doctor)
        if (props.doctor?.id) {
            setFieldValue('reviewDoctor', props.doctor.id)
        }
    },
    {
        deep: true,
        immediate: true,
    },
)
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
            name="reviewName"
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
                name="reviewService"
                label="Направление"
                placeholder="Любое направление"
                :options="servicesOptions"
            />
            <UiSelect
                class="w-full"
                name="reviewDoctor"
                label="ФИО врача"
                placeholder="Любой врач"
                :options="doctorsOptions"
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
