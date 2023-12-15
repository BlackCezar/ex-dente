<script setup lang="ts">
import {useQueries} from "#imports";
import type {Services, ServicesItem} from "~/types/global.type";

var {servicesQuery} = useQueries()

var {data} = await useAsyncQuery<Services>(servicesQuery)
var activeService = ref(data.value?.services?.data[0])
var router = useRouter()

function toService(service: ServicesItem) {
	activeService.value = service
	if (service.attributes.sub_services.data.length) {

	}
}
</script>

<template>
<div class="bg-white pb-10 pt-[3.75rem] lb:py-[10rem] container">
	<div class="flex mb-6 flex-col gap-5">
		<h2 class="font-[Mignon] text-[1.5rem] font-semibold uppercase text-accent">Услуги</h2>
		<p class="text-accent opacity-[0.5]">В своей работе мы используем передовые технологии, новейшее оборудование и материалы</p>
	</div>
	<div class="grid gap-8 grid-cols-1 justify-start lg:grid-cols-2">
		<nav>
			<ul class="flex snap-mandatory gap-3 snap-x lg:items-start lg:flex-col lg:gap-8 overflow-x-auto">
				<li v-for="service of data?.services?.data" class="snap-end">
					<a @click.prevent="toService(service)" class="text-[1.125rem] lg:px-0  block text-center lg:bg-transparent text-[#0B1C31] rounded-[0.25rem] px-5 py-2 " :href="`/services/${service.attributes.slug}`" :class="{
						'text-opacity-100 bg-[#A7D6E9CC] ': service.id === activeService?.id,
						'text-opacity-70 bg-[#F0F1F2]': service.id !== activeService?.id,
					}">
						{{service.attributes.title}} {{service.attributes.id}}
					</a>
					<a v-if="service.id === activeService?.id" :href="`/services/${service.attributes.slug}`">
						<svgo-arrow-right filled />
					</a>
				</li>
			</ul>
		</nav>
		<div class="flex flex-col-reverse lg:flex-col">
			<UiButton variant="primary" mode="light" class="!w-full lg:!w-fit">Записаться на прием</UiButton>
			<nav class="mb-8 lg:mb-0 lg:mt-14" v-if="activeService?.attributes?.sub_services.data.length">
				<ul class="flex flex-col gap-3 lg:gap-4">
					<li class="hidden lg:block lg:mb-1">
						<a href="#subServices" class="text-accent text-[1.75rem]">Направления</a>
					</li>
					<li v-for="service of activeService?.attributes.sub_services.data">
						<a class="text-opacity-70 hover:text-opacity-100 text-[1.125rem] lg:text-[1.375rem] text-[#0B1C31]" :href="`/services/${activeService?.attributes.slug}/${service.attributes.slug}`">{{service.attributes.title}}</a>
					</li>
				</ul>
			</nav>
		</div>
	</div>
</div>
</template>

<style scoped>
.snap-x::-webkit-scrollbar {
	display: none;
}
.snap-x {
	-ms-overflow-style: none;
	scrollbar-width: none;
}
</style>