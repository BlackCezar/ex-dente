<script setup lang="ts">
import type { ComponentSlidersSlider, ITextItems } from '~/types/global.type'
import RenderBlocks from '~/components/common/RenderBlocks.vue'

defineProps<{
    text: ITextItems[]
    image: ComponentSlidersSlider
}>()

var config = useAppConfig()
</script>

<template>
    <div>
        <div
            class="grid grid-cols-1 gap-[3.75rem] lg:gap-[9rem] lg:grid-cols-[1fr_2fr] pb-[3.75rem] lg:pb-[11.25rem]"
        >
            <template v-for="img of image.banner.data" :key="img.id">
                <picture class="max-w-[25rem] mx-auto lg:max-w-max">
                    <source
                        media="(min-width: 1440px)"
                        :srcset="
                            config.assetsUri +
                            img.attributes?.formats.large_x2.url
                        "
                    />
                    <source
                        media="(min-width: 1024px)"
                        :srcset="
                            config.assetsUri +
                            img.attributes?.formats.medium_x2.url
                        "
                    />
                    <source
                        media="(min-width: 720px)"
                        :srcset="
                            config.assetsUri +
                            img.attributes?.formats.small_x2.url
                        "
                    />
                    <source
                        media="(min-width: 480px)"
                        :srcset="
                            config.assetsUri +
                            img.attributes?.formats.medium.url
                        "
                    />
                    <source
                        media="(max-width: 479px)"
                        :srcset="
                            config.assetsUri + img.attributes?.formats.small.url
                        "
                    />
                    <img
                        :src="
                            config.assetsUri +
                            img.attributes?.formats.medium_x2.url
                        "
                        :alt="img.attributes?.alternativeText"
                    />
                </picture>
            </template>
            <section class="about-text">
                <RenderBlocks :text="text" />
            </section>
        </div>
    </div>
</template>

<style>
.about-text > p:has(+ h1),
.about-text > p:has(+ h2),
.about-text > p:has(+ h3),
.about-text > p:has(+ h4),
.about-text > p:has(+ h5),
.about-text > p:has(+ h6) {
    @apply mb-10 lg:mb-[2.88rem];
}

.about-text p {
    @apply lg:text-[1.375rem] leading-[1.5rem] lg:leading-[2.25rem] text-white text-opacity-70;
}

.about-text h1,
.about-text h2,
.about-text h3,
.about-text h4,
.about-text h5,
.about-text h5 {
    @apply font-[Mignon] text-[1.125rem] font-medium lg:text-[1.75rem] mb-10 lg:mb-[2.88rem] text-white;
}
</style>
