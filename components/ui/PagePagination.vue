<script setup lang="ts">
import LeftButton from '~/components/ui/LeftButton.vue'
import RightButton from '~/components/ui/RightButton.vue'
import FirstPaginationButton from '~/components/ui/pagination/FirstPaginationButton.vue'
import PaginationButton from '~/components/ui/pagination/PaginationButton.vue'

defineProps<{
    page: number
    pageCount: number
}>()

defineEmits<{
    (event: 'setPage', page: number): void
    (event: 'showMore'): void
}>()
</script>

<template>
    <div
        class="flex justify-between items-center gap-6 flex-col lg:flex-row"
        v-if="pageCount > 1"
    >
        <UiIconButton @click="$emit('showMore')" title="Показать еще" />
        <div class="flex gap-1 items-center lg:gap-3">
            <LeftButton
                @click="$emit('setPage', page - 1)"
                :disabled="page === 1"
            />
            <template v-if="pageCount <= 3">
                <FirstPaginationButton
                    :active="page === 1"
                    @click="$emit('setPage', 1)"
                />
                <PaginationButton
                    v-if="pageCount >= 2"
                    title="2"
                    :active="page === 2"
                    @click="$emit('setPage', 2)"
                />
                <PaginationButton
                    v-if="pageCount === 3"
                    title="3"
                    :active="page === 3"
                    @click="$emit('setPage', 3)"
                />
            </template>
            <template v-else>
                <template v-if="page === 1">
                    <FirstPaginationButton
                        :active="page === 1"
                        @click="$emit('setPage', 1)"
                    />
                    <PaginationButton title="2" @click="$emit('setPage', 2)" />
                    <PaginationButton title="3" @click="$emit('setPage', 3)" />
                    <PaginationButton title="..." disabled />
                </template>
                <template v-else-if="page + 1 >= pageCount">
                    <FirstPaginationButton
                        v-if="page - 1 > 1"
                        @click="$emit('setPage', 1)"
                    />
                    <PaginationButton title="..." disabled />
                    <PaginationButton
                        :title="page - 1"
                        @click="$emit('setPage', page - 1)"
                    />
                    <PaginationButton
                        v-if="page !== pageCount"
                        :title="page"
                        active
                        @click="$emit('setPage', page)"
                    />
                </template>
                <template v-else-if="page < pageCount">
                    <FirstPaginationButton
                        v-if="page - 1 > 1"
                        @click="$emit('setPage', 1)"
                    />
                    <PaginationButton
                        :title="page - 1"
                        @click="$emit('setPage', page - 1)"
                    />
                    <PaginationButton
                        :title="page"
                        active
                        @click="$emit('setPage', page)"
                    />
                    <PaginationButton
                        :title="page + 1"
                        @click="$emit('setPage', page + 1)"
                    />
                    <PaginationButton
                        v-if="page + 2 != pageCount"
                        title="..."
                        disabled
                    />
                </template>
                <PaginationButton
                    :title="pageCount"
                    :active="page === pageCount"
                    @click="$emit('setPage', pageCount)"
                />
            </template>
            <RightButton
                @click="$emit('setPage', page + 1)"
                :disabled="page === pageCount"
            />
        </div>
    </div>
</template>

<style>
.page-button {
    @apply w-8 h-8 text-[1.125rem] disabled:text-opacity-20 lg:text-[1.375rem] lg:w-12 lg:h-12 text-accent text-opacity-50 hover:text-opacity-100 flex justify-center items-center;
}
.page-button.active {
    @apply text-opacity-100 bg-[#F0F1F2] rounded-[0.25rem];
}
</style>
