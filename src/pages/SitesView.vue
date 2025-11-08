<template>
  <div class="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-blue-50 dark:from-gray-900 dark:via-blue-900 dark:to-blue-900 relative">
    <!-- Background blur effects -->
    <div class="absolute inset-0 overflow-hidden">
      <div class="absolute -top-40 -right-40 w-80 h-80 bg-blue-300/20 dark:bg-blue-500/10 rounded-full blur-3xl"></div>
      <div class="hidden absolute -bottom-40 -left-40 w-80 h-80 bg-purple-300/20 dark:bg-purple-500/10 rounded-full blur-3xl"></div>
      <div class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-pink-300/10 dark:bg-pink-500/5 rounded-full blur-3xl"></div>
    </div>
    
    <!-- Content overlay -->
    <div class="relative z-10">
    <!-- Hero Section -->
    <section class="py-16 border-b border-gray-200/50 dark:border-gray-700/50 relative">
      <div class="absolute inset-0 bg-white/30 dark:bg-black/10 backdrop-blur-sm"></div>
      <div class="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 class="text-3xl font-medium text-gray-900 dark:text-white mb-3 drop-shadow-lg">
          网站
        </h1>
        <p class="text-gray-700 dark:text-gray-200 drop-shadow-sm">
          一些做过的网站
        </p>
      </div>
    </section>

    <!-- Sites Grid -->
    <section class="py-12 relative">
      <div class="absolute inset-0 bg-white/20 dark:bg-black/10 backdrop-blur-sm"></div>
      <div class="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div
            v-for="(site, index) in sites"
            :key="site.id"
            :ref="el => siteCardRefs[index] = el as HTMLElement"
            @mousemove="(event) => handleSiteCardMouseMove(event, index)"
            @mouseleave="() => handleSiteCardMouseLeave(index)"
            class="relative bg-white/60 dark:bg-white/10 backdrop-blur-md border border-gray-300/40 dark:border-white/20 rounded-2xl p-6 hover:bg-white/70 dark:hover:bg-white/15 hover:border-gray-400/50 dark:hover:border-white/30 transition-all duration-300 shadow-xl hover:shadow-2xl"
          >
            <!-- 鼠标跟随效果 -->
            <div 
              v-if="siteCardEffects[index]?.show"
              class="absolute w-40 h-40 rounded-full blur-2xl transition-all duration-75 ease-out pointer-events-none z-0"
              :style="{
                left: siteCardEffects[index]?.x - 80 + 'px',
                   top: siteCardEffects[index]?.y - 80 + 'px',
                   background: 'radial-gradient(circle, rgba(168, 85, 247, 0.6) 0%, rgba(168, 85, 247, 0.3) 30%, rgba(168, 85, 247, 0.15) 60%, transparent 90%)',
                   boxShadow: '0 0 80px rgba(168, 85, 247, 0.5), 0 0 160px rgba(168, 85, 247, 0.3)'
              }"
            ></div>
            <div class="relative z-10 mb-4">
              <img
                :src="site.image"
                :alt="site.title"
                class="w-full h-48 object-cover rounded border border-gray-100 dark:border-gray-700"
              />
            </div>
              <h3 class="relative z-10 text-lg font-medium text-gray-900 dark:text-white mb-2 drop-shadow-md">
                {{ site.title }}
              </h3>
              <p class="relative z-10 text-gray-700 dark:text-gray-200 mb-4 text-sm drop-shadow-sm">
                {{ site.description }}
              </p>
              <div class="relative z-10 flex flex-wrap gap-2 mb-4">
                <span
                  v-for="tech in site.technologies"
                  :key="tech"
                  class="px-2 py-1 bg-gray-200/60 dark:bg-gray-700/60 text-gray-800 dark:text-gray-200 text-xs rounded backdrop-blur-sm border border-gray-300/30 dark:border-gray-600/30"
                >
                  {{ tech }}
                </span>
              </div>
              <div class="relative z-10 flex gap-4 text-sm">
                <a
                  :href="site.url"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="inline-flex items-center text-blue-600 dark:text-blue-300 hover:text-blue-800 dark:hover:text-blue-100 text-sm font-medium drop-shadow-sm"
                >
                  <ExternalLink class="w-4 h-4 mr-1" />
                  访问
                </a>
                <a
                  v-if="site.githubUrl"
                  :href="site.githubUrl"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="inline-flex items-center text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-gray-100 text-sm font-medium ml-4 drop-shadow-sm"
                >
                  <Github class="w-4 h-4 mr-1" />
                  代码
                </a>
              </div>
          </div>
        </div>
      </div>
    </section>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import { ExternalLink, Github } from 'lucide-vue-next'
import Card from '@/components/ui/Card.vue'
import sites from '@/data/sites.json'

const siteCardRefs = ref<HTMLElement[]>([])
const siteCardEffects = reactive<Record<number, { x: number; y: number; show: boolean }>>({})

const handleSiteCardMouseMove = (event: MouseEvent, index: number) => {
  const card = siteCardRefs.value[index]
  if (!card) return
  
  const rect = card.getBoundingClientRect()
  siteCardEffects[index] = {
    x: event.clientX - rect.left,
    y: event.clientY - rect.top,
    show: true
  }
}

const handleSiteCardMouseLeave = (index: number) => {
  if (siteCardEffects[index]) {
    siteCardEffects[index].show = false
  }
}
</script>