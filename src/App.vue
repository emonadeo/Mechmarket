<template>
    <div id="app" class="background" :theme="theme">
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
}
</style>
