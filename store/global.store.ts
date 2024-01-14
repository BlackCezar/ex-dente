import { defineStore } from 'pinia'
import type { CommonConfig, GlobalStore, MainMenu } from '~/types/global.type'

export var useGlobalStore = defineStore('global', {
    state: (): GlobalStore => ({
        config: null,
        mainMenu: null,
        services: [],
        doctors: [],
    }),
    getters: {
        phoneNumber: (state) =>
            state?.config?.commonConfig?.data?.attributes?.phoneNumber ?? '',
        address: (state) =>
            state?.config?.commonConfig?.data?.attributes?.address ?? '',
        email: (state) =>
            state?.config?.commonConfig?.data?.attributes?.email ?? '',
        logo: (state) =>
            state?.config?.commonConfig?.data?.attributes?.logo?.[0] ?? '',
    },
    actions: {
        setServices(services: any) {
            this.services = services
        },
        setDoctors(list: any) {
            this.doctors = list
        },
        setAppConfig(config: CommonConfig) {
            this.config = config
        },
        setMainMenu(mainMenu: MainMenu) {
            this.mainMenu = mainMenu
        },
    },
})
