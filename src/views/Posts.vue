<template>
    <div id="posts" :class="{ 'viewing-post': id }">
        <div class="corner">
            <theme-picker></theme-picker>
            <size-picker></size-picker>
        </div>
        <form class="title-bar">
            <search></search>
            <region-picker></region-picker>
        </form>
        <tabs to="posts" :tabs="['Selling', 'Buying', 'Trading']"></tabs>
        <main>
            <posts :posts="posts" :loading="loading"></posts>
        </main>
    </div>
</template>

<script>
import reddit from 'src/util/reddit';

import Btn from 'src/components/Btn.vue';
import Posts from 'src/components/Posts.vue';
import RegionPicker from 'src/components/RegionPicker.vue';
import Search from 'src/components/Search.vue';
import SizePicker from 'src/components/SizePicker.vue';
import Tabs from 'src/components/Tabs.vue';
import ThemePicker from 'src/components/ThemePicker.vue';

export default {
    props: {
        category: String,
        id: String,
    },
    components: {
        Btn,
        Posts,
        RegionPicker,
        Search,
        SizePicker,
        Tabs,
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

#posts {
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
        display: flex;

        @include r.md {
            grid-column: 2 / 4;
            grid-row: 1 / 2;
        }

        .search {
            flex: 1;
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
    }
}
</style>
