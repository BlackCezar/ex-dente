<script setup lang="ts">
import type { DoctorItem } from '~/types/services.type'

var config = useAppConfig()

var props = defineProps<{
    article: DoctorItem['attributes']
    id: string
}>()

function onDoctorClick() {
    useEvent('call:callBackForm', {
        doctor: props.id
    })
}
</script>

<template>
    <article class="group">
        <nuxt-link :to="'/doctors/' + article.slug">
            <div
                class="aspect-[3/4] relative overflow-hidden lg:aspect-[5/6] mb-5 rounded-[0.5rem] lg:mb-6"
            >
                <img
                    class="group-hover:scale-105 w-full h-full transition-transform origin-top object-cover object-center"
                    :src="
                        config.assetsUri +
                        article.image.data?.attributes.formats.medium.url
                    "
                    :alt="article.image.data?.attributes.alternativeText"
                    :title="article.image.data?.attributes.caption"
                />
                <UiButton
                    class="absolute max-w-[90%] right-4 transition-opacity bottom-4 opacity-0 group-hover:opacity-100"
                    type="button"
                    variant="primary"
                    mode="dark"
                    @click.prevent.stop="onDoctorClick(article)"
                    ><span class="whitespace-nowrap"
                        >Записаться на прием</span
                    ></UiButton
                >
            </div>
            <h3 class="h4 mb-1 font-[Mignon] text-accent">
                {{ article.name }}
            </h3>
            <section
                class="text-accent text-[0.875rem] text-opacity-50 lg:text-[1.125rem]"
            >
                {{ article.specification }}
            </section>
        </nuxt-link>
    </article>
</template>

<style scoped></style>
