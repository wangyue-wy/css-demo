import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/pubu',
    component: () => import('@/views/pubu.vue')
  },
  {
    path: '/dialog',
    component: () => import('@/views/dialog.vue')
  },
  {
    path: '/table',
    component: () => import('@/views/table.vue')
  },
  {
    path: '/comtable',
    component: () => import('@/views/comTable.vue')
  },
  {
    path: '/map',
    component: () => import('@/views/map.vue')
  },
  {
    path: '/map2',
    component: () => import('@/views/map2.vue')
  },
  {
    path: '/pageExcel',
    component: () => import('@/views/pageExcel.vue')
  }
]

const router = new VueRouter({
  routes
})

export default router
