import { defineStore } from 'pinia'
import axios from 'axios'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api'

interface User {
  id: number
  name: string
  email: string
  is_admin: boolean | number
  [key: string]: any
}

export const useAuthStore = defineStore('auth', {
  state: (): { user: User | null; token: string | null; loading: boolean } => {
    // Initialize axios when store is created
    const token = localStorage.getItem('token') || null
    axios.defaults.baseURL = API_URL
    if (token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
    }
    
    return {
      user: null,
      token: token,
      loading: false
    }
  },
  
  getters: {
    isAuthenticated: (state): boolean => !!state.token,
    isAdmin: (state): boolean => {
      if (!state.user) return false
      return state.user.is_admin === true || state.user.is_admin === 1
    }
  },
  
  actions: {
    initAxios() {
      axios.defaults.baseURL = API_URL
      if (this.token) {
        axios.defaults.headers.common['Authorization'] = `Bearer ${this.token!}`
      }
    },
    
    async login(email: string, password: string) {
      this.loading = true
      try {
        const response = await axios.post('/login', { email, password })
        this.token = response.data.token
        this.user = response.data.user
        localStorage.setItem('token', this.token!)
        axios.defaults.headers.common['Authorization'] = `Bearer ${this.token!}`
        return { success: true, data: response.data }
      } catch (error: unknown) {
        const errorMessage = error instanceof Error && 'response' in error
          ? (error as any).response?.data?.message || 'Login failed'
          : 'Login failed'
        return { success: false, error: errorMessage }
      } finally {
        this.loading = false
      }
    },
    
    async register(userData: Record<string, any>) {
      this.loading = true
      try {
        const response = await axios.post('/register', userData)
        this.token = response.data.token
        this.user = response.data.user
        localStorage.setItem('token', this.token!)
        axios.defaults.headers.common['Authorization'] = `Bearer ${this.token!}`
        return { success: true, data: response.data }
      } catch (error: unknown) {
        const errorMessage = error instanceof Error && 'response' in error
          ? (error as any).response?.data?.errors || 'Registration failed'
          : 'Registration failed'
        return { success: false, error: errorMessage }
      } finally {
        this.loading = false
      }
    },
    
    async logout() {
      try {
        await axios.post('/logout')
      } catch (error) {
        console.error('Logout error:', error)
      } finally {
        this.token = null
        this.user = null
        localStorage.removeItem('token')
        delete axios.defaults.headers.common['Authorization']
      }
    },
    
    async fetchProfile() {
      if (!this.token) return
      try {
        const response = await axios.get('/profile')
        this.user = response.data
      } catch (error) {
        this.logout()
      }
    },
    
    async updateProfile(data: Record<string, any>) {
      try {
        const response = await axios.put('/profile', data)
        this.user = response.data.user
        return { success: true, data: response.data }
      } catch (error: unknown) {
        const errorMessage = error instanceof Error && 'response' in error
          ? (error as any).response?.data?.errors || 'Update failed'
          : 'Update failed'
        return { success: false, error: errorMessage }
      }
    },
    
    async changePassword(data: Record<string, any>) {
      try {
        const response = await axios.put('/change-password', data)
        return { success: true, data: response.data }
      } catch (error: unknown) {
        const errorMessage = error instanceof Error && 'response' in error
          ? (error as any).response?.data?.message || 'Password change failed'
          : 'Password change failed'
        return { success: false, error: errorMessage }
      }
    }
  }
})