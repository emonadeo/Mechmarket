<template>
    <div class="post surface elevated">
        <div class="type-overline">
            <region :region="post.region"></region>
        </div>
        <router-link :to="{ name: 'posts', params: { id: post.id }, query: $route.query }">
            <h1 v-html="post.title"></h1>
        </router-link>
        <div :pictures="post.pictures" :limit="4"></div>
    </div>
</template>

<script>
import Btn from 'src/components/Btn.vue';
import Region from 'src/components/Region.vue';

export default {
    name: 'Post',
    props: {
        post: Object,
    },
    components: {
        Btn,
        Region,
    },
};
</script>

<style scoped lang="scss">
.post {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
}
</style>
