<template>
  <LoadingScreen ref="loadingRef" :duration="2000" />
  <Layout />
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import Layout from '@/components/layout/Layout.vue'
import LoadingScreen from '@/components/ui/LoadingScreen.vue'

const loadingRef = ref<InstanceType<typeof LoadingScreen>>()

onMounted(() => {
  // 当应用挂载完成后隐藏加载屏幕
  if (loadingRef.value) {
    setTimeout(() => {
      loadingRef.value?.hide()
    }, 500)
  }
})
</script>