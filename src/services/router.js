import Vue from 'vue';
import VueRouter from 'vue-router';

import App from 'src/App.vue';

Vue.use(VueRouter);

const router = new VueRouter({
    mode: 'history',
    base: process.env.NODE_ENV === 'production' ? '/Mechmarket/' : '/',
    fallback: false,
    routes: [
        {
            path: '/',
            redirect: '/selling',
        },
        {
            path: '/:flair',
            name: 'home',
            component: App,
            props: true,
        },
    ],
});

export default router;
