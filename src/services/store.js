import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const store = new Vuex.Store({
    strict: true,
    state: {
        theme:
            window.localStorage.getItem('theme') ||
            (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light') ||
            'light',
        size: window.localStorage.getItem('size') ? parseInt(window.localStorage.getItem('size')) : 1,
    },
    mutations: {
        updateTheme(state, theme) {
            state.theme = theme;
            window.localStorage.setItem('theme', theme);
        },
        updateSize(state, size) {
            state.size = size;
            window.localStorage.setItem('size', size);
        },
    },
    actions: {
        setTheme({ commit }, theme) {
            commit('updateTheme', theme);
        },
        setSize({ commit }, size) {
            commit('updateSize', size);
        },
    },
});

export default store;
