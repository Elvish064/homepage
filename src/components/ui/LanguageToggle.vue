<script setup lang="ts">
import { useLocale } from '@/stores/locale'
import { Icon } from '@iconify/vue'
const { locale, toggleLocale } = useLocale()
</script>

<template>
  <button
    @click="toggleLocale"
    class="w-10 h-10 flex items-center justify-center rounded-full bg-gray-200/50 dark:bg-gray-800/50 backdrop-blur-sm border border-gray-400/30 dark:border-gray-600/30 hover:bg-gray-300/60 dark:hover:bg-gray-700/60 transition-all duration-200 focus:outline-none group ml-2"
    :title="locale === 'zh' ? '切换到英文' : 'Switch to Chinese'"
  >
    <div class="w-6 h-6 relative">
      <Icon
        v-show="locale === 'en'"
        icon="mdi:ideogram-chinese-japanese-korean-variant"
        class="w-6 h-6 text-blue-600 dark:text-blue-300"
      />
      <Icon
        v-show="locale === 'zh'"
        icon="mdi:alphabet-latin"
        class="w-6 h-6 text-blue-600 dark:text-blue-300"
      />
    </div>
  </button>
</template>