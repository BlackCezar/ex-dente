<script setup lang="ts">
import type { ITextItems } from '~/types/global.type';
import RenderBlocks from '~/components/common/RenderBlocks.vue'

defineProps<{
    info: ITextItems[]
}>()
</script>
<template>
    <div v-if="info" class="px-4 legal-info py-10 lg:p-14 rounded-[6px] lg:w-full text-accent text-opacity-70 lg:ml-0 -ml-4 w-screen bg-gray">
        <h1 class="mb-6 lg:text-[3rem] lg:mb-10 font-serif font-semibold  leading-[2rem] text-[1.75rem]">Юридическая информация</h1> 
        <div class="content  text-accent text-opacity-70">
            <RenderBlocks :text="info" />
        </div>
    </div>
</template>
<style>
.legal-info .content ul:last-child {
    @apply mb-0;
}
.legal-info .content p:last-child {
    @apply mb-0;
}
</style>