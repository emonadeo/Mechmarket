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
    mounted() {
        window.addEventListener('resize', () => {
            if (!window.matchMedia('(min-width: 768px)').matches) {
                this.$store.dispatch('setSize', 1);
            }
        });
    },
};
</script>

<style scoped lang="scss">
@use "src/styles/typography";
@use "src/styles/responsive" as r;

.posts {
    display: grid;
    grid-gap: 1rem;
    overflow-y: auto;
    grid-auto-rows: max-content;

    // Fix bottom padding bug
    &::after {
        content: '';
        height: 1px;
        grid-column: start / end;
    }

    &[size='0'] {
        display: flex;
        flex-direction: column;
        margin: 0 auto;
    }

    &[size='1'] {
        grid-template-columns: [start] 1fr [end];

        @include r.lg {
            grid-template-columns: [start] repeat(2, 1fr) [end];
        }
    }

    &[size='2'] {
        grid-template-columns: [start] repeat(auto-fit, minmax(min(max(19rem, calc(33% - 1rem)), 3 * 9rem), 1fr)) [end];
    }
}
</style>
