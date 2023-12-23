<script setup lang="ts">
import type {HomePageBenefit} from "~/types/global.type";
import ToAboutButton from "~/components/common/toAboutButton.vue";
import BenefitsSlider from "~/components/main/BenefitsSlider.vue";

var {homePageBenefitQuery} = useQueries()
var {data} = await useAsyncQuery<HomePageBenefit>(homePageBenefitQuery)
</script>

<template>
<div class=" pb-10 lg:pb-[11.25rem] lg:pt-[6.37rem] pt-[3.75rem] bg-white">
    <div class="container mx-auto">
	<section class="flex lg:grid lg:items-center grid-cols-2 flex-col mb-5 lg:mb-[2.88rem] gap-5 lg:gap-8">
		<h2 class="text-[1.75rem] lg:max-w-[33rem] lg:leading-[3.625rem] lg:text-[3rem] font-[Mignon] font-semibold text-accent">{{data.homePageBenefit.data?.attributes.title}}</h2>
		<h3 class="text-[1.125rem] lg:text-[1.75rem] lg:leading-[2.875rem] text-accent ">{{data.homePageBenefit.data?.attributes.subtitle}}</h3>
	</section>
	<section class="flex gap-8 lg:grid grid-cols-2 items-center flex-col">
		<p class="text-accent text-[1.125rem] lg:text-[1.375rem] lg:order-2 text-opacity-50">{{data.homePageBenefit.data?.attributes.description}}</p>
		<ToAboutButton />
	</section>
	<BenefitsSlider v-if="data.homePageBenefit.data?.attributes.slider?.length" :slides="data.homePageBenefit.data?.attributes.slider" />
    </div>
    </div>
</template>

<style scoped>

</style>