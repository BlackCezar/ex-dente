<script setup lang="ts">
import type { SalePost } from '~/types/sales.type'

defineProps<{
    article: SalePost
    isWidth?: boolean
}>()

var appConfig = useAppConfig()
</script>

<template>
    <nuxt-link :to="`/sales/${article?.attributes.slug}`">
        <article
            class="flex flex-col group sales-item gap-6"
            :title="article.attributes.title"
        >
            <div class="relative flex items-center justify-center">
                <div
                    class="mb-2 bg-tooth aspect-[5/4] lg:aspect-square bg-no-repeat bg-secondary w-full bg-tooth-small bg-center lg:bg-tooth-big"
                    :class="{
                        '2xl:aspect-[52.5/25]': isWidth,
                    }"
                >
                    <picture class="w-full h-full block">
                        <source
                            media="(min-width: 1440px)"
                            :srcset="
                                appConfig.assetsUri +
                                article?.attributes.image?.data?.attributes
                                    .formats.large_x2.url
                            "
                        />
                        <source
                            media="(min-width: 1024px)"
                            :srcset="
                                appConfig.assetsUri +
                                article?.attributes.image?.data?.attributes
                                    .formats.medium_x2.url
                            "
                        />
                        <source
                            media="(min-width: 720px)"
                            :srcset="
                                appConfig.assetsUri +
                                article?.attributes.image?.data?.attributes
                                    .formats.small_x2.url
                            "
                        />
                        <source
                            media="(min-width: 480px)"
                            :srcset="
                                appConfig.assetsUri +
                                article?.attributes.image?.data?.attributes
                                    .formats.medium.url
                            "
                        />
                        <source
                            media="(max-width: 479px)"
                            :srcset="
                                appConfig.assetsUri +
                                article?.attributes.image?.data?.attributes
                                    .formats.small.url
                            "
                        />
                        <img
                            class="object-cover object-center w-full h-full"
                            :src="
                                appConfig.assetsUri +
                                article?.attributes.image?.data?.attributes
                                    .formats.medium_x2.url
                            "
                            onerror="this.style.display='none'"
                            :alt="
                                article?.attributes.image?.data?.attributes
                                    ?.alternativeText
                            "
                        />
                    </picture>
                </div>
                <svgo-more
                    filled
                    class="text-[13.75rem] transition-opacity opacity-0 group-hover:opacity-100 absolute svgo-more-icon"
                />
            </div>
            <div>
                <h3 class="mb-1 h4 font-serif">
                    {{ article.attributes.title }}
                </h3>
                <h4
                    class="text-accent text-opacity-50 leading-[1.625rem] lg:text-[1.375rem] lg:leading-[2.25rem]"
                >
                    {{ article.attributes.subtitle }}
                </h4>
            </div>
        </article>
    </nuxt-link>
</template>

<style>
.sales-item .bg-tooth {
    position: relative;
}
.sales-item .bg-tooth::after {
    opacity: 0;
    display: block;
    content: '';
    left: 0;
    top: 0;
    position: absolute;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.4);
    backdrop-filter: blur(5px);
    transition: opacity 0.3s ease-out;
}
.sales-item:hover .bg-tooth::after {
    opacity: 1;
}
.sales-item picture {
    overflow: hidden;
}
.sales-item img {
    @apply transition-transform;
}
.sales-item:hover img {
    transform-origin: center;
    transform: scale(1.1);
}
</style>
