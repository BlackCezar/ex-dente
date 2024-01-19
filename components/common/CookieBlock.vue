<script setup lang="ts">
import type { CookiesAnnouncement } from '~/types/global.type'

var { cookiesQuery } = useQueries()
var { data } = await useAsyncQuery<CookiesAnnouncement>(cookiesQuery)
var isAccepted = ref(true)

onMounted(() => {
    let hasKey = localStorage.getItem('cookie')
    if (hasKey && hasKey === 'true') {
        isAccepted.value = true
    } else {
        isAccepted.value = false
    }
})

function acceptCookie() {
    localStorage.setItem('cookie', 'true')
    isAccepted.value = true
}
</script>

<template>
    <div class="container fixed z-[1] bottom-6 right-1/2 translate-x-1/2">
        <div
            v-if="!isAccepted"
            class="cookes lg:max-w-[43rem] ml-auto bg-white justify-center items-center gap-5 rounded-[0.5rem] pb-6 pt-7 px-[2.31rem] flex flex-col lg:flex-row lg:gap-24"
        >
            <span>{{ data.cookiesAnnouncement.data.attributes.label }}</span>
            <UiButton @click="acceptCookie" mode="light">ПОнятно</UiButton>
        </div>
    </div>
</template>

<style scoped>
.cookes {
    box-shadow: 0px -1px 15px 0px rgba(0, 0, 0, 0.05);
}
</style>
