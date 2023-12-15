<script setup lang="ts">
import { useGlobalStore } from '~/store/global.store'
import { storeToRefs } from 'pinia'

var globalStore = useGlobalStore()
var { logo } = storeToRefs(globalStore)
var config = useAppConfig()

defineProps<{
    light?: boolean
}>()
</script>
<template>
    <nuxt-link to="/" title="Ссылка на главную" class="block">
        <img
            class="h-10 lg:h-[4.25rem] object-cover"
            v-if="logo && typeof logo === 'object'"
            :src="`${config.assetsUri}${
                !light
                    ? logo.logoDark.data?.[0]?.attributes.url
                    : logo.logoLight.data?.attributes.url
            }`"
            alt="Логотип"
        />
    </nuxt-link>
</template>

<style scoped></style>
