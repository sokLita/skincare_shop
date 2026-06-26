<template>
  <div class="container py-5">
    <div class="row justify-content-center">
      <div class="col-md-6 col-lg-4">
        <div class="card shadow">
          <div class="card-body p-4">
            <h3 class="text-center mb-4">
              <i class="fas fa-spa text-primary"></i> Login
            </h3>
            
            <form @submit.prevent="handleLogin">
              <div class="mb-3">
                <label for="email" class="form-label">Email</label>
                <input 
                  type="email" 
                  id="email" 
                  v-model="form.email" 
                  class="form-control" 
                  required
                >
              </div>
              
              <div class="mb-3">
                <label for="password" class="form-label">Password</label>
                <input 
                  type="password" 
                  id="password" 
                  v-model="form.password" 
                  class="form-control" 
                  required
                >
              </div>
              
              <button type="submit" class="btn btn-primary w-100" :disabled="loading">
                <span v-if="loading" class="spinner-border spinner-border-sm me-2"></span>
                Login
              </button>
            </form>
            
            <div class="text-center mt-3">
              <p>Don't have an account? <router-link to="/register">Register</router-link></p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { useAuthStore } from '../stores/auth'

export default {
  name: 'Login',
  data() {
    return {
      form: {
        email: '',
        password: ''
      },
      loading: false,
      error: null
    }
  },
  setup() {
    const authStore = useAuthStore()
    return { authStore }
  },
  methods: {
    async handleLogin() {
      this.loading = true
      this.error = null
      try {
        await this.authStore.login(this.form.email, this.form.password)
        this.$router.push('/')
      } catch (error) {
        this.error = error.response?.data?.message || 'Login failed'
      } finally {
        this.loading = false
      }
    }
  }
}
</script>