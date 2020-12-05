<template>
    <div class="gallery surface">
        <title-bar>
            <form>
                <search></search>
                <region-picker></region-picker>
            </form>
        </title-bar>
        <tabs to="gallery" :tabs="['Selling', 'Buying', 'Trading']"></tabs>
        <main class="surface">
            <div class="loading" v-show="loading"><div class="surface">> loading...</div></div>
            <div class="post" v-for="post in posts">
                <div class="overline">
                    <h2>
                        <template v-for="(region, i) in post.region.split('-')">
                            <span>{{ region }}</span>
                            <span class="sub" v-if="i + 1 < post.region.split('-').length"> &not; </span>
                        </template>
                    </h2>
                    <hr />
                </div>
                <router-link :to="{ name: 'post', params: { post: post.id } }">
                    <h1 v-html="post.title"></h1>
                </router-link>
                <div class="gallery">
                    <div
                        class="img"
                        v-for="picture in post.pictures.slice(0, 4)"
                        :style="{ 'background-image': `url(${picture}` }"
                    ></div>
                </div>
                <!-- show hint if more than 4 images -->
                <p class="gallery-hint" v-if="post.pictures.length > 4">
                    + {{ post.pictures.length - 4 }} more image{{ post.pictures.length !== 5 ? 's' : '' }}
                </p>
            </div>
        </main>
    </div>
</template>

<script>
import reddit from 'src/util/reddit';

import Btn from 'src/components/Btn.vue';
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
        category(category) {
            this.loadPosts.bind(this)(category, this.region, this.query);
        },
    },
    created() {
        this.loadPosts.bind(this)(this.category, this.region, this.query);
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

.gallery {
    font-family: 'Fira Code', monospace;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    line-height: 1.5;
    height: 100%;

    .titlebar {
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
            height: c.$height;
        }
    }

    .tabs {
        border-bottom: c.$border;
    }

    main {
        flex: 1;
        overflow-y: auto;
        position: relative;

        .loading {
            position: absolute;
            top: 0;
            bottom: 0;
            left: 0;
            right: 0;
            display: flex;
            align-items: center;
            justify-content: center;

            > div {
                padding: 0.5rem 1rem;
                border: c.$border;
            }
        }

        .post {
            display: block;
            margin: 1.5rem 1rem;

            .overline {
                display: flex;
                margin: 0 0 0.5rem 0;
                align-items: center;

                h2 {
                    font-size: 0.75rem;
                    margin: 0;
                    font-weight: 500;
                }

                hr {
                    flex: 1;
                    margin: 0.375rem 0 0 0.75rem;
                    border-left: none;
                    border-bottom: none;
                    border-top: c.$border-secondary;
                    border-right: c.$border-secondary;
                    height: 0.375rem;
                    box-sizing: content-box;
                }
            }

            h1 {
                margin: 0 0 0.5rem 0;
                font-size: 1rem;
                font-weight: 400;
            }

            .gallery {
                display: grid;
                grid-template-columns: repeat(auto-fit, minmax(calc(50% - 0.5rem), 1fr));
                grid-auto-rows: auto;
                grid-gap: 1rem;

                .img {
                    background-size: cover;
                    background-position: center;
                    padding-bottom: 100%;
                    border: c.$border-secondary;
                }
            }

            .gallery-hint {
                margin: 0.5rem 0 0 0;
                font-size: 0.75rem;
                text-align: right;
                font-weight: 500;
            }
        }
    }
}
</style>
