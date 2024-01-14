<script setup lang="ts">
var props = defineProps<{
    options: {
        value: string
        label: string
    }[]
    name: string
    placeholder?: string
    mode?: 'light' | 'dark'
    modelValue?: string | null
}>()

const emit = defineEmits(['update:modelValue'])
</script>

<template>
    <div class="flex gap-5 lg:gap-12 flex-wrap">
        <template v-for="option in options" :key="option.value">
            <Field :name="name" :value="option.value" type="radio">
                <label
                    class="flex gap-3 radio items-center lg:text-[1.125rem] text-accent"
                    ><input type="radio" :name="name" :value="option.value" />{{
                        option.label
                    }}</label
                ></Field
            >
        </template>
    </div>
</template>

<style scoped>
.radio {
    @apply cursor-pointer;
}
.radio input {
    @apply appearance-none relative w-6 h-6 rounded-full bg-gray;
}
.radio input:disabled {
    @apply text-opacity-20 text-accent;
}
.radio input::after {
    @apply w-3 transition-opacity block opacity-0 rounded-full left-1.5 top-1.5 h-3 absolute bg-accent;
    content: '';
}

.radio input:checked::after {
    @apply opacity-100;
}
.radio input:disabled:checked::after {
    @apply opacity-100 bg-opacity-20;
}
</style>
