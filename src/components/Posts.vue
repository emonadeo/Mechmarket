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
.posts {
    display: grid;
    grid-gap: 1rem;
    overflow: visible;

    &[size='0'] {
        margin: 0 auto;
    }

    &[size='1'] {
        grid-template-columns: repeat(2, 1fr);
    }

    &[size='2'] {
        grid-template-columns: repeat(3, 1fr);
    }
}
</style>
