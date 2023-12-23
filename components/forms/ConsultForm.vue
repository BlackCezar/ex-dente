<script setup lang="ts">
import {useForm} from 'vee-validate'
import * as yup from 'yup'

var {handleSubmit, isSubmitting} = useForm({
     validationSchema: yup.object().shape({
         username: yup.string().required(),
         phone: yup.string().required()
     })
})

var onProcess = handleSubmit(async (values) => {

})
</script>
<template>
<form @submit.prevent="onProcess">
    <h2 class="text-white lg:leading-[3.625rem] font-semibold mb-3 lg:mb-2 text-[1.75rem] font-[Mignon] lg:text-[3rem]">Запишитесь на консультацию</h2>
    <h3 class="text-[1.125rem] lg:leading-[2.875rem] lg:text-[1.75rem] text-white text-opacity-70 mb-8 lg:mb-12">и мы сделаем вашу улыбку яркой и здоровой</h3>
    <div class="flex flex-col gap-4 mb-8 lg:mb-12 lg:gap-10 lg:flex-row">
        <UiInput name="username" type="text" placeholder="Ваше имя" />
        <UiInput name="phone" type="tel" placeholder="+7" />
    </div>
    <div class="flex flex-col gap-6 lg:gap-10 lg:items-center lg:flex-row">
        <p class="text-opacity-50 text-white text-[0.875rem]">Нажимая на кнопку «Отправить», вы даете свое согласие на обработку персональных данных</p>
        <UiButton :disabled="isSubmitting" type="submit" class="!w-full lg:!w-fit" mode="dark">отправить</UiButton>
    </div>
</form>
</template>