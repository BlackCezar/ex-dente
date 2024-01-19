<script setup lang="ts">
var props = defineProps<{
    label: string
    name: string
    value: string
}>()

var { handleChange, checked } = useField(() => props.name, undefined, {
    type: 'checkbox',
    checkedValue: props.value,
})
</script>

<template>
    <label
        class="checkbox-input transition-colors cursor-pointer hover:bg-secondary-before flex gap-4 px-6 py-4 rounded-[0.375rem] bg-gray"
    >
        <Field :name="name" type="checkbox" :value="value">
            <input
                :name="name"
                type="checkbox"
                :checked="checked"
                @change="handleChange(value)"
                :value="value"
            />
        </Field>
        <span class="text-[1.125rem] text-accent">{{ label }}</span>
    </label>
</template>

<style>
.checkbox-input input {
    @apply rounded-[0.125rem] bg-white transition-colors appearance-none bg-white w-6 h-6;
}
.checkbox-input input:checked {
    @apply bg-secondary;
    background-image: url('~/assets/icons/check.svg');
    background-position: center;
    background-size: cover;
}
.checkbox-input:has(input:checked) {
    @apply bg-secondary;
}
</style>
