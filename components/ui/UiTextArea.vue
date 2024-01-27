<script setup lang="ts">
var props = defineProps<{
    name: string
    placeholder?: string
    label?: string;
    mode?: 'light' | 'dark'
    modelValue?: string | null
}>()
const emit = defineEmits(['update:modelValue'])
</script>

<template>
    <label class="flex flex-col gap-2">
        <span v-if="label">{{ label }}</span>
        <Field :name="name" v-slot="{ meta, field }">
            <textarea
                :name="name"
                :placeholder="placeholder"
                :data-mode="mode ? mode : 'light'"
                v-bind="field"
                :class="{
                    valid: meta.valid && meta.touched,
                    invalid: !meta.valid && meta.touched,
                }"
                @input="emit('update:modelValue', $event)"
            />
        </Field>
    </label>
</template>

<style scoped>
textarea[data-mode='light'] {
    @apply appearance-none w-full transition-colors border pr-[3rem] lg:text-[1.125rem] border-gray outline-0 px-6 py-[0.88rem] text-accent text-opacity-80 rounded-[0.375rem] bg-gray;
}

textarea[data-mode='light']:focus {
    @apply border-secondary-before;
}
textarea[data-mode='light']:disabled {
    @apply text-opacity-50 border-gray;
}
textarea[data-mode='light'].valid {
    @apply border-system-success;
}

textarea[data-mode='light'].invalid {
    @apply border-system-danger;
}
</style>
