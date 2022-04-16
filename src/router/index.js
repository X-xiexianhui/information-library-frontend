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
      component: () => import('../components/formManager/page/formList')
    },
    {
      path: '/form/edit',
      component: () => import('../components/formManager/page/editForm')
    }
  ]
})
