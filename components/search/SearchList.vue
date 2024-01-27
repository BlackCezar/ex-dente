<script setup lang="ts">
defineProps<{
    list: {
        path: string
        label: string
    }[]
}>()

</script>
<template>
    <ul>
        <template v-for="link of list" :key="link.path">
            <li>
                <nuxt-link :to="link.path">
                    {{ link.label }}
                </nuxt-link>
            </li>
        </template>
    </ul>
</template>