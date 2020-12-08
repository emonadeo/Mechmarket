<template>
    <btn class="theme-picker icon-button" @click="$store.dispatch('toggleTheme')">
        <svg xmlns="http://www.w3.org/2000/svg" height="24" width="24" viewBox="0 0 6.3499998 6.35">
            <g transform="translate(0,-290.64998)">
                <path
                    d="m 4.3466476,291.17915 a 2.8163548,2.8163548 0 0 1 0.3476437,1.34877 2.8163548,2.8163548 0 0 1 -2.8163547,2.81635 2.8163548,2.8163548 0 0 1 -1.34216911,-0.34104 2.8163548,2.8163548 0 0 0 2.46871101,1.46758 2.8163548,2.8163548 0 0 0 2.8163548,-2.81635 2.8163548,2.8163548 0 0 0 -1.4741857,-2.47531 z"
                />
            </g>
        </svg>
    </btn>
</template>

<script>
import Btn from 'src/components/Btn.vue';

export default {
    components: {
        Btn,
    },
};
</script>

<style lang="scss" scoped>
.theme-picker svg {
    fill: var(--primary);
}
</style>
