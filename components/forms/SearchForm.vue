<script setup lang="ts">
import {useGlobalStore} from '~/store/global.store'
import type { CustomersPage } from '~/types/global.type';
import SearchList from '~/components/search/SearchList.vue'
import * as yup from 'yup'

var globalStore = useGlobalStore()
var {services, doctors} = storeToRefs(globalStore)

var { customersPageQuery } = useQueries()
var { data: customers } = await useAsyncQuery<CustomersPage>(customersPageQuery)

var pagesList = markRaw([
    {
        path: '/',
        label: 'Страницы'
    }, {
        path: '/about',
        label: 'О клинике'
    }, {
        path: '/doctors',
        label: 'Врачи'
    }, {
        path: '/contacts',
        label: 'Контакты'
    }, {
        path: '/sales',
        label: 'Акции'
    }, {
        path: '/news',
        label: 'Новости'
    }, {
        path: '/customers',
        label: 'Для пациентов'
    }, {
        path: '/faq',
        label: 'Вопрос-ответ'
    }, {
        path: '/reviews',
        label: 'Отзывы'
    }
])

var servicesList = computed(() => {
    var list = services.value.map(service => ({
        label: service.attributes.title,
        path: `/services/${service.attributes.slug}`
    }))
    list.unshift({
        label: 'Услуги',
        path: '/services'
    })
    return list
})

var doctorsList = computed(() => {
    var list = doctors.value.map(doctor => ({
        label: doctor.attributes.name,
        path: `/doctors/${doctor.attributes.slug}`
    }))
    list.unshift({
        label: 'Врачи',
        path: '/doctors'
    })
    return list
})

var customersList = computed(() => {
    var list = customers.value.clientInformation.data.attributes.informationPagesListing.map(page => ({
        label: page.label,
        path: `/customers/${page.url}`
    }))
    list.unshift({
        label: 'Для пациентов',
        path: '/customers'
    })
    return list
})

var {handleSubmit, isSubmitting, submitCount} = useForm({
    validationSchema: {
        search: yup.string().optional(),
    },
    initialValues: {
        search: ''
    }
})

const { search: searchDoctor, result: doctorsResult } = useMeiliSearch('doctor') 
const {result: servicesResult, search: searchService} = useMeiliSearch('sub-service')
const {result: answeresResult, search: searchAnswer} = useMeiliSearch('answer')

var searchFetch = handleSubmit(async ({search: value}) => {
    await Promise.all([searchDoctor(value), searchService(value), searchAnswer(value)])
    console.log(servicesResult.value)
})

var servicesResultOptions = computed(() => servicesResult?.value?.hits.slice(0,6).map((item) => ({
    label: item.title,
    path: `/services/${item.service.slug}/${item.slug}`
})) ?? [])

var doctorsResultOptions = computed(() => doctorsResult?.value?.hits.slice(0,6).map(item => ({
    label: item.name,
    path: `/doctors/${item.slug}`
})) ?? [])

var faqResultOptions = computed(() => answeresResult?.value?.hits.slice(0,6).map(item => ({
    label: item.title,
    path: `/faq#${item.id}`
})) ?? [])

var radioOptions = computed(() => {
    let total = servicesResultOptions.value.length + faqResultOptions.value.length + doctorsResultOptions.value.length
    return [
        {
            label: `Все (${total})`,
            value: 'all'
        }, {
            label: `Услуги (${servicesResultOptions.value.length})`,
            value: 'services'
        }, {
            label: `Вопрос-ответ (${faqResultOptions.value.length})`,
            value: 'faq'
        }, {
            label: `Врачи (${doctorsResultOptions.value.length})`,
            value: 'doctors'
        }
    ]
})

var {value, setValue} = useField('searchTypes', undefined, {
    type: 'checkbox',
    initialValue: ['all'],
})
watch(() => value.value, () => {
    if (value.value.length > 1 && value.value.includes('all')) {
        setValue(value.value.filter(item => item !== 'all'))
    } else if (value.value.length === 0) {
        setValue(['all'])
    }
}, {
    deep: true
})
</script>
<template>
    <div class="container flex-1 search-form overflow-y-auto max-h-[calc(100%_-_6.3125rem)] lg:max-h-[calc(100%_-_11.625rem)] mx-auto ">
        <form @submit.prevent="searchFetch" class=" pt-12 bg-white lg:pt-16 sticky top-0 ">
            <label for="" class="flex items-center relative">
                <Field type="search" name="search" v-slot="{field}">
                    <input type="search" placeholder="Введите запрос" v-bind="field" class="w-full text-accent text-opacity-70 py-[0.63rem] focus:outline-none bg-white appearance-none font-[Mignon] text-[1.125rem] lg:text-[1.75rem] transition-colors placeholder:text-opacity-70 border-opacity-20 placeholder:text-accent font-semibold border-b border-accent focus:border-opacity-60" />
                </Field>
                <button type="submit" class="absolute right-0">
                    <svgo-arrow-right filled class="text-[2.5rem]" />
                </button>
            </label>
        </form>
        <div v-if="isSubmitting" class="mt-10 lg:mt-24 flex justify-center items-center">
            <UiPageSpinner /> 
        </div>
        <div  v-else-if="submitCount" >
            <div class="flex mt-8 lg:mt-12 snap-x overflow-x-auto snap-mandatory gap-4 lg:gap-7 lg:mb-24 mb-12">
                <template v-for="opt of radioOptions" :key="opt.value">
                    <UiCheckbox hide-input :label="opt.label" name="searchTypes" :value="opt.value" />
                </template>
            </div>
            <div v-if="servicesResultOptions.length || doctorsResultOptions.length || faqResultOptions.length" class="flex flex-col gap-[3.75rem] lg:gap-[6.25rem] max-h-[calc(100%_-_9.9375rem)]">
                <SearchResultList v-if="value.includes('services') || value.includes('all')" title="Услуги" :list="servicesResultOptions" />
                <SearchResultList v-if="value.includes('doctors') || value.includes('all')" title="Врачи" :list="doctorsResultOptions" />
                <SearchResultList v-if="value.includes('faq') || value.includes('all')" title="Вопрос-ответ" :list="faqResultOptions" />
            </div>
            <div v-else class="text-accent text-base lg:text-[1.375rem] text-opacity-70">По вашему поисковому запросу ничего не найдено</div> 
        </div>
        <nav v-if="submitCount === 0" class="mt-10 lg:mt-24 grid gap-10 grid-cols-2 lg:grid-cols-4 max-h-full h-full">
            <SearchList  :list="pagesList" />
            <SearchList  :list="servicesList" />
            <SearchList  :list="doctorsList" />
            <SearchList  :list="customersList" />
        </nav>
    </div> 
</template>
<style>
.search-form nav ul {
    @apply flex flex-col gap-4 overflow-y-clip ;
}
.search-form nav ul li {
    @apply overflow-ellipsis;
}
.search-form nav li a {
    @apply text-[0.875rem] lg:text-[1.375rem] text-accent text-opacity-70;
}
.search-form nav li:first-child a {
    @apply mb-1.5 text-[1.125rem] font-semibold font-[Mignon] text-opacity-70 text-accent lg:text-[1.5rem] lg:uppercase;
}

input[type="search"]::-webkit-search-decoration,
input[type="search"]::-webkit-search-cancel-button,
input[type="search"]::-webkit-search-results-button,
input[type="search"]::-webkit-search-results-decoration {
  -webkit-appearance:none;
}
</style>