<template>
  <div id="app">
    <Navbar />
    <main class="main-content">
      <router-view />
    </main>
    <Footer />
  </div>
</template>

<script>
import Navbar from './components/Navbar.vue'
import Footer from './components/Footer.vue'
import { useAuthStore } from './stores/auth'

export default {
  name: 'App',
  components: {
    Navbar,
    Footer
  },
  mounted() {
    const authStore = useAuthStore()
    authStore.initAxios()
    authStore.fetchProfile()
  }
}
</script>

<style>
#app {
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.main-content {
  flex: 1;
  min-height: calc(100vh - 200px);
  padding-top: 64px;
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
</style>
