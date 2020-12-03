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
* {
    box-sizing: border-box;
}

a,
a:active,
a:focus,
a:visited {
    color: unset;
    text-decoration: unset;
}

html,
body,
#app {
    width: 100%;
    height: 100%;
}
</style>
