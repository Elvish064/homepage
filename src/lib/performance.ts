// 性能优化配置

// 检测是否为低端设备
export const isLowEndDevice = (): boolean => {
  // 检测设备内存（如果可用）
  const memory = (navigator as any).deviceMemory
  if (memory && memory < 4) return true

  // 检测 CPU 核心数
  const cores = navigator.hardwareConcurrency
  if (cores && cores < 4) return true

  // 检测连接速度
  const connection = (navigator as any).connection
  if (connection) {
    if (connection.effectiveType === 'slow-2g' || connection.effectiveType === '2g') {
      return true
    }
    if (connection.saveData) return true
  }

  return false
}

// 检测是否为移动设备
export const isMobileDevice = (): boolean => {
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
}

// 性能优化配置
export const performanceConfig = {
  // 是否启用动画
  enableAnimations: !isLowEndDevice() && !window.matchMedia('(prefers-reduced-motion: reduce)').matches,
  
  // 是否启用复杂特效
  enableComplexEffects: !isLowEndDevice() && !isMobileDevice(),
  
  // 图片懒加载配置
  lazyLoad: {
    rootMargin: '50px',
    threshold: 0.01
  },
  
  // 防抖延迟
  debounceDelay: isLowEndDevice() ? 200 : 100,
  
  // 节流延迟
  throttleDelay: isLowEndDevice() ? 150 : 50,
  
  // 是否启用 GSAP 动画
  enableGSAP: !isLowEndDevice()
}

// 性能监控
export class PerformanceMonitor {
  private static instance: PerformanceMonitor
  
  static getInstance() {
    if (!this.instance) {
      this.instance = new PerformanceMonitor()
    }
    return this.instance
  }
  
  // 记录页面加载时间
  logPageLoad() {
    if (window.performance && window.performance.timing) {
      const timing = window.performance.timing
      const loadTime = timing.loadEventEnd - timing.navigationStart
      const domReady = timing.domContentLoadedEventEnd - timing.navigationStart
      
      console.log(`页面加载时间: ${loadTime}ms`)
      console.log(`DOM 就绪时间: ${domReady}ms`)
    }
  }
  
  // 记录资源加载
  logResourceTiming() {
    if (window.performance && window.performance.getEntriesByType) {
      const resources = window.performance.getEntriesByType('resource')
      const images = resources.filter((r: any) => r.initiatorType === 'img')
      
      console.log(`加载了 ${images.length} 张图片`)
      
      const slowImages = images.filter((r: any) => r.duration > 1000)
      if (slowImages.length > 0) {
        console.warn('慢速加载的图片:', slowImages)
      }
    }
  }
  
  // 监控 FPS
  monitorFPS(callback: (fps: number) => void) {
    let lastTime = performance.now()
    let frames = 0
    
    const tick = () => {
      frames++
      const currentTime = performance.now()
      
      if (currentTime >= lastTime + 1000) {
        const fps = Math.round((frames * 1000) / (currentTime - lastTime))
        callback(fps)
        frames = 0
        lastTime = currentTime
      }
      
      requestAnimationFrame(tick)
    }
    
    requestAnimationFrame(tick)
  }
}

// 图片预加载策略
export const preloadCriticalImages = () => {
  // 预加载首屏关键图片
  const criticalImages = [
    // 在这里添加需要预加载的关键图片 URL
  ]
  
  criticalImages.forEach(url => {
    const link = document.createElement('link')
    link.rel = 'preload'
    link.as = 'image'
    link.href = url
    document.head.appendChild(link)
  })
}

// 资源提示
export const addResourceHints = () => {
  const domains = [
    'https://r2.elvish.me',
    'https://blog.elvish.me',
    'https://umami.elvish.me'
  ]
  
  domains.forEach(domain => {
    // DNS 预解析
    const dns = document.createElement('link')
    dns.rel = 'dns-prefetch'
    dns.href = domain
    document.head.appendChild(dns)
    
    // 预连接
    const preconnect = document.createElement('link')
    preconnect.rel = 'preconnect'
    preconnect.href = domain
    preconnect.crossOrigin = 'anonymous'
    document.head.appendChild(preconnect)
  })
}
