<template>
  <div class="products-page">
    <!-- Page Header -->
    <section class="page-header">
      <div class="container">
        <div class="page-header-content">
          <div class="page-header-text">
            <h1 class="page-title">Our Products</h1>
            <p class="page-subtitle">Discover the perfect skincare for your skin</p>
          </div>
          <div class="page-header-search">
            <div class="search-wrap">
              <input
                type="text"
                class="search-input"
                placeholder="Search products..."
                v-model="searchQuery"
                @input="searchProducts"
              />
              <button class="search-btn" type="button" @click="searchProducts">
                <i class="fas fa-search"></i>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Content -->
    <section class="content-section">
      <div class="container">
        <div class="content-layout">

          <!-- Filters Sidebar -->
          <aside class="filters-sidebar">
            <div class="filters-card">
              <div class="filters-header">
                <i class="fas fa-sliders-h"></i>
                <span>Filters</span>
                <button class="filters-clear" @click="resetFilters" v-if="hasActiveFilters">
                  <i class="fas fa-times"></i>
                </button>
              </div>

              <div class="filters-body">
                <div class="filter-group">
                  <label class="filter-label">Category</label>
                  <div class="filter-select-wrap">
                    <select class="filter-select" v-model="filters.category" @change="applyFilters">
                      <option value="">All Categories</option>
                      <option v-for="category in categories" :key="category.id" :value="category.id">
                        {{ category.name }}
                      </option>
                    </select>
                    <i class="fas fa-chevron-down select-arrow"></i>
                  </div>
                </div>

                <div class="filter-group">
                  <label class="filter-label">Skin Type</label>
                  <div class="filter-select-wrap">
                    <select class="filter-select" v-model="filters.skin_type" @change="applyFilters">
                      <option value="">All Skin Types</option>
                      <option value="dry">Dry</option>
                      <option value="oily">Oily</option>
                      <option value="combination">Combination</option>
                      <option value="sensitive">Sensitive</option>
                      <option value="normal">Normal</option>
                    </select>
                    <i class="fas fa-chevron-down select-arrow"></i>
                  </div>
                </div>

                <div class="filter-group">
                  <label class="filter-label">
                    Max Price: <span class="filter-price-value">${{ filters.max_price }}</span>
                  </label>
                  <div class="price-range-wrap">
                    <input
                      type="range"
                      class="price-range"
                      min="0" max="200" step="10"
                      v-model.number="filters.max_price"
                      @change="applyFilters"
                    />
                    <div class="price-labels">
                      <span>$0</span>
                      <span>$200</span>
                    </div>
                  </div>
                </div>

                <button class="filters-reset-btn" @click="resetFilters">
                  <i class="fas fa-redo"></i>
                  Reset Filters
                </button>
              </div>
            </div>
          </aside>

          <!-- Products Grid -->
          <div class="products-main">

            <!-- Empty -->
            <div v-if="products.length === 0" class="state-message">
              <div class="state-icon">
                <i class="fas fa-box-open"></i>
              </div>
              <h3 class="state-title">No products found</h3>
              <p class="state-text">Try adjusting your filters or search query</p>
            </div>

            <!-- Grid -->
            <div v-else class="products-grid">
              <div
                v-for="product in products"
                :key="product.id"
                class="product-card"
              >
                <div class="product-image-wrap">
                  <router-link :to="`/products/${product.id}`">
                    <img
                      :src="`${API_URL}/storage/${product.image}`"
                      :alt="product.name"
                      class="product-image"
                    />
                  </router-link>

                  <div class="product-badge" v-if="product.stock === 0">
                    <span class="badge badge-soldout">Out of Stock</span>
                  </div>

                  <div class="product-actions">
                    <button
                      class="action-btn action-cart"
                      @click="addToCart(product.id)"
                      :disabled="product.stock === 0"
                      :title="product.stock === 0 ? 'Out of Stock' : 'Add to Cart'"
                    >
                      <i class="fas fa-shopping-bag"></i>
                    </button>
                    <router-link
                      :to="`/products/${product.id}`"
                      class="action-btn action-view"
                      title="View Details"
                    >
                      <i class="fas fa-eye"></i>
                    </router-link>
                  </div>
                </div>

                <div class="product-info">
                  <span class="product-category">{{ product.category?.name || 'Skincare' }}</span>
                  <h3 class="product-name">
                    <router-link :to="`/products/${product.id}`">{{ product.name }}</router-link>
                  </h3>
                  <p class="product-desc">{{ product.description }}</p>
                  <div class="product-footer">
                    <span class="product-price">${{ product.price }}</span>
                    <button
                      class="add-cart-btn"
                      @click="addToCart(product.id)"
                      :disabled="product.stock === 0"
                    >
                      <i class="fas fa-plus"></i>
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <!-- Pagination -->
            <nav v-if="pagination.total > 1" class="pagination-nav">
              <button
                class="page-btn page-prev"
                @click="changePage(pagination.prev)"
                :disabled="!pagination.prev"
                :title="!pagination.prev ? 'No previous page' : 'Previous page'"
              >
                <i class="fas fa-chevron-left"></i>
              </button>

              <div class="page-numbers">
                <button
                  v-for="page in pagination.total"
                  :key="page"
                  class="page-num"
                  :class="{ active: page === pagination.current }"
                  @click="changePage(page)"
                >
                  {{ page }}
                </button>
              </div>

              <button
                class="page-btn page-next"
                @click="changePage(pagination.next)"
                :disabled="!pagination.next"
                :title="!pagination.next ? 'No next page' : 'Next page'"
              >
                <i class="fas fa-chevron-right"></i>
              </button>
            </nav>

          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import axios from 'axios'
import { useCartStore } from '../stores/cart'
import { useAuthStore } from '../stores/auth'

export default {
  name: 'Products',
  data() {
    return {
      products: [],
      categories: [],
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
      },
      API_URL: import.meta.env.VITE_API_URL || 'http://localhost:8000'
    }
  },
  computed: {
    hasActiveFilters() {
      return this.filters.category !== '' || this.filters.skin_type !== '' || this.filters.max_price < 200 || this.searchQuery !== ''
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
      }
    },
    
    async addToCart(productId) {
      if (!this.authStore.isAuthenticated) {
        this.$router.push('/login')
        return
      }
      const result = await this.cartStore.addToCart(productId)
      if (result.success) {
        alert('Product added to cart!')
      } else {
        alert(result.error || 'Failed to add to cart')
      }
    },
    
    searchProducts() {
      this.pagination.current = 1
      this.fetchProducts(1)
    },
    
    applyFilters() {
      this.pagination.current = 1
      this.fetchProducts(1)
    },
    
    resetFilters() {
      this.filters.category = ''
      this.filters.skin_type = ''
      this.filters.max_price = 200
      this.searchQuery = ''
      this.pagination.current = 1
      this.fetchProducts(1)
    },
    
    changePage(page) {
      if (page) {
        this.fetchProducts(page)
        window.scrollTo({ top: 0, behavior: 'smooth' })
      }
    }
  }
}
</script>

<style scoped>
/* ============================================
   PRODUCTS PAGE — Blush Pink Theme
   ============================================ */

.products-page {
  background: #fdf2f6;
  min-height: 100vh;
}

/* ---- Page Header ---- */
.page-header {
  position: relative;
  padding: 40px 0 32px;
  overflow: hidden;
  background: #ffffff;
  border-bottom: 1px solid #f0e0e6;
}

.page-header-bg {
  display: none;
}

.page-header-content {
  position: relative;
  z-index: 1;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 24px;
}

.page-title {
  font-size: 28px;
  font-weight: 700;
  color: #2c3e50;
  margin: 0 0 6px;
  letter-spacing: -0.5px;
}

.page-subtitle {
  font-size: 15px;
  color: #8a7a82;
  margin: 0;
}

/* Search */
.search-wrap {
  display: flex;
  background: #fdf2f6;
  border: 1px solid #f0e0e6;
  border-radius: 12px;
  overflow: hidden;
  transition: border-color 0.3s ease, box-shadow 0.3s ease;
  width: 300px;
}

.search-wrap:focus-within {
  border-color: #667eea;
  box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.15);
}

.search-input {
  flex: 1;
  padding: 12px 16px;
  border: none;
  background: transparent;
  color: #333;
  font-size: 14px;
  outline: none;
}

.search-input::placeholder {
  color: #bbaab2;
}

.search-btn {
  background: transparent;
  border: none;
  padding: 0 16px;
  color: #bbaab2;
  cursor: pointer;
  transition: color 0.2s ease;
  font-size: 15px;
}

.search-btn:hover {
  color: #667eea;
}

/* ---- Content Section ---- */
.content-section {
  padding: 32px 0 60px;
}

.content-layout {
  display: flex;
  gap: 32px;
  align-items: flex-start;
}

/* ---- Filters Sidebar ---- */
.filters-sidebar {
  width: 280px;
  flex-shrink: 0;
  position: sticky;
  top: 88px;
}

.filters-card {
  background: #ffffff;
  border: 1px solid #f0e0e6;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 2px 12px rgba(180, 120, 140, 0.08);
}

.filters-header {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 18px 20px;
  border-bottom: 1px solid #f0e0e6;
  color: #2c3e50;
  font-size: 15px;
  font-weight: 600;
}

.filters-header i {
  color: #667eea;
  font-size: 14px;
}

.filters-clear {
  margin-left: auto;
  background: #fdf2f6;
  border: none;
  width: 28px;
  height: 28px;
  border-radius: 8px;
  color: #8a7a82;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;
  font-size: 12px;
}

.filters-clear:hover {
  background: #fce4ec;
  color: #e91e63;
}

.filters-body {
  padding: 20px;
}

.filter-group {
  margin-bottom: 22px;
}

.filter-group:last-of-type {
  margin-bottom: 20px;
}

.filter-label {
  display: block;
  color: #555;
  font-size: 13px;
  font-weight: 500;
  margin-bottom: 8px;
}

.filter-price-value {
  color: #667eea;
  font-weight: 600;
}

/* Custom Select */
.filter-select-wrap {
  position: relative;
}

.filter-select {
  width: 100%;
  padding: 10px 36px 10px 14px;
  background: #fdf2f6;
  border: 1px solid #f0e0e6;
  border-radius: 10px;
  color: #555;
  font-size: 13.5px;
  outline: none;
  cursor: pointer;
  appearance: none;
  -webkit-appearance: none;
  transition: border-color 0.2s ease;
}

.filter-select:focus {
  border-color: #667eea;
}

.filter-select option {
  background: #ffffff;
  color: #555;
}

.select-arrow {
  position: absolute;
  right: 14px;
  top: 50%;
  transform: translateY(-50%);
  color: #bbaab2;
  font-size: 10px;
  pointer-events: none;
}

/* Price Range */
.price-range-wrap {
  padding-top: 4px;
}

.price-range {
  width: 100%;
  height: 4px;
  background: #f0e0e6;
  border-radius: 4px;
  outline: none;
  -webkit-appearance: none;
  appearance: none;
}

.price-range::-webkit-slider-thumb {
  -webkit-appearance: none;
  width: 18px;
  height: 18px;
  border-radius: 50%;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  cursor: pointer;
  box-shadow: 0 2px 8px rgba(102, 126, 234, 0.4);
  border: 2px solid #ffffff;
}

.price-range::-moz-range-thumb {
  width: 18px;
  height: 18px;
  border-radius: 50%;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  cursor: pointer;
  border: 2px solid #ffffff;
  box-shadow: 0 2px 8px rgba(102, 126, 234, 0.4);
}

.price-labels {
  display: flex;
  justify-content: space-between;
  color: #bbaab2;
  font-size: 12px;
  margin-top: 6px;
}

/* Reset button */
.filters-reset-btn {
  width: 100%;
  padding: 10px;
  background: #fdf2f6;
  border: 1px solid #f0e0e6;
  border-radius: 10px;
  color: #6b6b80;
  font-size: 13px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.25s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
}

.filters-reset-btn:hover {
  background: #fce4ec;
  color: #2c3e50;
  border-color: #e0c0cc;
}

/* ---- Products Main ---- */
.products-main {
  flex: 1;
  min-width: 0;
}

/* State Messages */
.state-message {
  text-align: center;
  padding: 80px 20px;
}

.state-icon {
  font-size: 48px;
  color: #dcc8d0;
  margin-bottom: 16px;
}

.state-title {
  font-size: 20px;
  font-weight: 600;
  color: #2c3e50;
  margin: 0 0 8px;
}

.state-text {
  color: #8a7a82;
  font-size: 14px;
  margin: 0;
}

/* ---- Products Grid ---- */
.products-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
  gap: 24px;
}

/* Product Card */
.product-card {
  background: #ffffff;
  border: 1px solid #f0e0e6;
  border-radius: 16px;
  overflow: hidden;
  transition: all 0.35s ease;
  box-shadow: 0 2px 12px rgba(180, 120, 140, 0.08);
}

.product-card:hover {
  transform: translateY(-6px);
  border-color: #d0b8c4;
  box-shadow: 0 12px 32px rgba(180, 120, 140, 0.15);
}

/* Image */
.product-image-wrap {
  position: relative;
  overflow: hidden;
  aspect-ratio: 1;
  background: #fdf2f6;
}

.product-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.6s ease;
}

.product-card:hover .product-image {
  transform: scale(1.08);
}

/* Badge */
.product-badge {
  position: absolute;
  top: 12px;
  right: 12px;
  z-index: 2;
}

.badge-soldout {
  background: rgba(244, 67, 54, 0.9);
  color: #ffffff;
  font-size: 11px;
  font-weight: 600;
  padding: 4px 10px;
  border-radius: 50px;
  letter-spacing: 0.3px;
}

/* Action Buttons Overlay */
.product-actions {
  position: absolute;
  top: 12px;
  left: 12px;
  display: flex;
  flex-direction: column;
  gap: 6px;
  opacity: 0;
  transform: translateX(-10px);
  transition: all 0.3s ease;
  z-index: 2;
}

.product-card:hover .product-actions {
  opacity: 1;
  transform: translateX(0);
}

.action-btn {
  width: 36px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(8px);
  border: 1px solid #f0e0e6;
  border-radius: 10px;
  color: #6b6b80;
  text-decoration: none;
  cursor: pointer;
  transition: all 0.25s ease;
  font-size: 14px;
  box-shadow: 0 2px 8px rgba(180, 120, 140, 0.1);
}

.action-btn:hover {
  color: #2c3e50;
  background: #ffffff;
}

.action-cart:hover {
  border-color: #667eea;
  color: #667eea;
}

.action-view:hover {
  border-color: #764ba2;
  color: #764ba2;
}

.action-btn:disabled {
  opacity: 0.4;
  cursor: not-allowed;
}

/* Product Info */
.product-info {
  padding: 16px 18px 18px;
}

.product-category {
  display: inline-block;
  font-size: 11px;
  font-weight: 500;
  color: #667eea;
  text-transform: uppercase;
  letter-spacing: 0.8px;
  margin-bottom: 6px;
}

.product-name {
  font-size: 16px;
  font-weight: 600;
  margin: 0 0 6px;
  line-height: 1.4;
}

.product-name a {
  color: #2c3e50;
  text-decoration: none;
  transition: color 0.2s ease;
}

.product-name a:hover {
  color: #667eea;
}

.product-desc {
  color: #8a7a82;
  font-size: 13px;
  line-height: 1.5;
  margin: 0 0 14px;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.product-footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-top: 14px;
  border-top: 1px solid #f0e0e6;
}

.product-price {
  font-size: 20px;
  font-weight: 700;
  color: #2c3e50;
  letter-spacing: -0.3px;
}

.product-price::before {
  content: '$';
  font-weight: 500;
  color: #667eea;
  margin-right: 1px;
}

.add-cart-btn {
  width: 36px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border: none;
  border-radius: 10px;
  color: #ffffff;
  cursor: pointer;
  transition: all 0.25s ease;
  font-size: 14px;
}

.add-cart-btn:hover:not(:disabled) {
  transform: scale(1.1);
  box-shadow: 0 4px 16px rgba(102, 126, 234, 0.4);
}

.add-cart-btn:disabled {
  opacity: 0.4;
  cursor: not-allowed;
}

/* ---- Pagination ---- */
.pagination-nav {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  margin-top: 48px;
}

.page-btn {
  width: 42px;
  height: 42px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #ffffff;
  border: 1px solid #f0e0e6;
  border-radius: 12px;
  color: #8a7a82;
  cursor: pointer;
  transition: all 0.25s ease;
  font-size: 14px;
}

.page-btn:hover:not(:disabled) {
  background: #fdf2f6;
  color: #2c3e50;
  border-color: #d0b8c4;
}

.page-btn:disabled {
  opacity: 0.3;
  cursor: not-allowed;
}

.page-numbers {
  display: flex;
  gap: 6px;
}

.page-num {
  min-width: 38px;
  height: 38px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: transparent;
  border: none;
  border-radius: 10px;
  color: #8a7a82;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  padding: 0 8px;
}

.page-num:hover {
  background: #fdf2f6;
  color: #2c3e50;
}

.page-num.active {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: #ffffff;
  box-shadow: 0 4px 12px rgba(102, 126, 234, 0.3);
}

/* ============================================
   RESPONSIVE
   ============================================ */

@media (max-width: 992px) {
  .content-layout {
    flex-direction: column;
  }

  .filters-sidebar {
    width: 100%;
    position: static;
  }

  .page-header-content {
    flex-direction: column;
    text-align: center;
  }

  .search-wrap {
    width: 100%;
  }

  .products-grid {
    grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
  }
}

@media (max-width: 768px) {
  .page-header {
    padding: 24px 0;
  }

  .page-title {
    font-size: 24px;
  }

  .products-grid {
    grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
    gap: 16px;
  }

  .product-info {
    padding: 12px 14px 14px;
  }

  .product-name {
    font-size: 14px;
  }

  .product-price {
    font-size: 17px;
  }

  .product-actions {
    opacity: 1;
    transform: none;
  }
}

@media (max-width: 480px) {
  .page-header-content {
    padding: 0;
  }

  .products-grid {
    grid-template-columns: 1fr 1fr;
    gap: 12px;
  }

  .pagination-nav {
    gap: 8px;
  }

  .page-num {
    min-width: 34px;
    height: 34px;
    font-size: 13px;
  }
}
</style>