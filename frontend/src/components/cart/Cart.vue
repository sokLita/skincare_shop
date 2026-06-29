<template>
  <div class="container py-4">
    <h2>Shopping Cart</h2>
    <div v-if="cartStore.items.length === 0" class="text-center py-5">
      <i class="fas fa-shopping-cart fa-3x text-muted"></i>
      <h4 class="mt-3">Your cart is empty</h4>
      <p class="text-muted">Browse our products and add items to your cart</p>
      <router-link to="/products" class="btn btn-primary">Continue Shopping</router-link>
    </div>
    
    <div v-else>
      <div class="row">
        <div class="col-md-8">
          <div class="card">
            <div class="card-body">
              <div v-for="item in cartStore.items" :key="item.id" class="cart-item mb-3">
                <div class="row align-items-center">
                   <div class="col-2">
                     <img
                       :src="productImageSrc(item.product)"
                       :alt="item.product.name"
                       class="product-image"
                       @error="setImageFallback($event, item.product.name)"
                     >
                   </div>
                  <div class="col-4">
                    <h6>{{ item.product.name }}</h6>
                    <span class="text-muted">${{ item.product.price }}</span>
                  </div>
                  <div class="col-3">
                    <div class="input-group">
                      <button class="btn btn-outline-secondary btn-sm" @click="updateQuantity(item.id, item.quantity - 1)">-</button>
                      <input type="number" class="form-control text-center" v-model="item.quantity" min="1" @change="updateQuantity(item.id, item.quantity)">
                      <button class="btn btn-outline-secondary btn-sm" @click="updateQuantity(item.id, item.quantity + 1)">+</button>
                    </div>
                  </div>
                  <div class="col-2 text-end">
                    <span class="h6">${{ (item.quantity * item.product.price).toFixed(2) }}</span>
                  </div>
                  <div class="col-1">
                    <button class="btn btn-danger btn-sm" @click="removeItem(item.id)">
                      <i class="fas fa-trash"></i>
                    </button>
                  </div>
                </div>
                <hr v-if="!isLast">
              </div>
            </div>
          </div>
        </div>
        
        <div class="col-md-4">
          <div class="card">
            <div class="card-body">
              <h5>Order Summary</h5>
              <hr>
              <div class="d-flex justify-content-between mb-2">
                <span>Subtotal</span>
                <span>${{ cartStore.total.toFixed(2) }}</span>
              </div>
              <div class="d-flex justify-content-between mb-2">
                <span>Shipping</span>
                <span>Free</span>
              </div>
              <hr>
              <div class="d-flex justify-content-between h5">
                <span>Total</span>
                <span class="text-primary">${{ cartStore.total.toFixed(2) }}</span>
              </div>
              <button class="btn btn-primary w-100 mt-3" @click="proceedToCheckout">
                Proceed to Checkout
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { useCartStore } from '../stores/cart'

export default {
  name: 'Cart',
  data() {
    return {
      API_URL: import.meta.env.VITE_API_URL || 'http://localhost:8000/api'
    }
  },
  computed: {
    assetBaseUrl() {
      return this.API_URL.replace(/\/api\/?$/, '')
    }
  },
  setup() {
    const cartStore = useCartStore()
    return { cartStore }
  },
  mounted() {
    this.cartStore.hydrateFromLocalStorage()
  },
  methods: {
    async updateQuantity(itemId, quantity) {
      if (quantity < 1) {
        this.removeItem(itemId)
        return
      }
      await this.cartStore.updateQuantity(itemId, quantity)
    },
    
    async removeItem(itemId) {
      await this.cartStore.removeFromCart(itemId)
    },
    
    proceedToCheckout() {
      this.$router.push('/checkout')
    },

    productImageSrc(product) {
      if (!product) return this.placeholderImage('Product')

      if (product.image_url) {
        return product.image_url
      }

      if (product.image) {
        if (/^(https?:)?\/\//.test(product.image) || product.image.startsWith('data:')) {
          return product.image
        }

        const imagePath = product.image.startsWith('/') ? product.image : `/storage/${product.image}`
        return `${this.assetBaseUrl}${imagePath}`
      }

      return this.placeholderImage(product.name)
    },

    placeholderImage(name = 'Product') {
      const label = encodeURIComponent(name)
      return `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 600 600'%3E%3Crect width='600' height='600' fill='%23fdf2f6'/%3E%3Ccircle cx='300' cy='230' r='96' fill='%23f0e0e6'/%3E%3Cpath d='M164 430c24-86 88-130 136-130s112 44 136 130' fill='%23e7d3dc'/%3E%3Ctext x='300' y='520' text-anchor='middle' font-family='Arial, sans-serif' font-size='34' font-weight='700' fill='%23667eea'%3E${label}%3C/text%3E%3C/svg%3E`
    },

    setImageFallback(event, name) {
      event.target.src = this.placeholderImage(name)
    }
  }
}
</script>

<style scoped>
.product-image {
  width: 100%;
  height: auto;
  border-radius: 0.25rem;
  display: block;
}
</style>
