<template>
    <router-link class="post surface elevated" :to="{ name: 'posts', params: { id: post.id } }">
        <region class="type-overline" :region="post.region"></region>
        <h6 class="type-h6" v-html="post.title"></h6>
        <gallery :pictures="post.pictures" :limit="2"></gallery>
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
};
</script>

<style scoped lang="scss">
@use 'src/styles/color';

.post {
    display: flex;
    padding: 1rem;
    flex-direction: column;
    align-items: flex-start;

    > *:not(:last-child) {
        margin-bottom: 0.5em;
    }
}
</style>
