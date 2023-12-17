<script setup lang="ts">
import { useQueries } from '#imports'
import type { HomePage } from '~/types/global.type'
import MainSlider from '~/components/main/MainSlider.vue'
import BenefitsScreen from '~/components/main/BenefitsScreen.vue'

var { homePage } = useQueries()
var { data } = await useAsyncQuery<HomePage>(homePage)

useSeoMeta({
    ogImage:
        data.value.homePage.data.attributes.seo.sharedImage.media.data
            .attributes.url,
    ogImageUrl:
        data.value.homePage.data.attributes.seo.sharedImage.media.data
            .attributes.url,
    ogImageAlt: data.value.homePage.data.attributes.seo.sharedImage.alt,
    title: data.value.homePage.data.attributes.title,
    keywords: data.value.homePage.data.attributes.seo.keywords,
    description: data.value.homePage.data.attributes.seo.metaDescription,
    ogDescription: data.value.homePage.data.attributes.seo.metaDescription,
    ogTitle: data.value.homePage.data.attributes.seo.metaTitle,
})
</script>

<template>
    <div class="">
        <MainSlider :slides="data.homePage.data.attributes.slider" />
	    <ServicesScreen />
	    <BenefitsScreen />
	    <MainReviewsScreen />
    </div>
</template>

<style scoped></style>
