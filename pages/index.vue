<script setup lang="ts">
import { useQueries } from '#imports'
import type { HomePage } from '~/types/global.type'
import MainSlider from '~/components/main/MainSlider.vue'
import BenefitsScreen from '~/components/main/BenefitsScreen.vue'
import MainCallBackForm from '~/components/main/MainCallBackForm.vue'
import MainReviewsScreen from '~/components/main/MainReviewsScreen.vue'
import NewsScreen from '~/components/news/NewsScreen.vue'
import SeoTextBlock from '~/components/seo/SeoTextBlock.vue'
import ServicesScreen from '~/components/services/ServicesScreen.vue'

var { homePage } = useQueries()
var { data } = await useAsyncQuery<HomePage>(homePage)

useSeo(data.value.homePage.data.attributes.title, data.value.homePage.data.attributes.seo)
</script>

<template>
    <div class="">
        <MainSlider :slides="data?.homePage?.data.attributes.slider" />
        <ServicesScreen />
        <BenefitsScreen />
        <MainReviewsScreen />
        <MainCallBackForm />
        <NewsScreen />
        <SeoTextBlock :content="data?.homePage?.data.attributes.seoText" />
    </div>
</template>

<style scoped></style>
