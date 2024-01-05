<template>
    <div>
        <Suspense>
            <TheHeader />
            <template #fallback><UiPageSpinner /></template>
        </Suspense>
        <NuxtPage />
        <Suspense>
            <TheFooter />
            <template #fallback><UiPageSpinner /></template>
        </Suspense>
    </div>
</template>
<script setup lang="ts">
import type {CommonConfig, MainMenu, Services} from '~/types/global.type'
import { useGlobalStore } from '~/store/global.store'

var globalStore = useGlobalStore()
var { commonConfigQuery, mainMenuQuery, servicesQuery } = useQueries()

var { data: mainMenu } = await useAsyncQuery<MainMenu>(mainMenuQuery)
var { data: commonConfig } =
    await useAsyncQuery<CommonConfig>(commonConfigQuery)
var { data: services } = await useAsyncQuery<Services>(servicesQuery)

globalStore.setMainMenu(mainMenu.value)
globalStore.setAppConfig(commonConfig.value)
globalStore.setServices(services.value?.services.data)

// if (commonConfig.value?.data.value)
//     globalStore.setAppConfig(commonConfig.value?.data.value)
// if (mainMenu.value?.data.value)
//     globalStore.setMainMenu(mainMenu.value?.data.value)
</script>
