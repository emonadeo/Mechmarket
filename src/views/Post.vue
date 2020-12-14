<template>
    <div class="post surface">
        <loading v-if="loading"></loading>
        <main v-if="!loading" class="surface">
            <div class="actions">
                <btn class="icon-button outline back" :to="{ name: 'posts', query: this.$route.query }">
                    <svg viewBox="0 0 24 24" width="1.5rem" height="1.5rem">
                        <path
                            d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12 19 6.41z"
                        />
                    </svg>
                </btn>
                <h1 class="author">u/{{ post.author }}</h1>
                <btn :href="post.href" class="outline view-on-reddit">View</btn>
            </div>
            <section class="have">
                <h1 class="title surface">Has</h1>
                <p v-if="post.haveProducts.length > 0">{{ post.haveProducts.join(', ') }}</p>
                <div v-if="post.havePaymentMethods.length > 0">
                    <overline v-if="post.haveProducts.length > 0">Offering Payment Methods</overline>
                    <div class="payment-methods">
                        <payment-method
                            v-for="method in post.havePaymentMethods"
                            :key="method"
                            :method="method"
                        ></payment-method>
                    </div>
                </div>
            </section>
            <section class="want">
                <h1 class="title surface">Wants</h1>
                <p v-if="post.wantProducts.length > 0">{{ post.wantProducts.join(', ') }}</p>
                <div v-if="post.wantPaymentMethods.length > 0">
                    <overline v-if="post.wantProducts.length > 0">Accepting Payment Methods</overline>
                    <div class="payment-methods">
                        <payment-method
                            v-for="method in post.wantPaymentMethods"
                            :key="method"
                            :method="method"
                        ></payment-method>
                    </div>
                </div>
            </section>
            <section class="description">
                <h1 class="title surface">Description</h1>
                <div class="markdown surface" v-html="post.description"></div>
            </section>
            <section class="pictures" v-if="post.pictures.length > 0">
                <h1 class="title surface">Pictures</h1>
                <gallery :pictures="post.pictures"></gallery>
            </section>
        </main>
    </div>
</template>

<script>
import Btn from 'src/components/Btn.vue';
import Gallery from 'src/components/Gallery.vue';
import Loading from 'src/components/Loading.vue';
import Overline from 'src/components/Overline.vue';
import PaymentMethod from 'src/components/PaymentMethod.vue';
import TitleBar from 'src/components/TitleBar.vue';

import reddit from 'src/util/reddit';

export default {
    props: {
        id: String,
    },
    components: {
        Btn,
        Gallery,
        Loading,
        Overline,
        PaymentMethod,
        TitleBar,
    },
    data: () => ({
        loading: true,
        post: {},
    }),
    created() {
        this.fetchData();
    },
    watch: {
        $route: 'fetchData',
    },
    methods: {
        async fetchData() {
            this.loading = true;
            this.post = await reddit.fetchPost(this.id);
            this.loading = false;
        },
    },
};
</script>

<style lang="scss" scoped>
@use "src/styles/constants" as c;

.post {
    display: flex;
    flex-direction: column;

    main {
        flex: 1;
        overflow-y: auto;

        .actions {
            display: flex;
            align-items: center;
            height: c.$height;
            margin: 1rem 1rem 1.5rem 1rem;

            svg {
                fill: var(--primary);
            }

            .author {
                margin: 0 1rem;
                display: flex;
                align-items: center;
            }

            .view-on-reddit {
                margin-left: auto;
            }
        }

        section {
            margin: 0 1rem 1.5rem 1rem;
            border: c.$border-secondary;
            padding: 1.25rem 1rem 1rem 1rem;
            position: relative;

            .title {
                position: absolute;
                padding: 0 0.5rem;
                top: 0;
                transform: translate(-0.5rem, -50%);
            }

            p {
                margin: 0;

                &:not(:last-child) {
                    margin-bottom: 1rem;
                }
            }

            .payment-methods {
                display: flex;
                flex-wrap: wrap;

                .payment-method:not(:last-child) {
                    margin-right: 0.5rem;
                }
            }
        }

        .description {
            padding: 0;

            h1 {
                left: 1rem;
            }

            .markdown {
                padding: 1.25rem 1rem 1rem 1rem;
                overflow-y: auto;
            }
        }
    }
}
</style>
