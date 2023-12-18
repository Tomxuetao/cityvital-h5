import { createRouter, createWebHistory } from 'vue-router'

const devRoutes = [
  {
    path: '/home',
    name: 'home',
    meta: { title: '首页' },
    component: () => import('@/views/modules/home/index.vue')
  },
  {
    path: '/sign',
    name: 'sign',
    meta: { title: '体征指数' },
    props: (route) => ({ ...route.query }),
    component: () => import('@/views/modules/sign/index.vue')
  },
  {
    path: '/alarm',
    name: 'alarm',
    meta: { title: '当前报警' },
    component: () => import('@/views/modules/alarm/index.vue')
  },
  {
    path: '/run-index',
    name: 'run-index',
    meta: { title: '运行指标' },
    props: (route) => ({ ...route.query }),
    component: () => import('@/views/modules/run-index/index.vue')
  },
]
const routes = [
  {
    path: '/',
    name: 'main-dynamic',
    meta: { title: '动态路由' },
    component: () => import('@/views/layout/main-index.vue'),
    children: import.meta.env.MODE === 'production' ? [] : devRoutes,
    beforeEnter: async ({ name }) => name !== 'main-dynamic' ? true : { replace: true, name: 'home' }
  }
]

const router = createRouter({
  routes: routes,
  history: createWebHistory('/city-vital'),
  scrollBehavior: () => ({ top: 0 })
})

router.beforeEach((to, from, next) => {
  const { accessToken } = to.query
  if (accessToken) {
    sessionStorage.setItem('accessToken', accessToken)
    next()
  } else {
    next()
  }
})

export default router
