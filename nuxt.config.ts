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
    ],
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
    apollo: {
        clients: {
            default: {
                httpEndpoint: 'http://217.28.220.193:1337/graphql',
            },
        },
    },
})
