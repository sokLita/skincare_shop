<template>
  <div class="cart-page">
    <!-- Page Header -->
    <div class="page-header">
      <div class="container">
        <h1 class="page-title">{{ t('cart.title') }}</h1>
        <p class="page-subtitle">{{ t('cart.subtitle', { count: String(cartStore.count) }) }}</p>
      </div>
    </div>

    <div class="container">
      <!-- Loading Skeleton (shown on first render before hydration) -->
      <div v-if="isLoading" class="loading-state">
        <div class="skeleton-layout">
          <div class="skeleton-cart-items">
            <div class="skeleton-card-header"></div>
            <div v-for="i in 3" :key="i" class="skeleton-item">
              <div class="skeleton-row">
                <div class="skeleton-image"></div>
                <div class="skeleton-details">
                  <div class="skeleton-line w-60"></div>
                  <div class="skeleton-line w-30"></div>
                </div>
                <div class="skeleton-line w-20"></div>
                <div class="skeleton-qty">
                  <div class="skeleton-line w-40"></div>
                </div>
                <div class="skeleton-line w-20"></div>
                <div class="skeleton-line w-15"></div>
              </div>
            </div>
          </div>
          <div class="skeleton-summary">
            <div class="skeleton-line w-70 h5"></div>
            <div class="skeleton-line"></div>
            <div class="skeleton-line w-50"></div>
            <div class="skeleton-line"></div>
            <div class="skeleton-line w-60"></div>
            <div class="skeleton-divider"></div>
            <div class="skeleton-line w-80 h4"></div>
            <div class="skeleton-btn"></div>
          </div>
        </div>
      </div>

      <!-- Empty State (only after hydration confirms cart is empty) -->
      <div v-else-if="cartStore.items.length === 0" class="empty-state">
        <div class="empty-icon">
          <i class="fas fa-shopping-bag"></i>
        </div>
        <h3>{{ t('cart.emptyTitle') }}</h3>
        <p>{{ t('cart.emptyDesc') }}</p>
        <router-link to="/products" class="btn-primary-grad">
          <i class="fas fa-arrow-left"></i> {{ t('cart.continueShopping') }}
        </router-link>
      </div>

      <!-- Cart Content (only after hydration confirms items exist) -->
      <div v-else class="cart-layout">
        <div class="cart-items-section">
          <!-- Cart Header -->
          <div class="cart-header">
            <span class="cart-header-label">{{ t('cart.product') }}</span>
            <span class="cart-header-label">{{ t('cart.price') }}</span>
            <span class="cart-header-label">{{ t('cart.quantity') }}</span>
            <span class="cart-header-label cart-header-total">{{ t('cart.total') }}</span>
            <span class="cart-header-action"></span>
          </div>

          <!-- Cart Items -->
          <div v-for="(item, index) in cartStore.items" :key="item.id" class="cart-item-card">
            <div class="cart-item-inner">
              <!-- Product Image & Info -->
              <div class="cart-item-product">
                <div class="cart-item-image-wrap">
                  <img :src="productImageSrc(item.product)" 
                       :alt="item.product?.name || t('cart.productUnavailable')"
                       class="cart-item-image"
                       @error="onImageError">
                </div>
                <div class="cart-item-info">
                  <h6 class="cart-item-name">{{ item.product?.name || t('cart.loadingProduct') }}</h6>
                  <span class="cart-item-category" v-if="item.product?.category">
                    {{ categoryName(item.product.category) }}
                  </span>
                </div>
              </div>

              <!-- Price -->
              <div class="cart-item-price">
                <span class="current-price">${{ productPrice(item).toFixed(2) }}</span>
              </div>

              <!-- Quantity Controls -->
              <div class="cart-item-qty">
                <div class="qty-control">
                  <button class="qty-btn" @click="updateQuantity(item.id, item.quantity - 1)">
                    <i class="fas fa-minus"></i>
                  </button>
                  <input type="number" class="qty-input" 
                         v-model="item.quantity" min="1"
                         @change="updateQuantity(item.id, item.quantity)">
                  <button class="qty-btn" @click="updateQuantity(item.id, item.quantity + 1)">
                    <i class="fas fa-plus"></i>
                  </button>
                </div>
              </div>

              <!-- Subtotal -->
              <div class="cart-item-subtotal">
                <span class="subtotal-value">${{ (item.quantity * productPrice(item)).toFixed(2) }}</span>
              </div>

              <!-- Remove -->
              <div class="cart-item-remove">
                <button class="remove-btn" @click="removeItem(item.id)" :title="t('cart.removeItem')">
                  <i class="fas fa-trash-alt"></i>
                </button>
              </div>
            </div>

            <!-- Mobile Summary (visible on small screens) -->
            <div class="cart-item-mobile-summary">
              <span class="cart-mobile-price">${{ productPrice(item).toFixed(2) }} {{ t('cart.each') }}</span>
              <span class="cart-mobile-subtotal">{{ t('cart.mobileSubtotal') }}: ${{ (item.quantity * productPrice(item)).toFixed(2) }}</span>
            </div>
          </div>

          <!-- Continue Shopping Link -->
          <div class="cart-footer-links">
            <router-link to="/products" class="continue-link">
              <i class="fas fa-arrow-left"></i> {{ t('cart.continueShopping') }}
            </router-link>
          </div>
        </div>

        <!-- Order Summary Sidebar -->
        <div class="cart-summary-section">
          <div class="summary-card">
            <h5 class="summary-title">{{ t('cart.orderSummary') }}</h5>

            <div class="summary-rows">
              <div class="summary-row">
                <span class="summary-label">{{ t('cart.items') }}</span>
                <span class="summary-value">{{ cartStore.count }}</span>
              </div>
              <div class="summary-row">
                <span class="summary-label">{{ t('cart.subtotal') }}</span>
                <span class="summary-value">${{ cartStore.total.toFixed(2) }}</span>
              </div>
              <div class="summary-row">
                <span class="summary-label">{{ t('cart.shipping') }}</span>
                <span class="summary-value summary-free">{{ t('cart.free') }}</span>
              </div>
            </div>

            <div class="summary-divider"></div>

            <div class="summary-total">
              <span>{{ t('cart.total') }}</span>
              <span class="total-amount">${{ cartStore.total.toFixed(2) }}</span>
            </div>

            <button class="checkout-btn" @click="proceedToCheckout">
              {{ t('cart.proceedToCheckout') }}
              <i class="fas fa-arrow-right"></i>
            </button>

            <!-- Accepted Payments -->
            <div class="payment-icons">
              <i class="fab fa-cc-visa"></i>
              <i class="fab fa-cc-mastercard"></i>
              <i class="fab fa-cc-paypal"></i>
              <i class="fab fa-cc-amex"></i>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { useCartStore } from '../stores/cart'
import { useTranslation } from '../composables/useTranslation'

export default {
  name: 'Cart',
  setup() {
    const cartStore = useCartStore()
    const { t } = useTranslation()
    return { cartStore, t }
  },
  data() {
    return {
      API_URL: import.meta.env.VITE_API_URL || 'http://localhost:8000',
      isLoading: true
    }
  },
  mounted() {
    this.cartStore.hydrateFromLocalStorage()
    this.isLoading = false
    this.cartStore.fetchCart()
  },
  methods: {
    productPrice(item) {
      return Number(item.product?.price || 0)
    },

    categoryName(category) {
      return typeof category === 'string' ? category : category?.name
    },

    productImageSrc(product) {
      if (!product) return this.placeholderImage()

      if (product.image_url) {
        return product.image_url
      }

      if (product.image) {
        if (/^(https?:)?\/\//.test(product.image) || product.image.startsWith('data:')) {
          return product.image
        }

        const imagePath = product.image.startsWith('/') ? product.image : `/storage/${product.image}`
        return `${this.API_URL}${imagePath}`
      }

      return this.placeholderImage()
    },

    placeholderImage() {
      return 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="80" height="80" viewBox="0 0 80 80"%3E%3Crect fill="%23fdf2f6" width="80" height="80"/%3E%3Ccircle cx="40" cy="31" r="13" fill="%23f0e0e6"/%3E%3Cpath d="M21 63c4-16 16-25 19-25s15 9 19 25" fill="%23e7d3dc"/%3E%3C/svg%3E'
    },

    onImageError(e) {
      e.target.src = 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="80" height="80" viewBox="0 0 80 80"><rect fill="%23fdf2f6" width="80" height="80"/><text x="40" y="45" text-anchor="middle" font-size="28" fill="%23dcc8d0">💄</text></svg>'
    },
    async updateQuantity(itemId, quantity) {
      if (quantity < 1) {
        await this.cartStore.removeFromCart(itemId)
        return
      }
      await this.cartStore.updateQuantity(itemId, quantity)
    },
    
    async removeItem(itemId) {
      await this.cartStore.removeFromCart(itemId)
    },
    
    proceedToCheckout() {
      this.$router.push('/checkout')
    }
  }
}
</script>

<style scoped>
/* ========== CART PAGE ========== */
.cart-page {
  min-height: 100vh;
  background: #fdf2f6;
  padding-bottom: 60px;
}

/* Page Header */
.page-header {
  background: linear-gradient(135deg, #fce4ec 0%, #fdf2f6 50%, #ffffff 100%);
  padding: 40px 0 30px;
  text-align: center;
  position: relative;
}

.page-title {
  font-size: 2rem;
  font-weight: 700;
  color: #2c3e50;
  margin-bottom: 6px;
}

.page-subtitle {
  color: #8a7a82;
  font-size: 1rem;
  margin: 0;
}

/* ========== LOADING SKELETON ========== */
.loading-state {
  padding: 30px 0;
}

.skeleton-layout {
  display: grid;
  grid-template-columns: 1fr 380px;
  gap: 30px;
}

@media (max-width: 992px) {
  .skeleton-layout {
    grid-template-columns: 1fr;
  }
}

.skeleton-cart-items {
  background: #ffffff;
  border-radius: 16px;
  padding: 24px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.04);
  border: 1px solid #f0e0e6;
}

.skeleton-card-header {
  height: 20px;
  margin-bottom: 16px;
  background: linear-gradient(90deg, #f5e8ee 25%, #fce4ec 50%, #f5e8ee 75%);
  background-size: 200% 100%;
  animation: shimmer 1.5s ease-in-out infinite;
  border-radius: 6px;
  width: 100%;
}

.skeleton-item {
  padding: 20px 0;
  border-bottom: 1px solid #f5e8ee;
}
.skeleton-item:last-child {
  border-bottom: none;
}

.skeleton-row {
  display: grid;
  grid-template-columns: 80px 1fr 80px 120px 80px 36px;
  gap: 16px;
  align-items: center;
}

@media (max-width: 768px) {
  .skeleton-row {
    grid-template-columns: 1fr;
    gap: 12px;
  }
}

.skeleton-image {
  width: 80px;
  height: 80px;
  border-radius: 12px;
  background: linear-gradient(90deg, #f5e8ee 25%, #fce4ec 50%, #f5e8ee 75%);
  background-size: 200% 100%;
  animation: shimmer 1.5s ease-in-out infinite;
}

.skeleton-details {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.skeleton-qty {
  display: flex;
  justify-content: center;
}

.skeleton-line {
  height: 14px;
  background: linear-gradient(90deg, #f5e8ee 25%, #fce4ec 50%, #f5e8ee 75%);
  background-size: 200% 100%;
  animation: shimmer 1.5s ease-in-out infinite;
  border-radius: 6px;
}

.skeleton-line.h4 { height: 18px; }
.skeleton-line.h5 { height: 22px; }

.skeleton-line.w-15 { width: 30px; }
.skeleton-line.w-20 { width: 60px; }
.skeleton-line.w-30 { width: 90px; }
.skeleton-line.w-40 { width: 100px; }
.skeleton-line.w-50 { width: 50%; }
.skeleton-line.w-60 { width: 60%; }
.skeleton-line.w-70 { width: 70%; }
.skeleton-line.w-80 { width: 80%; }

.skeleton-divider {
  height: 1px;
  background: linear-gradient(90deg, #f0e0e6, #e0d0d8, #f0e0e6);
  margin: 18px 0;
}

.skeleton-summary {
  display: flex;
  flex-direction: column;
  gap: 14px;
  background: #ffffff;
  border-radius: 16px;
  padding: 28px 24px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.04);
  border: 1px solid #f0e0e6;
  position: sticky;
  top: 90px;
}

.skeleton-btn {
  height: 48px;
  background: linear-gradient(90deg, #f5e8ee 25%, #fce4ec 50%, #f5e8ee 75%);
  background-size: 200% 100%;
  animation: shimmer 1.5s ease-in-out infinite;
  border-radius: 12px;
  margin-top: 6px;
}

@keyframes shimmer {
  0% { background-position: 200% 0; }
  100% { background-position: -200% 0; }
}

/* Empty State */
.empty-state {
  text-align: center;
  padding: 80px 20px;
}

.empty-icon {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  background: #fce4ec;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 24px;
  font-size: 2.5rem;
  color: #e8a0b4;
}

.empty-state h3 {
  color: #2c3e50;
  font-weight: 600;
  margin-bottom: 8px;
}

.empty-state p {
  color: #8a7a82;
  margin-bottom: 24px;
}

.btn-primary-grad {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 12px 32px;
  background: linear-gradient(135deg, #667eea, #764ba2);
  color: #fff;
  border: none;
  border-radius: 50px;
  font-weight: 600;
  text-decoration: none;
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px rgba(102, 126, 234, 0.3);
}

.btn-primary-grad:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(102, 126, 234, 0.4);
  color: #fff;
}

/* Cart Layout */
.cart-layout {
  display: grid;
  grid-template-columns: 1fr 380px;
  gap: 30px;
  margin-top: 30px;
}

@media (max-width: 992px) {
  .cart-layout {
    grid-template-columns: 1fr;
  }
}

/* ========== CART ITEMS ========== */
.cart-items-section {
  background: #ffffff;
  border-radius: 16px;
  padding: 24px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.04);
  border: 1px solid #f0e0e6;
}

/* Cart Header Row (desktop) */
.cart-header {
  display: grid;
  grid-template-columns: 3fr 1fr 1.2fr 1fr 40px;
  gap: 16px;
  padding-bottom: 12px;
  border-bottom: 2px solid #f0e0e6;
  margin-bottom: 4px;
}

.cart-header-label {
  font-size: 0.8rem;
  font-weight: 600;
  color: #8a7a82;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.cart-header-total {
  text-align: right;
}

.cart-header-action {
  visibility: hidden;
}

@media (max-width: 768px) {
  .cart-header {
    display: none;
  }
}

/* Cart Item Card */
.cart-item-card {
  border-bottom: 1px solid #f5e8ee;
  padding: 20px 0;
}

.cart-item-card:last-child {
  border-bottom: none;
}

.cart-item-inner {
  display: grid;
  grid-template-columns: 3fr 1fr 1.2fr 1fr 40px;
  gap: 16px;
  align-items: center;
}

@media (max-width: 768px) {
  .cart-item-inner {
    grid-template-columns: 1fr;
    gap: 12px;
  }
}

/* Product Image & Info */
.cart-item-product {
  display: flex;
  align-items: center;
  gap: 16px;
}

.cart-item-image-wrap {
  width: 80px;
  height: 80px;
  border-radius: 12px;
  overflow: hidden;
  flex-shrink: 0;
  background: #fdf2f6;
  border: 2px solid #f0e0e6;
  transition: all 0.3s ease;
}

.cart-item-card:hover .cart-item-image-wrap {
  border-color: #dcc8d0;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.06);
}

.cart-item-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
  transition: transform 0.4s ease;
}

.cart-item-card:hover .cart-item-image {
  transform: scale(1.08);
}

.cart-item-info {
  min-width: 0;
}

.cart-item-name {
  font-size: 0.95rem;
  font-weight: 600;
  color: #2c3e50;
  margin: 0 0 4px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.cart-item-category {
  font-size: 0.78rem;
  color: #b0a0a8;
  text-transform: capitalize;
}

/* Price */
.cart-item-price {
  text-align: center;
}

.current-price {
  font-size: 0.95rem;
  font-weight: 600;
  color: #2c3e50;
}

@media (max-width: 768px) {
  .cart-item-price {
    display: none;
  }
}

/* Quantity Control */
.cart-item-qty {
  display: flex;
  justify-content: center;
}

.qty-control {
  display: inline-flex;
  align-items: center;
  border: 1.5px solid #f0e0e6;
  border-radius: 10px;
  overflow: hidden;
  background: #fdf2f6;
}

.qty-btn {
  width: 36px;
  height: 36px;
  border: none;
  background: transparent;
  color: #764ba2;
  font-size: 0.75rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background 0.2s;
}

.qty-btn:hover {
  background: #f0e0e6;
}

.qty-btn:active {
  background: #e0d0d8;
}

.qty-input {
  width: 44px;
  height: 36px;
  border: none;
  border-left: 1.5px solid #f0e0e6;
  border-right: 1.5px solid #f0e0e6;
  text-align: center;
  font-weight: 600;
  font-size: 0.9rem;
  color: #2c3e50;
  background: #ffffff;
  outline: none;
  -moz-appearance: textfield;
}

.qty-input::-webkit-outer-spin-button,
.qty-input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

/* Subtotal */
.cart-item-subtotal {
  text-align: right;
}

.subtotal-value {
  font-size: 1.05rem;
  font-weight: 700;
  color: #2c3e50;
}

@media (max-width: 768px) {
  .cart-item-subtotal {
    display: none;
  }
}

/* Remove Button */
.cart-item-remove {
  text-align: center;
}

.remove-btn {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  border: 1.5px solid #f0e0e6;
  background: #ffffff;
  color: #d0a0a8;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;
}

.remove-btn:hover {
  background: #fff0f0;
  border-color: #e8a0a8;
  color: #e86070;
}

/* Mobile Summary */
.cart-item-mobile-summary {
  display: none;
  margin-top: 8px;
  padding-top: 8px;
  border-top: 1px dashed #f0e0e6;
  justify-content: space-between;
  font-size: 0.85rem;
  color: #8a7a82;
}

.cart-mobile-subtotal {
  font-weight: 600;
  color: #2c3e50;
}

@media (max-width: 768px) {
  .cart-item-mobile-summary {
    display: flex;
  }
}

/* Continue Shopping */
.cart-footer-links {
  margin-top: 12px;
  padding-top: 16px;
  border-top: 1px solid #f5e8ee;
}

.continue-link {
  color: #8a7a82;
  text-decoration: none;
  font-size: 0.9rem;
  font-weight: 500;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  transition: color 0.2s;
}

.continue-link:hover {
  color: #764ba2;
}

/* ========== ORDER SUMMARY ========== */
.cart-summary-section {
  position: sticky;
  top: 90px;
  align-self: start;
}

.summary-card {
  background: #ffffff;
  border-radius: 16px;
  padding: 28px 24px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.04);
  border: 1px solid #f0e0e6;
}

.summary-title {
  font-size: 1.2rem;
  font-weight: 700;
  color: #2c3e50;
  margin-bottom: 20px;
}

.summary-rows {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.summary-row {
  display: flex;
  justify-content: space-between;
  font-size: 0.95rem;
}

.summary-label {
  color: #8a7a82;
}

.summary-value {
  font-weight: 600;
  color: #2c3e50;
}

.summary-free {
  color: #48b884;
  font-weight: 500;
}

.summary-divider {
  height: 1px;
  background: linear-gradient(90deg, #f0e0e6, #e0d0d8, #f0e0e6);
  margin: 18px 0;
}

.summary-total {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 1.1rem;
  font-weight: 600;
  color: #2c3e50;
  margin-bottom: 20px;
}

.total-amount {
  font-size: 1.3rem;
  font-weight: 700;
  background: linear-gradient(135deg, #667eea, #764ba2);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.checkout-btn {
  width: 100%;
  padding: 14px;
  background: linear-gradient(135deg, #667eea, #764ba2);
  color: #fff;
  border: none;
  border-radius: 12px;
  font-weight: 600;
  font-size: 1rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px rgba(102, 126, 234, 0.3);
}

.checkout-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(102, 126, 234, 0.4);
}

.checkout-btn:active {
  transform: translateY(0);
}

.payment-icons {
  display: flex;
  justify-content: center;
  gap: 16px;
  margin-top: 20px;
  font-size: 1.6rem;
  color: #d0c0c8;
}

.payment-icons i {
  transition: color 0.2s;
}

.payment-icons i:hover {
  color: #764ba2;
}

/* ========== RESPONSIVE ========== */
@media (max-width: 768px) {
  .page-header {
    padding: 24px 0 20px;
  }
  .page-title {
    font-size: 1.5rem;
  }
  .cart-items-section {
    padding: 16px;
    border-radius: 12px;
  }
  .cart-item-product {
    gap: 12px;
  }
  .cart-item-image-wrap {
    width: 64px;
    height: 64px;
  }
  .cart-item-name {
    font-size: 0.85rem;
  }
  .qty-control {
    width: 100%;
    justify-content: center;
  }
  .qty-btn {
    width: 40px;
    height: 40px;
  }
  .qty-input {
    flex: 1;
    max-width: 60px;
  }
  .cart-item-remove {
    position: absolute;
    top: 0;
    right: 0;
  }
  .cart-item-card {
    position: relative;
    padding: 16px 0;
  }
  .summary-card {
    padding: 20px 16px;
  }
}
</style>