<template>
    <div id="app" class="surface" :class="theme">
        <div class="titlebar">
            <div class="control">
                <form>
                    <search></search>
                    <region-picker></region-picker>
                </form>
                <btn class="theme" @click="$store.dispatch('toggleTheme')">
                    <svg xmlns="http://www.w3.org/2000/svg" height="24" width="24" viewBox="0 0 6.3499998 6.35">
                        <g transform="translate(0,-290.64998)">
                            <path
                                d="m 4.3466476,291.17915 a 2.8163548,2.8163548 0 0 1 0.3476437,1.34877 2.8163548,2.8163548 0 0 1 -2.8163547,2.81635 2.8163548,2.8163548 0 0 1 -1.34216911,-0.34104 2.8163548,2.8163548 0 0 0 2.46871101,1.46758 2.8163548,2.8163548 0 0 0 2.8163548,-2.81635 2.8163548,2.8163548 0 0 0 -1.4741857,-2.47531 z"
                            />
                        </g>
                    </svg>
                </btn>
            </div>
            <nav class="tabs">
                <router-link
                    class="tab"
                    :to="{ name: 'home', params: { flair: 'selling' }, query: $route.query }"
                    :selected="$route.params.flair === 'selling'"
                >
                    Selling
                </router-link>
                <router-link
                    class="tab"
                    :to="{ name: 'home', params: { flair: 'buying' }, query: $route.query }"
                    :selected="$route.params.flair === 'buying'"
                >
                    Buying
                </router-link>
                <router-link
                    class="tab"
                    :to="{ name: 'home', params: { flair: 'trading' }, query: $route.query }"
                    :selected="$route.params.flair === 'trading'"
                >
                    Trading
                </router-link>
            </nav>
        </div>
        <main class="surface">
            <div class="loading" v-show="loading"><div class="surface">> loading...</div></div>
            <a class="post" v-for="post in posts" :href="post.href">
                <div class="overline">
                    <h2>
                        <template v-for="(region, i) in post.regions">
                            <span>{{ region }}</span>
                            <span class="sub" v-if="i + 1 < post.regions.length"> &not; </span>
                        </template>
                    </h2>
                    <hr />
                </div>
                <h1 v-html="post.title"></h1>
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
            </a>
        </main>
    </div>
</template>

<script>
import Search from 'src/components/Search.vue';
import Btn from 'src/components/Btn.vue';
import RegionPicker from 'src/components/RegionPicker.vue';

async function pictures(post) {
    if (!post.selftext) return [];

    // get links in post and avoid duplicates
    let pictures = [
        ...new Set(
            [
                ...post.selftext.matchAll(
                    /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]*\.[a-zA-Z0-9]*\b([-a-zA-Z0-9@:%_+.~#/]*)/g
                ),
            ].map((res) => res[0])
        ),
    ];

    // cancel if no pictures
    if (!pictures) return {};

    pictures = await Promise.all(
        pictures.map(async (t) => {
            if (/imgur\.com\/a\//.test(t)) {
                // timestamp is imgur album
                let hash = t.split('/').pop();
                let resImages = await fetch(`https://api.imgur.com/3/album/${hash}/images`, {
                    headers: {
                        Authorization: 'Client-ID 18506a441ae08ca',
                    },
                });
                if (!resImages.ok) {
                    console.warn(`Invalid Imgur album! Cannot resolve ${t}`);
                    return [];
                }
                let jsonImages = await resImages.json();
                return jsonImages.data.map((img) => img.link);
            } else if (/imgur\.com\/gallery\//.test(t)) {
                // timestamp is imgur gallery
                let hash = t.split('/').pop();
                let resImages = await fetch(`https://api.imgur.com/3/gallery/${hash}`, {
                    headers: {
                        Authorization: 'Client-ID 18506a441ae08ca',
                    },
                });
                if (!resImages.ok) {
                    console.warn(`Invalid Imgur gallery! Cannot resolve ${t}`);
                    return [];
                }
                let jsonImages = await resImages.json();
                return jsonImages.data.images.map((img) => img.link);
            } else if (/imgur\.com\/[A-Za-z0-9]*$/.test(t)) {
                // timestamp is imgur photo
                t = `https://i.imgur.com/${t.split('/').pop()}.jpg`;
            }
            return t;
        })
    );

    // flatten and remove non-images
    pictures = pictures.flat().filter((t) => {
        return /\.(png|jpg|jpeg|gif|webp)\/?$/.test(t);
    });

    return pictures;
}

async function update(options) {
    this.loading = true;
    let q = Object.entries(options)
        .filter((entry) => entry[1] && entry[0] !== 'content')
        .map((entry) => entry.join(':'))
        .join(' ');
    let res = await fetch(
        `https://www.reddit.com/r/mechmarket/search/.json?q=${q || ''}${
            options.content ? ` ${options.content}` : ''
        }&restrict_sr=on&sort=new`
    );
    let json = await res.json();
    let posts = json.data.children;
    this.posts = await Promise.all(
        posts.map(async (post) => ({
            regions: /\[\w+(-\w+)?]/.exec(post.data.title)[0].slice(1, -1).split('-'),
            title: post.data.title.split('[H]')[1].split('[W]')[options.flair === 'buying' ? 1 : 0].trim(),
            pictures: options.flair !== 'buying' ? await pictures(post.data) : [],
            href: post.data.url,
        }))
    );
    this.loading = false;
}

export default {
    props: {
        flair: String,
    },
    components: {
        RegionPicker,
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
        query() {
            return this.$route.query.q;
        },
        region() {
            return this.$route.query.region ? `[${this.$route.query.region.toUpperCase()}` : '';
        },
    },
    watch: {
        flair(flair) {
            update.bind(this)({ flair, title: this.region, content: this.query });
        },
    },
    created() {
        update.bind(this)({ flair: this.flair, title: this.region, content: this.query });
    },
};
</script>

<style lang="scss">
$width: 2.5rem;
$border: 1px solid var(--primary);
$border-secondary: 2px solid var(--secondary);

* {
    box-sizing: border-box;
}

a,
a:active,
a:focus,
a:visited {
    color: unset;
    text-decoration: unset;
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

            form {
                flex: 1;
                display: flex;
                height: $width;
            }

            .search {
                flex: 1;
                height: $width;
            }

            > .btn,
            .region-picker {
                border-left: $border;
                min-width: $width;
                height: $width;
            }

            .theme svg {
                fill: var(--primary);
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
                border: $border;
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
                    border-top: $border-secondary;
                    border-right: $border-secondary;
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
                    border: $border-secondary;
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
