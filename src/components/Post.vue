<template>
    <a class="post surface elevated" :href="post.href" :size="size" :to="{ name: 'posts', params: { id: post.id } }">
        <region class="type-overline" :region="post.region"></region>
        <article>
            <section class="title">
                <h1 :class="{ 'type-h1': size === 0, 'type-h4': size !== 0 }" v-html="post.title"></h1>
            </section>
            <gallery :pictures="post.pictures"></gallery>
            <section v-show="size === 0" class="description markdown" v-html="post.description"></section>
        </article>
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
    </a>
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

    &[size='0'] {
        .gallery {
            display: flex;
            flex-wrap: wrap;

            .loading-picture {
                margin-bottom: 1rem;
                margin-right: 1rem;
            }
        }

        .description {
            margin-bottom: 2rem;
        }

        $padding: 2rem;

        @include r.md {
            padding: $padding;
        }

        @include r.lg {
            position: relative;

            .region {
                position: absolute;
                top: $padding;
                left: $padding;
            }

            article {
                display: flex;
                flex-direction: column;

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
    }

    // clamp title to two line on linear view
    &[size='1'],
    &[size='2'] {
        overflow-x: hidden;

        .title h1 {
            box-sizing: content-box;
            height: 2em;
            display: -webkit-box;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
            overflow: hidden;
            padding: 0.5rem 0;
            margin: -0.5rem 0;
        }

        .gallery {
            display: grid;
            grid-gap: 1rem;
            grid-template-columns: repeat(auto-fit, 8rem);
            overflow-x: hidden;
            position: relative;
            padding: 4px;
            margin: -4px;
            margin-bottom: 1rem;

            .loading-picture {
                grid-row: 1;
            }

            // zig zag pattern for x overflow
            &::after {
                content: '';
                position: absolute;
                right: 0;
                top: 0;
                bottom: 0;
                z-index: 10;
                display: block;
                width: 20px;
                background-size: 100% 20px;
                background-image: linear-gradient(225deg, color.$surface 25%, transparent 25%),
                    linear-gradient(315deg, color.$surface 25%, transparent 25%);
                background-position: 0 0;
            }
        }
    }
}
</style>
