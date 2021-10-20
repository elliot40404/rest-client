import { createRouter, createWebHistory } from 'vue-router';

const routes = [
    {
        path: '/',
        name: 'Home',
        component: () => import('../views/Home.vue'),
        meta: {
            title: 'HOME',
        },
    },
    {
        path: '/request',
        name: 'Request',
        component: () => import('../views/Request.vue'),
        meta: {
            title: 'Request',
        },
    },
    {
        path: '/response',
        name: 'Response',
        component: () => import('../views/Response.vue'),
        meta: {
            title: 'Response',
        },
    },
    {
        path: '/:pathMatch(.*)*',
        name: 'ERROR',
        component: () => import('../views/404.vue'),
        meta: {
            title: '404',
        },
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

router.beforeEach((to, from, next) => {
    next();
    document.title = `API CLIENT | ${to.meta.title}`;
});

export default router;
