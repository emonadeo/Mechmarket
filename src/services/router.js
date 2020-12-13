import Vue from 'vue';
import VueRouter from 'vue-router';

import Posts from 'src/views/Posts.vue';
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
            name: 'posts',
            component: Posts,
            props: true,
            children: [
                {
                    path: ':id',
                    name: 'post',
                    component: Post,
                    props: true,
                },
            ],
        },
    ],
});

export default router;
