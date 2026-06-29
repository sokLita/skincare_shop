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
          <article
            v-for="item in wishlistCards"
            :key="item.productId"
            class="wishlist-card"
          >
            <template v-if="item.product">
              <div class="product-image-wrap">
                <router-link :to="productLink(item.product)" class="product-image-link">
                  <img
                    :src="productImageSrc(item.product)"
                    :alt="item.product.name"
                    class="product-image"
                    @error="setImageFallback($event, item.product.name)"
                  />
                </router-link>
                <button
                  class="favorite-float-btn active"
                  @click="removeFromWishlist(item.productId)"
                  :title="t('wishlist.remove')"
                  :aria-label="t('wishlist.remove')"
                >
                  <i class="fas fa-heart"></i>
                </button>
              </div>

              <div class="product-info">
                <span class="product-category">{{ item.product.category?.name || t('wishlist.skincare') }}</span>
                <h2 class="product-name">
                  <router-link :to="productLink(item.product)">{{ item.product.name }}</router-link>
                </h2>
                <p class="product-desc">{{ item.product.description || t('wishlist.skincareFavorite') }}</p>

                <div class="product-footer">
                  <span class="product-price">{{ formatPrice(item.product.price) }}</span>
                </div>

                <div class="product-card-buttons">
                  <button
                    class="wishlist-action-btn wishlist-cart-btn"
                    @click="addToCart(item.product)"
                    :disabled="item.product.stock === 0"
                  >
                    <i class="fas fa-shopping-bag"></i>
                    <span>{{ item.product.stock === 0 ? t('wishlist.out') : t('wishlist.cart') }}</span>
                  </button>
                  <button
                    class="wishlist-action-btn wishlist-saved-btn active"
                    @click="removeFromWishlist(item.productId)"
                  >
                    <i class="fas fa-heart"></i>
                    <span>{{ t('wishlist.saved') }}</span>
                  </button>
                </div>
              </div>
            </template>

            <template v-else>
              <div class="product-image-wrap">
                <img
                  :src="placeholderImage(t('products.skincare'))"
                  :alt="t('wishlist.productUnavailable')"
                  class="product-image"
                />
                <button
                  class="favorite-float-btn active"
                  @click="removeFromWishlist(item.productId)"
                  :title="t('wishlist.remove')"
                  :aria-label="t('wishlist.remove')"
                >
                  <i class="fas fa-heart"></i>
                </button>
              </div>

              <div class="product-info">
                <span class="product-category">{{ t('wishlist.skincare') }}</span>
                <h2 class="product-name">{{ t('wishlist.loadingProduct') }}</h2>
                <p class="product-desc">{{ t('wishlist.loadError') }}</p>

                <div class="product-footer">
                  <span class="product-price">0.00</span>
                </div>

                <div class="product-card-buttons">
                  <button class="wishlist-action-btn wishlist-cart-btn" disabled>
                    <i class="fas fa-shopping-bag"></i>
                    <span>{{ t('wishlist.cart') }}</span>
                  </button>
                  <button
                    class="wishlist-action-btn wishlist-saved-btn active"
                    @click="removeFromWishlist(item.productId)"
                  >
                    <i class="fas fa-heart"></i>
                    <span>{{ t('wishlist.saved') }}</span>
                  </button>
                </div>
              </div>
            </template>
          </article>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import axios from 'axios'
import { useCartStore } from '../stores/cart'
import { useWishlistStore } from '../stores/wishlist'
import { useTranslation } from '../composables/useTranslation'

export default {
  name: 'Wishlist',
  data() {
    return {
      API_URL: import.meta.env.VITE_API_URL || 'http://localhost:8000/api',
      isLoading: true,
      enrichingProducts: false
    }
  },
  computed: {
    assetBaseUrl() {
      return this.API_URL.replace(/\/api\/?$/, '')
    },

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
    const cartStore = useCartStore()
    const wishlistStore = useWishlistStore()
    const { t } = useTranslation()
    return { cartStore, wishlistStore, t }
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
    },

    productLink(product) {
      if (!product) return '/products'
      return `/products/${product.slug || product.id}`
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
    },

    formatPrice(price) {
      return Number(price || 0).toFixed(2)
    },

    async addToCart(product) {
      const result = await this.cartStore.addToCart(product)
      if (!result.success) {
        console.error(result.error || 'Failed to add to cart')
        return
      }
      this.$router.push('/cart')
    },

    async removeFromWishlist(productId) {
      const result = await this.wishlistStore.removeFromWishlist(productId)
      if (!result.success) {
        console.error(result.error || 'Failed to remove from wishlist')
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
  grid-template-columns: repeat(auto-fill, minmax(172px, 172px));
  gap: 24px;
  justify-content: start;
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
  grid-template-columns: repeat(auto-fill, minmax(172px, 172px));
  gap: 24px;
  justify-content: start;
}

.wishlist-card {
  background: #ffffff;
  border: 1px solid #f0e0e6;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 12px rgba(180, 120, 140, 0.08);
  transition: transform 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease;
}

.wishlist-card:hover {
  transform: translateY(-4px);
  border-color: #d0b8c4;
  box-shadow: 0 10px 26px rgba(180, 120, 140, 0.14);
}

.product-image-wrap {
  position: relative;
  aspect-ratio: 1;
  overflow: hidden;
  background: #fdf2f6;
}

.product-image-link {
  display: block;
  width: 100%;
  height: 100%;
}

.product-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
  transition: transform 0.5s ease;
}

.wishlist-card:hover .product-image {
  transform: scale(1.06);
}

.favorite-float-btn {
  position: absolute;
  top: 10px;
  right: 10px;
  width: 28px;
  height: 28px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid #d6336c;
  border-radius: 8px;
  background: #d6336c;
  color: #ffffff;
  cursor: pointer;
  font-size: 12px;
  transition: transform 0.2s ease, background-color 0.2s ease;
}

.favorite-float-btn:hover {
  transform: scale(1.06);
  background: #b42354;
}

.product-info {
  padding: 12px 12px 14px;
}

.product-category {
  display: inline-block;
  margin-bottom: 5px;
  color: #667eea;
  font-size: 10px;
  font-weight: 700;
  letter-spacing: 0;
  text-transform: uppercase;
}

.product-name {
  margin: 0 0 4px;
  min-height: 20px;
  font-size: 14px;
  font-weight: 700;
  line-height: 1.35;
}

.product-name a {
  color: #2c3e50;
  text-decoration: none;
}

.product-name a:hover {
  color: #667eea;
}

.product-desc {
  margin: 0 0 12px;
  min-height: 18px;
  color: #8a7a82;
  font-size: 11px;
  line-height: 1.4;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.product-footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-top: 10px;
  border-top: 1px solid #f0e0e6;
}

.product-price {
  color: #2c3e50;
  font-size: 16px;
  font-weight: 800;
  letter-spacing: 0;
}

.product-price::before {
  content: '$';
  margin-right: 1px;
  color: #667eea;
  font-weight: 600;
}

.product-card-buttons {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 8px;
  margin-top: 12px;
}

.wishlist-action-btn {
  appearance: none;
  -webkit-appearance: none;
  min-width: 0;
  min-height: 34px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 5px;
  padding: 0 8px;
  border-radius: 8px;
  border: 1px solid transparent;
  cursor: pointer;
  font-size: 11px;
  font-weight: 700;
  line-height: 1;
  text-decoration: none;
  white-space: nowrap;
  transition: transform 0.2s ease, box-shadow 0.2s ease, background-color 0.2s ease;
}

.wishlist-cart-btn {
  background: linear-gradient(135deg, #667eea, #764ba2);
  color: #ffffff;
  box-shadow: 0 4px 12px rgba(102, 126, 234, 0.24);
}

.wishlist-saved-btn {
  background: #fff7fa;
  border-color: #d6336c;
  color: #b42354;
}

.wishlist-action-btn:hover:not(:disabled) {
  transform: translateY(-2px);
}

.wishlist-cart-btn:hover:not(:disabled) {
  box-shadow: 0 4px 14px rgba(102, 126, 234, 0.35);
}

.wishlist-saved-btn:hover {
  background: #fce4ec;
}

.wishlist-action-btn:disabled {
  opacity: 0.45;
  cursor: not-allowed;
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

  .product-card-buttons {
    grid-template-columns: 1fr 1fr;
  }
}

@media (max-width: 380px) {
  .wishlist-grid {
    grid-template-columns: 1fr;
  }
}
</style>