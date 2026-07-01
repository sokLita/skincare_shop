<template>
  <div class="wishlist-page">
    <section class="wishlist-header">
      <div class="container">
        <div class="wishlist-header-content">
          <div>
            <p class="eyebrow">{{ t('wishlist.eyebrow') }}</p>
            <h1 class="page-title">{{ t('wishlist.title') }}</h1>
            <p class="page-subtitle">
              {{ t('wishlist.subtitle', { count: String(wishlistStore.count) }) }}
            </p>
          </div>
          <router-link to="/products" class="header-action">
            <i class="fas fa-shopping-bag"></i>
            {{ t('wishlist.browseProducts') }}
          </router-link>
        </div>
      </div>
    </section>

    <section class="wishlist-content">
      <div class="container">
        <!-- Loading skeleton -->
        <div v-if="isLoading" class="wishlist-loading">
          <div class="skeleton-grid-wishlist">
            <div v-for="i in 4" :key="i" class="skeleton-wishlist-card">
              <div class="skeleton-wishlist-img"></div>
              <div class="skeleton-wishlist-info">
                <div class="skeleton-wishlist-line w-40"></div>
                <div class="skeleton-wishlist-line w-90"></div>
                <div class="skeleton-wishlist-line w-60"></div>
              </div>
            </div>
          </div>
        </div>

        <!-- Spinner while fetching/enriching in background -->
        <div v-else-if="wishlistStore.loading || enrichingProducts" class="state-card">
          <div class="spinner-border text-primary"></div>
        </div>

        <div v-else-if="wishlistStore.items.length === 0" class="empty-state">
          <div class="empty-icon">
            <i class="fas fa-heart"></i>
          </div>
          <h3>{{ t('wishlist.emptyTitle') }}</h3>
          <p>{{ t('wishlist.emptyDesc') }}</p>
          <router-link to="/products" class="primary-btn">
            <i class="fas fa-arrow-left"></i>
            {{ t('wishlist.browseProducts') }}
          </router-link>
        </div>

        <div v-else class="wishlist-grid">
          <template v-for="item in wishlistCards" :key="item.productId">
            <ProductCard
              v-if="item.product"
              :product="item.product"
              wishlistMode
            />
          </template>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import axios from 'axios'
import { useWishlistStore } from '../stores/wishlist'
import { useTranslation } from '../composables/useTranslation'
import ProductCard from '../components/products/ProductCard.vue'

export default {
  name: 'Wishlist',
  components: { ProductCard },
  data() {
    return {
      isLoading: true,
      enrichingProducts: false
    }
  },
  computed: {
    wishlistCards() {
      return this.wishlistStore.items
        .map((item) => {
          const product = item.product || null
          const productId = Number(item.product_id ?? product?.id ?? item.id)
          return {
            ...item,
            product,
            productId
          }
        })
        .filter((item) => item.productId)
    }
  },
  setup() {
    const wishlistStore = useWishlistStore()
    const { t } = useTranslation()
    return { wishlistStore, t }
  },
  async mounted() {
    this.wishlistStore.hydrateFromLocalStorage()
    this.isLoading = false
    await this.wishlistStore.fetchWishlist()
    await this.enrichWishlistProducts()
  },
  methods: {
    async enrichWishlistProducts() {
      const missingIds = this.wishlistCards
        .filter((item) => !item.product)
        .map((item) => item.productId)

      if (missingIds.length === 0) return

      this.enrichingProducts = true

      try {
        const remaining = new Set(missingIds)
        const foundProducts = new Map()
        let page = 1
        let lastPage = 1

        do {
          const response = await axios.get('/products', { params: { page } })
          const products = Array.isArray(response.data?.data) ? response.data.data : []

          products.forEach((product) => {
            const productId = Number(product.id)
            if (remaining.has(productId)) {
              foundProducts.set(productId, product)
              remaining.delete(productId)
            }
          })

          lastPage = Number(response.data?.last_page || page)
          page += 1
        } while (remaining.size > 0 && page <= lastPage)

        if (foundProducts.size > 0) {
          this.wishlistStore.items = this.wishlistStore.items.map((item) => {
            const productId = Number(item.product_id ?? item.product?.id ?? item.id)
            const product = foundProducts.get(productId)
            return product ? { ...item, product, product_id: productId } : item
          })
        }
      } catch (error) {
        console.error('Failed to enrich wishlist products:', error)
      } finally {
        this.enrichingProducts = false
      }
    }
  }
}
</script>

<style scoped>
.wishlist-page {
  min-height: 100vh;
  background: #fdf2f6;
  padding-bottom: 64px;
}

.wishlist-header {
  background: #ffffff;
  border-bottom: 1px solid #f0e0e6;
  padding: 36px 0 28px;
}

.wishlist-header-content {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 20px;
}

.eyebrow {
  margin: 0 0 6px;
  color: #667eea;
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0;
  text-transform: uppercase;
}

.page-title {
  margin: 0 0 6px;
  color: #2c3e50;
  font-size: 30px;
  font-weight: 750;
}

.page-subtitle {
  margin: 0;
  color: #8a7a82;
  font-size: 15px;
}

.header-action,
.primary-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  min-height: 42px;
  padding: 0 18px;
  border-radius: 8px;
  background: linear-gradient(135deg, #667eea, #764ba2);
  color: #ffffff;
  font-size: 14px;
  font-weight: 700;
  text-decoration: none;
  border: 0;
  box-shadow: 0 8px 20px rgba(102, 126, 234, 0.22);
}

.wishlist-content {
  padding-top: 32px;
}

.state-card,
.empty-state {
  min-height: 320px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 32px;
  background: #ffffff;
  border: 1px solid #f0e0e6;
  border-radius: 8px;
}

/* Wishlist Loading Skeleton */
.wishlist-loading {
  padding-top: 32px;
}

.skeleton-grid-wishlist {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
  gap: 24px;
}

.skeleton-wishlist-card {
  background: #ffffff;
  border: 1px solid #f0e0e6;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 12px rgba(180, 120, 140, 0.08);
}

.skeleton-wishlist-img {
  aspect-ratio: 1;
  background: linear-gradient(90deg, #f5e8ee 25%, #fce4ec 50%, #f5e8ee 75%);
  background-size: 200% 100%;
  animation: wishlistShimmer 1.5s ease-in-out infinite;
}

.skeleton-wishlist-info {
  padding: 12px 12px 14px;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.skeleton-wishlist-line {
  height: 14px;
  background: linear-gradient(90deg, #f5e8ee 25%, #fce4ec 50%, #f5e8ee 75%);
  background-size: 200% 100%;
  animation: wishlistShimmer 1.5s ease-in-out infinite;
  border-radius: 6px;
}

.skeleton-wishlist-line.w-40 { width: 40%; }
.skeleton-wishlist-line.w-60 { width: 60%; }
.skeleton-wishlist-line.w-90 { width: 90%; }

@keyframes wishlistShimmer {
  0% { background-position: 200% 0; }
  100% { background-position: -200% 0; }
}

@media (max-width: 768px) {
  .skeleton-grid-wishlist {
    grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
    gap: 14px;
  }
}

@media (max-width: 380px) {
  .skeleton-grid-wishlist {
    grid-template-columns: 1fr;
  }
}

.empty-icon {
  width: 76px;
  height: 76px;
  border-radius: 50%;
  background: #fce4ec;
  color: #d6336c;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 28px;
  margin-bottom: 18px;
}

.empty-state h3 {
  margin: 0 0 8px;
  color: #2c3e50;
  font-size: 22px;
}

.empty-state p {
  margin: 0 0 22px;
  color: #8a7a82;
}

.wishlist-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
  gap: 24px;
}

@media (max-width: 768px) {
  .wishlist-header-content {
    align-items: stretch;
    flex-direction: column;
  }

  .header-action {
    width: 100%;
  }

  .wishlist-grid {
    grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
    gap: 14px;
  }
}

@media (max-width: 380px) {
  .wishlist-grid {
    grid-template-columns: 1fr;
  }
}
</style>