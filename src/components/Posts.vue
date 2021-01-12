<template>
    <div class="posts" :size="size">
        <loading v-if="loading"></loading>
        <post v-show="!loading" class="posting" v-for="post in posts" :post="post"></post>
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

    &[size='1'] {
        grid-template-columns: 1fr 1fr;
    }

    &[size='2'] {
        grid-template-columns: 1fr 1fr 1fr;
    }
}
</style>
