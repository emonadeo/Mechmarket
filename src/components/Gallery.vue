<template>
    <div class="gallery">
        <loading-picture
            v-for="(picture, index) in pictures.slice(0, limit)"
            :key="picture"
            :src="resize(picture)"
            :alt="`Photo #${index}`"
        ></loading-picture>
        <div class="placeholder" v-for="i in min - pictures.length"></div>
    </div>
</template>

<script>
import LoadingPicture from 'src/components/LoadingPicture.vue';

import { resize } from 'src/util/imgur.js';

export default {
    name: 'Gallery',
    props: {
        pictures: Array,
        min: Number,
        limit: Number,
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

.gallery {
    display: flex;

    .loading-picture,
    .placeholder {
        height: 8rem;
        width: 8rem;
        margin-right: 1rem;
        border-radius: 4px;
    }

    .placeholder {
        background-color: color.$background;
    }
}
</style>
