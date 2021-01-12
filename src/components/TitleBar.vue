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
.title-bar {
    display: flex;

    .slot {
        flex: 1;
        display: flex;
    }
}
</style>
