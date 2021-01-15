<template>
    <div id="posts" :class="{ 'viewing-post': id }">
        <div class="logo">
            <svg viewBox="0 0 320 320" xmlns="http://www.w3.org/2000/svg">
                <path
                    d="M47.693,51.598c0.782,0.002 1.565,0.04 2.342,0.113c65.788,6.38 131.562,12.89 197.333,19.434c7.139,0.728 13.903,4.671 18.032,10.619c1.312,1.89 2.358,3.962 3.106,6.136l0.018,0.052c16.48,48.506 32.833,97.054 49.249,145.581c2.322,6.912 1.474,14.706 -2.288,20.931c-2.891,4.784 -7.436,8.549 -12.673,10.5c-2.754,1.026 -5.683,1.556 -8.638,1.571c-89.066,0.153 -178.131,-0.066 -267.196,-0.099c-5.955,-0.014 -11.873,-2.222 -16.359,-6.112c-4.171,-3.617 -7.088,-8.645 -8.154,-14.072c-0.506,-2.579 -0.598,-5.235 -0.284,-7.843c6.803,-55.011 13.705,-110.01 20.686,-164.999c0.786,-6.034 3.834,-11.72 8.403,-15.686c4.459,-3.872 10.308,-6.091 16.268,-6.126c0.051,0 0.103,0 0.155,0Zm-0.069,20c-2.381,0.014 -4.6,1.904 -4.92,4.362c-6.977,54.957 -14.243,109.88 -20.674,164.904c-0.188,1.654 0.509,3.38 1.793,4.436c0.881,0.724 2.013,1.13 3.157,1.136c89.048,0.216 178.098,0.56 267.144,0.099c1.872,-0.017 3.68,-1.166 4.482,-2.857c0.546,-1.152 0.628,-2.511 0.224,-3.727c-16.313,-48.542 -32.82,-97.019 -49.23,-145.528c-0.007,-0.02 -0.014,-0.04 -0.021,-0.059c-0.629,-1.783 -2.294,-3.123 -4.215,-3.319c-65.747,-6.542 -131.458,-13.464 -197.26,-19.427c-0.16,-0.014 -0.32,-0.021 -0.48,-0.02Z"
                />
            </svg>
        </div>
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
        <div class="title-bar background">
            <search></search>
            <region-picker></region-picker>
        </div>
        <main>
            <posts :posts="posts" :loading="loading"></posts>
        </main>
    </div>
</template>

<script>
import { fetchPosts } from 'src/util/reddit';

import Btn from 'src/components/Btn.vue';
import Posts from 'src/components/Posts.vue';
import RegionPicker from 'src/components/RegionPicker.vue';
import Search from 'src/components/Search.vue';
import SizePicker from 'src/components/SizePicker.vue';
import Tabs from 'src/components/Tabs.vue';
import ThemePicker from 'src/components/ThemePicker.vue';
import Post from 'src/model/post.js';

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
            this.posts = await fetchPosts(category, region, query);
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

    .logo {
        display: flex;
        align-items: flex-end;
        position: absolute;
        top: 1.25rem;
        left: 1rem;

        img,
        svg {
            height: 2rem;
        }
    }

    .title-bar {
        display: flex;
        padding: 0.5rem 1rem 2px 1rem;

        .search {
            flex: 1;
            margin-right: 1rem;
        }
    }

    aside {
        display: grid;
        padding: 1rem 1rem 0 1rem;
        grid-template-columns: 2rem min-content 1fr min-content;
        grid-gap: 0.5rem 1rem;
        grid-template-areas:
            'logo socials . options'
            'tabs tabs tabs tabs';

        .tabs {
            grid-area: tabs;
        }

        .options {
            grid-area: options;

            > *:not(:last-child) {
                margin-bottom: 1rem;
            }

            .size-picker {
                display: none;
            }
        }

        .socials {
            grid-area: socials;
            display: flex;
            align-items: center;
        }

        .tabs {
            grid-area: tabs;
        }
    }

    main {
        flex: 1;
        position: relative;
        overflow: hidden;

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
            height: 100%;
            overflow-y: auto;
            padding: 1rem 1rem 0 1rem;
        }
    }

    @include r.md {
        display: grid;
        grid-column-gap: 1rem;
        grid-template-columns: 11rem 1fr;
        grid-template-rows: min-content 1fr;

        .logo {
            position: static;
            grid-column: 1 / 2;
            grid-row: 1 / 2;
            margin-left: 2.5rem;
        }

        .title-bar {
            grid-column: 2 / 3;
            grid-row: 1 / 2;
            padding-left: 0;
        }

        aside {
            grid-column: 1 / 2;
            grid-row: 2 / 3;
            display: flex;
            flex-direction: column;
            align-items: flex-start;
            margin: 1rem 0 2.5rem 0;
            padding: 0;

            > *:not(:last-child) {
                margin-bottom: 2.5rem;
            }

            .tabs {
                width: 100%;
                margin-bottom: auto;
            }

            .options,
            .socials {
                display: flex;
                margin-left: 2.5rem;
            }

            .options {
                flex-direction: column;

                .size-picker {
                    display: flex;
                }
            }
        }

        main {
            grid-column: 2 / 3;
            grid-row: 2 / 3;
            margin-left: -4px; // avoid overflow when hovering above cards

            .posts {
                padding-bottom: 1.5rem;
                padding-left: 4px; // avoid overflow when hovering above cards
            }
        }

        // avoid overflow when hovering above cards
        .title-bar {
            margin-left: -4px;
            padding-left: 4px;
        }
    }

    @include r.lg {
        grid-template-columns: min(17%, 16rem) 1fr;
    }

    @include r.xxl {
        grid-template-columns: 16rem 1fr 16rem;
    }
}
</style>
