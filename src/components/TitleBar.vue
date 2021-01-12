<template>
    <form class="title-bar">
        <slot></slot>
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
}
</style>
