<template>
    <div class="gallery">
        <loading-picture
            v-for="(picture, index) in limit > 0 ? pictures.slice(0, limit) : pictures"
            :key="picture"
            :src="resize(picture)"
            :alt="`Photo #${index}`"
        ></loading-picture>
    </div>
</template>

<script>
import LoadingPicture from 'src/components/LoadingPicture.vue';

import { resize } from 'src/util/imgur.js';

export default {
    name: 'Gallery',
    props: {
        pictures: Array,
        limit: {
            type: Number,
            default: -1,
        },
    },
    components: {
        LoadingPicture,
    },
    methods: {
        resize,
    },
};
</script>

<style scoped lang="scss">
@use 'src/styles/color';
@use 'src/styles/shape';

.gallery {
    .loading-picture {
        height: 8rem;
        width: 8rem;
        border-radius: shape.$radius;
    }
}
</style>
