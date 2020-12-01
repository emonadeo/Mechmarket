import Vue from 'vue';
import Vuex from 'vuex';

console.log('Use Store!');

Vue.use(Vuex);

const store = new Vuex.Store({
    strict: true,
    state: {
        theme:
            window.localStorage.getItem('theme') ||
            (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light') ||
            'light',
        query: '',
    },
    mutations: {
        updateTheme(state, theme) {
            state.theme = theme;
            window.localStorage.setItem('theme', theme);
        },
        updateQuery(state, query) {
            state.query = query;
        },
    },
    actions: {
        toggleTheme(context) {
            this.commit('changeTheme', context.state.theme !== 'dark' ? 'dark' : 'light');
        },
    },
});

export default store;
