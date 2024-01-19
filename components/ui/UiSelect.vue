<script setup lang="ts">
import type { SelectOption } from '~/types/global.type'

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
var deepOptions = computed(
    () => props.options?.some((item) => item.children?.length),
)

var { meta, value, handleChange } = useField(() => props.name)
</script>

<template>
    <label class="flex flex-col gap-2 w-full">
        <span class="text-accent" v-if="label">{{ label }}</span>
        <span class="relative w-full flex items-center">
            <select
                :name="name"
                :value="value"
                @input="handleChange"
                :data-mode="mode ? mode : 'light'"
                :class="{
                    valid: meta.valid && meta.touched,
                    invalid: !meta.valid && meta.touched,
                }"
            >
                <option v-if="placeholder" selected disabled value="">
                    {{ placeholder }}
                </option>
                <template v-if="deepOptions">
                    <optgroup
                        v-for="group of options"
                        :key="group.value"
                        :label="group.label"
                    >
                        <option
                            v-for="subG of group.children"
                            :key="subG.value"
                            :value="subG.value"
                            :selected="subG.value === value"
                        >
                            {{ subG.label }}
                        </option>
                    </optgroup>
                </template>
                <template v-else>
                    <option
                        v-for="group of options"
                        :key="group.value"
                        :selected="group.value === value"
                        :value="group.value"
                    >
                        {{ group.label }}
                    </option>
                </template>
            </select>
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

select[data-mode='dark'] {
    @apply appearance-none lg:text-[1.375rem] accent-accent cursor-pointer w-full transition-colors border-b pr-[3rem] border-b-white border-opacity-40 outline-0 py-[0.88rem] text-white text-opacity-80 bg-accent;
}
select[data-mode='dark']:focus {
    @apply border-opacity-80;
}
select[data-mode='dark']:disabled {
    @apply opacity-40 border-opacity-40;
}
select[data-mode='dark'].valid {
    @apply border-b-system-success border-opacity-100;
}

select[data-mode='dark'].invalid {
    @apply border-b-system-danger border-opacity-100;
}
</style>
