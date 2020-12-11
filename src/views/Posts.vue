<template>
    <div class="posts surface">
        <title-bar>
            <search></search>
            <region-picker></region-picker>
        </title-bar>
        <tabs to="posts" :tabs="['Selling', 'Buying', 'Trading']"></tabs>
        <main class="surface">
            <div class="post" v-for="post in posts">
                <overline>
                    <router-link :to="{ name: 'posts', query: { region: post.region } }">
                        <template v-for="(region, i) in post.region.split('-')">
                            <span>{{ region }}</span>
                            <span class="sub" v-if="i + 1 < post.region.split('-').length"> &not; </span>
                        </template>
                    </router-link>
                </overline>
                <router-link :to="{ name: 'post', params: { id: post.id } }">
                    <h1 v-html="post.title"></h1>
                </router-link>
                <gallery :pictures="post.pictures" :limit="4"></gallery>
            </div>
        </main>
    </div>
</template>

<script>
import reddit from 'src/util/reddit';

import Btn from 'src/components/Btn.vue';
import Overline from 'src/components/Overline.vue';
import Gallery from 'src/components/Gallery.vue';
import RegionPicker from 'src/components/RegionPicker.vue';
import Search from 'src/components/Search.vue';
import Tabs from 'src/components/Tabs.vue';
import TitleBar from 'src/components/TitleBar.vue';
import ThemePicker from 'src/components/ThemePicker.vue';

export default {
    props: {
        category: String,
    },
    components: {
        Btn,
        Overline,
        Gallery,
        RegionPicker,
        Search,
        Tabs,
        TitleBar,
        ThemePicker,
    },
    data: () => ({
        loading: true,
        posts: [],
    }),
    computed: {
        query() {
            return this.$route.query.q;
        },
        region() {
            return this.$route.query.region;
        },
    },
    watch: {
        $route: function (route) {
            this.loadPosts(route.params.category, this.region, this.query);
        },
    },
    created() {
        this.loadPosts(this.category, this.region, this.query);
    },
    methods: {
        loadPosts: async function (category, region, query) {
            this.loading = true;
            this.posts = await reddit.fetchPosts(category, region, query);
            this.loading = false;
        },
    },
};
</script>

<style lang="scss" scoped>
@use 'src/styles/constants' as c;

.posts {
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    height: 100%;

    .title-bar {
        form {
            flex: 1;
            display: flex;
            height: c.$height;
        }

        .search {
            flex: 1;
            height: c.$height;
        }

        .btn,
        .region-picker {
            border-left: c.$border;
            min-width: c.$height;
        }
    }

    .tabs {
        border-bottom: c.$border;
    }

    main {
        flex: 1;
        overflow-y: auto;
        position: relative;

        .post {
            margin: 1.5rem 1rem;

            h1 {
                margin: 0.5rem 0;
            }
        }
    }
}
</style>
