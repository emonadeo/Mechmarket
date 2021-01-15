import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

function loadSize() {
    if (!window.matchMedia('(min-width: 768px)').matches) {
        return 0;
    }
    const size = window.localStorage.getItem('size');
    return size ? parseInt(size) : 1;
}

const store = new Vuex.Store({
    strict: true,
    state: {
        theme:
            window.localStorage.getItem('theme') ||
            (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light') ||
            'light',
        size: loadSize(),
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
