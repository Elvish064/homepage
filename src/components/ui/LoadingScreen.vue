<template>
  <div 
    v-if="show"
    class="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-gray-50 via-blue-50 to-blue-50 dark:from-gray-900 dark:via-blue-900 dark:to-blue-900 transition-opacity duration-500"
    :class="{ 'opacity-0 pointer-events-none': !show }"
  >
    <!-- Background effects -->
    <div class="absolute inset-0 overflow-hidden">
      <div class="absolute -top-40 -right-40 w-80 h-80 bg-blue-300/20 dark:bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
      <div class="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-300/20 dark:bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-75"></div>
    </div>

    <!-- Loading content -->
    <div class="relative z-10 text-center">
      <div class="mb-6">
        <div class="relative">
          <div class="w-16 h-16 mx-auto border-4 border-gray-300 dark:border-gray-600 rounded-full"></div>
          <div class="absolute top-0 left-1/2 -translate-x-1/2 w-16 h-16 border-4 border-blue-600 dark:border-blue-400 rounded-full border-t-transparent animate-spin"></div>
        </div>
      </div>
      <p class="text-lg text-gray-700 dark:text-gray-200 font-medium">加载中...</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'

const show = ref(true)

const props = defineProps<{
  duration?: number
}>()

onMounted(() => {
  // 最多显示一定时间后自动隐藏
  setTimeout(() => {
    show.value = false
  }, props.duration || 3000)
})

// 暴露方法以便外部控制
const hide = () => {
  show.value = false
}

defineExpose({ hide })
</script>

<style scoped>
.delay-75 {
  animation-delay: 75ms;
}
</style>
