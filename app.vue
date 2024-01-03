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
var { result: commonConfig } = useQuery<CommonConfig>(commonConfigQuery)
var { result: mainMenu } = useQuery<MainMenu>(mainMenuQuery)

if (commonConfig.value) globalStore.setAppConfig(commonConfig.value)
if (mainMenu.value) globalStore.setMainMenu(mainMenu.value)
</script>
