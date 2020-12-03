import Vue from 'vue';

import 'normalize.css';
import './styles/main.scss';

import store from './services/store';
import router from './services/router';
import './services/directives';

new Vue({
    el: '#app',
    store,
    router,
    render: (h) => h('router-view'),
});
