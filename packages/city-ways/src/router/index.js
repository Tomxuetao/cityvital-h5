import { createRouter, createWebHistory } from 'vue-router'

const devRoutes = [
  {
    path: '/home',
    name: 'home',
    meta: { title: '首页' },
    component: () => import('../views/modules//home.vue')
  },
  {
    path: '/real-map/:id?',
    name: 'real-map',
    meta: { title: '真实地图' },
    component: () => import('../views/modules/real-map.vue')
  },
  {
    path: '/area-index/:index?',
    name: 'area-index',
    meta: { title: '区域地图' },
    component: () => import('../views/modules/area-index.vue')
  },
  {
    path: '/drag-marker/:index?',
    name: 'drag-marker',
    meta: { title: '拖拽点位' },
    component: () => import('../views/modules/drag-marker.vue')
  },
  {
    path: 'site-list',
    name: 'site-list',
    meta: { title: '点位列表' },
    component: () => import('../views/modules/site-list.vue')
  },
  {
    path: 'site-detail/:id',
    name: 'site-detail',
    meta: { title: '点位详情' },
    component: () => import('../views/modules/site-detail.vue')
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
