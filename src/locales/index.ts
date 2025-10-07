import { computed } from 'vue'
import { useLocale } from '@/stores/locale'

const messages = {
  zh: {
    about: '关于我',
    contact: '联系我',
    // ...其他中文
  },
  en: {
    about: 'About Me',
    contact: 'Contact',
    // ...其他英文
  }
}

export function useI18n() {
  const { locale } = useLocale()
  return computed(() => messages[locale.value])
}