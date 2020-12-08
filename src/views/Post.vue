<template>
    <div class="post">
        <title-bar>
            <btn class="icon-button back" @click="$router.back()"><-</btn>
            <btn :href="post.href" class="view-on-reddit">View</btn>
        </title-bar>
        <loading v-if="loading"></loading>
        <main v-if="!loading">
            <h1>u/{{ post.author }}</h1>
            <!-- Selling -->
            <template v-if="post.selling">
                <section>
                    <overline>Selling</overline>
                    <div>{{ post.have.join(', ') }}</div>
                </section>
                <section class="payment-methods">
                    <overline>Accepting</overline>
                    <div>
                        <payment-method
                            v-for="method in post.getPaymentMethods(false)"
                            :method="method"
                        ></payment-method>
                    </div>
                </section>
            </template>
            <!-- Buying -->
            <template v-if="post.buying">
                <section>
                    <overline>Buying</overline>
                    <div>{{ post.want.join(', ') }}</div>
                </section>
                <section class="payment-methods">
                    <overline>Offering</overline>
                    <div>
                        <payment-method
                            v-for="method in post.getPaymentMethods(true)"
                            :method="method"
                        ></payment-method>
                    </div>
                </section>
            </template>
            <!-- Trading -->
            <template v-if="post.trading">
                <section class="have">
                    <overline>Has</overline>
                    <div>{{ post.getProducts(true).join(', ') }}</div>
                    <div class="payment-methods">
                        <payment-method
                            v-for="method in post.getPaymentMethods(true)"
                            :method="method"
                        ></payment-method>
                    </div>
                </section>
                <section class="want">
                    <overline>Wants</overline>
                    <div>{{ post.getProducts(false).join(', ') }}</div>
                    <div class="payment-methods">
                        <payment-method
                            v-for="method in post.getPaymentMethods(false)"
                            :method="method"
                        ></payment-method>
                    </div>
                </section>
            </template>
        </main>
    </div>
</template>

<script>
import Btn from 'src/components/Btn.vue';
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
    padding: 1rem;

    > section {
        margin: 1.5rem 0;
    }

    img {
        text-shadow: 0 0 5px 0 black;
    }
}
</style>
