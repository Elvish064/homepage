import { ref, provide, inject } from 'vue'

export type Locale = 'zh' | 'en'
const localeSymbol = Symbol('locale')

export function createLocale() {
  const locale = ref<Locale>('zh')
  function toggleLocale() {
    locale.value = locale.value === 'zh' ? 'en' : 'zh'
  }
  provide(localeSymbol, { locale, toggleLocale })
}

export function useLocale() {
  const store = inject(localeSymbol)
  if (!store) throw new Error('Locale store not provided')
  return store as { locale: typeof ref; toggleLocale: () => void }
}