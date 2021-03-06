import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'/'el-icon-x' the icon show in the sidebar
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },


  {
    path: '/modifyPassword',
    component: ()=>import('@/views/modifyPassword/index'),
    hidden: true
  },

  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [{
      path: 'dashboard',
      name: 'Dashboard',
      component: () => import('@/views/dashboard/index'),
      meta: { title: 'Dashboard', icon: 'dashboard' }
    }]
  },
  {
    path:'/movie',
    component:()=>import('@/views/test/index'),
    hidden: true
  },
  {
    path:'/answer',
    component:()=>import('@/views/test/answer'),
    hidden: true
  },
  {
    path:'/information',
    component:()=>import('@/views/test/information'),
    hidden: true
  },

  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },
]
export const asyncRoutes = [
  {
    path:'/order',
    component: Layout,
    children:[{
      path: 'index',
      component: () => import('@/views/student/order/index'),
      name: 'order',
      meta:{title:'order',icon:'el-icon-circle-check',roles: ['student']}
    }]
  },


  {
    path: '/bus',
    component: Layout,
    children: [{
      path: 'index',
      component:()=>import('@/views/bus/index'),
      name: 'bus',
      meta: {title: '确认校车人数', icon: 'el-icon-circle-check',roles: ['busAdmin']}
    }]
  },

  {
    path: '/user',
    component: Layout,
    children: [{
      path: 'index',
      component: () => import('@/views/manager/user/index'),
      name: 'user',
      meta: {title: 'user', icon: 'eye',roles: ['superAdmin']}
    }]
  },
  {
    path: '/busPassenger',
    component:Layout,
    children: [{
      path:'index',
      component:()=> import('@/views/manager/busPassenger/index'),
      name: 'busPassenger',
      meta: {title: '校车乘客',icon:'form',roles: ['busAdmin']}
    }]
  },
  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },
  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
