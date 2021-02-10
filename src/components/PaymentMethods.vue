<template>
    <div class="payment-methods">
        <template v-for="method in methodList">
            <img
                v-if="Object.keys(integrated).indexOf(method.toLowerCase()) !== -1"
                :src="integrated[method.toLowerCase()]"
                :alt="method"
            />
            <div v-else class="other">
                <span class="type-body">{{ method }}</span>
            </div>
        </template>
    </div>
</template>

<script>
import bank from 'src/assets/payment-methods/bank.svg';
import bitcoin from 'src/assets/payment-methods/bitcoin.svg';
import googlePay from 'src/assets/payment-methods/google-pay.svg';
import paypal from 'src/assets/payment-methods/paypal.svg';
import venmo from 'src/assets/payment-methods/venmo.svg';
import zelle from 'src/assets/payment-methods/zelle.svg';

export default {
    props: {
        methods: String,
    },
    data: () => ({
        integrated: {
            bank,
            bitcoin,
            'google pay': googlePay,
            paypal,
            venmo,
            zelle,
        },
    }),
    computed: {
        methodList() {
            return this.methods.split(/[,;+&/]/g).map((s) => s.trim());
        },
    },
};
</script>

<style lang="scss" scoped>
@use "src/styles/color";

.payment-methods {
    display: flex;
    grid-gap: 0.5rem;
    flex-wrap: wrap;

    > * {
        height: 36px;
        box-shadow: 0 0 4px 0 rgba(0, 0, 0, 0.3);
        border-radius: 4px;
        display: block;
        flex: 0 0 auto;

        &.other {
            display: flex;
            padding: 0 1rem;
            justify-content: center;
            align-items: center;
            background-color: color.$primary;
            color: color.$on-primary;
        }
    }
}
</style>
