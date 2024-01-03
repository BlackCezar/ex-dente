<script setup lang="ts"></script>

<template>
    <div>
        <div id="page-spinner">
            <div id="d1" class="spinner-dot"></div>
            <div id="d2" class="spinner-dot"></div>
            <div id="d3" class="spinner-dot"></div>
            <div id="d4" class="spinner-dot"></div>
            <div id="d5" class="spinner-dot"></div>
        </div>
    </div>
</template>

<style>
#page-spinner {
    width: 100px;
    display: flex;
    gap: 4px;
}
.spinner-dot {
    width: 12px;
    height: 12px;
    background-color: hsla(197, 58%, 87%, 0.8);
    border-radius: 50%;
}
#page-spinner #d1 {
    animation: dot1 1.5s linear infinite alternate;
}
#page-spinner #d2 {
    animation: dot2 1.5s linear infinite alternate;
}
#page-spinner #d3 {
    animation: dot3 1.5s linear infinite alternate;
}
#page-spinner #d4 {
    animation: dot4 1.5s linear infinite alternate;
}
#page-spinner #d5 {
    animation: dot5 1.5s linear infinite alternate;
}
@keyframes dot1 {
    0%,
    40%,
    100% {
        background-color: hsla(197, 58%, 87%, 0.8);
        box-shadow: 0 0 0 0 hsla(197, 58%, 87%, 0.8);
    }
    20% {
        background-color: hsla(197, 60%, 78%, 0.8);
        box-shadow: 0 0 0 3px hsla(197, 60%, 78%, 0.8);
    }
}
@keyframes dot2 {
    0%,
    20%,
    60%,
    100% {
        background-color: hsla(197, 58%, 87%, 0.8);
        box-shadow: 0 0 0 0 hsla(197, 58%, 87%, 0.8);
    }
    40% {
        background-color: hsla(197, 60%, 78%, 0.8);
        box-shadow: 0 0 0 3px hsla(197, 60%, 78%, 0.8);
    }
}
@keyframes dot3 {
    0%,
    40%,
    80%,
    100% {
        background-color: hsla(197, 58%, 87%, 0.8);
        box-shadow: 0 0 0 0 hsla(197, 58%, 87%, 0.8);
    }
    60% {
        background-color: hsla(197, 60%, 78%, 0.8);
        box-shadow: 0 0 0 3px hsla(197, 60%, 78%, 0.8);
    }
}
@keyframes dot4 {
    0%,
    60%,
    100% {
        background-color: hsla(197, 58%, 87%, 0.8);
        box-shadow: 0 0 0 0 hsla(197, 58%, 87%, 0.8);
    }
    80% {
        background-color: hsla(197, 60%, 78%, 0.8);
        box-shadow: 0 0 0 3px hsla(197, 60%, 78%, 0.8);
    }
}
@keyframes dot5 {
    0%,
    80% {
        background-color: hsla(197, 58%, 87%, 0.8);
        box-shadow: 0 0 0 0 hsla(197, 58%, 87%, 0.8);
    }
    100% {
        background-color: hsla(197, 60%, 78%, 0.8);
        box-shadow: 0 0 0 3px hsla(197, 60%, 78%, 0.8);
    }
}
</style>
