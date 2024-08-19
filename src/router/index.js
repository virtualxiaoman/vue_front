import { createRouter, createWebHistory } from 'vue-router';
import Test from '../views/Article/index.vue';
import Home from '../views/HomePage/index.vue';

const routes = [
    {
        path: '/',
        name: 'home',
        component: Home,
    },
    {
        path: '/article/:name',
        component: () => import('../views/Article/index.vue'),
    },
    // {
    //     path: '/test',
    //     name: 'test',
    //     component: Test,
    // }
    // 可以在这里添加更多路由
];

const router = createRouter({
    history: createWebHistory(),
    routes: routes,
});

export default router;
