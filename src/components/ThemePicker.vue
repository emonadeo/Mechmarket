<template>
    <div class="theme-picker surface">
        <btn class="icon-button" @click="$store.dispatch('toggleTheme')">
            <svg width="24px" height="24px" viewBox="0 0 24 24">
                <path
                    d="M15.986,2.998c0.772,1.407 1.179,2.985 1.183,4.589c0,5.257 -4.324,9.582 -9.579,9.582c-1.595,-0.001 -3.164,-0.4 -4.565,-1.16c1.674,3.069 4.9,4.988 8.396,4.993c5.255,0 9.579,-4.326 9.579,-9.582c-0.001,-3.51 -1.929,-6.749 -5.014,-8.422Z"
                />
            </svg>
        </btn>
    </div>
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
.theme-picker {
    .btn {
        height: 100%;
        width: 100%;
    }

    svg {
        fill: var(--primary);
    }
}
</style>
