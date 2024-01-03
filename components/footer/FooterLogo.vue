<script setup lang="ts">
import { useGlobalStore } from '~/store/global.store'
import { storeToRefs } from '#imports'

var globalStore = useGlobalStore()
var appConfig = useAppConfig()
var { logo } = storeToRefs(globalStore)

var logoSrc = computed(() => {
    if (
        logo.value &&
        typeof logo.value === 'object' &&
        logo.value.logoDark.data?.length
    ) {
        return `${appConfig.assetsUri}${logo.value.logoDark.data[0].attributes.url}`
    }
    return ''
})
</script>

<template>
    <nuxt-link to="/" class="block" v-if="logo">
        <img
            class="w-[9.375rem] lg:w-[13.5rem]"
            :src="logoSrc"
            alt="Логотип в подвале"
        />
    </nuxt-link>
</template>

<style scoped></style>
