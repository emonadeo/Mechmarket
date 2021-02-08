<template>
    <div class="posts">
        <loading v-if="loading"></loading>
        <template v-else>
            <div class="container" :scale="scale">
                <post class="posting" v-for="post in posts" :key="post.id" :post="post"></post>
            </div>
        </template>
    </div>
</template>

<script>
import Loading from 'src/components/Loading.vue';
import Post from 'src/components/Post.vue';

export default {
    name: 'Posts',
    props: {
        posts: Array,
        loading: Boolean,
    },
    components: {
        Loading,
        Post,
    },
    computed: {
        scale() {
            return this.$store.state.scale;
        },
    },
};
</script>

<style scoped lang="scss">
@use "src/styles/typography";
@use "src/styles/responsive" as r;

.posts {
    position: relative;
    overflow-x: hidden;
    overflow-y: auto;

    .container {
        column-gap: 1rem;
        column-fill: balance;
        grid-gap: 1rem;
        grid-auto-rows: max-content;
        grid-template-columns: [start] 1fr [end];

        // Fix bottom padding bug
        &::after {
            content: '';
            height: 1px;
            grid-column: start / end;
        }

        &[scale='0'] {
            display: grid;
        }

        &[scale='1'] {
            display: grid;

            @include r.lg {
                display: block;
                columns: 2 0;

                .posting {
                    width: 100%;
                    margin-bottom: 1rem;
                    display: inline-block;
                }
            }
        }

        &[scale='2'] {
            display: block;
            columns: 2 0;

            .posting {
                width: 100%;
                margin-bottom: 1rem;
                display: inline-block;
            }

            @include r.xl {
                columns: 3 0;
            }

            @include r.xxl {
                columns: 25rem auto;
            }
        }
    }
}
</style>
