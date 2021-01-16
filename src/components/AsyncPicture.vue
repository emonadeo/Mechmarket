<template>
    <div class="picture">
        <transition name="fade">
            <div v-show="loading" class="loading primary">Loading</div>
        </transition>
        <img ref="img" :src="src" :alt="alt" />
    </div>
</template>

<script>
export default {
    name: 'AsyncPicture',
    props: {
        src: String,
        alt: String,
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
.picture {
    position: relative;
    overflow: hidden;

    .loading {
        position: absolute;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        display: flex;
        justify-content: center;
        align-items: center;
    }

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
