<template>
    <div class="post">
        <title-bar>
            <btn @click="$router.go(-1)"><-</btn>
        </title-bar>
        <loading v-show="loading"></loading>
        <main v-show="!loading">
            <h1>{{ post.title }}</h1>
            <div class="have">
                <h2>Has</h2>
                <ul>
                    <li v-for="product in post.have">{{ product }}</li>
                </ul>
            </div>
            <div class="want">
                <h2>Wants</h2>
                <ul>
                    <li v-for="product in post.want">{{ product }}</li>
                </ul>
            </div>
        </main>
    </div>
</template>

<script>
import TitleBar from 'src/components/TitleBar.vue';
import Btn from 'src/components/Btn.vue';

import reddit from 'src/util/reddit';
import Loading from 'src/components/Loading.vue';

export default {
    props: {
        id: String,
    },
    components: {
        Loading,
        TitleBar,
        Btn,
    },
    data: () => ({
        loading: true,
        post: {},
    }),
    async created() {
        this.post = await reddit.fetchPost(this.id);
        this.loading = false;
    },
};
</script>

<style lang="scss" scoped>
main {
    padding: 1rem;
}
</style>
