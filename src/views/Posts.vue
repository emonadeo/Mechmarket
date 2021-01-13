<template>
    <div id="posts" :class="{ 'viewing-post': id }">
        <div class="corner"></div>
        <form class="title-bar background">
            <search></search>
            <region-picker></region-picker>
        </form>
        <aside>
            <tabs to="posts" :tabs="['Selling', 'Buying', 'Trading']"></tabs>
            <div class="options">
                <size-picker></size-picker>
                <theme-picker></theme-picker>
            </div>
            <ul class="socials">
                <li>
                    <btn icon inline href="https://github.com/Emonadeo/Mechmarket">
                        <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <title>GitHub icon</title>
                            <path
                                d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"
                            />
                        </svg>
                    </btn>
                </li>
            </ul>
        </aside>
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
@use "src/styles/color";

#posts {
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    height: 100%;

    @include r.md {
        display: grid;
        grid-column-gap: 1rem;
        grid-template-columns: 12rem 1fr;
        grid-template-rows: min-content 1fr;
    }

    @include r.lg {
        display: grid;
        grid-template-columns: 16rem 1fr;
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
        padding: 1rem 1rem 0 0;
        display: flex;
        position: relative;

        &::after {
            content: '';
            position: absolute;
            right: 0;
            left: -0%;
            top: 100%;
            z-index: 10;
            display: block;
            height: 1rem;
            background-size: 1rem 100%;
            background-image: linear-gradient(color.$background 25%, transparent 100%);
            background-position: 0 0;
        }

        @include r.md {
            grid-column: 2 / 3;
            grid-row: 1 / 2;
        }

        .search {
            flex: 1;
        }
    }

    aside {
        margin: 1rem 0 2.5rem 0;
        display: flex;
        flex-direction: column;
        align-items: flex-start;

        @include r.md {
            grid-column: 1 / 2;
            grid-row: 2 / 3;
        }

        > *:not(:last-child) {
            margin-bottom: 2.5rem;
        }

        .tabs {
            width: 100%;
            margin-bottom: auto;
        }

        .options,
        .socials {
            margin-left: 2.5rem;
        }

        .options > *:not(:last-child) {
            margin-bottom: 1rem;
        }

        .socials {
            display: flex;
        }
    }

    main {
        flex: 1;
        overflow-y: auto;
        padding: 1rem 1rem 1rem 0;
    }

    main,
    .title-bar {
        margin-left: -4px;
        padding-left: 4px;
    }
}
</style>
