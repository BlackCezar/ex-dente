<script setup lang="ts">
import { useForm } from 'vee-validate'
import * as yup from 'yup'
import { useGlobalStore } from '~/store/global.store'
import { storeToRefs } from '#imports'
import { RequestType } from '~/types/global.type';

var props = defineProps<{
    doctor?: {
        id: string
        img: string
        name: string
    }
}>()

var { handleSubmit, setFieldValue, resetForm } = useForm({
    validationSchema: yup.object().shape({
        selectedName: yup.string().required('Поле обязательно').trim().max(255, 'Слишком длинное имя'),
        selectedPhone: yup.string().required('Поле обязательно').max(16, 'Не больше 16 символов').matches(/^((8|\+7)[\- ]?)?(\(?\d{3}\)?[\- ]?)?[\d\- ]{7,10}$/, 'Неверный формат'),
        selectedService: yup.string().optional(),
        selectedDoctor: yup.string().optional(),
    }),
})
var {createRequest: createRequestMutation} = useQueries();
var {mutate} = useMutation(createRequestMutation)

var onProcess = handleSubmit(async (values) => {
    try {
        await mutate({
            data: {
                request: {
                    type: RequestType.Doctor,
                    doctor: values.selectedDoctor,
                    name: values.selectedName,
                    phoneNumber: values.selectedPhone,
                    sub_service: values.selectedService
                }
            }
        }) 
        useNuxtApp().$toast.success('Ваша заявка отправлена')
        resetForm()
    } catch (err) {
        console.log(err)
    }
})
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
        if (props.doctor?.id) {
            setFieldValue('selectedDoctor', props.doctor.id)
        }
    },
    {
        deep: true,
        immediate: true,
    },
)
</script>

<template>
    <form @submit.prevent="onProcess">
        <h2
            class="font-serif text-[1.75rem] font-semibold mb-10 text-white lg:text-[3rem]"
        >
            Запишитесь на прием
        </h2>
        <div
            class="grid w-full grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-10 mb-4 lg:mb-[4rem]"
        >
            <UiSelect
                mode="dark"
                :options="servicesOptions"
                name="selectedService"
                placeholder="Любое направление"
            />
            <UiSelect
                mode="dark"
                :options="doctorsOptions"
                name="selectedDoctor"
                placeholder="Выберите врача"
            />
        </div>
        <div
            class="grid w-full grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-10 mb-8 lg:mb-12"
        >
            <UiInput mode="dark" data-maska="A A A" data-maska-tokens="A:[а-яА-Яa-zA-ZёЁ]:multiple" name="selectedName" placeholder="Ваше имя" />
            <UiInput
                mode="dark"
                type="tel"
                name="selectedPhone"
                placeholder="+7"
                data-maska-tokens="N:[0-79]"
            />
        </div>
        <div class="flex flex-col items-center lg:flex-row gap-6 lg:gap-10">
            <p class="text-white text-[0.875rem] text-opacity-50 lg:text-base">
                Нажимая на кнопку «Отправить», вы даете свое согласие на
                обработку персональных данных
            </p>
            <UiButton @click="onProcess" mode="dark" class="lg:!w-[15rem] lg:min-w-[15rem] !w-full"
                >Отправить</UiButton
            >
        </div>
    </form>
</template>

<style scoped></style>
