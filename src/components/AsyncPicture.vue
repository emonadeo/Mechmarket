<template>
    <button class="picture">
        <transition name="fade">
            <loading v-if="loading"></loading>
        </transition>
        <img ref="img" :src="src" :alt="alt" />
    </button>
</template>

<script>
import Loading from 'src/components/Loading.vue';

export default {
    name: 'AsyncPicture',
    props: {
        src: String,
        alt: String,
    },
    components: {
        Loading,
    },
    data: () => ({
        loading: true,
    }),
    mounted() {
        const img = this.$refs.img;
        if (img.complete) {
            this.loading = false;
        } else {
            img.addEventListener('load', () => {
                this.loading = false;
            });
        }
    },
};
</script>

<style scoped lang="scss">
@use 'src/styles/mixins';

.picture {
    @include mixins.outline-interactive;

    display: block;
    padding: 0;
    border: none;
    outline: none;
    background-color: transparent;
    position: relative;
    overflow: hidden;

    img {
        height: 100%;
        width: 100%;
        display: block;
        object-fit: cover;
        object-position: center;
    }
}

// transitions
.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.5s;
}
.fade-enter,
.fade-leave-to {
    opacity: 0;
}
</style>
