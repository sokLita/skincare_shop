import { defineStore } from 'pinia'
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'

type Locale = 'en' | 'kh'

export const useLanguageStore = defineStore('language', () => {
  const i18n = useI18n()

  const locale = computed<Locale>(() => i18n.locale.value as Locale)

  const t = computed(() => {
    return (key: string, params?: Record<string, string>): string => {
      // Use Vue I18n's t function for translation with fallback
      const result = i18n.t(key, params || {})
      // If the result is the same as the key, it means translation was not found
      // Return the key as fallback (or could return the string version)
      return typeof result === 'string' ? result : key
    }
  })

  function setLocale(lang: Locale) {
    i18n.locale.value = lang
    localStorage.setItem('app_locale', lang)
    document.documentElement.lang = lang === 'kh' ? 'km' : 'en'
  }

  function initLocale() {
    const saved = localStorage.getItem('app_locale') as Locale | null
    if (saved && (saved === 'en' || saved === 'kh')) {
      i18n.locale.value = saved
    }
    document.documentElement.lang = locale.value === 'kh' ? 'km' : 'en'
  }

  return { locale, t, setLocale, initLocale }
})