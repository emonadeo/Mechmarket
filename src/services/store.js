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
    },
    mutations: {
        updateTheme(state, theme) {
            state.theme = theme;
            window.localStorage.setItem('theme', theme);
        },
    },
    actions: {
        toggleTheme(context) {
            this.commit('updateTheme', context.state.theme !== 'dark' ? 'dark' : 'light');
        },
    },
});

export default store;
