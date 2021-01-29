<template>
    <div class="posts" :scale="scale">
        <loading v-if="loading"></loading>
        <post class="posting" v-for="post in posts" :key="post.id" :post="post"></post>
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
    display: grid;
    grid-gap: 1rem;
    grid-auto-rows: max-content;

    // Fix bottom padding bug
    &::after {
        content: '';
        height: 1px;
        grid-column: start / end;
    }

    &[scale='0'] {
        grid-template-columns: [start] 1fr [end];
    }

    &[scale='1'] {
        grid-template-columns: [start] 1fr [end];

        @include r.lg {
            grid-template-columns: [start] repeat(2, 1fr) [end];
        }
    }

    &[scale='2'] {
        grid-template-columns: [start] repeat(auto-fit, minmax(min(max(19rem, calc(33% - 1rem)), 3 * 9rem), 1fr)) [end];
    }
}
</style>
