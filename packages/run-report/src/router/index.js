import { TOKEN_KEY } from '@/utils'
import { getSiteToken } from '@/api/common-api'
import { createRouter, createWebHistory } from 'vue-router'

const devRoutes = [
  {
    path: '/home',
    name: 'home',
    meta: { title: '首页' },
    component: () => import('@/views/modules/home/index.vue')
  },
  {
    path: '/no-access',
    name: 'no-access',
    meta: { title: '无访问权限' },
    props: (route) => ({ ...route.query }),
    component: () => import('@/views/modules/no-access/index.vue')
  },
  {
    path: '/run-dynamic',
    name: 'run-dynamic',
    meta: { title: '运行动态' },
    component: () => import('@/views/modules/run-dynamic/index.vue')
  },
  {
    path: '/alarm-detail',
    name: 'alarm-detail',
    meta: { title: '告警详情' },
    props: (route) => ({ ...route.query }),
    component: () => import('@/views/modules/run-dynamic/alarm-detail.vue')
  },
  {
    path: '/reserve-detail',
    name: 'reserve-detail',
    meta: { title: '保护区告警详情' },
    props: (route) => ({ ...route.query }),
    component: () => import('@/views/modules/run-dynamic/reserve-detail.vue')
  }
]

const routes = [
  {
    path: '/',
    name: 'main-dynamic',
    meta: { title: '动态路由' },
    component: () => import('@/views/layout/main-index.vue'),
    children: devRoutes,
    beforeEnter: ({ name }) => name !== 'main-dynamic' ? true : { replace: true, name: 'home' }
  }
]

const router = createRouter({
  routes: routes,
  history: createWebHistory('/report-h5'),
  scrollBehavior: () => ({ top: 0 })
})

router.beforeEach((to, from, next) => {
  if (['no-access'].includes(to.name)) {
    next()
  } else {
    const { token } = to.query
    const curToken = sessionStorage.getItem(TOKEN_KEY)
    if (curToken) {
      next()
    } else {
      getSiteToken(token).then(() => {
        next({
          replace: true,
          name: to.name
        })
      }).catch(() => {
        next({
          replace: true,
          name: 'no-access'
        })
      })
    }
  }
})

export default router
