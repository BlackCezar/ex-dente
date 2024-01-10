<script setup lang="ts">
var props = defineProps<{
    options: {
        value: string
        label: string
        children?: {
            value: string
            label: string
        }[]
    }[]
    name: string
    placeholder?: string
    mode?: 'light' | 'dark'
    modelValue?: string | null
}>()

const emit = defineEmits(['update:modelValue'])
</script>

<template>
    <div class="relative w-fit flex items-center">
        <select
            :name="name"
            :value="props.modelValue"
            @input="emit('update:modelValue', $event.target.value)"
            :data-mode="mode ? mode : 'light'"
        >
            <option v-if="placeholder" selected disabled value="">
                {{ placeholder }}
            </option>
            <optgroup
                v-for="group of options"
                :key="group.value"
                :label="group.label"
            >
                <option
                    v-for="subG of group.children"
                    :key="subG.value"
                    :value="subG.value"
                >
                    {{ subG.label }}
                </option>
            </optgroup>
        </select>
        <svgo-chevron-down
            filled
            class="text-[1.5rem] lg:text-[2rem] absolute text-accent text-opacity-50 right-6"
        />
    </div>
</template>

<style scoped>
select[data-mode='light'] {
    @apply appearance-none cursor-pointer w-full transition-colors border pr-[3rem] lg:text-[1.125rem] border-gray outline-0 px-6 py-[0.88rem] text-accent text-opacity-80 rounded-[0.375rem] bg-gray;
}
select[data-mode='light']:focus {
    @apply border-secondary-before;
}
select[data-mode='light']:disabled {
    @apply text-opacity-50 border-gray;
}
select[data-mode='light'].valid {
    @apply border-system-success;
}

select[data-mode='light'].invalid {
    @apply border-system-danger;
}
</style>
