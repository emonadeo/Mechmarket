<template>
    <router-link class="post surface elevated" :size="size" :to="{ name: 'posts', params: { id: post.id } }">
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
    },
};
</script>

<style lang="scss">
@use 'src/styles/responsive' as r;
@use 'src/styles/mixins';
@use 'src/styles/typography';
@use "src/styles/color";

.post {
    display: flex;
    padding: 1rem;
    flex-direction: column;

    @include mixins.interactive;

    .region,
    .title {
        margin-bottom: 1rem;
    }

    .description {
        margin-bottom: 2rem;
    }

    &[size='0'] {
        .gallery {
            display: flex;
            flex-wrap: wrap;

            .loading-picture {
                margin-bottom: 1rem;
                margin-right: 1rem;
            }
        }

        @include r.md {
            padding: 2rem;
        }

        @include r.lg {
            .title {
                width: typography.$max-line-width;
                margin-left: auto;
                margin-right: auto;
            }

            .gallery {
                min-width: typography.$max-line-width;
                align-self: center;
                margin-top: 1rem;
                margin-bottom: 1rem;
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
}
</style>
