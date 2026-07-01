<template>
  <div id="app">
    <Navbar />
    <main class="main-content">
      <router-view v-slot="{ Component }">
        <transition name="fade" mode="out-in">
          <component :is="Component" />
        </transition>
      </router-view>
    </main>
    <Footer />
    <ToastContainer />
    <OrderChatbotWidget :preselectedOrderId="preselectedOrderId" />
  </div>
</template>

<script>
import Navbar from './components/Navbar.vue'
import Footer from './components/Footer.vue'
import ToastContainer from './components/ui/ToastContainer.vue'
import OrderChatbotWidget from './components/chat/OrderChatbotWidget.vue'
import { useAuthStore } from './stores/auth'
import { useDarkMode } from './composables/useDarkMode'
import { useLanguageStore } from './stores/language'

export default {
  name: 'App',
  components: {
    Navbar,
    Footer,
    ToastContainer,
    OrderChatbotWidget
  },
  data() {
    return {
      preselectedOrderId: null
    }
  },
  mounted() {
    const authStore = useAuthStore()
    authStore.initAxios()
    authStore.fetchProfile()

    // Initialize dark mode
    const darkMode = useDarkMode()
    darkMode.init()

    // Initialize language
    const languageStore = useLanguageStore()
    languageStore.initLocale()

    // Listen for chatbot open events
    window.addEventListener('open-order-chat', (e) => {
      this.preselectedOrderId = e.detail?.orderId || null
    })
  }
}
</script>

<style>
#app {
  font-family: var(--font-primary);
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: var(--text-primary);
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background: var(--bg-primary);
  transition: background-color 0.3s ease, color 0.3s ease;
}

.main-content {
  flex: 1;
  min-height: calc(100vh - 200px);
  padding-top: 68px;
}

@media (max-width: 992px) {
  .main-content {
    padding-top: 60px;
  }
}

/* Smooth page transitions */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

/* Selection style */
::selection {
  background: rgba(102, 126, 234, 0.3);
  color: inherit;
}

/* Scrollbar styling */
::-webkit-scrollbar {
  width: 8px;
}

::-webkit-scrollbar-track {
  background: var(--bg-primary);
}

::-webkit-scrollbar-thumb {
  background: var(--text-muted);
  border-radius: 4px;
}

::-webkit-scrollbar-thumb:hover {
  background: var(--text-secondary);
}
</style>
