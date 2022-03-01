const route = [
    {
        path: '/edit/table',
        name: 'edittable',
        component: () => import('../views/tableManage/editTable')
    },
    {
        path: '/',
        name: 'index',
        component: () => import('../views/index')
    },
    {
        path: '/add/table',
        name: 'addtable',
        component: () => import('../views/tableManage/addTable')
    },
];
export default route;
