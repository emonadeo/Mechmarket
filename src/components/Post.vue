<template>
    <card class="post" :scale="scale">
        <region class="type-overline" :region="post.region"></region>
        <article>
            <div v-if="post.category !== 'trading'" class="title">
                <h1>
                    <btn inline :href="post.href" v-html="post.category === 'selling' ? post.have : post.want"></btn>
                </h1>
                <div>
                    <h6 class="type-overline">{{ post.category === 'selling' ? 'Accepting' : 'Offering' }}</h6>
                    <payment-methods :methods="post.category === 'selling' ? post.want : post.have"></payment-methods>
                </div>
            </div>
            <gallery v-if="post.pictures.length > 0" :pictures="post.pictures" :href="post.href"></gallery>
            <section v-show="scale === 0" class="description markdown" v-html="post.description"></section>
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
    </card>
</template>

<script>
import Btn from 'src/components/Btn.vue';
import Card from 'src/components/Card.vue';
import Gallery from 'src/components/Gallery.vue';
import PaymentMethods from 'src/components/PaymentMethods.vue';
import Region from 'src/components/Region.vue';

export default {
    name: 'Post',
    props: {
        post: Object,
    },
    components: {
        Btn,
        Card,
        Gallery,
        PaymentMethods,
        Region,
    },
    computed: {
        scale() {
            return this.$store.state.scale;
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
    overflow-x: hidden;

    .region,
    .title {
        margin-bottom: 1rem;
    }

    article .title {
        h1 {
            @include mixins.type-h4;
        }

        .type-overline {
            margin-bottom: 0.5rem;
        }
    }

    &[scale='0'] {
        article .title {
            margin-bottom: 2rem;

            h1 {
                @include mixins.type-h1;
                margin-bottom: 2rem;
            }
        }

        .gallery {
            margin-bottom: 2rem;
        }

        .description {
            margin-bottom: 2rem;
        }

        @include r.lt-md {
            article {
                .title h1 {
                    @include mixins.type-h4;
                }

                .gallery {
                    display: grid;
                    grid-gap: 1rem;
                    grid-auto-columns: 8rem;
                    grid-auto-flow: column;
                    overflow-x: auto;
                    padding-left: 1rem;
                    margin: 0 -1rem 2rem -1rem;

                    // Fix scroll padding bug
                    &::after {
                        content: '';
                        grid-row: 1;
                        width: 1px;
                    }
                }
            }
        }

        $padding: 2rem;

        @include r.md {
            padding: $padding;

            article .gallery {
                display: flex;
                grid-gap: 1rem;
                flex-wrap: wrap;
            }
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
                }

                .gallery {
                    min-width: typography.$max-line-width;
                    margin-left: 5rem;
                    margin-right: auto;

                    @media (min-width: 1120px) {
                        margin-left: auto;
                    }
                }

                .title,
                .markdown h1,
                .markdown h2,
                .markdown h3,
                .markdown h4,
                .markdown h5,
                .markdown h6,
                .markdown p,
                .markdown td,
                .markdown ol,
                .markdown ul,
                .markdown pre {
                    max-width: typography.$max-line-width;
                    margin-left: 5rem;
                    margin-right: auto;

                    @media (min-width: 1120px) {
                        margin-left: auto;
                    }
                }
            }
        }
    }

    // clamp title to two line on linear view
    &[scale='1'],
    &[scale='2'] {
        article .title h1 {
            margin-bottom: 1rem;
        }

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
    }
}
</style>
