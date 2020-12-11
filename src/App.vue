<template>
    <div id="app" class="surface" :class="theme">
        <router-view></router-view>
    </div>
</template>

<script>
export default {
    computed: {
        theme() {
            return this.$store.state.theme;
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
    font-family: 'Fira Code', monospace;
    line-height: 1.5;
}
</style>
