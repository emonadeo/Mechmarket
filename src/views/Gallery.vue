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
            <div class="post" v-for="post in posts">
                <overline>
                    <router-link :to="{ name: 'gallery', query: { region: post.region } }">
                        <template v-for="(region, i) in post.region.split('-')">
                            <span>{{ region }}</span>
                            <span class="sub" v-if="i + 1 < post.region.split('-').length"> &not; </span>
                        </template>
                    </router-link>
                </overline>
                <router-link :to="{ name: 'post', params: { id: post.id } }">
                    <h1 v-html="post.title"></h1>
                </router-link>
                <div class="gallery">
                    <photo v-for="picture in post.pictures.slice(0, 4)" crop="1" :key="picture" :src="picture"></photo>
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
import Overline from 'src/components/Overline.vue';
import Photo from 'src/components/Photo.vue';
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
        Photo,
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

.gallery {
    margin: 0 auto;
    display: flex;
    flex-direction: column;
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
            display: block;
            margin: 1.5rem 1rem;

            .gallery {
                display: grid;
                grid-template-columns: repeat(auto-fit, minmax(calc(50% - 0.5rem), 1fr));
                grid-auto-rows: auto;
                grid-gap: 1rem;
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
