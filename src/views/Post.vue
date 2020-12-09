<template>
    <div class="post">
        <title-bar>
            <btn class="icon-button back" @click="$router.back()"><-</btn>
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
                <div class="grid">
                    <photo v-for="picture in post.pictures" :key="picture" :src="picture"></photo>
                </div>
            </section>
        </main>
    </div>
</template>

<script>
import Btn from 'src/components/Btn.vue';
import Loading from 'src/components/Loading.vue';
import Overline from 'src/components/Overline.vue';
import PaymentMethod from 'src/components/PaymentMethod.vue';
import Photo from 'src/components/Photo.vue';
import TitleBar from 'src/components/TitleBar.vue';

import reddit from 'src/util/reddit';

export default {
    props: {
        id: String,
    },
    components: {
        Btn,
        Loading,
        Overline,
        PaymentMethod,
        Photo,
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

.titlebar {
    .back {
        margin-left: 0.5rem;
    }
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

    .pictures {
        padding-bottom: 0;

        .grid {
            column-count: 2;
            column-gap: 1rem;

            .photo {
                border: 2px solid var(--secondary);

                &:not(:last-child) {
                    margin-bottom: 1rem;
                }
            }
        }
    }
}
</style>
