// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    devtools: { enabled: true },
    ssr: true,
    modules: [
        '@nuxtjs/tailwindcss',
        '@nuxtjs/apollo',
        '@pinia/nuxt',
        '@nuxtjs/google-fonts',
        'nuxt-svgo',
        'nuxt-swiper',
        '@vee-validate/nuxt',
        'nuxt-jsonld',
        '@nuxtjs/device',
        'vue-yandex-maps/nuxt',
    ],
    yandexMaps: {
        apikey: 'bdf9c487-5d09-421c-949d-9d8c7f583836',
    },
    googleFonts: {
        families: {
            'Proxima Nova': {
                wght: [300, 400, 700],
                ital: [400, 700],
            },
            Mignon: {
                wght: [700],
            },
        },
        display: 'swap',
    },
    tailwindcss: {
        cssPath: '~/assets/css/app.css',
    },
    pinia: {
        storesDirs: ['./store/**'],
    },
    apollo: {
        clients: {
            default: {
                httpEndpoint: 'http://217.28.220.193:1337/graphql',
            },
        },
    },
})
