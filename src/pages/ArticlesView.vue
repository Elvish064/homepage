<template>
  <div class="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-blue-50 dark:from-gray-900 dark:via-blue-900 dark:to-blue-900 relative py-12">
    <!-- Background blur effects -->
    <div class="absolute inset-0 overflow-hidden">
      <div class="absolute -top-40 -right-40 w-80 h-80 bg-blue-300/20 dark:bg-blue-500/10 rounded-full blur-3xl"></div>
      <div class="hidden absolute -bottom-40 -left-40 w-80 h-80 bg-purple-300/20 dark:bg-purple-500/10 rounded-full blur-3xl"></div>
      <div class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-pink-300/10 dark:bg-pink-500/5 rounded-full blur-3xl"></div>
    </div>
    
    <!-- Content overlay -->
    <div class="relative z-10">
      <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-8 relative">
          <div class="absolute inset-0 bg-white/30 dark:bg-black/10 backdrop-blur-sm rounded-2xl"></div>
          <div class="relative z-10 p-8">
            <h1 class="text-4xl font-bold text-gray-900 dark:text-white mb-4 drop-shadow-lg">
              我的文章
            </h1>
            <p class="text-xl text-gray-700 dark:text-gray-200 mb-4 drop-shadow-sm">
              记录一些想法
            </p>
            <div class="flex justify-center">
              <div class="bg-white/60 dark:bg-white/10 backdrop-blur-md border border-gray-300/40 dark:border-white/20 rounded-lg p-3 font-mono text-sm shadow-xl">
                <span class="text-gray-700 dark:text-gray-200">RSS:</span>
                <a 
                  href="https://blog.fis.ink/atom.xml" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  class="ml-2 text-blue-600 dark:text-blue-400 hover:underline"
                >
                  https://blog.fis.ink/atom.xml
                </a>
              </div>
            </div>
          </div>
        </div>

        <div v-if="loading" class="flex justify-center items-center py-12 relative">
          <div class="absolute inset-0 bg-white/20 dark:bg-black/10 backdrop-blur-sm rounded-2xl"></div>
          <div class="relative z-10 flex items-center space-x-2 p-8">
          <svg class="w-6 h-6 text-blue-600 dark:text-blue-400 animate-spin" fill="none" viewBox="0 0 24 24">
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
            <span class="text-gray-700 dark:text-gray-200 drop-shadow-sm">正在加载文章...</span>
          </div>
        </div>

        <div v-else-if="error" class="text-center py-12 relative">
          <div class="absolute inset-0 bg-white/20 dark:bg-black/10 backdrop-blur-sm rounded-2xl"></div>
          <div class="relative z-10 p-8">
            <div class="text-red-600 dark:text-red-400 mb-4">
              <svg class="w-16 h-16 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
              <p class="text-lg font-medium drop-shadow-lg">加载文章失败</p>
              <p class="text-sm text-gray-600 dark:text-gray-300 mt-2 drop-shadow-sm">{{ error }}</p>
            </div>
            <button 
              @click="loadArticles" 
              class="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition-colors shadow-xl hover:shadow-2xl"
            >
              重试
            </button>
          </div>
        </div>

        <div v-else-if="articles.length === 0" class="text-center py-12 relative">
          <div class="absolute inset-0 bg-white/20 dark:bg-black/10 backdrop-blur-sm rounded-2xl"></div>
          <div class="relative z-10 p-8">
            <div class="text-gray-600 dark:text-gray-300">
              <svg class="w-16 h-16 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
              </svg>
              <p class="text-lg font-medium drop-shadow-lg">暂无文章</p>
              <p class="text-sm mt-2 drop-shadow-sm">文章正在路上...</p>
            </div>
          </div>
        </div>

        <div v-else class="space-y-6">
          <MagicCard
            v-for="(article, index) in articles" 
            :key="article.id"
            :glow-color="index % 3 === 0 ? '236, 72, 153' : index % 3 === 1 ? '59, 130, 246' : '16, 185, 129'"
            :spotlight-radius="300"
            enable-border-glow
            enable-spotlight
            click-effect
            class="mb-6"
          >
            <div class="p-8">
              <div class="flex items-start justify-between mb-4">
                <div class="flex-1">
                  <h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-3 drop-shadow-md">
                    <a :href="article.link" target="_blank" rel="noopener noreferrer" class="hover:text-blue-600 dark:hover:text-blue-300 transition-colors duration-200">
                      {{ article.title }}
                    </a>
                  </h2>
                  <div class="flex items-center text-sm text-gray-600 dark:text-gray-300 mb-4 drop-shadow-sm">
                  <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                  </svg>
                  {{ formatDate(article.pubDate) }}
                    <span v-if="article.author" class="ml-4 flex items-center">
                      <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                      </svg>
                      {{ article.author }}
                    </span>
                  </div>
                </div>
              <a 
                :href="article.link" 
                target="_blank" 
                rel="noopener noreferrer"
                class="ml-4 p-2 text-gray-400 hover:text-blue-600 dark:hover:text-blue-400"
                title="查看原文"
              >
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path>
                </svg>
              </a>
            </div>
            
              <p class="text-gray-700 dark:text-gray-200 leading-relaxed mb-4 drop-shadow-sm">
                {{ article.description }}
              </p>
            
              <div v-if="article.categories && article.categories.length > 0" class="flex flex-wrap gap-2 mb-4">
                <span 
                  v-for="category in article.categories" 
                  :key="category"
                  class="px-3 py-1 bg-blue-200/60 dark:bg-blue-700/60 text-blue-800 dark:text-blue-200 text-sm rounded-full backdrop-blur-sm border border-blue-300/30 dark:border-blue-600/30"
                >
                  {{ category }}
                </span>
              </div>
            
              <div class="flex items-center justify-between">
                <a 
                  :href="article.link" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  class="inline-flex items-center text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 font-medium transition-colors duration-200"
                >
                  阅读全文
                  <svg class="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
                  </svg>
                </a>
              </div>
            </div>
          </MagicCard>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import type { Article } from '@/types'
import { RSSService } from '@/lib/rssService'
import MagicCard from '@/components/ui/MagicCard.vue'

const articles = ref<Article[]>([])
const loading = ref(true)
const error = ref<string | null>(null)

const loadArticles = async () => {
  try {
    loading.value = true
    error.value = null
    articles.value = await RSSService.fetchArticles()
  } catch (err) {
    error.value = err instanceof Error ? err.message : '未知错误'
    console.error('加载文章失败:', err)
  } finally {
    loading.value = false
  }
}

const formatDate = (dateString: string) => {
  return RSSService.formatDate(dateString)
}

onMounted(() => {
  loadArticles()
})
</script>