// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    devtools: { enabled: false },
    typescript: {
        tsConfig: {
            include: ["../types/*.ts", "../composables/*.ts"]
        }
    },
    experimental: {
        externalVue: false,
    },
    app: {
        head: {
            charset: 'utf-8',
            viewport: 'width=device-width, initial-scale=1',
            htmlAttrs: {
                lang: 'ru',
            },
            link: [{
                rel: 'manifest',
                href: '/site.webmanifest'
            }, {
                rel: 'icon',
                type: 'image/x-icon',
                href: 'favicon.ico'
            }, {
                rel: 'stylesheet',
                href: '/bvi.min.css',
            }],
            script: [{
                async: true,
                defer: true,
                type: 'text/javascript',
                src: '/js/bvi.min.js'
            }]
        }
    },
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
        'nuxt-meilisearch',
        '@nuxtjs/robots'
    ],
    robots: {
        rules: {
            UserAgent: '*',
            Allow: '/assets',
            Disallow: '/search/',
            Sitemap: (req) => `https://${req.headers.host}/sitemap.xml`
        }
    },
    meilisearch: {
        hostUrl: 'http://217.28.220.193/search',
        searchApiKey: 'ciDsceYWGpER82s2ufj3AoD3d1380Fd6SQAVtAfaoT8',
        adminApiKey: 'ciDsceYWGpER82s2ufj3AoD3d1380Fd6SQAVtAfaoT8',
        serverSideUsage: true
    },
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
                httpEndpoint: 'http://admin.ex-dent.ru/graphql',
            },
        },
    },
})
