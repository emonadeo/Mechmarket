<template>
    <div id="app" class="background" :theme="theme">
        <router-view></router-view>
        <gallery-view></gallery-view>
    </div>
</template>

<script>
import Gallery from 'src/views/Gallery.vue';

export default {
    components: {
        GalleryView: Gallery,
    },
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
