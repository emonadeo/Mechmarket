<template>
    <div id="app" class="surface" :class="theme">
        <div class="titlebar">
            <div class="control">
                <search></search>
                <btn class="theme" @click="$store.dispatch('toggleTheme')">D</btn>
            </div>
            <nav class="tabs">
                <router-link
                    class="tab"
                    :to="{ name: 'home', params: { flair: 'selling' }, query: { q: $store.state.query } }"
                    :selected="$route.params.flair === 'selling'"
                    >Selling</router-link
                >
                <router-link
                    class="tab"
                    :to="{ name: 'home', params: { flair: 'buying' }, query: { q: $store.state.query } }"
                    :selected="$route.params.flair === 'buying'"
                    >Buying</router-link
                >
                <router-link
                    class="tab"
                    :to="{ name: 'home', params: { flair: 'trading' }, query: { q: $store.state.query } }"
                    :selected="$route.params.flair === 'trading'"
                    >Trading</router-link
                >
            </nav>
        </div>
        <main>
            <p>{{ this.$store.state.query }}</p>
        </main>
    </div>
</template>

<script>
import Search from 'src/components/Search.vue';
import Btn from 'src/components/Btn.vue';

import store from 'src/services/store';

export default {
    props: {
        flair: String,
    },
    components: {
        Search,
        Btn,
    },
    computed: {
        theme() {
            return this.$store.state.theme;
        },
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

    .titlebar {
        .control {
            border-bottom: $border;
            display: flex;
            height: $width;

            .btn {
                width: $width;
                height: $width;
            }

            .theme {
                border-left: $border;
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
                    background-color: var(--primary);
                    color: var(--on-primary);
                }
            }
        }
    }

    main {
        padding: 0.5rem;
    }
}
</style>
