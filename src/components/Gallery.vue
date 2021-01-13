<template>
    <div class="gallery">
        <loading-picture
            v-for="(picture, index) in pictures.slice(0, limit)"
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
.gallery {
    display: flex;

    .loading-picture {

        height: 8rem;
        width: 8rem;
        margin-right: 1rem;
        border-radius: 4px;
    }
}
</style>
