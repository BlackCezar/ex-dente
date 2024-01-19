<template>
    <div>
        <Suspense>
            <TheHeader />
            <template #fallback><UiPageSpinner /></template>
        </Suspense>
        <ErrorComponent :error="error" />
        <Suspense>
            <TheFooter />
            <template #fallback><UiPageSpinner /></template>
        </Suspense>
    </div>
</template>
<script setup lang="ts">
import ErrorComponent from '~/components/common/ErrorComponent.vue'
import { useGlobalStore } from '~/store/global.store'
import type { CommonConfig, MainMenu, Services } from '~/types/global.type'
import type { DoctorPage } from '~/types/doctors.type'
defineProps<{
    error: any
}>()

var globalStore = useGlobalStore()
var { commonConfigQuery, mainMenuQuery, servicesQuery, doctorsListQuery } =
    useQueries()

var { data: mainMenu } = await useAsyncQuery<MainMenu>(mainMenuQuery)
var { data: commonConfig } =
    await useAsyncQuery<CommonConfig>(commonConfigQuery)
var { data: services } = await useAsyncQuery<Services>(servicesQuery)
var { data: doctors } = await useAsyncQuery<DoctorPage>(doctorsListQuery)

globalStore.setMainMenu(mainMenu.value)
globalStore.setAppConfig(commonConfig.value)
globalStore.setServices(services.value?.services.data)
globalStore.setDoctors(doctors.value?.doctors.data)
</script>
