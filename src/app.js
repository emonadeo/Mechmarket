import Vue from 'vue';
import VueRouter from 'vue-router';

import App from './App.vue';

import 'normalize.css';

Vue.use(VueRouter);

const router = new VueRouter({
    mode: 'history',
    fallback: false,
    routes: [
        {
            path: '/',
            name: 'homepage',
        },
    ],
});

const app = new Vue({
    el: '#app',
    router,
    render: (h) => h(App),
});
