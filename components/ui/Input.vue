<script setup lang="ts">
import type { InputHTMLAttributes } from 'vue'

defineProps<{
    name: string;
    placeholder?: InputHTMLAttributes['placeholder'];
    autocomplete?: InputHTMLAttributes['autocomplete']
    type?: InputHTMLAttributes['type']
}>()
</script>

<template>
    <Field :name="name" :type="type ? type : 'text'" v-slot="{meta, field}">
        <input :autocomplete="autocomplete" class="input" :placeholder="placeholder" :class="{
                'valid': meta.valid && meta.touched,
                'invalid': !meta.valid && meta.touched
            }" v-bind="field" v-maska :data-maska="type === 'tel' ? '+7 ### ### ##-##' : null" />
    </Field>
</template>

<style>
.input {
    @apply border-b-white transition-colors border-opacity-40 border-b w-full text-white py-[0.62rem] text-[1.125rem] lg:text-[1.375rem] bg-transparent;
}
.input:focus, .input:focus-visible, .input:focus-within {
    @apply border-opacity-100 outline-0;
}
.input:disabled {
    @apply placeholder-opacity-80 border-opacity-40;
}
.input.valid {
    @apply border-b-[#98D27C];
}
.input.invalid {
    @apply border-b-[#E1766F];
}
</style>