<script setup lang="ts">
defineProps<{
    post: {
        id: string
        attributes: {
            title: string
            text: string
        }
    }
}>()

const summary = ref<HTMLDivElement | null>(null)

function onDetailsContentClick() {
    if (summary.value) summary.value.click()
}
</script>
<template>
    <details :id="`post-${post.id}`">
        <a :href="`#post-${post.id}`"></a>
        <summary ref="summary" class="flex px-4 lg:px-7 lg:pt-8 pt-4 gap-5 justify-between">
            <span class="text-accent lg:text-[1.375rem] text-opacity-70 lg:text-opacity-100">{{ post.attributes.title
            }}</span>
            <svgo-chevron-left class="icon-left" />
            <svgo-chevron-right class="icon-right" />
        </summary>
        <p @click="onDetailsContentClick"
            class="text-[0.875rem] lg:text-[1.375rem] px-4 lg:px-7 text-accent text-opacity-60">
            {{ post.attributes.text }}
        </p>
    </details>
</template>
<style scoped>
details {
    @apply bg-gray rounded-[0.375rem] cursor-pointer;
}

details[open] {
    @apply bg-secondary transition-colors;
}

details summary {
    @apply pb-4 lg:pb-8;
    outline: none;
    transition: margin 150ms ease-out;
}

details[open] summary {
    @apply pb-0 mb-4;
    cursor: pointer;
}

details[open]>*:last-child {
    @apply pb-4 lg:pb-8;
}

details .icon-left {
    display: block;
}

details .icon-right {
    display: none;
}

details[open] .icon-left {
    display: none;
}

details[open] .icon-right {
    display: block;
}

.icon-left,
.icon-right {
    @apply text-[1.5rem] min-w-[1.5rem] lg:text-[1.75rem] lg:min-w-[1.75rem];
    margin-bottom: 0 !important;
}
</style>