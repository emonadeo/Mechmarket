<template>
    <form class="title-bar">
        <div class="slot">
            <slot></slot>
        </div>
        <theme-picker></theme-picker>
    </form>
</template>

<script>
import ThemePicker from 'src/components/ThemePicker.vue';

export default {
    components: {
        ThemePicker,
    },
};
</script>

<style lang="scss">
@use 'src/styles/constants' as c;

.title-bar {
    border-bottom: c.$border;
    display: flex;
    height: c.$height;

    svg {
        fill: var(--primary);
    }

    .slot {
        flex: 1;
        display: flex;

        > * {
            height: c.$height;
        }
    }

    .theme-picker {
        border-left: c.$border;
    }
}
</style>
