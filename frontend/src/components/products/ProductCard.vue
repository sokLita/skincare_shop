<template>
  <div class="product-card" :class="{ 'product-card--wishlist': wishlistMode }">
    <!-- Image -->
    <div class="product-image-wrap">
      <router-link :to="`/products/${product.slug}`">
        <ProductImage
          :src="productImageSrc"
          :alt="product.name"
          class="product-image"
        />
      </router-link>

      <div class="product-badge" v-if="product.stock === 0">
        <span class="badge badge-soldout">{{ t('products.outOfStock') }}</span>
      </div>

      <button
        class="favorite-float-btn"
        :class="{ active: isFavorite }"
        @click="onToggleWishlist"
        :title="wishlistMode ? t('wishlist.remove') : (isFavorite ? t('products.savedToWishlist') : t('products.addToWishlist'))"
        :aria-label="wishlistMode ? t('wishlist.remove') : (isFavorite ? t('products.savedToWishlist') : t('products.addToWishlist'))"
      >
        <i class="fas fa-heart"></i>
      </button>
    </div>

    <!-- Info -->
    <div class="product-info">
      <span class="product-category">{{ product.category?.name || t('products.skincare') }}</span>
      <h3 class="product-name">
        <router-link :to="`/products/${product.slug}`">{{ product.name }}</router-link>
      </h3>
      <p class="product-desc">{{ product.description }}</p>

      <div class="product-rating">
        <StarRating
          :rating="Number(product.avg_rating) || 0"
          :count="Number(product.rating_count) || 0"
          :showCount="true"
        />
      </div>

      <div class="product-pricing">
        <span class="product-price">${{ Number(product.price).toFixed(2) }}</span>
        <span v-if="product.old_price" class="product-old-price">${{ Number(product.old_price).toFixed(2) }}</span>
      </div>

      <div class="product-card-buttons">
        <button
          class="card-action-btn cart-btn"
          @click="onAddToCart"
          :disabled="product.stock === 0"
        >
          <i class="fas fa-shopping-bag"></i>
          <span>{{ product.stock === 0 ? t('products.outOfStock') : t('products.addToCart') }}</span>
        </button>
        <button
          class="card-action-btn wishlist-btn"
          :class="{ active: isFavorite }"
          @click="onToggleWishlist"
        >
          <i class="fas fa-heart"></i>
          <span v-if="wishlistMode">{{ t('wishlist.saved') }}</span>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { useCartStore } from '../../stores/cart'
import { useAuthStore } from '../../stores/auth'
import { useWishlistStore } from '../../stores/wishlist'
import { useToast } from '../../composables/useToast'
import { useTranslation } from '../../composables/useTranslation'
import StarRating from '../ui/StarRating.vue'
import ProductImage from '../ui/ProductImage.vue'

export default {
  name: 'ProductCard',
  components: { StarRating, ProductImage },
  props: {
    product: {
      type: Object,
      required: true
    },
    wishlistMode: {
      type: Boolean,
      default: false
    }
  },
  setup() {
    const cartStore = useCartStore()
    const authStore = useAuthStore()
    const wishlistStore = useWishlistStore()
    const toast = useToast()
    const { t } = useTranslation()
    return { cartStore, authStore, wishlistStore, toast, t }
  },
  computed: {
    isFavorite() {
      if (this.wishlistMode) return true
      return this.wishlistStore.hasProduct(this.product.id)
    },
    assetBaseUrl() {
      const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:8000/api'
      return apiUrl.replace(/\/api\/?$/, '')
    },
    productImageSrc() {
      const product = this.product
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

      return ''
    }
  },
  methods: {
    requireAuth() {
      if (!this.authStore.isAuthenticated) {
        this.$router.push({ name: 'Login', query: { redirect: this.$route.fullPath } })
        return false
      }
      return true
    },

    onAddToCart() {
      if (!this.requireAuth()) return
      this.cartStore.addToCart(this.product.id, 1, this.product)
      this.toast.success(this.t('products.productAddedToCart'))
    },

    onToggleWishlist() {
      if (!this.requireAuth()) return

      const productId = this.product.id

      if (this.wishlistMode) {
        // In wishlist mode, clicking the heart always removes
        this.wishlistStore.removeFromWishlist(productId)
        this.toast.info(this.t('products.removedFromWishlist'))
        return
      }

      if (this.wishlistStore.hasProduct(productId)) {
        this.wishlistStore.removeFromWishlist(productId)
        this.toast.info(this.t('products.removedFromWishlist'))
      } else {
        this.wishlistStore.addToWishlist(productId)
        this.toast.success(this.t('products.addedToWishlist'))
      }
    }
  }
}
</script>

<style scoped>
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

/* ─── Image ─── */
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
  display: block;
}

.product-card:hover .product-image {
  transform: scale(1.08);
}

/* ─── Badge ─── */
.product-badge {
  position: absolute;
  top: 12px;
  left: 12px;
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

/* ─── Favorite Heart Overlay ─── */
.favorite-float-btn {
  position: absolute;
  top: 12px;
  right: 12px;
  width: 38px;
  height: 38px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(8px);
  border: 1px solid #f0e0e6;
  border-radius: 12px;
  color: #d6336c;
  cursor: pointer;
  transition: all 0.25s ease;
  font-size: 14px;
  box-shadow: 0 2px 8px rgba(180, 120, 140, 0.1);
  z-index: 2;
}

.favorite-float-btn:hover {
  background: #ffffff;
  border-color: #d6336c;
  transform: scale(1.06);
}

.favorite-float-btn.active {
  background: #d6336c;
  border-color: #d6336c;
  color: #ffffff;
}

/* ─── Product Info ─── */
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

.product-rating {
  margin-bottom: 14px;
}

/* ─── Pricing ─── */
.product-pricing {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 14px;
}

.product-price {
  font-size: 20px;
  font-weight: 700;
  color: #2c3e50;
  letter-spacing: -0.3px;
}

.product-old-price {
  font-size: 14px;
  color: #bbaab2;
  text-decoration: line-through;
}

/* ─── Buttons ─── */
.product-card-buttons {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 10px;
}

.card-action-btn {
  min-height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  border-radius: 10px;
  border: 1px solid transparent;
  cursor: pointer;
  transition: all 0.25s ease;
  font-size: 13px;
  font-weight: 600;
}

.cart-btn {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: #ffffff;
}

.cart-btn:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 4px 16px rgba(102, 126, 234, 0.4);
}

.wishlist-btn {
  background: #fff7fa;
  border-color: #f0d6e0;
  color: #d6336c;
}

.wishlist-btn:hover {
  background: #fce4ec;
  border-color: #e8b8ca;
  transform: translateY(-2px);
}

.wishlist-btn.active {
  background: #fce4ec;
  border-color: #d6336c;
  color: #b42354;
}

.card-action-btn:disabled {
  opacity: 0.4;
  cursor: not-allowed;
  transform: none;
}
</style>
