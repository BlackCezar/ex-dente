<script setup lang="ts">
defineProps<{
    error: any
}>()
</script>

<template>
    <div
        class="vertical-padding page-404 bg-accent min-h-screen flex items-center flex-col justify-center"
    >
        <div
            class="container mx-auto flex flex-col justify-center items-center"
        >
            <div class="lg:mb-12 pt-24 mb-10 status">
                <div class="status-404" v-if="error?.statusCode === 404">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="72"
                        height="96"
                        viewBox="0 0 72 96"
                        fill="none"
                        class="h-[6rem] lg:h-[16rem] lg:w-[12rem] w-[4.5rem]"
                    >
                        <path
                            d="M58.242 69.4436V78.9062C58.242 83.5866 58.9045 86.5882 60.2293 87.911C61.5541 89.3355 65.0191 90.3021 70.6242 90.8108V96H25.0701V90.8108C31.2866 90.3021 35.2102 89.2337 36.8408 87.6057C38.1656 86.283 38.828 83.1796 38.828 78.2957V69.4436H0V63.186C18.4459 37.1383 34.1911 16.0763 47.2357 0H58.242V60.744H72V69.4436H58.242ZM38.828 20.7568H38.5223C28.9427 33.9841 19.9236 47.3132 11.465 60.744H38.828V20.7568Z"
                            fill="#FCFCFC"
                        />
                    </svg>
                    <span
                        class="block -ml-12 -mr-12 w-[12.625rem] lg:w-[33rem]"
                    >
                        <picture class="w-full">
                            <source
                                srcset="~/assets/imgs/tooth.png"
                                media="(max-width: 1024px)"
                            />
                            <img
                                src="~/assets/imgs/tooth-big.png"
                                alt="0"
                                class="w-full"
                            />
                        </picture>
                    </span>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="72"
                        height="96"
                        viewBox="0 0 72 96"
                        fill="none"
                        class="h-[6rem] lg:h-[16rem] lg:w-[12rem] w-[4.5rem]"
                    >
                        <path
                            d="M58.242 69.4436V78.9062C58.242 83.5866 58.9045 86.5882 60.2293 87.911C61.5541 89.3355 65.0191 90.3021 70.6242 90.8108V96H25.0701V90.8108C31.2866 90.3021 35.2102 89.2337 36.8408 87.6057C38.1656 86.283 38.828 83.1796 38.828 78.2957V69.4436H0V63.186C18.4459 37.1383 34.1911 16.0763 47.2357 0H58.242V60.744H72V69.4436H58.242ZM38.828 20.7568H38.5223C28.9427 33.9841 19.9236 47.3132 11.465 60.744H38.828V20.7568Z"
                            fill="#FCFCFC"
                        />
                    </svg>
                </div>
                <div v-else>{{ error.statusCode }}</div>
            </div>
            <div
                class="text-[1.75rem] lg:text-[3rem] text-center lg:mb-12 font-semibold font-[Mignon] text-white mb-10"
            >
                {{
                    error?.statusCode === 404
                        ? 'Такой страницы не существует'
                        : 'Возникла ошибка'
                }}
            </div>
            <div>
                <UiButton @click="$router.push('/')" mode="dark"
                    >НА ГЛАВНУЮ</UiButton
                >
            </div>
        </div>
    </div>
</template>

<style scoped>
.page-404 {
    background-image: url('/assets/imgs/404-mobile.png');
    background-repeat: no-repeat;
    background-size: 27rem 58rem;
    background-position: top right;
    overflow: hidden;
}

.status-404 {
    @apply flex items-center;
    position: relative;
}
.page-404::before {
    background-image: url('/assets/imgs/light.svg');
    background-repeat: no-repeat;
    background-position: right top;
    content: '';
    width: 100%;
    height: 100%;
    position: absolute;
    right: 50px;
    top: 200px;
    animation: pulse 3s ease-in-out infinite alternate;
}

.status-404 picture {
    position: relative;
}
.status-404 picture::after {
    content: '';
    position: absolute;
    background-image: url('/assets/imgs/tooth-broken.png');
    background-position: center;
    background-repeat: no-repeat;
    background-size: contain;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    animation: broken 3s ease-in-out infinite alternate;
}

@keyframes broken {
    from {
        opacity: 0;
    }
    to {
        opacity: 100;
    }
}

@keyframes pulse {
    0%,
    20%,
    40% {
        opacity: 0;
    }
    30%,
    100% {
        opacity: 1;
    }
}
.status-404 > span:nth-child(2) {
    work-break: break-all;
}
@media screen and (min-width: 1024px) {
    .page-404 {
        background-image: url('/assets/imgs/404.png');
        background-size: 69rem 64rem;
    }
    .page-404::before {
        right: 280px;
        top: 70px;
    }
}
</style>
