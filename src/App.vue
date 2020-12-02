<template>
    <div id="app" class="surface" :class="theme">
        <div class="titlebar">
            <div class="control">
                <search></search>
                <btn>US</btn>
                <btn @click="$store.dispatch('toggleTheme')">D</btn>
            </div>
            <nav class="tabs">
                <router-link
                    class="tab"
                    :to="{ name: 'home', params: { flair: 'selling' }, query: { q: $store.state.query } }"
                    :selected="$route.params.flair === 'selling'"
                >
                    Selling
                </router-link>
                <router-link
                    class="tab"
                    :to="{ name: 'home', params: { flair: 'buying' }, query: { q: $store.state.query } }"
                    :selected="$route.params.flair === 'buying'"
                >
                    Buying
                </router-link>
                <router-link
                    class="tab"
                    :to="{ name: 'home', params: { flair: 'trading' }, query: { q: $store.state.query } }"
                    :selected="$route.params.flair === 'trading'"
                >
                    Trading
                </router-link>
            </nav>
        </div>
        <main class="surface">
            <p v-if="loading">...</p>
            <div class="post" v-for="post in posts">
                <h1>{{ post.text }}</h1>
                <div class="gallery">
                    <div
                        class="img"
                        v-for="picture in post.pictures"
                        :style="{ 'background-image': `url(${picture}` }"
                    ></div>
                </div>
            </div>
        </main>
    </div>
</template>

<script>
import Search from 'src/components/Search.vue';
import Btn from 'src/components/Btn.vue';

import store from 'src/services/store';

async function pictures(post) {
    if (!post.selftext) return [];

    // get links in post
    let pictures = [
        ...post.selftext.matchAll(
            /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]*\.[a-zA-Z0-9]*\b([-a-zA-Z0-9@:%_+.~#?&/=]*)/g
        ),
    ].map((res) => res[0]);

    // cancel if no pictures
    if (!pictures) return {};

    pictures = await Promise.all(
        pictures.map(async (t) => {
            if (/\/\/imgur\.com\/a\//.test(t)) {
                // timestamp is imgur album
                let hash = t.split('/').pop();
                let resImages = await fetch(`https://api.imgur.com/3/album/${hash}/images`, {
                    headers: {
                        Authorization: 'Client-ID 18506a441ae08ca',
                    },
                });
                let jsonImages = await resImages.json();
                return jsonImages.data.map((img) => img.link);
            } else if (/\/\/imgur\.com\/gallery\//.test(t)) {
                // timestamp is imgur gallery
                let hash = t.split('/').pop();
                let resImages = await fetch(`https://api.imgur.com/3/gallery/${hash}`, {
                    headers: {
                        Authorization: 'Client-ID 18506a441ae08ca',
                    },
                });
                let jsonImages = await resImages.json();
                return jsonImages.data.images.map((img) => img.link);
            }
            return t;
        })
    );

    pictures = pictures.flat();

    // remove non-images
    pictures = pictures.filter((t) => {
        return /\.(png|jpg|jpeg|gif|webp)\/?$/.test(t);
    });

    return pictures;
}

async function update(flair) {
    console.log(flair);
    switch (flair) {
        case 'selling':
            this.loading = true;
            let res = await fetch(
                'https://www.reddit.com/r/mechmarket/search/.json?q=flair:selling&restrict_sr=on&sort=new'
            );
            let json = await res.json();
            let posts = json.data.children;
            this.posts = await Promise.all(
                posts.map(async (post) => ({
                    text: post.data.title,
                    pictures: await pictures(post.data),
                }))
            );
            this.loading = false;
            break;
        default:
            this.posts = [];
            break;
    }
}

export default {
    props: {
        flair: String,
    },
    components: {
        Search,
        Btn,
    },
    data: () => ({
        loading: true,
        posts: [],
    }),
    computed: {
        theme() {
            return this.$store.state.theme;
        },
    },
    watch: {
        flair(flair) {
            update.bind(this)(flair);
        },
    },
    created() {
        update.bind(this)(this.flair);
    },
    beforeRouteEnter(to, from, next) {
        if (to.query.q !== store.state.query) {
            store.commit('updateQuery', to.query.q);
        }
        next();
    },
};
</script>

<style lang="scss">
$width: 2.5rem;
$border: 1px solid var(--primary);

* {
    box-sizing: border-box;
}

html,
body,
#app {
    width: 100%;
    height: 100%;
}

#app {
    font-family: 'Fira Code', monospace;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    line-height: 1.5;

    .titlebar {
        .control {
            border-bottom: $border;
            display: flex;
            height: $width;

            .btn {
                border-left: $border;
                width: $width;
                height: $width;
            }
        }

        .tabs {
            height: $width;
            display: flex;
            border-bottom: $border;

            .tab {
                flex: 1;
                display: flex;
                align-items: center;
                justify-content: center;
                text-decoration: none;
                color: inherit;
                padding: 0.5rem;

                &:not(:last-child) {
                    border-right: $border;
                }

                &[selected] {
                    font-weight: 700;
                    background-color: var(--secondary);
                }
            }
        }
    }

    main {
        flex: 1;
        overflow-y: auto;

        .post {
            padding: 1rem;

            &:not(:last-child) {
                border-bottom: 1rem solid var(--secondary);
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
                    border: $border;
                }
            }
        }
    }
}
</style>
