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
                    <img :src="`/storage/${item.product.image}`" class="img-fluid rounded" alt="Product">
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
  setup() {
    const cartStore = useCartStore()
    return { cartStore }
  },
  mounted() {
    this.cartStore.fetchCart()
  },
  methods: {
    async updateQuantity(itemId, quantity) {
      if (quantity < 1) {
        await this.removeItem(itemId)
        return
      }
      try {
        await this.cartStore.updateQuantity(itemId, quantity)
      } catch (error) {
        this.$toast.error('Failed to update quantity')
      }
    },
    
    async removeItem(itemId) {
      if (confirm('Remove this item from cart?')) {
        try {
          await this.cartStore.removeFromCart(itemId)
        } catch (error) {
          this.$toast.error('Failed to remove item')
        }
      }
    },
    
    proceedToCheckout() {
      this.$router.push('/checkout')
    }
  }
}
</script>