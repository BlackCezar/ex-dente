<script setup lang="ts">
import type { SelectOption } from '~/types/global.type'
import Selectic from 'selectic'

var props = withDefaults(
    defineProps<{
        options: SelectOption[]
        name: string
        label?: string
        placeholder?: string
        mode?: 'light' | 'dark'
        modelValue?: string | null
    }>(),
    {
        mode: 'light',
        label: '',
        name: '',
        modelValue: null,
    },
)

const emit = defineEmits(['update:modelValue'])
var deepOptions = computed(() =>
    props.options?.some((item) => item.children?.length),
)

var { meta, value, handleChange } = useField(() => props.name)
</script>

<template>
    <label class="flex flex-col gap-2 w-full">
        <span class="text-accent" v-if="label">{{ label }}</span>
        <span class="relative w-full flex items-center">
            <Selectic :value="value" @input="handleChange"  :name="name"   :data-mode="mode ? mode : 'light'"
                :class="{
                    valid: meta.valid && meta.touched,
                    invalid: !meta.valid && meta.touched,
                }"
                :placeholder="placeholder"
                :options="options.map(opt => ({
                    id: opt.value,
                    text: opt.label,
                    disabled: opt.disabled,
                    options: opt.children?.map(o => ({
                        id: o.value,
                        text: o.label
                    }))
                }))"
                />
            <svgo-chevron-down
                filled
                class="text-[1.5rem] lg:text-[2rem] absolute text-opacity-50 !mb-0"
                :class="{
                    'text-accent right-6': mode == 'light',
                    'text-white right-0': mode == 'dark',
                }"
            />
        </span>
    </label>
</template>

<style>
.selectic[data-mode='light'] {
    @apply appearance-none p-0 cursor-pointer w-full transition-colors border  lg:text-[1.125rem] border-gray outline-0 text-accent text-opacity-80 rounded-[0.375rem] bg-gray;
}

.selectic[data-mode='light']:focus {
    @apply border-secondary-before;
}

.selectic[data-mode='light']:disabled {
    @apply text-opacity-50 border-gray;
}

.selectic[data-mode='light'].valid {
    @apply border-system-success;
}

.selectic[data-mode='light'].invalid {
    @apply border-system-danger;
}

.selectic[data-mode='dark'] {
    @apply appearance-none lg:text-[1.375rem] accent-accent cursor-pointer w-full transition-colors border-b  border-b-white border-opacity-40 outline-0  text-white text-opacity-80 bg-accent;
}

.selectic[data-mode='dark']:focus {
    @apply border-opacity-80;
}

.selectic[data-mode='dark']:disabled {
    @apply opacity-40 border-opacity-40;
}

.selectic[data-mode='dark'].valid {
    @apply border-b-system-success border-opacity-100;
}

.selectic[data-mode='dark'].invalid {
    @apply border-b-system-danger border-opacity-100;
}

.selectic .selectic-input.form-control {
    @apply w-full px-6 h-auto  pr-[3rem] py-[0.88rem] bg-transparent rounded-none border-none shadow-none text-[1.125rem];
}
.selectic-container {
    @apply w-full;
}
.selectic[data-mode='dark'] .selectic-input.form-control {
    @apply pl-0 py-[0.88rem] lg:text-[1.375rem];
}
.selectic {
    --selectic-color: hsl(213, 63%, 12%);
    --selectic-bg: hsl(0, 0%, 99%);
    --selectic-color-disabled: hsl(210, 7%, 95%);
    --selectic-active-item-color: hsl(213, 63%, 12%);
    --selectic-active-item-bg: hsla(197, 58%, 87%, 0.8);
}
.selectic[data-mode='dark'] {
    --selectic-color: hsl(0, 0%, 99%);
}

.selectic .filter-panel {
    display: none;
}
.selectic__extended-list__list-items {
    min-width: auto !important;
}
.selectic .selectic-item {
    @apply whitespace-normal py-1.5;
}

</style>
