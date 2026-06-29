import { computed } from 'vue'
import { useLanguageStore } from '../stores/language'

export function useTranslation() {
  const languageStore = useLanguageStore()

  const t = computed(() => {
    return (key: string, params?: Record<string, string>): string => {
      return languageStore.t(key, params)
    }
  })

  const currentLocale = computed(() => languageStore.locale)

  function setLocale(lang: 'en' | 'kh') {
    languageStore.setLocale(lang)
  }

  return { t, currentLocale, setLocale }
}