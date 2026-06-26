import { defineStore } from 'pinia'
import axios from 'axios'

export const useProductStore = defineStore('product', {
  actions: {
    async fetchProducts() {
      const response = await axios.get('/api/products')
      return response.data
    }
  }
})