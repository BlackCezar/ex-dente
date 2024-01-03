<script setup lang="ts">
import type { INewsItem } from '~/types/global.type'

defineProps<{
    article: INewsItem
    isDark?: boolean
}>()

var appConfig = useAppConfig()
</script>

<template>
    <nuxt-link :to="`/news/${article?.attributes.slug}`">
        <article
            class="flex flex-col group news-item gap-1"
            :title="article?.attributes.title"
        >
            <div class="relative flex items-center justify-center">
                <div
                    class="mb-2 bg-tooth aspect-square bg-no-repeat bg-secondary w-full bg-tooth-small bg-center lg:bg-tooth-big"
                >
                    <picture>
                        <source
                            media="(min-width: 1440px)"
                            :srcset="
                                appConfig.assetsUri +
                                article?.attributes.avatar?.data?.attributes
                                    .formats.large_x2.url
                            "
                        />
                        <source
                            media="(min-width: 1024px)"
                            :srcset="
                                appConfig.assetsUri +
                                article?.attributes.avatar?.data?.attributes
                                    .formats.medium_x2.url
                            "
                        />
                        <source
                            media="(min-width: 720px)"
                            :srcset="
                                appConfig.assetsUri +
                                article?.attributes.avatar?.data?.attributes
                                    .formats.small_x2.url
                            "
                        />
                        <source
                            media="(min-width: 480px)"
                            :srcset="
                                appConfig.assetsUri +
                                article?.attributes.avatar?.data?.attributes
                                    .formats.medium.url
                            "
                        />
                        <source
                            media="(max-width: 479px)"
                            :srcset="
                                appConfig.assetsUri +
                                article?.attributes.avatar?.data?.attributes
                                    .formats.small.url
                            "
                        />
                        <img
                            class="object-cover object-center"
                            :src="
                                appConfig.assetsUri +
                                article?.attributes.avatar?.data?.attributes
                                    .formats.medium_x2.url
                            "
                            onerror="this.style.display='none'"
                            :alt="
                                article?.attributes.avatar?.data?.attributes
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
            <time
                class="text-[0.875rem] lg:text-[1.125rem] text-opacity-50"
                :class="{
                    'text-accent': isDark,
                    'text-white': !isDark,
                }"
                :datetime="article?.attributes.publishedAt"
                >{{
                    new Date(
                        article?.attributes.publishedAt,
                    ).toLocaleDateString()
                }}</time
            >
            <h3
                class="text-opacity-70 lg:text-[1.75rem]"
                :class="{
                    'text-accent': isDark,
                    'text-white': !isDark,
                }"
            >
                {{ article?.attributes.title }}
            </h3>
        </article>
    </nuxt-link>
</template>

<style>
.news-item .bg-tooth {
    position: relative;
}
.news-item .bg-tooth::after {
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
.news-item:hover .bg-tooth::after {
    opacity: 1;
}

.svgo-more-icon g + path,
.svgo-more-icon g {
    transform-origin: center;
    animation: spin 12s linear infinite reverse;
}

.svgo-more-icon circle {
    @apply transition-colors;
    fill: hsla(197, 60%, 78%, 0);
}
.svgo-more-icon:hover circle {
    fill: hsla(197, 60%, 78%, 0.8);
}
</style>
