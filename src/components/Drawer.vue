<template>
    <aside class="drawer modal" :collapse="collapse" ref="drawer">
        <div class="actions">
            <router-link icon class="logo" :to="{ query: {} }" @click.native="close">
                <svg height="2rem" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path
                        d="M1.752,19.219c-0.287,-0 -0.56,-0.125 -0.749,-0.341c-0.188,-0.216 -0.274,-0.503 -0.235,-0.788c0.383,-2.774 1.364,-9.888 1.718,-12.452c0.072,-0.525 0.545,-0.9 1.073,-0.852c3.021,0.274 12.402,1.127 14.939,1.358c0.389,0.035 0.721,0.295 0.848,0.663c0.687,1.985 2.881,8.324 3.84,11.094c0.106,0.304 0.057,0.639 -0.129,0.901c-0.186,0.261 -0.487,0.417 -0.809,0.417c-4.196,-0 -16.657,-0 -20.496,-0Z"
                        style="stroke-width: 1.5px"
                    />
                </svg>
            </router-link>
            <btn icon class="close" @click.native="close">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" height="2rem">
                    <path
                        d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"
                    />
                </svg>
            </btn>
        </div>
        <ul class="tabs">
            <li>
                <router-link
                    class="type-button"
                    :to="{ params: { category: 'selling' }, query: $route.query }"
                    :selected="$route.params.category === 'selling'"
                    @click.native="close"
                    >Selling</router-link
                >
            </li>
            <li>
                <router-link
                    class="type-button"
                    :to="{ params: { category: 'buying' }, query: $route.query }"
                    :selected="$route.params.category === 'buying'"
                    @click.native="close"
                    >Buying</router-link
                >
            </li>
            <li>
                <router-link
                    class="type-button"
                    :to="{ params: { category: 'trading' }, query: $route.query }"
                    :selected="$route.params.category === 'trading'"
                    @click.native="close"
                    >Trading</router-link
                >
            </li>
        </ul>
        <div class="options">
            <scale-picker></scale-picker>
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
</template>

<script>
import Hammer from 'hammerjs';

import Btn from 'src/components/Btn.vue';
import ScalePicker from 'src/components/ScalePicker.vue';
import ThemePicker from 'src/components/ThemePicker.vue';

export default {
    name: 'Drawer',
    components: {
        Btn,
        ScalePicker,
        ThemePicker,
    },
    computed: {
        collapse() {
            return this.$store.state.collapseDrawer;
        },
    },
    methods: {
        close() {
            this.$store.dispatch('toggleDrawer', true);
        },
    },
    mounted() {
        // swipe to close
        const drawer = this.$refs.drawer;
        const h = new Hammer(drawer);
        drawer.style.transition = 'left 300ms ease-in-out';
        h.on('pan', (e) => {
            const delta = Math.min(Math.max(e.deltaX, -drawer.scrollWidth), 0);
            drawer.style.transition = '';
            drawer.style.left = `${delta}px`;

            if (!e.isFinal) return;

            drawer.style.left = '';
            drawer.style.transition = 'left 300ms ease-in-out';

            if (e.deltaX < 0) {
                this.$store.dispatch('toggleDrawer');
            }
        });
    },
};
</script>

<style scoped lang="scss">
@use 'src/styles/responsive' as r;
@use 'src/styles/color';
@use 'src/styles/shape';
@use 'src/styles/mixins';

$margin: 2.5rem;

.drawer {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    position: absolute;
    width: 16rem;
    max-width: 100%;
    height: 100%;
    z-index: 100;
    left: 0;
    transition: width 300ms ease-in-out;
    padding: 1rem 1rem $margin 0;
    border-right: shape.$border;

    &[collapse] {
        left: -16rem;
    }

    .actions {
        display: flex;
        align-items: center;
        justify-content: space-between;
        align-self: stretch;
        margin: 0 0 calc(1rem + 2px) $margin;
        height: 2.25rem;

        .logo {
            svg {
                fill: none;
                stroke: color.$on-surface;
            }

            &:focus:not(:active) {
                outline: none;

                svg {
                    fill: color.$focus;
                    stroke: color.$focus;
                }
            }

            &:hover {
                svg {
                    fill: color.$on-surface;
                }
            }
        }
    }

    .tabs {
        align-self: stretch;
        margin-bottom: auto;

        li {
            width: 100%;

            &:not(:last-child) {
                margin-bottom: 0.25rem;
            }

            a {
                display: flex;
                border-radius: 0 shape.$radius shape.$radius 0;
                padding-left: $margin;
                height: $margin;
                align-items: center;

                @include mixins.outline-interactive;

                &:hover,
                &:focus {
                    background-color: color.$hover;
                }

                &[selected] {
                    background-color: color.$primary;
                    color: color.$on-primary;
                }
            }
        }
    }

    .options {
        margin: 0 0 $margin $margin;
        display: flex;
        flex-direction: column;
        align-items: flex-start;

        > *:not(:last-child) {
            margin-bottom: 1rem;
        }
    }

    .socials {
        margin-left: $margin;
    }

    @include r.md {
        position: static;
        overflow-x: hidden;
        padding-right: 0.5rem;
        border: none;

        &[collapse] {
            left: 0;
            width: 0;
        }
    }

    @include r.lg {
        &[collapse] {
            left: 0;
            width: 16rem;
        }

        .actions .close {
            display: none;
        }
    }
}
</style>
