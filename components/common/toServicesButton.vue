<script setup lang="ts"></script>

<template>
    <nuxt-link
        to="/services"
        class="absolute block z-20 right-4  lg:right-auto lg:bottom-[20%] lg:left-[55%] services-icon text-white"
    >
        <svgo-services filled class="text-[7.5rem] lg:text-[13.75rem]" />
    </nuxt-link>
</template>

<style>
.services-icon g + path, .services-icon g {
	transform-origin: center;
	animation: spin 12s linear infinite reverse;
}
.services-icon circle {
	@apply fill-secondary lg:fill-transparent transition-colors;
}
.services-icon:hover circle {
	fill: hsla(197, 60%, 78%, 0.8);
}

.services-icon svg {
    margin-bottom: 0;
}
.services-icon circle + path:last-child {
	@apply transition-transform;
    transform-origin: center;
}
.services-icon:hover circle + path:last-child {
	transform: scale(1.125);
}

</style>
