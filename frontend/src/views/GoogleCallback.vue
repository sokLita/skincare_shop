<template>
  <div class="google-callback-page">
    <div class="loading-card">
      <div class="spinner" aria-hidden="true"></div>
      <h2 class="title">Signing you in…</h2>
      <p class="subtitle">Please wait while we finish authentication.</p>
    </div>
  </div>
</template>

<script>
import { onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useAuthStore } from '../stores/auth'

export default {
  name: 'GoogleCallback',
  setup() {
    const route = useRoute()
    const router = useRouter()
    const authStore = useAuthStore()
    const error = ref(null)

    onMounted(async () => {
      const token = route.query.token
      const oauthError = route.query.error

      if (oauthError) {
        error.value = oauthError
        alert('Google sign-in failed: ' + oauthError)
        router.push('/login')
        return
      }

      if (!token) {
        error.value = 'No authentication token was returned from Google.'
        alert('Missing token: No authentication token was returned from Google.')
        router.push('/login')
        return
      }

      // Save the token immediately — this is the critical piece for authentication.
      // The token was just created by the backend and is valid.
      localStorage.setItem('token', token)
      authStore.token = token
      authStore.initAxios()

      // Do NOT call fetchProfile() here. The auth store's fetchProfile() clears
      // the token on failure, which would undo the successful Google sign-in.
      // The user profile will be fetched lazily when needed by other components
      // or on the next page load.

      // Always redirect to home after successful Google authentication
      router.push('/')
    })

    return { error }
  },
}
</script>

<style scoped>
.google-callback-page {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #fdf2f6;
  padding: 24px;
}

.loading-card {
  width: 100%;
  max-width: 420px;
  background: rgba(255, 255, 255, 0.7);
  border: 1px solid rgba(200, 190, 180, 0.25);
  border-radius: 22px;
  padding: 32px 24px;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.06);
  text-align: center;
}

.spinner {
  width: 44px;
  height: 44px;
  border-radius: 50%;
  border: 4px solid rgba(106, 154, 116, 0.18);
  border-top-color: #6a9a74;
  margin: 0 auto 16px;
  animation: spin 0.9s linear infinite;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

.title {
  font-size: 18px;
  font-weight: 700;
  color: #3d3d3d;
  margin: 0 0 6px;
}

.subtitle {
  margin: 0;
  color: #8a7a7a;
  font-size: 13px;
  line-height: 1.5;
}
</style>