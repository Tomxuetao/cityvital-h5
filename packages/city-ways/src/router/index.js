import { createRouter, createWebHistory } from 'vue-router'

const devRoutes = [
  {
    path: '/home',
    name: 'home',
    meta: { title: '首页' },
    component: () => import('../views/modules//home/index.vue')
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
