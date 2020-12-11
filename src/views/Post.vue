<template>
    <div class="post">
        <title-bar>
            <btn class="icon-button back" @click="$router.back()">
                <svg viewBox="0 0 24 24" width="24px" height="24px">
                    <path d="M9,19l1.41-1.41L5.83,13H22V11H5.83l4.59-4.59L9,5l-7,7L9,19z" />
                </svg>
            </btn>
            <btn :href="post.href" class="view-on-reddit">View</btn>
        </title-bar>
        <loading v-if="loading"></loading>
        <main v-if="!loading">
            <h1 class="author">u/{{ post.author }}</h1>
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
            <section class="pictures" v-if="post.pictures.length > 0">
                <h1 class="title surface">Pictures</h1>
                <gallery :pictures="post.pictures"></gallery>
            </section>
            <section class="description">
                <h1 class="title surface">Description</h1>
                <div class="markdown" v-html="post.description"></div>
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
    async created() {
        this.post = await reddit.fetchPost(this.id);
        this.loading = false;
    },
};
</script>

<style lang="scss" scoped>
.post {
    display: flex;
    flex-direction: column;
    height: 100%;
}

.title-bar {
    .view-on-reddit {
        margin-left: auto;
        border-left: 1px solid var(--primary);
    }
}

main {
    flex: 1;
    overflow-y: auto;
    padding: 1rem 0;

    .author {
        margin: 0 1rem 1.5rem 1rem;
    }

    section {
        margin: 1rem 1rem 1.5rem 1rem;
        border: 1px solid var(--primary);
        padding: 1.25rem 1rem 1rem 1rem;
        position: relative;

        &:last-child {
            margin-bottom: 0;
        }

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
</style>
