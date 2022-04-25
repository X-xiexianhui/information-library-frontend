import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/table/edit',
      component: () => import('../components/tableManager/page/editTable')
    },
    {
      path: '/table/add',
      component: () => import('../components/tableManager/page/addTable')
    },
    {
      path: '/table',
      component: () => import('../components/tableManager/page/tablePage')
    },
    {
      path: '/db',
      component: () => import('../components/databaseManager/dbPage')
    },
    {
      path: '/form',
      component: () => import('../components/formManager/page/formPage')
    },
    {
      path: '/form/edit',
      component: () => import('../components/formManager/page/editFormPage')
    },
    {
      path: '/data',
      component: () => import('../components/dataManager/components/dataForm')
    },
    {
      path: '/menu',
      component: () => import('../components/menuManager/page/menuPage')
    },
    {
      path: '/role',
      component: () => import('../components/roleManager/components/roleList')
    }
  ]
})
