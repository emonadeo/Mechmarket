import Vue from 'vue';
import Vuex from 'vuex';
import VueRouter from 'vue-router';

import App from './App.vue';

import 'normalize.css';
import './styles/main.scss';

Vue.use(Vuex);
Vue.use(VueRouter);

const store = new Vuex.Store({
    strict: true,
    state: {
        theme: 'light',
    },
    mutations: {
        changeTheme(state, theme) {
            state.theme = theme;
        },
    },
    actions: {
        toggleTheme(context) {
            this.commit('changeTheme', context.state.theme !== 'dark' ? 'dark' : 'light');
        },
    },
});

const router = new VueRouter({
    mode: 'history',
    base: process.env.NODE_ENV === 'production' ? '/Mechmarket/' : '/',
    fallback: false,
    routes: [
        {
            path: '/',
            name: 'homepage',
        },
        {
            path: '/selling',
            name: 'selling',
        },
        {
            path: '/buying',
            name: 'buying',
        },
        {
            path: '/trading',
            name: 'trading',
        },
    ],
});

const app = new Vue({
    el: '#app',
    store,
    router,
    render: (h) => h(App),
});
