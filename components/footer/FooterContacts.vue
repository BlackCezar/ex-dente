<script setup lang="ts">
import { useGlobalStore } from '~/store/global.store'
import { storeToRefs } from '#imports'

var globalStore = useGlobalStore()
var { phoneNumber, email, address } = storeToRefs(globalStore)
</script>

<template>
    <div class="text-white flex flex-col gap-4 items-center lg:items-start">
        <nav class="-mb-4">
            <ul>
                <li>
                    <nuxt-link class="footer-main-link" to="/contacts"
                        >Контакты</nuxt-link
                    >
                </li>
            </ul>
        </nav>
        <section>
            <a class="footer-link" :href="`tel:${phoneNumber}`">{{
                phoneNumber
            }}</a>
        </section>
        <section>
            <a class="footer-link" :href="`mailto:${email}`">{{ email }}</a>
        </section>
        <address class="not-italic footer-link">
            {{ address }}
        </address>
    </div>
</template>

<style scoped></style>
