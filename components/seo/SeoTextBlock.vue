<script setup lang="ts">
import vueMarkdown from 'vue-markdown-render'

defineProps<{
    content?: string
}>()

var isShort = ref(true)
</script>

<template>
    <div class="bg-accent">
        <div
            class="lg:pt-[5rem] lg:pb-[7.5rem] pt-[3.75rem] pb-[5rem] mx-auto container text-white grid seo-text-wrapper"
            :class="{
                'is-short': isShort,
                'is-full': !isShort,
            }"
        >
            <vue-markdown
                :source="content"
                class="flex flex-col md text-ellipsis overflow-hidden gap-2"
            />
            <button
                @click="isShort = false"
                class="flex gap-2 mt-7 lg:mt-10 text-opacity-50 transition-colors text-white items-center hover:text-opacity-100"
            >
                <span class="text-[0.875rem] uppercase">развернуть</span>
                <svgo-arrow-right-bold class="text-[1.5rem]" />
            </button>
        </div>
    </div>
</template>

<style>
.seo-text-wrapper {
    grid-template-rows: minmax(999px, max-content) auto;
    transition: 300ms;
    justify-items: center;
}
.seo-text-wrapper .md {
    position: relative;
    min-height: 0;
}
.seo-text-wrapper.is-short {
    grid-template-rows: minmax(384px, 0.3fr) auto;
}
.seo-text-wrapper.is-short .md::after {
    position: absolute;
    z-index: 1;
    left: 0;
    top: 0;
    content: '';
    width: 100%;
    height: 100%;
    background: linear-gradient(180deg, #0b1c3100 0%, #0b1c31 100%);
}

.seo-text-wrapper.is-full button {
    display: none;
}
.md h1,
.md h2,
.md h3,
.md h5,
.md h4,
.md h6 {
    @apply mb-5 lg:mb-[3.75rem] uppercase;
}
.md h1 {
    @apply text-[1.5rem] lg:text-[2.5rem] font-[Mignon] font-semibold;
}
.md h2 {
    @apply text-[1.375rem] lg:text-[2rem] font-[Mignon] font-semibold;
}
.md h3 {
    @apply text-[1.25rem] lg:text-[1.75rem] font-[Mignon] font-semibold;
}
.md h4 {
    @apply text-[1.125rem] lg:text-[1.5rem] font-[Mignon] font-semibold;
}
.md h5 .md h6 {
    @apply font-[Mignon] font-semibold;
}
.md ul {
    @apply list-disc list-inside lg:text-[1.125rem];
}
.md ol {
    @apply list-decimal list-inside lg:text-[1.125rem];
}

.md p {
    @apply lg:text-[1.125rem];
}
</style>
