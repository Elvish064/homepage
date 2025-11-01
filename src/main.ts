import { createApp } from 'vue'
import { createPinia } from 'pinia'
import './style.css'
import App from './App.vue'
import router from './router'
import { PerformanceMonitor, performanceConfig } from './lib/performance'

// 性能监控
const perfMonitor = PerformanceMonitor.getInstance()

// 创建Vue应用实例
const app = createApp(App)

// 创建Pinia实例
const pinia = createPinia()

// 使用插件
app.use(pinia)
app.use(router)

// 提供全局性能配置
app.provide('performanceConfig', performanceConfig)

// 处理404页面重定向
router.isReady().then(() => {
  const redirectPath = sessionStorage.getItem('redirectPath')
  if (redirectPath) {
    sessionStorage.removeItem('redirectPath')
    router.push(redirectPath)
  }
})

// 挂载应用
app.mount('#app')

// 页面加载完成后的性能监控
if (typeof window !== 'undefined') {
  window.addEventListener('load', () => {
    // 延迟执行性能监控，避免影响页面加载
    setTimeout(() => {
      perfMonitor.logPageLoad()
      perfMonitor.logResourceTiming()
      
      // 开发环境下监控 FPS
      if (import.meta.env.DEV) {
        perfMonitor.monitorFPS((fps) => {
          if (fps < 30) {
            console.warn(`FPS 较低: ${fps}`)
          }
        })
      }
    }, 2000)
  })
}
