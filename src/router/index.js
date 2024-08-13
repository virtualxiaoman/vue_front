import { createRouter, createWebHistory } from 'vue-router';
import Test from '../views/Article/test.vue';
import Home from '../views/HomePage/index.vue';

const routes = [
    {
        path: '/',
        name: 'home',
        component: Home,
    },
    {
        path: '/test', // 设置路由路径
        name: 'test',
        component: Test, // 组件对应路由
    },
    // 可以在这里添加更多路由
];

const router = createRouter({
    history: createWebHistory(),
    routes: routes,
});

export default router;
