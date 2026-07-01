<template>
  <div class="products-page">
    <!-- Page Header -->
    <section class="page-header">
      <div class="container">
        <div class="page-header-content">
          <div class="page-header-text">
            <h1 class="page-title">{{ t('products.title') }}</h1>
            <p class="page-subtitle">{{ t('products.subtitle') }}</p>
          </div>
          <div class="page-header-search">
            <div class="search-wrap">
              <input
                type="text"
                class="search-input"
                :placeholder="t('products.searchPlaceholder')"
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
                <span>{{ t('products.filters') }}</span>
                <button class="filters-clear" @click="resetFilters" v-if="hasActiveFilters">
                  <i class="fas fa-times"></i>
                </button>
              </div>

              <div class="filters-body">
                <div class="filter-group">
                  <label class="filter-label">{{ t('products.category') }}</label>
                  <div class="filter-select-wrap">
                    <select class="filter-select" v-model="filters.category_id" @change="applyFilters">
                      <option value="">{{ t('products.allCategories') }}</option>
                      <option v-for="category in categories" :key="category.id" :value="category.id">
                        {{ category.name }}
                      </option>
                    </select>
                    <i class="fas fa-chevron-down select-arrow"></i>
                  </div>
                </div>

                <div class="filter-group">
                  <label class="filter-label">
                    {{ t('products.maxPrice') }}: <span class="filter-price-value">${{ filters.max_price }}</span>
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
                  {{ t('products.resetFilters') }}
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
              <h3 class="state-title">{{ t('products.noProductsTitle') }}</h3>
              <p class="state-text">{{ t('products.noProductsDesc') }}</p>
            </div>

            <!-- Grid -->
            <div v-else class="products-grid">
              <ProductCard
                v-for="product in products"
                :key="product.id"
                :product="product"
              />
            </div>

            <!-- Pagination -->
            <nav v-if="pagination.total > 1" class="pagination-nav">
              <button
                class="page-btn page-prev"
                @click="changePage(pagination.prev)"
                :disabled="!pagination.prev"
                :title="!pagination.prev ? t('products.noPreviousPage') : t('products.previousPage')"
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
                :title="!pagination.next ? t('products.noNextPage') : t('products.nextPage')"
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
import { useTranslation } from '../composables/useTranslation'
import ProductCard from '../components/products/ProductCard.vue'

export default {
  name: 'Products',
  components: { ProductCard },
  data() {
    return {
      products: [],
      categories: [],
      searchQuery: '',
      filters: {
        category_id: '',
        max_price: 200
      },
      pagination: {
        current: 1,
        total: 0,
        prev: null,
        next: null
      },
    }
  },
  computed: {
    hasActiveFilters() {
      return this.filters.category_id !== '' || this.filters.max_price < 200 || this.searchQuery !== ''
    }
  },
  setup() {
    const { t } = useTranslation()
    return { t }
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
        const params = this.productQueryParams(page)
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

    productQueryParams(page) {
      const params = { page }
      const search = this.searchQuery.trim()

      if (search) {
        params.search = search
      }

      if (this.filters.category_id) {
        params.category_id = this.filters.category_id
      }

      if (this.filters.max_price < 200) {
        params.max_price = this.filters.max_price
      }

      return params
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
      this.filters.category_id = ''
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
}

@media (max-width: 768px) {
  .page-header {
    padding: 28px 0 24px;
  }

  .page-title {
    font-size: 24px;
  }

  .products-grid {
    grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
    gap: 16px;
  }



  .filters-body {
    padding: 16px;
  }
}

@media (max-width: 480px) {
  .products-grid {
    grid-template-columns: 1fr;
  }
}
</style>