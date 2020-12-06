<template>
    <div class="post">
        <title-bar>
            <btn @click="$router.back()"><-</btn>
        </title-bar>
        <loading v-if="loading"></loading>
        <main v-if="!loading">
            <h1>{{ post.title }}</h1>
            <div class="have">
                <overline>Has</overline>
                <div>{{ post.have.join(', ') }}</div>
            </div>
            <div class="want">
                <overline>Wants</overline>
                <div>{{ post.want.join(', ') }}</div>
            </div>

            <!-- TODO: Extract Payment Methods -->
            <payment-method method="paypal"></payment-method>
            <payment-method method="zelle"></payment-method>
            <payment-method method="venmo"></payment-method>
            <payment-method method="google pay"></payment-method>
            <payment-method method="bitcoin"></payment-method>
            <payment-method method="bank"></payment-method>
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
main {
    padding: 1rem;

    > div {
        margin-bottom: 0.5rem;
    }

    img {
        text-shadow: 0 0 5px 0 black;
    }
}
</style>
