<template>
  <div class="container py-4" v-if="product">
    <div class="row">
      <div class="col-md-6">
        <div class="position-relative">
          <img 
            :src="`/storage/${product.image}`" 
            class="img-fluid rounded" 
            :alt="product.name"
          >
          <button 
            v-if="authStore.isAuthenticated"
            class="btn btn-lg position-absolute top-0 end-0 m-3"
            :class="isInWishlist ? 'btn-danger' : 'btn-outline-danger'"
            @click="toggleWishlist"
          >
            <i class="fas fa-heart"></i>
          </button>
        </div>
        
        <div class="row mt-2" v-if="product.images && product.images.length > 0">
          <div class="col-3" v-for="(image, index) in product.images" :key="index">
            <img 
              :src="`/storage/${image}`" 
              class="img-fluid rounded cursor-pointer"
              @click="product.image = image"
              style="height: 100px; object-fit: cover;"
            >
          </div>
        </div>
      </div>
      
      <div class="col-md-6">
        <h2>{{ product.name }}</h2>
        <div class="mb-3">
          <span class="badge bg-secondary">{{ product.category?.name }}</span>
          <span class="badge bg-info ms-2">{{ product.skin_type }}</span>
        </div>
        
        <div class="mb-3">
          <div class="d-flex align-items-center">
            <span class="h3 text-primary me-3">${{ product.price }}</span>
            <span class="text-muted">Stock: {{ product.stock }} units</span>
          </div>
        </div>
        
        <div class="mb-3">
          <h5>Description</h5>
          <p>{{ product.description }}</p>
        </div>
        
        <div class="mb-3" v-if="product.ingredients">
          <h5>Ingredients</h5>
          <p>{{ product.ingredients }}</p>
        </div>
        
        <div class="mb-3" v-if="product.how_to_use">
          <h5>How to Use</h5>
          <p>{{ product.how_to_use }}</p>
        </div>
        
        <div class="mb-3" v-if="product.benefits && product.benefits.length > 0">
          <h5>Benefits</h5>
          <ul>
            <li v-for="benefit in product.benefits" :key="benefit">{{ benefit }}</li>
          </ul>
        </div>
        
        <div class="d-flex gap-3">
          <div class="input-group w-25">
            <button class="btn btn-outline-secondary" @click="decrementQuantity">-</button>
            <input type="number" class="form-control text-center" v-model="quantity" min="1">
            <button class="btn btn-outline-secondary" @click="incrementQuantity">+</button>
          </div>
          <button 
            class="btn btn-primary flex-grow-1" 
            @click="addToCart"
            :disabled="product.stock === 0"
          >
            {{ product.stock === 0 ? 'Out of Stock' : 'Add to Cart' }}
          </button>
        </div>
        
        <div class="mt-4">
          <h5>Reviews</h5>
          <div v-if="product.reviews && product.reviews.length > 0">
            <div v-for="review in product.reviews" :key="review.id" class="card mb-2">
              <div class="card-body">
                <div class="d-flex justify-content-between">
                  <strong>{{ review.user.name }}</strong>
                  <span>
                    <i v-for="i in 5" :key="i" class="fas fa-star" 
                       :class="i <= review.rating ? 'text-warning' : 'text-muted'">
                    </i>
                  </span>
                </div>
                <p class="mb-0">{{ review.comment }}</p>
                <small class="text-muted">{{ new Date(review.created_at).toLocaleDateString() }}</small>
              </div>
            </div>
          </div>
          <div v-else>
            <p class="text-muted">No reviews yet</p>
          </div>
          
          <div v-if="authStore.isAuthenticated" class="mt-3">
            <h6>Write a Review</h6>
            <form @submit.prevent="submitReview">
              <div class="mb-2">
                <select v-model="reviewData.rating" class="form-select" required>
                  <option value="">Select Rating</option>
                  <option value="5">5 - Excellent</option>
                  <option value="4">4 - Very Good</option>
                  <option value="3">3 - Good</option>
                  <option value="2">2 - Fair</option>
                  <option value="1">1 - Poor</option>
                </select>
              </div>
              <div class="mb-2">
                <textarea v-model="reviewData.comment" class="form-control" rows="2" placeholder="Share your experience..."></textarea>
              </div>
              <button type="submit" class="btn btn-sm btn-primary">Submit Review</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import { useAuthStore } from '../stores/auth'
import { useCartStore } from '../stores/cart'

export default {
  name: 'ProductDetail',
  data() {
    return {
      product: null,
      quantity: 1,
      isInWishlist: false,
      reviewData: {
        rating: '',
        comment: ''
      }
    }
  },
  setup() {
    const authStore = useAuthStore()
    const cartStore = useCartStore()
    return { authStore, cartStore }
  },
  mounted() {
    this.fetchProduct()
  },
  methods: {
    async fetchProduct() {
      try {
        const response = await axios.get(`/products/${this.$route.params.id}`)
        this.product = response.data
        if (this.authStore.isAuthenticated) {
          this.checkWishlist()
        }
      } catch (error) {
        console.error('Failed to fetch product:', error)
        this.$router.push('/products')
      }
    },
    
    async checkWishlist() {
      try {
        const response = await axios.get('/wishlist/check', {
          params: { product_id: this.product.id }
        })
        this.isInWishlist = response.data.exists
      } catch (error) {
        console.error('Failed to check wishlist:', error)
      }
    },
    
    async toggleWishlist() {
      if (!this.authStore.isAuthenticated) {
        this.$router.push('/login')
        return
      }
      
      try {
        if (this.isInWishlist) {
          await axios.delete(`/wishlist/${this.product.id}`)
          this.isInWishlist = false
          this.$toast.success('Removed from wishlist')
        } else {
          await axios.post('/wishlist', { product_id: this.product.id })
          this.isInWishlist = true
          this.$toast.success('Added to wishlist')
        }
      } catch (error) {
        this.$toast.error('Failed to update wishlist')
      }
    },
    
    incrementQuantity() {
      if (this.quantity < this.product.stock) {
        this.quantity++
      }
    },
    
    decrementQuantity() {
      if (this.quantity > 1) {
        this.quantity--
      }
    },
    
    async addToCart() {
      if (!this.authStore.isAuthenticated) {
        this.$router.push('/login')
        return
      }
      
      try {
        await this.cartStore.addToCart(this.product.id, this.quantity)
        this.$toast.success('Product added to cart!')
      } catch (error) {
        this.$toast.error(error.response?.data?.message || 'Failed to add to cart')
      }
    },
    
    async submitReview() {
      try {
        await axios.post('/reviews', {
          product_id: this.product.id,
          rating: this.reviewData.rating,
          comment: this.reviewData.comment
        })
        this.$toast.success('Review submitted!')
        this.reviewData.rating = ''
        this.reviewData.comment = ''
        await this.fetchProduct()
      } catch (error) {
        this.$toast.error('Failed to submit review')
      }
    }
  }
}
</script>