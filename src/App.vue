<template>
    <div id="app" class="surface" :class="theme">
        <title-bar></title-bar>
        <h1>Hallo Welt</h1>
        <p>Lorem ipsum dolor sit amet</p>
        <router-view></router-view>
    </div>
</template>

<script>
import TitleBar from 'src/modules/TitleBar.vue';

export default {
    components: {
        TitleBar,
    },
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

html,
body,
#app {
    width: 100%;
    height: 100%;
}

#app {
    font-family: 'Fira Code', monospace;
    margin: 0 auto;
}
</style>
