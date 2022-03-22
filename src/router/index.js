import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
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
      path: '/db',
      component: () => import('../components/databaseManager/dbManager')
    }
  ]
})
