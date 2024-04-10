<script setup lang="ts">
import type { InputHTMLAttributes } from 'vue'

defineProps<{
    name: string
    label?: string
    dataMaska?: string
    dataMaskaTokens?: string
    mode?: 'dark' | 'light'
    placeholder?: InputHTMLAttributes['placeholder']
    autocomplete?: InputHTMLAttributes['autocomplete']
    type?: InputHTMLAttributes['type']
}>()
</script>

<template>
    <label class="input-label" :data-mode="mode ? mode : 'dark'"
        ><span>{{ label }}</span>
        <Field
            :name="name"
            :type="type ? type : 'text'"
            v-slot="{ meta, field, handleChange, value }"
        >
            <input
                :autocomplete="autocomplete"
                class="input"
                :placeholder="placeholder"
                :class="{
                    valid: meta.valid && meta.touched,
                    invalid: !meta.valid && meta.touched,
                }"
                @input="handleChange"
                :value="value"
                v-bind="field"
                v-maska
                :data-maska="type === 'tel' ? '+7 N## ### ##-##' : dataMaska ? dataMaska : null"
                :data-maska-tokens="dataMaskaTokens"
            />
        </Field>
    </label>
</template>

<style>
.input {
    @apply border-b-white transition-colors border-opacity-40 border-b w-full text-white py-[0.62rem] text-[1.125rem] lg:text-[1.375rem] bg-transparent;
}
.input:focus,
.input:focus-visible,
.input:focus-within {
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

.input-label[data-mode='light'] {
    @apply flex gap-2 flex-col;
}
.input-label[data-mode='light'] span {
    @apply text-accent leading-[1.625rem];
}
.input-label[data-mode='light'] .input {
    @apply bg-gray rounded-[0.375rem] border border-gray pl-6 pr-3 py-4 text-[1.125rem] text-accent max-h-[3.75rem];
}
.input-label[data-mode='light'] .input.valid {
    @apply border-system-success;
}
.input-label[data-mode='light'] .input.invalid {
    @apply border-system-danger;
}
.input-label[data-mode='light'] .input:focus {
    @apply border-secondary-before;
}
.input-label[data-mode='light'] .input:disabled {
    @apply text-opacity-50 border-gray;
}

</style>
