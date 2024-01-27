<template>
    <div>
        <CallBackPopUp />
        <Suspense>
            <TheHeader />
            <template #fallback>
                <UiPageSpinner />
            </template>
        </Suspense>
        <NuxtPage />
        <CookieBlock />
        <Suspense>
            <TheFooter />
            <template #fallback>
                <UiPageSpinner />
            </template>
        </Suspense>
    </div>
</template>
<script setup lang="ts">
import type { CommonConfig, MainMenu, Services, Clinics } from '~/types/global.type'
import { useGlobalStore } from '~/store/global.store'
import type { DoctorPage } from '~/types/doctors.type'
import CookieBlock from '~/components/common/CookieBlock.vue'

var globalStore = useGlobalStore()
var { commonConfigQuery, mainMenuQuery, servicesQuery, doctorsListQuery, clinicsQuery } =
    useQueries()

var { data: mainMenu } = await useAsyncQuery<MainMenu>(mainMenuQuery)
var { data: commonConfig } =
    await useAsyncQuery<CommonConfig>(commonConfigQuery)
var { data: services } = await useAsyncQuery<Services>(servicesQuery)
var { data: doctors } = await useAsyncQuery<DoctorPage>(doctorsListQuery)
var {data: clinics} = await useAsyncQuery<Clinics>(clinicsQuery)

globalStore.setMainMenu(mainMenu.value)
globalStore.setAppConfig(commonConfig.value)
globalStore.setServices(services.value?.services.data)
globalStore.setDoctors(doctors.value?.doctors.data)
globalStore.setClinics(clinics.value?.clinics.data)

onMounted(() => {
    if (process.client && window.isvek) {
        new window.isvek.Bvi()
    }
})
</script>
