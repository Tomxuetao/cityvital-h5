import { getUserDataHandler } from '@/api/login-api'
import { getEnvByUa } from '@/utils'
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
    path: '/device',
    name: 'device',
    meta: { title: '关键设施' },
    props: (route) => ({ ...route.query }),
    component: () => import('@/views/modules/device/index.vue')
  },
  {
    path: '/run-index',
    name: 'run-index',
    meta: { title: '运行指标' },
    props: (route) => ({ ...route.query }),
    component: () => import('@/views/modules/run-index/index.vue')
  },
  {
    path: '/alarm',
    name: 'alarm',
    meta: { title: '当前报警' },
    component: () => import('@/views/modules/alarm/index.vue')
  },
  {
    path: '/alarm-detail',
    name: 'alarm-detail',
    meta: { title: '报警详情' },
    props: (route) => ({ ...route.query }),
    component: () => import('@/views/modules/alarm/alarm-detail.vue')
  },
  {
    path: '/vital-signs',
    name: 'vital-signs',
    meta: { title: '城市生命体征' },
    props: (route) => ({ ...route.query }),
    component: () => import('@/views/modules/vital-signs/index.vue')
  },
  {
    path: '/synergy',
    name: 'synergy',
    meta: { title: '城市治理多跨协同' },
    props: (route) => ({ ...route.query }),
    component: () => import('@/views/modules/synergy/index.vue')
  },
  {
    path: '/service',
    name: 'service',
    meta: { title: '城市便民服务' },
    props: (route) => ({ ...route.query }),
    component: () => import('@/views/modules/service/index.vue')
  },
  {
    path: '/manage',
    name: 'manage',
    meta: { title: '管理在线' },
    props: (route) => ({ ...route.query }),
    component: () => import('@/views/modules/manage/index.vue')
  }
]
const routes = [
  {
    path: '/',
    name: 'main-dynamic',
    meta: { title: '动态路由' },
    component: () => import('@/views/layout/main-index.vue'),
    children: devRoutes,
    beforeEnter: async ({ name }) => name !== 'main-dynamic' ? true : { replace: true, name: 'home' }
  }
]

const router = createRouter({
  routes: routes,
  history: createWebHistory('/city-vital'),
  scrollBehavior: () => ({ top: 0 })
})

const tempEnv = getEnvByUa()
router.beforeEach((to, from, next) => {
  const { token } = to.query
  if (token) {
    sessionStorage.setItem('accessToken', token)
    next({
      replace: true,
      name: to.name
    })
  } else {
    if (sessionStorage.getItem('accessToken')) {
      next()
    } else {
      if (tempEnv !== 'h5') {
        getUserDataHandler('')
        next()
      }
    }
  }
})

export default router
