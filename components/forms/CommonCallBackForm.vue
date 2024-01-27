<script setup lang="ts">
import UiInput from '~/components/ui/Input.vue'
import UiRadio from '~/components/ui/UiRadio.vue'
import UiTextArea from '~/components/ui/UiTextArea.vue'
import UiUpload from '~/components/ui/UiUpload.vue'
import { RequestType, type SelectOption } from '~/types/global.type'
import * as yup from 'yup'
import {useGlobalStore} from '~/store/global.store';

var error = ref('')
var {values, isSubmitting, handleSubmit, setFieldValue, resetForm} = useForm({
    validationSchema: yup.lazy((val) => {
        let schema = {
            username: yup.string().required(),
            phone: yup.string().required(),
            requestType: yup.string().oneOf(Object.values(RequestType)).required(),
        }

        if (val.requestType === RequestType.Doctor) {
            return yup.object().shape({
                ...schema,
                selectedService: yup.string().optional(),
                selectedDoctor: yup.string().optional(),
            })
        } else if (val.requestType === RequestType.Resume) {
            return yup.object().shape({
                ...schema,
                resumeFile: yup.mixed().test('fileSize', 'Файл слишком большой', (v) => {
                    if (!v.length) return true;
                    return v[0].size <= 10_000_000 // 10 МБайт
                }).test('fileType', 'Неверный формат файла', (v) => {
                    return ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'].includes(v.type)
                }).required('Прикрепите резюме'),
                resumeMessage: yup.string().required(),
            })
        } 
        return yup.object().shape({
                ...schema,
                resumeMessage: yup.string().optional(),
            })
    }) ,
    initialValues: {
        username: '',
        phone: '',
        resumeMessage: '',
        resumeFile: undefined,
        selectedService: undefined,
        selectedDoctor: undefined,
        requestType: RequestType.Doctor
    }
})

var {createRequest: createRequestMutation} = useQueries();
var {mutate} = useMutation(createRequestMutation)
var emit = defineEmits<{
    (event: 'done'): void
}>()
var config = useAppConfig()

import { loadErrorMessages, loadDevMessages } from "@apollo/client/dev";

if (process.dev) {  // Adds messages only in a dev environment
  loadDevMessages();
  loadErrorMessages();
}


var handleForm = handleSubmit(async (values) => {
    error.value = ''
    try {
        var file = null

        if (values.requestType === RequestType.Resume && values.resumeFile) {
            const form = new FormData()
            form.append('files', values.resumeFile)
            var response = await fetch(config.assetsUri + '/api/upload', {
                method: 'post',
                body: form
            })
            var data = await response.json()
            file = data[0]?.id
        }

        await mutate({
            data: {
                request: {
                    doctor: values.selectedDoctor,
                    name: values.username,
                    phoneNumber: values.phone,
                    type: values.requestType,
                    resumeDoc: file,
                    sub_service: values.selectedService,
                    requestText: values.resumeMessage
                }
            }})
        resetForm()

        if (!error.value) {
            emit('done')
        }
    } catch (err) {
        error.value = 'Возникла непредвиденная ошибка'
    }
})
var reviewTypes = shallowRef<SelectOption[]>([{
    label: 'Записаться к врачу',
    value: RequestType.Doctor
}, {
    label: 'Отправить резюме',
    value: RequestType.Resume
}, {
    label: 'Задать вопрос',
    value: RequestType.Question
}])

var globalStore = useGlobalStore()
var { services, doctors } = storeToRefs(globalStore)
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
    if (values.selectedService) {
        return doctors.value.filter(doctor => doctor.attributes.sub_services.data.some(s => s.id === values.selectedService)).map((doc) => ({
            value: doc.id,
            label: doc.attributes.name,
        }))
    }
    return doctors.value.map((doc) => ({
        value: doc.id,
        label: doc.attributes.name,
    }))
})

useListen('call:callBackForm', (input) => {
    if (input?.doctor) {
        setFieldValue('requestType', RequestType.Doctor)
        setTimeout(() => {
            setFieldValue('selectedDoctor', input.doctor)
        }, 1000);

    }
})

</script>
<template>
    <form class="text-accent overflow-x-auto h-auto max-h-full" @submit.prevent="handleForm">
        <h2 class="font-[Mignon] text-accent text-[1.75rem] lg:text-[3rem] lg:mb-5 mb-3 font-semibold">Есть вопросы?</h2>
        <p class="text-[1.125rem] mb-10 lg:text-[1.375rem]">
            Оставьте заявку, и мы перезвоним вам в ближайшее время
        </p>
        <div class="grid mb-7 lg:mb-10 grid-cols-1 gap-5 lg:gap-10 lg:grid-cols-2">
            <UiInput label="Ваше имя*" placeholder="Иван Иванов" mode="light" name="username" />
            <UiInput type="tel" label="Телефон*" placeholder="+7" mode="light" name="phone" />
        </div>
        <div class="mb-10 lg:mb-[3.75rem]">
            <UiRadio class="flex-col lg:flex-row" :options="reviewTypes" name="requestType" />
        </div>
        <template v-if="values.requestType === RequestType.Doctor">
            <div class="grid mb-7 lg:mb-10 grid-cols-1 gap-5 lg:gap-10 lg:grid-cols-2">
                <UiSelect
                    mode="light"
                    :options="servicesOptions"
                    name="selectedService"
                    placeholder="Любое направление"
                />
                <UiSelect
                    mode="light"
                    :options="doctorsOptions"
                    name="selectedDoctor"
                    placeholder="Выберите врача"
                />
            </div>
        </template>
        <template v-else-if="values.requestType ===  RequestType.Resume">
        <div class="mb-8 lg:mb-[3.75rem]">
            <UiTextArea name="resumeMessage" placeholder="Введите текст" label="Сопроводительное письмо" class="mb-[1.69rem] lg:mb-8" />
            <UiUpload name="resumeFile" caption="файл docx, PDF до 10 МБ" label="Прикрепить резюме" />
        </div>
        </template>
        <template v-else-if="values.requestType ===  RequestType.Question">
            <div class="mb-8 lg:mb-[3.75rem]">
                <UiTextArea name="resumeMessage" placeholder="Введите текст" label="Ваш вопрос (необязательно)" />
            </div>
        </template>
        <div class="flex flex-col gap-6 lg:gap-10 lg:items-center lg:flex-row pb-24 lg:pb-8">
            <p class="text-opacity-50 text-accent text-[0.875rem]">Нажимая на кнопку «Отправить», вы даете свое согласиена обработку персональных данных</p>
            <UiButton @click="handleForm" :disabled="isSubmitting" type="submit" class="!w-full lg:max-w-[18rem]" mode="light">отправить</UiButton>
        </div>
        <p v-if="error" class="text-system-danger">{{error}}</p>
    </form>
</template>