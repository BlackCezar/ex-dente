<script setup lang="ts">

defineProps<{
    name: string;
    label?: string
    caption?: string
}>()

var inputRef = ref<HTMLInputElement>(null)
var fileName = ref('')

function onChange() {
    if (inputRef.value?.files.length) fileName.value = inputRef.value.files[0].name
}
</script>
<template>
    <label>
        <Field :name="name" type="file" v-slot="{field, value}">
            <input @change="onChange" ref="inputRef" class="appearance-none hidden" type="file" :name="name" v-bind="field" />
            <span class="flex flex-col lg:flex-row lg:flex-wrap gap-1 lg:gap-5">
                <span class="flex gap-2 items-center">
                    <svgo-attach filled class="text-[1.5rem] text-secondary" />
                    <span>{{ fileName ? fileName : label }}</span>
                </span>
                <span class="pl-[0.3rem] lg:pl-0 text-opacity-30 text-accent lg:text-[1.125rem]" v-if="caption">{{caption}}</span>
                <ErrorMessage class="pl-[0.3rem] lg:pl-0 text-system-danger text-[0.875rem] lg:text-base" :name="name" />
            </span>
        </Field>
    </label>
</template>