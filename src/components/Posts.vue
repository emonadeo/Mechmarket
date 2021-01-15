<template>
    <div class="posts" :size="size">
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
        size() {
            return this.$store.state.size;
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
    overflow: visible;

    &[size='0'] {
        display: flex;
        flex-direction: column;
        margin: 0 auto;
    }

    &[size='1'] {
        @include r.lg {
            grid-template-columns: repeat(auto-fit, minmax(max(calc(50% - 1rem), 3 * 9rem), 1fr));
        }
    }

    &[size='2'] {
        grid-template-columns: repeat(auto-fit, minmax(min(calc(50% - 1rem), 3 * 9rem), 1fr));
    }
}
</style>
