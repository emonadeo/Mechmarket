import Vue from 'vue';
import Vuex from 'vuex';

import * as storage from 'src/util/storage.js';

Vue.use(Vuex);

const store = new Vuex.Store({
    strict: true,
    state: {
        theme: storage.getTheme(),
        size: storage.getSize(),
        gallery: undefined,
    },
    mutations: {
        updateTheme(state, theme) {
            state.theme = theme;
            storage.setTheme(theme);
        },
        updateSize(state, size) {
            state.size = size;
            storage.setSize(size);
        },
        updateGallery(state, gallery) {
            state.gallery = gallery;
        },
    },
    actions: {
        setTheme({ commit }, theme) {
            commit('updateTheme', theme);
        },
        setSize({ commit }, size) {
            commit('updateSize', size);
        },
        setGallery({ commit }, gallery) {
            commit('updateGallery', gallery);
        },
    },
});

export default store;
