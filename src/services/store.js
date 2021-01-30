import Vue from 'vue';
import Vuex from 'vuex';

import * as storage from 'src/util/storage.js';

Vue.use(Vuex);

const store = new Vuex.Store({
    strict: true,
    state: {
        theme: storage.getTheme(),
        scale: storage.getScale(),
        gallery: undefined,
        collapseDrawer: true,
    },
    mutations: {
        updateTheme(state, theme) {
            state.theme = theme;
            storage.setTheme(theme);
        },
        updateScale(state, scale) {
            state.scale = scale;
            storage.setScale(scale);
        },
        updateGallery(state, gallery) {
            state.gallery = gallery;
        },
        updateDrawer(state, collapse) {
            state.collapseDrawer = collapse;
        },
    },
    actions: {
        setTheme({ commit }, theme) {
            commit('updateTheme', theme);
        },
        setScale({ commit }, scale) {
            commit('updateScale', scale);
        },
        setGallery({ commit }, gallery) {
            commit('updateGallery', gallery);
        },
        toggleDrawer({ commit, state }, collapse) {
            if (typeof collapse == 'undefined') {
                commit('updateDrawer', !state.collapseDrawer);
                return;
            }

            commit('updateDrawer', collapse);
        },
    },
});

export default store;
