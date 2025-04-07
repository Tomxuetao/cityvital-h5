import { createRouter, createWebHistory } from 'vue-router'

const devRoutes = [
  {
    path: '/home',
    name: 'home',
    meta: { title: '首页' },
    component: () => import('../views/modules//home.vue')
  },
  {
    path: '/area-index/:index?',
    name: 'area-index',
    meta: { title: '<UNK>' },
    component: () => import('../views/modules/area-index.vue')
  },
  {
    path: '/drag-marker/:index?',
    name: 'drag-marker',
    meta: { title: '<UNK>' },
    component: () => import('../views/modules/drag-marker.vue')
  }
]
const routes = [
  {
    path: '/',
    name: 'main-dynamic',
    meta: { title: '动态路由' },
    component: () => import('../views/layout/main-index.vue'),
    children: devRoutes,
    beforeEnter: async ({ name }) => name !== 'main-dynamic' ? true : { replace: true, name: 'home' }
  }
]

const router = createRouter({
  routes: routes,
  history: createWebHistory('/city-ways'),
  scrollBehavior: () => ({ top: 0 })
})

export default router
