import { ref, onMounted, onUnmounted } from 'vue'
import type { Ref } from 'vue'

export function useImageLazyLoad(imageRef: Ref<HTMLImageElement | null>) {
  const isLoaded = ref(false)
  const isInView = ref(false)
  let observer: IntersectionObserver | null = null

  onMounted(() => {
    if (!imageRef.value) return

    // 创建 Intersection Observer
    observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            isInView.value = true
            // 一旦进入视口就停止观察
            if (observer && imageRef.value) {
              observer.unobserve(imageRef.value)
            }
          }
        })
      },
      {
        rootMargin: '50px', // 提前 50px 开始加载
        threshold: 0.01
      }
    )

    if (imageRef.value) {
      observer.observe(imageRef.value)
    }

    // 监听图片加载完成
    if (imageRef.value) {
      imageRef.value.addEventListener('load', () => {
        isLoaded.value = true
      })
    }
  })

  onUnmounted(() => {
    if (observer) {
      observer.disconnect()
    }
  })

  return {
    isLoaded,
    isInView
  }
}

// 预加载关键图片
export function preloadImages(urls: string[]) {
  return Promise.all(
    urls.map((url) => {
      return new Promise((resolve, reject) => {
        const img = new Image()
        img.onload = () => resolve(url)
        img.onerror = reject
        img.src = url
      })
    })
  )
}

// 优化图片 URL（如果使用 CDN，可以添加参数优化）
export function optimizeImageUrl(url: string, options?: { width?: number; quality?: number }) {
  if (!url) return url
  
  // 如果是 R2 或其他支持参数的 CDN，可以添加优化参数
  // 例如：https://r2.elvish.me/image.webp?w=800&q=80
  
  const params = new URLSearchParams()
  if (options?.width) params.append('w', options.width.toString())
  if (options?.quality) params.append('q', options.quality.toString())
  
  const paramString = params.toString()
  return paramString ? `${url}?${paramString}` : url
}
