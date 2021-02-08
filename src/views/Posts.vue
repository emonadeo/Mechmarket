<template>
    <div id="posts" :class="{ 'viewing-post': id }">
        <drawer></drawer>
        <div class="container" :collapsed="collapsed">
            <div class="title-bar background">
                <btn class="menu" icon outline @click.native="toggleDrawer">
                    <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24">
                        <path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z" />
                    </svg>
                </btn>
                <search></search>
                <region-picker></region-picker>
            </div>
            <main>
                <posts :posts="posts" :loading="loading"></posts>
            </main>
        </div>
    </div>
</template>

<script>
import { fetchPosts } from 'src/util/reddit';

import Btn from 'src/components/Btn.vue';
import Drawer from 'src/components/Drawer.vue';
import Posts from 'src/components/Posts.vue';
import RegionPicker from 'src/components/RegionPicker.vue';
import Search from 'src/components/Search.vue';

export default {
    props: {
        category: String,
        id: String,
    },
    components: {
        Btn,
        Drawer,
        Posts,
        RegionPicker,
        Search,
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
        collapsed() {
            return this.$store.state.collapseDrawer;
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
        async loadPosts(category, region, query) {
            this.loading = true;
            this.posts = await fetchPosts(category, region, query);
            this.loading = false;
        },
        toggleDrawer() {
            this.$store.dispatch('toggleDrawer');
        },
    },
};
</script>

<style lang="scss" scoped>
@use "src/styles/responsive" as r;
@use "src/styles/color";

#posts {
    margin: 0 auto;
    display: flex;
    height: 100%;

    .drawer {
        flex: 0 0 auto;
    }

    .container {
        flex: 1;
        display: flex;
        flex-direction: column;
        padding-left: 1rem;

        .title-bar {
            display: flex;
            padding: 1rem 1rem 4px 4px;
            margin-left: -4px; // avoid overflow when hovering above cards

            > *:not(:last-child) {
                margin-right: 1rem;
            }

            .search {
                flex: 1;
            }
        }

        main {
            position: relative;
            display: flex;
            flex-direction: column;
            overflow: hidden;
            margin-left: -4px; // avoid overflow when hovering above cards

            // top gradient
            &::before {
                content: '';
                position: absolute;
                right: 0;
                left: -0%;
                top: 0;
                z-index: 10;
                display: block;
                height: 1rem;
                background-size: 1rem 100%;
                background-image: linear-gradient(color.$background 25%, transparent 100%);
                background-position: 0 0;
            }

            .posts {
                padding: calc(1rem - 2px) 1rem 0 4px; // avoid overflow when hovering above cards
            }
        }
    }

    @include r.md {
        .container:not([collapsed]) {
            padding-left: 0.5rem;
        }
    }

    @include r.lg {
        .container {
            padding-left: 0.5rem;
        }

        .title-bar .menu {
            display: none;
        }
    }
}
</style>
