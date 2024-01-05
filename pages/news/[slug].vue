<script setup lang="ts">
import BreadCrumbs from '~/components/common/BreadCrumbs.vue'
import type { IBreadCrumb } from '~/types/global.type'

var route = useRoute()

var breadCrumbs = markRaw<IBreadCrumb[]>([
    {
        path: '/',
        title: 'Главная',
    },
    {
        path: '/news',
        title: 'Новости',
    },
    {
        path: '/news/' + route.params.slug,
        title: '',
    },
])
</script>

<template>
    <div class="vertical-padding bg-white">
        <div class="container">
            <BreadCrumbs
                is-dark
                :list="breadCrumbs"
                class="mb-[1.75rem] lg:mb-[3.75rem]"
            />
        </div>
    </div>
</template>

<style scoped></style>
