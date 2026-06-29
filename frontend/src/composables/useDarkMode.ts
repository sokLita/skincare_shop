import { ref, watch } from 'vue'

const isDark = ref(false)
const STORAGE_KEY = 'june-shop.dark-mode'

export function useDarkMode() {
  function init() {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored !== null) {
      isDark.value = stored === 'true'
    } else {
      isDark.value = window.matchMedia('(prefers-color-scheme: dark)').matches
    }
    applyTheme()
  }

  function toggle() {
    isDark.value = !isDark.value
    applyTheme()
  }

  function applyTheme() {
    if (isDark.value) {
      document.documentElement.classList.add('dark-mode')
    } else {
      document.documentElement.classList.remove('dark-mode')
    }
    localStorage.setItem(STORAGE_KEY, isDark.value.toString())
  }

  return { isDark, init, toggle }
}
