<script setup lang="ts">
import type { Footer } from '~/types/global.type'

var { footerQuery } = useQueries()
var { data } = useAsyncQuery<Footer>(footerQuery)
</script>

<template>
    <div class="bg-accent">
        <div>
            <pre>{{ data }}</pre>
        </div>
        <FooterDisclaimer
            class="container mx-auto"
            :data="data.footer.data.attributes"
        />
    </div>
</template>

<style scoped></style>
