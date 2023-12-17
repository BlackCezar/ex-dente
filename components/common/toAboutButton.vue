<script setup lang="ts">

</script>

<template>
	<nuxt-link to="/about" class="relative about-svg-link block w-[10rem] lg:w-[13.75rem] lg:h-[13.75rem] h-[10rem] lg:-translate-x-8">
		<svgo-about-inner filled class="absolute about-inner text-[10rem] lg:text-[13.75rem]" />
		<svgo-about-wrapper filled class="absolute about-wrapper text-[10rem] lg:text-[13.75rem]" />
	</nuxt-link>
</template>

<style>
.about-wrapper {
	animation: spin 12s linear infinite reverse;
	transform-origin: center;
	margin-bottom: 0;
}
.about-inner {
	margin-bottom: 0;
}
.about-inner circle {
	@apply fill-[#CBE6F1] transition-colors lg:fill-transparent lg:stroke-[#CBE6F1];
}

.about-svg-link:hover .about-inner circle {
	@apply lg:fill-[#CBE6F1];
}

.about-svg-link .about-inner path {
	@apply transition-transform;
	transform-origin: center;
}
.about-svg-link:hover .about-inner path {
	transform: scale(1.125);
}
</style>