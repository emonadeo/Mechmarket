import Vue from 'vue';
import VueRouter from 'vue-router';

import Gallery from 'src/views/Gallery.vue';
import Post from 'src/views/Post.vue';

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
            path: '/:category',
            name: 'gallery',
            component: Gallery,
            props: true,
        },
        {
            path: '/:category/:post',
            name: 'post',
            component: Post,
            props: true,
        },
    ],
});

export default router;
