<template>
    <router-link class="post surface elevated" :has-gallery="hasGallery" :size="size" :to="{ name: 'posts', params: { id: post.id } }">
        <region class="type-overline" :region="post.region"></region>
        <div class="title">
            <h6 class="type-h6" v-html="post.title"></h6>
        </div>
        <gallery :pictures="post.pictures" :limit="limit"></gallery>
        <article v-show="size === 0" class="description markdown" v-html="post.description"></article>
        <div class="date type-overline">
            {{
                post.date.toLocaleString(undefined, {
                    year: 'numeric',
                    month: 'short',
                    day: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit',
                })
            }}
        </div>
    </router-link>
</template>

<script>
import Btn from 'src/components/Btn.vue';
import Gallery from 'src/components/Gallery.vue';
import Region from 'src/components/Region.vue';

export default {
    name: 'Post',
    props: {
        post: Object,
    },
    components: {
        Btn,
        Gallery,
        Region,
    },
    computed: {
        size() {
            return this.$store.state.size;
        },
        limit() {
            switch (this.size) {
                case 0:
                    return -1;
                case 1:
                    return 10;
                case 2:
                    return 3;
            }
        },
        hasGallery() {
            return this.post.pictures.length > 0;
        },
    },
};
</script>

<style scoped lang="scss">
@use 'src/styles/responsive' as r;
@use 'src/styles/mixins';

.post {
    display: flex;
    padding: 1rem;
    flex-direction: column;
    align-items: flex-start;

    @include mixins.interactive;

    > *:not(:last-child) {
        margin-bottom: 1rem;
    }

    &[size='0'] {
        @include r.md {
            padding: 2rem;
        }

        @include r.xl {
            display: grid;
            grid-gap: 1rem;
            grid-template-columns: 1fr min-content;
            grid-auto-rows: minmax(0, min-content);
            grid-template-areas:
                'region gallery'
                'title gallery'
                'description gallery'
                'date gallery';

            > * {
                margin-bottom: 0;
            }

            .gallery {
                display: grid;
                grid-template-columns: repeat(2, 8rem);
                grid-auto-rows: 8rem;
                grid-gap: 1rem;
                overflow-y: auto;
                height: 0;
                min-height: 100%;
            }
        }
    }

    // clamp title to two line on linear view
    &[size='1'],
    &[size='2'] {
        .title h6 {
            box-sizing: content-box;
            height: 2em;
            display: -webkit-box;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
            overflow: hidden;
            padding: 0.5rem 0;
            margin: -0.5rem 0;
        }
    }

    .region {
        grid-area: region;
    }

    .title {
        grid-area: title;
    }

    .gallery {
        grid-area: gallery;
    }

    .description {
        grid-area: description;
        overflow: hidden;
    }

    .date {
        grid-area: date;
    }
}
</style>
