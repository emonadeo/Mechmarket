<template>
    <div class="gallery">
        <async-picture
            v-for="(picture, index) in pictures"
            :key="picture"
            :src="resize(picture)"
            :alt="`Photo #${index}`"
            @click.native="open(index)"
        ></async-picture>
    </div>
</template>

<script>
import AsyncPicture from 'src/components/AsyncPicture.vue';

import { resize } from 'src/util/imgur.js';

export default {
    name: 'Gallery',
    props: {
        pictures: Array,
        href: String,
    },
    components: {
        AsyncPicture,
    },
    methods: {
        resize,
        open(index) {
            this.$store.dispatch('setGallery', { pictures: this.pictures, index, href: this.href });
        },
    },
};
</script>

<style scoped lang="scss">
@use 'src/styles/color';
@use 'src/styles/shape';

.gallery {
    .picture {
        height: 8rem;
        width: 8rem;
        border-radius: shape.$radius;
        transition: box-shadow 100ms ease-in-out;
        cursor: pointer;

        &:hover,
        &:focus {
            box-shadow: 0 0 0 2px color.$primary;
        }
    }
}
</style>
