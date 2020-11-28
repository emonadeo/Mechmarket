<template>
    <div id="app">
        <h1>Hallo Welt</h1>
        <router-view></router-view>
    </div>
</template>

<style lang="scss">
html,
body {
    width: 100%;
    height: 100%;
}

#app {
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 0 auto;

    h1 {
        font-family: sans-serif;
        font-size: 2em;
        font-weight: 200;
    }
}
</style>
