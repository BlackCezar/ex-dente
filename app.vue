<template>
    <div>
        <TheHeader />
        <NuxtPage />
        <Suspense>
            <TheFooter />
        </Suspense>
    </div>
</template>
<script setup lang="ts">
import type { CommonConfig, MainMenu } from '~/types/global.type'
import { useGlobalStore } from '~/store/global.store'

var globalStore = useGlobalStore()
var { commonConfigQuery, mainMenuQuery } = useQueries()
var { data: commonConfig } = await useAsyncQuery<CommonConfig>(
    commonConfigQuery
)
var { data: mainMenu } = await useAsyncQuery<MainMenu>(mainMenuQuery)

globalStore.setAppConfig(commonConfig.value)
globalStore.setMainMenu(mainMenu.value)
</script>
