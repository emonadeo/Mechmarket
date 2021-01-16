<template>
    <div id="gallery" class="surface" v-if="gallery">
        <div class="actions">
            <btn outline v-if="gallery.href" :href="gallery.href">View</btn>
            <btn icon outline @click="close"
                ><svg viewBox="0 0 24 24" width="1.5rem" height="1.5rem">
                    <path
                        d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12 19 6.41z"
                    /></svg
            ></btn>
        </div>
        <div class="pictures" ref="pictures">
            <async-picture
                v-for="(picture, index) in gallery.pictures"
                :key="picture"
                :src="picture"
                :alt="`Photo #${index}`"
            ></async-picture>
        </div>
        <div class="thumbnails" ref="thumbnails">
            <async-picture
                v-for="(picture, index) in gallery.pictures"
                :key="picture"
                :src="resize(picture)"
                :alt="`Photo #${index}`"
                @click.native="scrollTo(index)"
            ></async-picture>
        </div>
    </div>
</template>

<script>
import Btn from 'src/components/Btn.vue';
import AsyncPicture from 'src/components/AsyncPicture.vue';

import { resize } from 'src/util/imgur.js';

export default {
    components: {
        AsyncPicture,
        Btn,
    },
    computed: {
        gallery() {
            return this.$store.state.gallery;
        },
    },
    watch: {
        '$store.state.gallery'(gallery) {
            if (!gallery) return;
            this.scrollTo(gallery.index);
        },
    },
    methods: {
        close() {
            this.$store.dispatch('setGallery', undefined);
        },
        resize,
        scrollTo(index) {
            this.$nextTick(() => {
                const pictures = this.$refs.pictures;
                pictures.scrollTo({ left: pictures.clientWidth * index, behavior: 'smooth' });
            });
        },
    },
};
</script>

<style lang="scss">
@use 'src/styles/shape';
@use 'src/styles/color';

#gallery {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 100;
    display: flex;
    flex-direction: column;

    .actions {
        position: absolute;
        top: 0;
        right: 0;
        left: 0;
        margin: 1rem;
        z-index: 101;
        display: flex;
        justify-content: space-between;
    }

    .pictures {
        flex: 1;
        display: flex;
        overflow-x: auto;
        scroll-snap-type: x mandatory;

        .picture {
            scroll-snap-align: center;
            flex: auto 1 0;
            width: 100%;
            height: 100%;

            img {
                object-fit: contain;
            }
        }
    }

    .thumbnails {
        display: flex;
        overflow-x: auto;
        padding: 1rem;

        // Fix bottom padding bug
        &::after {
            display: block;
            content: '';
            min-width: 1rem;
        }

        .picture {
            flex: auto 0 0;
            height: 8rem;
            width: 8rem;
            border-radius: shape.$radius;
            transition: box-shadow 100ms ease-in-out;
            cursor: pointer;

            &:not(:last-child) {
                margin-right: 1rem;
            }

            &:hover,
            &:focus {
                box-shadow: 0 0 0 2px color.$primary;
            }
        }
    }
}
</style>
