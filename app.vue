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
import type { DoctorPage } from '~/types/doctors.type'

var globalStore = useGlobalStore()
var { commonConfigQuery, mainMenuQuery, servicesQuery, doctorsListQuery } = useQueries()

var { data: mainMenu } = await useAsyncQuery<MainMenu>(mainMenuQuery)
var { data: commonConfig } =
    await useAsyncQuery<CommonConfig>(commonConfigQuery)
var { data: services } = await useAsyncQuery<Services>(servicesQuery)
var {data: doctors} = await useAsyncQuery<DoctorPage>(doctorsListQuery)

globalStore.setMainMenu(mainMenu.value)
globalStore.setAppConfig(commonConfig.value)
globalStore.setServices(services.value?.services.data)
globalStore.setDoctors(doctors.value?.doctors.data)

// if (commonConfig.value?.data.value)
//     globalStore.setAppConfig(commonConfig.value?.data.value)
// if (mainMenu.value?.data.value)
//     globalStore.setMainMenu(mainMenu.value?.data.value)
</script>
