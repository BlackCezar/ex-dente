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
            }, {
                src: 'https://www.googletagmanager.com/gtag/js?id=G-E0PFXS4SX0',
                async: true
            }, {
                innerHTML: `  window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
              
                gtag('config', 'G-E0PFXS4SX0');`
            }, {
                innerHTML: ` (function(m,e,t,r,i,k,a){m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
                m[i].l=1*new Date();
                for (var j = 0; j < document.scripts.length; j++) {if (document.scripts[j].src === r) { return; }}
                k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)})
                (window, document, "script", "https://mc.yandex.ru/metrika/tag.js", "ym");
             
                ym(96536061, "init", {
                     clickmap:true,
                     trackLinks:true,
                     accurateTrackBounce:true,
                     webvisor:true
                });`
            }],
            noscript: [
                {
                    innerHTML: `<div><img src="https://mc.yandex.ru/watch/96536061" style="position:absolute; left:-9999px;" alt="" /></div>`
                }
            ]
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
            Disallow: ['/search/', '/uploads/', '/admin', '*?*'],
            Sitemap: `https://ex-dent.com/sitemap.xml`
        }
    },
    meilisearch: {
        hostUrl: 'https://admin.ex-dent.com/search',
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
                httpEndpoint: 'https://admin.ex-dent.com/graphql',
            },
        },
    },
})
