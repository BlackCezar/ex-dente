<script setup lang="ts">
import type { ButtonHTMLAttributes } from 'vue'

withDefaults(
    defineProps<{
        variant?: 'primary' | 'secondary'
        mode?: 'light' | 'dark'
        full?: boolean
        type?: ButtonHTMLAttributes['type']
    }>(),
    {
        variant: 'primary',
        mode: 'light',
        type: 'button',
    },
)
</script>

<template>
    <button
        :type="type"
        class="btn group/btn"
        :class="`${variant} ${mode} ${full ? 'full' : ''} ${
            variant === 'primary' ? 'grid-cols-[auto_1.25rem]' : ''
        } grid`"
    >
        <span
            class="transition-transform lg:text-[1.125rem] flex items-center gap-2"
            :class="{
                'translate-x-3 group-hover/btn:-translate-x-0':
                    variant === 'primary',
            }"
        >
            <slot />
        </span>
        <svgo-arrow-right-bold
            v-if="['primary'].includes(variant)"
            class="opacity-0 !mb-0 transition-[opacity_transform] -translate-x-1 group-hover/btn:translate-x-0 group-hover/btn:opacity-100 text-[1.25rem] lg:text-[1.5rem]"
        />
    </button>
</template>

<style lang="css">
.btn {
    @apply w-fit h-12 lg:h-[3.75rem] min-h-fit px-5 lg:px-9 gap-2 overflow-hidden transition-all items-center justify-center rounded-[6.25rem] text-[0.875rem] uppercase;
}

.btn.full {
    @apply w-full;
}

/* Primary - Light */
.btn.primary.light {
    color: hsla(0, 0%, 99%, 1);
    background-color: hsla(213, 63%, 12%, 1);
}
.btn.primary.light:hover {
    background-color: hsla(212, 79%, 19%, 0.9);
}
.btn.primary.light:active {
    background-color: hsla(197, 60%, 78%, 0.8);
    color: hsla(213, 63%, 12%, 1);
}
.btn.primary.light:disabled {
    color: hsla(210, 7%, 95%, 0.2);
    background-color: hsla(213, 63%, 12%, 0.2);
}
/* Primary - Dark */
.btn.primary.dark {
    color: hsla(213, 63%, 12%, 1);
    background-color: hsla(0, 0%, 99%, 1);
}
.btn.primary.dark:hover {
    background-color: hsla(0, 0%, 99%, 1);
}
.btn.primary.dark:active {
    background-color: hsla(197, 58%, 87%, 0.8);
    color: hsla(213, 63%, 12%, 1);
}
.btn.primary.dark:disabled {
    color: hsla(213, 63%, 12%, 0.25);
    background-color: hsla(0, 0%, 99%, 0.25);
}

/* Secondary - Light */
.btn.secondary.light {
    color: hsla(0, 0%, 99%, 1);
    background-color: hsla(213, 63%, 12%, 1);
    border: 1px solid hsla(0, 0%, 99%, 0.5);
}
.btn.secondary.light:hover {
    border: 1px solid hsla(0, 0%, 99%, 1);
}
.btn.secondary.light:active {
    background-color: hsla(0, 0%, 99%, 1);
    color: hsla(213, 63%, 12%, 1);
    border-color: hsla(0, 0%, 99%, 1);
}
.btn.secondary.light:disabled {
    border-color: hsla(0, 0%, 99%, 0.3);
    color: hsla(0, 0%, 99%, 0.3);
}
/* Secondary - Dark */
.btn.secondary.dark {
    color: hsla(213, 63%, 12%, 1);
    background-color: hsl(0, 0%, 100%);
    border: 1px solid hsla(213, 63%, 12%, 0.3);
}
.btn.secondary.dark:hover {
    border: 1px solid hsla(213, 63%, 12%, 1);
}
.btn.secondary.dark:active {
    background-color: hsla(0, 0%, 99%, 1);
    color: hsla(213, 63%, 12%, 1);
    border-color: hsla(0, 0%, 99%, 1);
}
.btn.secondary.dark:disabled {
    border-color: hsla(0, 0%, 99%, 0.3);
    color: hsla(0, 0%, 99%, 0.3);
}
</style>
