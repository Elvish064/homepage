<template>
  <Layout />
</template>

<script setup lang="ts">
import Layout from '@/components/layout/Layout.vue'
import { createLocale } from '@/stores/locale'
createLocale()
</script>