import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)

const originalPush = Router.prototype.push
Router.prototype.push = function push (location) {
  return originalPush.call(this, location).catch(err => err)
}

export default new Router({
  // mode: 'history',
  routes: [
    {
      path: '/',
      component: () => import('../components/userManager/page/login')
    },
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
      path: '/menu',
      component: () => import('../components/menuManager/page/menuPage')
    },
    {
      path: '/role',
      component: () => import('../components/roleManager/page/rolePage')
    },
    {
      path: '/auth',
      component: () => import('../components/authManager/page/authPage')
    },
    {
      path: '/user',
      component: () => import('../components/userManager/page/userPage')
    },
    {
      path: '/home',
      component: () => import('../components/dataManager/page/home'),
      children: [
        {
          path: 'data',
          component: () => import('../components/dataManager/page/dataList')
        },
        {
          path: 'statistics',
          component: () => import('../components/dataManager/page/statisticsPage')
        },
        {
          path: 'dump',
          component: () => import('../components/dataManager/page/dumpData')
        },
        {
          path: 'welcome',
          component: () => import('../components/dataManager/page/welcome')
        },
        {
          path: 'recycle',
          component: () => import('../components/dataManager/page/recycle')
        }
      ]
    },
    {
      path: '/pwd/reset',
      component: () => import('../components/userManager/page/resetPwd')
    }
  ]
})
