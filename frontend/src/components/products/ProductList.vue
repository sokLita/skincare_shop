<template>
  <div class="container py-4">
    <div class="row mb-4">
      <div class="col-md-8">
        <h2>Our Skincare Products</h2>
        <p class="text-muted">Discover the best skincare solutions for your skin</p>
      </div>
      <div class="col-md-4">
        <div class="input-group">
          <input 
            type="text" 
            class="form-control" 
            placeholder="Search products..." 
            v-model="searchQuery"
            @input="searchProducts"
          >
          <button class="btn btn-outline-secondary" @click="searchProducts">
            <i class="fas fa-search"></i>
          </button>
        </div>
      </div>
    </div>
    
    <div class="row">
      <div class="col-md-3">
        <div class="card">
          <div class="card-body">
            <h5 class="card-title">Filters</h5>
            
            <div class="mb-3">
              <label class="form-label">Category</label>
              <select class="form-select" v-model="filters.category" @change="applyFilters">
                <option value="">All Categories</option>
                <option v-for="category in categories" :key="category.id" :value="category.id">
                  {{ category.name }}
                </option>
              </select>
            </div>
            
            <div class="mb-3">
              <label class="form-label">Skin Type</label>
              <select class="form-select" v-model="filters.skin_type" @change="applyFilters">
                <option value="">All Skin Types</option>
                <option value="dry">Dry</option>
                <option value="oily">Oily</option>
                <option value="combination">Combination</option>
                <option value="sensitive">Sensitive</option>
              </select>
            </div>
            
            <div class="mb-3">
              <label class="form-label">Price Range</label>
              <input type="range" class="form-range" min="0" max="200" v-model="filters.max_price" @change="applyFilters">
              <div class="d-flex justify-content-between">
                <span>$0</span>
                <span>${{ filters.max_price }}</span>
              </div>
            </div>
            
            <button class="btn btn-secondary w-100" @click="resetFilters">Reset Filters</button>
          </div>
        </div>
      </div>
      
      <div class="col-md-9">
        <div class="row">
          <div class="col-12" v-if="loading">
            <div class="text-center py-5">
              <div class="spinner-border text-primary"></div>
            </div>
          </div>
          
          <div v-else-if="products.length === 0" class="col-12">
            <div class="text-center py-5">
              <h4>No products found</h4>
              <p class="text-muted">Try adjusting your filters or search terms</p>
            </div>
          </div>
          
          <div v-else v-for="product in products" :key="product.id" class="col-md-4 mb-4">
            <div class="card h-100">
              <router-link :to="`/products/${product.slug}`">
                <ProductImage
                  :src="productImageSrc(product)"
                  :alt="product.name"
                  class="card-img-top"
                  style="height: 200px"
                />
              </router-link>
              <div class="card-body">
                <h5 class="card-title">{{ product.name }}</h5>
                <p class="card-text text-truncate">{{ product.description }}</p>
                <div class="d-flex justify-content-between align-items-center">
                  <span class="h5 text-primary">${{ product.price }}</span>
                  <span class="badge bg-secondary">{{ product.category?.name }}</span>
                </div>
                <div class="mt-2">
                  <button 
                    class="btn btn-primary w-100" 
                    @click="addToCart(product.id)"
                    :disabled="product.stock === 0"
                  >
                    {{ product.stock === 0 ? 'Out of Stock' : 'Add to Cart' }}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <nav aria-label="Page navigation" v-if="pagination.total > 1">
          <ul class="pagination justify-content-center">
            <li class="page-item" :class="{ disabled: !pagination.prev }">
              <button class="page-link" @click="changePage(pagination.prev)">Previous</button>
            </li>
            <li class="page-item" v-for="page in pagination.total" :key="page">
              <button 
                class="page-link" 
                :class="{ active: page === pagination.current }"
                @click="changePage(page)"
              >
                {{ page }}
              </button>
            </li>
            <li class="page-item" :class="{ disabled: !pagination.next }">
              <button class="page-link" @click="changePage(pagination.next)">Next</button>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import { useCartStore } from '../stores/cart'
import { useAuthStore } from '../stores/auth'
import ProductImage from '../ui/ProductImage.vue'

export default {
  name: 'ProductList',
  components: { ProductImage },
  data() {
    return {
      products: [],
      categories: [],
      loading: false,
      searchQuery: '',
      filters: {
        category: '',
        skin_type: '',
        max_price: 200
      },
      pagination: {
        current: 1,
        total: 0,
        prev: null,
        next: null
      }
    }
  },
  setup() {
    const cartStore = useCartStore()
    const authStore = useAuthStore()
    return { cartStore, authStore }
  },
  mounted() {
    this.fetchCategories()
    this.fetchProducts()
  },
  methods: {
    async fetchCategories() {
      try {
        const response = await axios.get('/categories')
        this.categories = response.data
      } catch (error) {
        console.error('Failed to fetch categories:', error)
      }
    },
    
    async fetchProducts(page = 1) {
      this.loading = true
      try {
        const params = {
          page,
          search: this.searchQuery,
          ...this.filters
        }
        const response = await axios.get('/products', { params })
        this.products = response.data.data
        this.pagination = {
          current: response.data.current_page,
          total: response.data.last_page,
          prev: response.data.prev_page_url ? response.data.current_page - 1 : null,
          next: response.data.next_page_url ? response.data.current_page + 1 : null
        }
      } catch (error) {
        console.error('Failed to fetch products:', error)
      } finally {
        this.loading = false
      }
    },
    
    async addToCart(productId) {
      if (!this.authStore.isAuthenticated) {
        this.$router.push('/login')
        return
      }

      // Cart updates must be immediate with no alerts/popups/notifications
      this.cartStore.addToCart(productId)
    },
    
    searchProducts() {
      this.fetchProducts()
    },
    
    applyFilters() {
      this.fetchProducts()
    },
    
    resetFilters() {
      this.filters.category = ''
      this.filters.skin_type = ''
      this.filters.max_price = 200
      this.searchQuery = ''
      this.fetchProducts()
    },
    
    changePage(page) {
      if (page) {
        this.fetchProducts(page)
      }
    },

    productImageSrc(product) {
      if (!product) return ''

      if (product.image_url) {
        return product.image_url
      }

      if (product.image) {
        if (/^(https?:)?\/\//.test(product.image) || product.image.startsWith('data:')) {
          return product.image
        }

        const imagePath = product.image.startsWith('/') ? product.image : `/storage/${product.image}`
        return `http://localhost:8000${imagePath}`
      }

      return ''
    },
  }
}
</script>