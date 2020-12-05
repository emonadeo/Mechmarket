<template>
    <div class="post">
        <title-bar>
            <btn @click="$router.back()"><-</btn>
        </title-bar>
        <loading v-show="loading"></loading>
        <main v-show="!loading">
            <h1>{{ post.title }}</h1>
            <div class="have">
                <overline>Has</overline>
                <div>{{ post.have.join(', ') }}</div>
            </div>
            <div class="want">
                <overline>Wants</overline>
                <div>{{ post.want.join(', ') }}</div>
            </div>
        </main>
    </div>
</template>

<script>
import Btn from 'src/components/Btn.vue';
import Loading from 'src/components/Loading.vue';
import Overline from 'src/components/Overline.vue';
import TitleBar from 'src/components/TitleBar.vue';

import reddit from 'src/util/reddit';

export default {
    props: {
        id: String,
    },
    components: {
        Btn,
        Loading,
        Overline,
        TitleBar,
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

    > div {
        margin-bottom: 0.5rem;
    }
}
</style>
