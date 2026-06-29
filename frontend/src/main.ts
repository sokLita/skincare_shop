import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { createI18n } from 'vue-i18n'
import App from './App.vue'
import router from './router'
import './assets/main.css'
import en from './locales/en.json'
import kh from './locales/kh.json'

// Get saved locale from localStorage
const savedLocale = localStorage.getItem('app_locale') || 'en'

const i18n = createI18n({
  legacy: false,
  locale: savedLocale,
  fallbackLocale: 'en',
  messages: { en, kh }
})

const app = createApp(App)
const pinia = createPinia()

app.use(pinia)
app.use(router)
app.use(i18n)
app.mount('#app')