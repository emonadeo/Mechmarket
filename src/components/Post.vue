<template>
    <router-link class="post surface elevated" :size="size" :to="{ name: 'posts', params: { id: post.id } }">
        <region class="type-overline" :region="post.region"></region>
        <div class="title">
            <h6 class="type-h6" v-html="post.title"></h6>
        </div>
        <gallery :pictures="post.pictures" :limit="limit" :min="limit"></gallery>
        <p v-show="size === 0" v-html="post.description"></p>
        <div class="type-overline">
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
                    return 6;
                case 1:
                    return 3;
                case 2:
                    return 2;
            }
        },
    },
};
</script>

<style scoped lang="scss">
@use 'src/styles/mixins';

.post {
    display: flex;
    padding: 1rem;
    flex-direction: column;
    align-items: flex-start;

    @include mixins.interactive;

    > *:not(:last-child) {
        margin-bottom: 1rem;
    }

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
