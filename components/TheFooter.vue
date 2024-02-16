<script setup lang="ts">
import type { Footer, Socials } from '~/types/global.type'
import FooterInfo from './footer/FooterInfo.vue'
import FooterMenu from './footer/FooterMenu.vue'
import FooterServices from './footer/FooterServices.vue'
import ToTopBtn from '~/components/common/ToTopBtn.vue'
import FooterContacts from './footer/FooterContacts.vue'

var { footerQuery, socialsQuery } = useQueries()
var { data } = await useAsyncQuery<Footer>(footerQuery)
var { data: socials } = await useAsyncQuery<Socials>(socialsQuery)
</script>

<template>
    <div class="bg-accent pb-12 lg:pb-[6.25rem]">
        <div
            class="pb-8 mx-auto gap-10 lg:gap-[5rem] lg:pb-[5rem] relative container pt-10 lg:pt-[7.19rem] grid grid-cols-1 lg:grid-cols-[1fr_0.6fr_1.4fr_1fr]"
        >
            <FooterInfo
                :socials="socials"
                :copyright="data?.footer?.data.attributes.copyright"
            />
            <FooterMenu />
            <LazyFooterServices />
            <FooterContacts />
            <ToTopBtn />
        </div>
        <FooterDisclaimer
            class="container mx-auto"
            :data="data?.footer?.data.attributes"
        />
    </div>
</template>

<style scoped></style>
