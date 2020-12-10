<template>
    <img class="payment-method" :src="src" :alt="method" />
</template>

<script>
import bank from 'src/assets/payment-methods/bank.svg';
import bitcoin from 'src/assets/payment-methods/bitcoin.svg';
import googlePay from 'src/assets/payment-methods/google-pay.svg';
import paypal from 'src/assets/payment-methods/paypal.svg';
import venmo from 'src/assets/payment-methods/venmo.svg';
import zelle from 'src/assets/payment-methods/zelle.svg';

export const methods = {
    bank,
    bitcoin,
    'google pay': googlePay,
    paypal,
    venmo,
    zelle,
};

export default {
    props: {
        method: String,
    },
    computed: {
        src() {
            return methods[this.method.toLowerCase()] ?? 'Error';
        },
    },
};
</script>

<style>
.payment-method {
    height: 36px;
    box-shadow: 0 0 4px 0 rgba(0, 0, 0, 0.3);
    border-radius: 4px;
    display: block;
}
</style>
