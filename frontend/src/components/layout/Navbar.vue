<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light">
    <div class="container">
      <router-link class="navbar-brand" to="/">
        <i class="fas fa-spa"></i> June Shop
      </router-link>
      
      <button class="navbar-toggler" type="button" @click="isNavOpen = !isNavOpen">
        <span class="navbar-toggler-icon"></span>
      </button>
      
      <div class="collapse navbar-collapse" :class="{ show: isNavOpen }">
        <ul class="navbar-nav me-auto">
          <li class="nav-item">
            <router-link class="nav-link" to="/">Home</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/products">Products</router-link>
          </li>
          <li class="nav-item" v-if="authStore.isAuthenticated">
            <router-link class="nav-link" to="/orders">Orders</router-link>
          </li>
        </ul>
        
        <div class="d-flex align-items-center">
          <router-link to="/wishlist" class="btn btn-outline-primary me-2 position-relative" v-if="authStore.isAuthenticated">
            <i class="fas fa-heart"></i>
            <span
              class="badge bg-danger position-absolute top-0 start-100 translate-middle"
              v-if="wishlistStore.count > 0"
            >
              {{ wishlistStore.count }}
            </span>
          </router-link>
          
          <router-link to="/cart" class="btn btn-outline-secondary me-2 position-relative">
            <i class="fas fa-shopping-cart"></i>
            <span class="badge bg-danger position-absolute top-0 start-100 translate-middle" v-if="cartStore.count > 0">
              {{ cartStore.count }}
            </span>
          </router-link>
          
          <div v-if="authStore.isAuthenticated" class="dropdown">
            <button class="btn btn-outline-dark dropdown-toggle" @click="isDropdownOpen = !isDropdownOpen">
              <i class="fas fa-user"></i> {{ authStore.user?.name }}
            </button>
            <ul class="dropdown-menu dropdown-menu-end" :class="{ show: isDropdownOpen }">
              <li><router-link class="dropdown-item" to="/profile">Profile</router-link></li>
              <li><hr class="dropdown-divider"></li>
              <li><button class="dropdown-item" @click="logout">Logout</button></li>
            </ul>
          </div>
          
          <router-link v-else to="/login" class="btn btn-primary">Login</router-link>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
import { useAuthStore } from '../stores/auth'
import { useCartStore } from '../stores/cart'
import { useWishlistStore } from '../../stores/wishlist'

export default {
  name: 'Navbar',
  data() {
    return {
      isNavOpen: false,
      isDropdownOpen: false
    }
  },
  setup() {
    const authStore = useAuthStore()
    const cartStore = useCartStore()
    const wishlistStore = useWishlistStore()
    return { authStore, cartStore, wishlistStore }
  },
  mounted() {
    if (this.authStore.isAuthenticated) {
      this.cartStore.fetchCart()
      this.wishlistStore.fetchWishlist()
    }
  },
  methods: {
    async logout() {
      await this.authStore.logout()
      this.$router.push('/login')
      this.isDropdownOpen = false
    }
  }
}
</script>
