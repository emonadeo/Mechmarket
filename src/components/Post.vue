<template>
    <div class="post surface elevated" :href="post.href" :size="size" @click="redirect">
        <region class="type-overline" :region="post.region"></region>
        <article>
            <section class="title">
                <h1 :class="{ 'type-h1': size === 0, 'type-h4': size !== 0 }" v-html="post.title"></h1>
            </section>
            <gallery :pictures="post.pictures" :href="post.href"></gallery>
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
    </div>
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
    },
    methods: {
        redirect() {
            window.location = this.post.href;
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
        $padding: 2rem;
        padding: $padding;

        .gallery {
            display: flex;
            flex-wrap: wrap;

            .picture {
                margin-bottom: 1rem;
                margin-right: 1rem;
            }
        }

        .description {
            margin-bottom: 2rem;
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

        .gallery {
            display: grid;
            grid-gap: 1rem;
            grid-template-columns: repeat(auto-fit, 8rem);
            overflow-x: auto;
            position: relative;
            padding: 4px 4px 4px 1rem;
            margin: -4px -1rem calc(1rem - 4px) -1rem;

            // Fix scroll padding bug
            &::after {
                content: '';
                grid-row: 1;
                width: 1px;
            }

            // Hide scrollbars on desktop (still scrollable in mobile)
            &::-webkit-scrollbar {
                height: 0;
            }

            .picture {
                grid-row: 1;
            }
        }

        @include r.lg {
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
        }
    }
}
</style>
