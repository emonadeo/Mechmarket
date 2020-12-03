<template>
    <div class="titlebar">
        <div class="slot">
            <slot></slot>
        </div>
        <theme-picker></theme-picker>
    </div>
</template>

<script>
import ThemePicker from 'src/components/ThemePicker.vue';

export default {
    components: {
        ThemePicker,
    },
};
</script>

<style lang="scss" scoped>
@use 'src/styles/constants' as c;

.titlebar {
    border-bottom: c.$border;
    display: flex;
    height: c.$height;

    .slot {
        flex: 1;
    }

    .theme-picker {
        border-left: c.$border;
    }
}
</style>
