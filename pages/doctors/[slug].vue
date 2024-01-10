<script setup lang="ts">
import BreadCrumbs from '~/components/common/BreadCrumbs.vue'
import DoctorMainBanner from '~/components/doctors/MainBanner.vue'
import DoctorInfoScreen from '~/components/doctors/InfoScreen.vue'
import DoctorCertsScreen from '~/components/doctors/CertsScreen.vue'
import ReviewsScreen from '~/components/reviews/ReviewScreen.vue'
import type { IBreadCrumb } from '~/types/global.type'
import type { DoctorPage } from '~/types/doctors.type'
import type { DoctorReviews } from '~/types/reviews.type'

var route = useRoute()
var { doctorPageQuery, reviewsDoctorQuery } = useQueries()

var { data } = await useAsyncQuery<DoctorPage>(doctorPageQuery, {
    filters: {
        slug: {
            eq: route.params.slug,
        },
    },
})

var { data: reviews } = await useAsyncQuery<DoctorReviews>(reviewsDoctorQuery, {
    pagination: {
        limit: 6,
    },
    filters: {
        review: {
            doctor: {
                slug: {
                    eq: route.params.slug,
                },
            },
        },
    },
})

var breadCrumbs = markRaw<IBreadCrumb[]>([
    {
        path: '/',
        title: 'Главная',
    },
    {
        path: '/doctors',
        title: 'Врачи',
    },
    {
        path: '/doctors/' + route.params.slug,
        title: data.value.doctors.data?.[0].attributes.name,
    },
])

var reviewsList = computed(() =>
    reviews.value.reviews.data.map((r) => ({
        id: r.id,
        attributes: {
            publishedAt: r.attributes.publishedAt,
            review: {
                ...r.attributes.review,
                doctor: data.value.doctors.data[0],
            },
        },
    })),
)
</script>
<template>
    <div class="pt-[6.5rem] lg:pt-[15.25rem] bg-accent">
        <div class="container mx-auto">
            <bread-crumbs :list="breadCrumbs" />
            <DoctorMainBanner :doctor="data.doctors.data[0].attributes" />
        </div>
        <div class="bg-white">
            <div class="container mx-auto">
                <DoctorInfoScreen
                    class="pt-10 pb-[3.75rem] lg:pt-[8.75rem] lg:pb-[11.25rem]"
                    :doctor="data.doctors.data[0].attributes"
                />
                <DoctorCertsScreen
                    class="lg:pb-[11.25rem] pb-[3.75rem]"
                    :certs="data.doctors.data[0].attributes.certs.data"
                />
                <ReviewsScreen
                    class="pb-[6.5rem] lg:pb-[7.5rem]"
                    :list="reviewsList"
                />
            </div>
            <DoctorsReviewCallBackForm
                class="lg:pb-[11.25rem] pb-[5rem]"
                :doctor="{
                    id: data.doctors.data[0].id,
                    name: data.doctors.data[0].attributes.name,
                }"
            />
        </div>
    </div>
</template>
