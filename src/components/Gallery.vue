<template>
    <masonry :cols="this.breakpoints" :gutter="'1rem'" class="gallery">
        <gallery-item v-for="picture in pictures" :key="picture" :src="picture"></gallery-item>
        <!-- show hint if more than 4 images -->
        <!--<p class="posts-hint" v-if="pictures.length > limit">
            + {{ post.pictures.length - limit }} more image{{ post.pictures.length !== limit + 1 ? 's' : '' }}
        </p>-->
    </masonry>
</template>

<script>
import GalleryItem from '/src/components/GalleryItem.vue';

export default {
    components: { GalleryItem },
    props: {
        pictures: Array,
        limit: Number,
    },
    data: (ctx) => ({
        breakpoints: {
            default: ctx.cols(3),
            640: ctx.cols(2),
        },
    }),
    methods: {
        cols(max) {
            return this.pictures.length > max ? max : this.pictures.length;
        },
    },
};
</script>

<style lang="scss" scoped>
.gallery {
    .gallery-item:not(:last-child) {
        margin-bottom: 1rem;
    }
}
</style>
