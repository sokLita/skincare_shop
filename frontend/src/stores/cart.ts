import { defineStore } from 'pinia'
import axios from 'axios'

export const useCartStore = defineStore('cart', {
  state: () => ({
    items: [],
    total: 0,
    count: 0,
    loading: false
  }),
  
  actions: {
    async fetchCart() {
      this.loading = true
      try {
        const response = await axios.get('/cart')
        this.items = response.data.items
        this.total = response.data.total
        this.count = response.data.count
      } catch (error) {
        console.error('Failed to fetch cart:', error)
      } finally {
        this.loading = false
      }
    },
    
    async addToCart(productId, quantity = 1) {
      try {
        const response = await axios.post('/cart', { product_id: productId, quantity })
        await this.fetchCart()
        return { success: true, data: response.data }
      } catch (error) {
        return { success: false, error: error.response?.data?.message || 'Failed to add to cart' }
      }
    },
    
    async updateQuantity(cartId, quantity) {
      try {
        await axios.put(`/cart/${cartId}`, { quantity })
        await this.fetchCart()
        return { success: true }
      } catch (error) {
        return { success: false, error: error.response?.data?.message || 'Failed to update quantity' }
      }
    },
    
    async removeFromCart(cartId) {
      try {
        await axios.delete(`/cart/${cartId}`)
        await this.fetchCart()
        return { success: true }
      } catch (error) {
        return { success: false, error: error.response?.data?.message || 'Failed to remove item' }
      }
    },
    
    async clearCart() {
      try {
        await axios.delete('/cart')
        await this.fetchCart()
        return { success: true }
      } catch (error) {
        return { success: false, error: 'Failed to clear cart' }
      }
    }
  }
})