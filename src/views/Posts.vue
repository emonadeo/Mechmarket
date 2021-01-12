<template>
    <div class="posts" :class="{ 'viewing-post': id }">
        <div class="corner"></div>
        <title-bar>
            <search></search>
            <size-picker v-model="size"></size-picker>
            <region-picker></region-picker>
            <theme-picker></theme-picker>
        </title-bar>
        <tabs to="posts" :tabs="['Selling', 'Buying', 'Trading']"></tabs>
        <main>
            <loading v-if="loading"></loading>
            <div v-show="!loading" class="posting" v-for="post in posts">
                <overline>
                    <router-link :to="{ name: 'posts', query: { ...$route.query, region: post.region } }">
                        <template v-for="(region, i) in post.region.split('-')">
                            <span>{{ region }}</span>
                            <span class="sub" v-if="i + 1 < post.region.split('-').length"> &not; </span>
                        </template>
                    </router-link>
                </overline>
                <router-link :to="{ name: 'posts', params: { id: post.id }, query: $route.query }">
                    <h1 v-html="post.title"></h1>
                </router-link>
                <gallery :pictures="post.pictures" :limit="4"></gallery>
            </div>
        </main>
        <post
            v-if="this.id"
            class="post"
            :key="$route.name + ($route.params.id || '')"
            :post="post"
            :id="this.id"
        ></post>
    </div>
</template>

<script>
import reddit from 'src/util/reddit';

import Btn from 'src/components/Btn.vue';
import Loading from 'src/components/Loading.vue';
import Overline from 'src/components/Overline.vue';
import Gallery from 'src/components/Gallery.vue';
import RegionPicker from 'src/components/RegionPicker.vue';
import Search from 'src/components/Search.vue';
import SizePicker from 'src/components/SizePicker.vue';
import Tabs from 'src/components/Tabs.vue';
import TitleBar from 'src/components/TitleBar.vue';
import ThemePicker from 'src/components/ThemePicker.vue';

import Post from 'src/views/Post.vue';

export default {
    props: {
        category: String,
        id: String,
    },
    components: {
        Btn,
        Loading,
        Overline,
        Gallery,
        RegionPicker,
        Search,
        SizePicker,
        Tabs,
        TitleBar,
        ThemePicker,
        Post,
    },
    data: () => ({
        loading: true,
        posts: [],
        size: 0,
    }),
    computed: {
        query() {
            return this.$route.query.q;
        },
        region() {
            return this.$route.query.region;
        },
        post() {
            return this.posts.find((p) => p.id === this.id);
        },
    },
    watch: {
        category: function (category) {
            this.loadPosts(category, this.region, this.query);
        },
        region: function (region) {
            this.loadPosts(this.category, region, this.query);
        },
        query: function (q) {
            this.loadPosts(this.category, this.region, q);
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
@use "src/styles/responsive" as r;

.posts {
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    height: 100%;

    @include r.md {
        display: grid;
        grid-template-columns: 12rem 1fr;
        grid-template-rows: 2.5rem 1fr;
    }

    @include r.lg {
        display: grid;
        grid-template-columns: 16rem 1fr;
    }

    @include r.xxl {
        &.viewing-post {
            grid-template-columns: 16rem 1fr minmax(32rem, 1fr);
        }
    }

    .corner {
        display: none;

        @include r.md {
            display: block;
            grid-column: 1 / 2;
            grid-row: 1 / 2;
            border-right: none;
        }
    }

    .title-bar {
        @include r.md {
            grid-column: 2 / 4;
            grid-row: 1 / 2;
        }

        form {
            flex: 1;
            display: flex;
        }

        .search {
            flex: 1;

            @include r.lg {
                flex: initial;
                width: 30rem;
                margin-right: auto;
                border-right: none;
            }
        }

        .btn,
        .region-picker {
            border-left: none;
            min-width: 2.5rem;
        }
    }

    .tabs {
        @include r.md {
            grid-column: 1 / 2;
            grid-row: 2 / 3;
            border-right: none;
        }

        border-bottom: none;
    }

    main {
        flex: 1;
        overflow-y: auto;
        position: relative;

        @include r.lg {
            grid-column: 2 / 3;
            grid-row: 2 / 3;
        }

        .posting {
            margin: 1rem 1rem 1.5rem 1rem;

            h1 {
                margin: 0.5rem 0;
            }
        }
    }

    .post {
        position: absolute;
        top: 0;
        right: 0;
        left: 0;
        bottom: 0;
        overflow-y: hidden;

        @include r.md {
            position: static;
        }

        @include r.lg {
            position: absolute;
            top: 2.5rem;
            left: auto;
            height: auto;
            width: max(calc(48rem + 1px), 60vw);
            border-left: none;
        }

        @include r.xxl {
            position: static;
            width: auto;
            grid-column: 3 / 4;
        }
    }
}
</style>
