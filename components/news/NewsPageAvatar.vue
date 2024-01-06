<script setup lang="ts">
import type { UploadFileEntityResponse } from '~/types/global.type'

defineProps<{
    avatar: UploadFileEntityResponse
}>()
var config = useAppConfig()
</script>

<template>
    <div>
        <img
            class="aspect-square max-w-[34rem] w-full object-cover object-center"
            :src="config.assetsUri + avatar.data?.attributes.formats.medium.url"
            :alt="avatar.data?.attributes.alternativeText"
            :title="avatar.data?.attributes.caption"
        />
    </div>
</template>

<style scoped></style>
