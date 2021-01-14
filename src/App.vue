<template>
    <div id="app" class="background type-body1" :theme="theme">
        <router-view></router-view>
    </div>
</template>

<script>
export default {
    computed: {
        theme() {
            return this.$store.state.theme.replaceAll('_', '-');
        },
    },
};
</script>

<style lang="scss">
html,
body,
#app {
    width: 100%;
    height: 100%;
    line-height: 1.5;
}
</style>
