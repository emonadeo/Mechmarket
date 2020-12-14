import Vue from 'vue';
import VueRouter from 'vue-router';

import Posts from 'src/views/Posts.vue';

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
            path: '/:category/:id?',
            name: 'posts',
            component: Posts,
            props: true,
        },
    ],
});

export default router;
