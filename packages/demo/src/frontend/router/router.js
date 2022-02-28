const route = [
    {
        path: '/',
        name: 'index',
        component: () => import('../views/index')
    },
    {
        path: '/home',
        name: 'home',
        component: () => import('../views/home')
    },
    {
        path: '/test',
        name: 'test',
        component: () => import('../views/test')
    }
];
export default route;
