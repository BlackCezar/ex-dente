<script setup lang="ts">
import * as yup from 'yup'
import { RequestType } from '~/types/global.type'


var {handleSubmit, isSubmitting, values} = useForm({
     validationSchema: yup.object().shape({
         username: yup.string().required('Поле обязательно').trim().max(255, 'Слишком длинное имя'),
         phone: yup.string().required('Поле обязательно').max(16, 'Не больше 16 символов').matches(/^((8|\+7)[\- ]?)?(\(?\d{3}\)?[\- ]?)?[\d\- ]{7,10}$/, 'Неверный формат')
     })
})
var {createRequest: createRequestMutation} = useQueries();
var isDone = ref(false)

var {mutate} = useMutation(createRequestMutation)

var onProcess = handleSubmit(async (values) => {
    await mutate({
        data: {
            request: {
                name: values.username,
                phoneNumber: values.phone,
                type: RequestType.Doctor,
            }
        }})
    isDone.value = true;
})

</script>
<template>
<form @submit.prevent="onProcess">
    <h2 class="text-white lg:leading-[3.625rem] font-semibold mb-3 lg:mb-2 text-[1.75rem] font-serif lg:text-[3rem]">{{isDone ? 'Вы успешно записались на консультацию' : 'Запишитесь на консультацию'}}</h2>
    <h3 class="text-[1.125rem] lg:leading-[2.875rem] lg:text-[1.75rem] text-white text-opacity-70 mb-8 lg:mb-12">{{ isDone ? 'наш администратор свяжется с вами в ближайшее время' : 'и мы сделаем вашу улыбку яркой и здоровой'}}</h3>
    <div class="flex flex-col gap-4 mb-8 lg:mb-12 lg:gap-10 lg:flex-row">
        <UiInput data-maska="A A A" data-maska-tokens="A:[а-яА-Яa-zA-ZёЁ]:multiple" name="username" type="text" placeholder="Ваше имя" />
        <UiInput name="phone" type="tel" placeholder="+7" data-maska-tokens="N:[0-79]" />
    </div>
    <div class="flex flex-col gap-6 lg:gap-10 lg:items-center lg:flex-row">
        <p class="text-opacity-50 text-white text-[0.875rem]">Нажимая на кнопку «Отправить», вы даете свое согласиена обработку персональных данных</p>
        <UiButton :disabled="isSubmitting" type="submit" class="!w-full lg:!w-fit lg:!min-w-[18rem]" mode="dark">
            <template v-if="isDone">Отправлено <svgo-check /></template>
            <template v-else>отправить</template>
        </UiButton>
    </div>
</form>
</template>