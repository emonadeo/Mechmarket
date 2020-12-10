import 'core-js/stable';
import 'regenerator-runtime/runtime';

import Vue from 'vue';

import 'normalize.css';
import './styles/main.scss';

import store from './services/store';
import router from './services/router';
import plugins from './services/plugins';

import App from 'src/App.vue';

new Vue({
    el: '#app',
    store,
    router,
    render: (h) => h(App),
});
