const route = [
    {
        path: '/edittable',
        name: 'edittable',
        component: () => import('../views/tableManage/editTable')
    },
    {
        path: '/',
        name: 'index',
        component: () => import('../views/index')
    }
];
export default route;
