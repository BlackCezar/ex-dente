<script setup lang="ts">
import {useForm} from 'vee-validate'
import * as yup from 'yup'

var {} = useForm({
     validationSchema: yup.object().shape({
         username: yup.string().required(),
         phone: yup.string().required()
     })
})
</script>
<template>
<form>
    <h2 class="text-white lg:leading-[3.625rem] font-semibold mb-3 lg:mb-2 text-[1.75rem] font-[Mignon] lg:text-[3rem]">Запишитесь на консультацию</h2>
    <h3 class="text-[1.125rem] lg:leading-[2.875rem] lg:text-[1.75rem] text-white text-opacity-70 mb-8 lg:mb-12">и мы сделаем вашу улыбку яркой и здоровой</h3>
    <div class="flex flex-col gap-4 mb-8 lg:mb-12 lg:gap-10 lg:flex-row">
        <Field name="username" type="text" v-slot="{meta, field}">
            <input class="border-b w-full text-white  py-[0.62rem] text-[1.125rem] lg:text-[1.375rem] bg-transparent" placeholder="Ваше имя" :class="{
                'border-b-[#98D27C]': meta.valid && meta.touched,
                'border-b-white border-opacity-40': !meta.touched,
            }" v-bind="field" />
        </Field>
        <Field name="phone" type="tel" v-slot="{meta, field}">
            <input class="border-b w-full text-white py-[0.62rem] text-[1.125rem] lg:text-[1.375rem] bg-transparent" :class="{
                'border-b-[#98D27C]': meta.valid && meta.touched,
                'border-b-white border-opacity-40': !meta.touched,
            }" placeholder="+7"  v-bind="field"/>
        </Field>
    </div>
    <div class="flex flex-col gap-6 lg:gap-10 lg:items-center lg:flex-row">
        <p class="text-opacity-50 text-white text-[0.875rem]">Нажимая на кнопку «Отправить», вы даете свое согласие на обработку персональных данных</p>
        <UiButton class="!w-full lg:!w-fit" mode="dark">отправить</UiButton>
    </div>
</form>
</template>