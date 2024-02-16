<script setup lang="ts">
import { useForm } from 'vee-validate'
import * as yup from 'yup'
import UiTextArea from '~/components/ui/UiTextArea.vue'
import UiRadio from '~/components/ui/UiRadio.vue'
import { useGlobalStore } from '~/store/global.store'
import { storeToRefs } from '#imports'

enum ReviewType {
    Clinic = 'clinic',
    Doctor = 'doctor'
}

var props = defineProps<{
    doctor?: {
        id: string
        name: string
    }
}>()

var { handleSubmit, setFieldValue, values, resetForm } = useForm<{
    reviewService?: string
    reviewName: string
    reviewText: string
    reviewType: ReviewType
    reviewDoctor?: string
    reviewClinic?: string
}>({
    validationSchema: yup.object().shape({
        reviewName: yup.string().required('Поле обязательно').trim().max(255, 'Слишком длинное имя'),
        reviewText: yup.string().optional(),
        reviewType: yup.string().required('Поле обязательно').oneOf(Object.values(ReviewType)),
        reviewDoctor: yup.string().optional(),
        reviewClinic: yup.string().optional(),
        reviewService: yup.string().optional(),
    }),
    initialValues: {
        reviewName: '',
        reviewText: '',
        reviewType: ReviewType.Doctor,
        reviewDoctor: undefined,
        reviewClinic: undefined,
        reviewService: undefined
    }
})
var {createReviewMutation} = useQueries()
var {mutate} = useMutation(createReviewMutation)

var onProcess = handleSubmit(async (values) => {
    await mutate({
        data: {
            review: {
                clinic: values.reviewClinic,
                doctor: values.reviewDoctor,
                name: values.reviewName,
                reviewType: values.reviewType,
                reviewText: values.reviewText,
                sub_service: values.reviewService
            }
        }
    })
    useNuxtApp().$toast.success('Ваша заявка отправлена')
    resetForm() 
})

var radioOptions = markRaw([
    {
        value: ReviewType.Clinic,
        label: 'Отзыв о клинике',
    },
    {
        label: 'Отзыв о враче',
        value: ReviewType.Doctor,
    },
])

var globalStore = useGlobalStore()
var { services, doctors, clinics } = storeToRefs(globalStore)
var servicesOptions = computed(() =>
    services.value?.map((service) => {
        return {
            value: service.id,
            label: service.attributes.title,
            children: service.attributes.sub_services.data?.map((subS) => ({
                value: subS.id,
                disabled: !doctors.value.some(doc => doc.attributes.sub_services.data.some(s => s.id === subS.id)),
                label: subS.attributes.title,
            })),
        }
    }),
)

var doctorsOptions = computed(() => {
    if (values.reviewService) {
        const list =  doctors.value.filter(doctor => doctor.attributes.sub_services.data.some(s => s.id === values.reviewService)).map((doc) => ({
            value: doc.id,
            label: doc.attributes.name,
        }))
        setFieldValue('reviewDoctor', undefined)

        return list
    }
    return doctors.value.map((doc) => ({
        value: doc.id,
        label: doc.attributes.name,
    }))
})

var clinicsOptions = computed(() => clinics.value.map((clinic) => ({
    value: clinic.id,
    label: clinic.attributes.label
})))

watch(
    () => props.doctor,
    () => {
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
    <form @submit.prevent="onProcess" class="px-4 lg:pl-0 lg:pr-[6.25rem]">
        <h4
            class="font-serif text-accent lg:font-semibold lg:text-[3rem] text-[1.75rem] mb-10 lg:mb-12"
        >
            Оставьте свой отзыв о враче
        </h4>
        <UiInput
            placeholder="Иван Иванов"
            name="reviewName"
            type="text"
            data-maska="A A A" data-maska-tokens="A:[а-яА-Яa-zA-ZёЁ]:multiple"
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
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-5 lg:gap-10 lg:mb-12 mb-8">
            <template v-if="values.reviewType === ReviewType.Clinic">
                <UiSelect
                    class="w-full"
                    name="reviewClinic"
                    label="Клиника"
                    placeholder="Выберите клинику"
                    :options="clinicsOptions"
                />
            </template>
            <template v-else>
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
            </template>
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
