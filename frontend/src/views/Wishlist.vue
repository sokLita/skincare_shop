<template>
  <div class="container py-4">
    <h2>❤️ My Wishlist</h2>
    <p class="text-muted">Your favorite products</p>
    
    <div v-if="loading" class="text-center py-5">
      <div class="spinner-border"></div>
    </div>
    
    <div v-else-if="wishlistItems.length === 0" class="text-center py-5">
      <i class="fas fa-heart fa-3x text-muted"></i>
      <h4 class="mt-3">Your wishlist is empty</h4>
      <p class="text-muted">Start adding products you love!</p>
      <router-link to="/products" class="btn btn-primary">
        <i class="fas fa-shopping-bag"></i> Browse Products
      </router-link>
    </div>
    
    <div v-else class="row">
      <div v-for="item in wishlistItems" :key="item.id" class="col-md-3 mb-4">
        <div class="card h-100">
          <router-link :to="`/products/${item.product.id}`">
            <img 
              :src="`${API_URL}/storage/${item.product.image}`" 
              class="card-img-top" 
              :alt="item.product.name"
            >
          </router-link>
          <div class="card-body">
            <h5 class="card-title">{{ item.product.name }}</h5>
            <p class="card-text text-truncate">{{ item.product.description }}</p>
            <div class="d-flex justify-content-between align-items-center">
              <span class="h5 text-primary">${{ item.product.price }}</span>
            </div>
            <div class="mt-2">
              <button class="btn btn-primary w-100 mb-2" @click="addToCart(item.product.id)">
                <i class="fas fa-cart-plus"></i> Add to Cart
              </button>
              <button class="btn btn-danger w-100" @click="removeFromWishlist(item.id)">
                <i class="fas fa-trash"></i> Remove
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import { useCartStore } from '../stores/cart'
import { useAuthStore } from '../stores/auth'

export default {
  name: 'Wishlist',
  data() {
    return {
      wishlistItems: [],
      loading: false,
      API_URL: import.meta.env.VITE_API_URL || 'http://localhost:8000'
    }
  },
  setup() {
    const cartStore = useCartStore()
    const authStore = useAuthStore()
    return { cartStore, authStore }
  },
  mounted() {
    this.fetchWishlist()
  },
  methods: {
    async fetchWishlist() {
      this.loading = true
      try {
        const response = await axios.get('/wishlist')
        this.wishlistItems = response.data
      } catch (error) {
        console.error('Failed to fetch wishlist:', error)
      } finally {
        this.loading = false
      }
    },
    
    async addToCart(productId) {
      const result = await this.cartStore.addToCart(productId)
      if (result.success) {
        alert('Product added to cart!')
      } else {
        alert(result.error || 'Failed to add to cart')
      }
    },
    
    async removeFromWishlist(wishlistId) {
      if (confirm('Remove this item from wishlist?')) {
        try {
          await axios.delete(`/wishlist/${wishlistId}`)
          await this.fetchWishlist()
          alert('Removed from wishlist!')
        } catch (error) {
          alert('Failed to remove from wishlist')
        }
      }
    }
  }
}
</script>

<style scoped>
.card-img-top {
  height: 200px;
  object-fit: cover;
}
</style>