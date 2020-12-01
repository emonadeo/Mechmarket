<template>
    <div id="app" class="surface" :class="theme">
        <h1>Hallo Welt</h1>
        <router-view></router-view>
    </div>
</template>

<script>
export default {
    data: () => ({
        dark: false,
    }),
    computed: {
        theme() {
            return this.dark ? 'dark' : 'light';
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

#app {
    font-family: 'Fira Code', monospace;
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 0 auto;
}
</style>
