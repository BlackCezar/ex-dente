<script setup lang="ts">
import type { TTag } from '~/types/global.type'
import * as yup from 'yup'

defineProps<{
    tags: TTag[]
}>()

var emit = defineEmits<{
    (event: 'update', payload: string[]): void
}>()

var { values, setFieldValue } = useForm({
    validationSchema: yup.object().shape({
        tags: yup.array().of(yup.string()),
    }),
    initialValues: {
        tags: [],
    },
})

watch(
    () => values,
    () => {
        console.log('values update', values.tags)
        emit('update', values.tags)
    },
    {
        deep: true,
    },
)
</script>

<template>
    <div class="flex gap-3 lg:gap-7 overflow-x-auto">
        <button
            :class="{
                checked: values.tags.length === 0,
            }"
            @click="setFieldValue('tags', [])"
            class="ui-checkbox"
        >
            Все
        </button>
        <Field
            v-for="tag of tags"
            name="tags"
            type="checkbox"
            :value="tag.id"
            as="label"
            class="ui-checkbox"
            v-slot="{ field }"
        >
            <input v-bind="field" type="checkbox" />
            <span> {{ tag.attributes.title }} </span>
        </Field>
    </div>
</template>

<style scoped>
.ui-checkbox {
    @apply text-accent cursor-pointer lg:rounded-[0.375rem] lg:text-[1.375rem] lg:px-10 hover:bg-secondary-before transition-colors text-opacity-70 flex items-center justify-center px-5 py-2 rounded-[0.25rem] bg-gray;
}

.ui-checkbox input {
    @apply appearance-none;
}

.ui-checkbox:has(input:checked),
.ui-checkbox.checked {
    @apply text-opacity-100 bg-secondary;
}
</style>
