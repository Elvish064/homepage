import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'

// 定义路由配置
const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'home',
    component: () => import('@/pages/HomeView.vue'),
    meta: {
      title: '首页'
    }
  },
  {
    path: '/about',
    name: 'about',
    component: () => import('@/pages/AboutView.vue'),
    meta: {
      title: '关于我'
    }
  },
  {
    path: '/articles',
    name: 'articles',
    component: () => import('@/pages/ArticlesView.vue'),
    meta: {
      title: '文章'
    }
  },
  {
    path: '/portfolio',
    name: 'portfolio',
    component: () => import('@/pages/PortfolioView.vue'),
    meta: {
      title: '项目作品'
    }
  },
  {
    path: '/sites',
    name: 'sites',
    component: () => import('@/pages/SitesView.vue'),
    meta: {
      title: '我的网站'
    }
  },
  {
    path: '/sponsor',
    name: 'sponsor',
    component: () => import('@/pages/SponsorView.vue'),
    meta: {
      title: '赞助支持'
    }
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'not-found',
    component: () => import('@/pages/HomeView.vue'),
    meta: {
      title: '首页'
    }
  }
]

// 创建路由实例
const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router

router.beforeEach((to, from, next) => {
  // 设置页面标题
  if (to.meta.title) {
    document.title = to.meta.title as string
  }
  next()
})
