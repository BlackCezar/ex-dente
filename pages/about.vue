<script setup lang="ts">
import AboutHeroScreen from '~/components/about/HeroComponent.vue'
import AboutTextScreen from '~/components/about/TextScreen.vue'
import AboutBenefitsScreen from '~/components/about/BenefitsScreen.vue'
import useQueries from '~/composables/useQueries'
import type { AboutQuery } from '~/types/global.type'
import MainCallBackForm from '~/components/main/MainCallBackForm.vue'
import SeoTextScreen from '~/components/common/SeoTextScreen.vue'

var { aboutPageQuery } = useQueries()
var { data } = await useAsyncQuery<AboutQuery>(aboutPageQuery)
</script>
<template>
    <div class="bg-accent">
        <div class="container mx-auto">
            <AboutHeroScreen
                :title="data.about.data?.attributes.title"
                :slogan="data.about.data?.attributes.slogan"
                :button="data.about.data?.attributes.button"
                :poster="
                    data.about.data?.attributes.videoPoster?.data.attributes
                        .formats
                "
                :videoUrl="data.about.data?.attributes.videoUrl"
            />
            <section
                class="text-white text-[1.125rem] lg:text-[1.75rem] lg:max-w-[61rem] lg:leading-[2.875rem] mb-[3.75rem] lg:mb-[11.25rem]"
            >
                <p>
                    {{ data.about.data.attributes.description }}
                </p>
            </section>
            <AboutTextScreen
                :text="data.about.data?.attributes.aboutUsText"
                :image="data.about.data?.attributes.image"
            />
        </div>
    </div>
    <div class="bg-white">
        <AboutBenefitsScreen :list="data?.about?.data?.attributes?.benefits" />
        <AboutSlider :list="data?.about?.data?.attributes?.slider" />
    </div>
    <MainCallBackForm />
    <SeoTextScreen :list="data?.about?.data?.attributes.seoText" />
</template>
