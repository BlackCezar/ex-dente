<script setup lang="ts">
import { useForm } from 'vee-validate'
import * as yup from 'yup'

var { handleSubmit, isSubmitting } = useForm({
    validationSchema: yup.object().shape({
        username: yup.string().required(),
        phone: yup.string().required(),
    }),
})

var onProcess = handleSubmit(async (values) => {})
</script>

<template>
    <form @submit.prevent="onProcess">
        <h2></h2>
    </form>
</template>

<style scoped></style>
