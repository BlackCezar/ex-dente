import { defineStore } from 'pinia'
import type { CommonConfig, GlobalStore, MainMenu } from '~/types/global.type'

export var useGlobalStore = defineStore('global', {
    state: (): GlobalStore => ({
        config: null,
        mainMenu: null,
    }),
    getters: {
        phoneNumber: (state) =>
            state?.config?.commonConfig?.data?.attributes?.phoneNumber ?? '',
        logo: (state) =>
            state?.config?.commonConfig?.data?.attributes?.logo?.[0] ?? '',
    },
    actions: {
        setAppConfig(config: CommonConfig) {
            this.config = config
        },
        setMainMenu(mainMenu: MainMenu) {
            this.mainMenu = mainMenu
        },
    },
})
