<template>
  <div class="product-detail-page">
    <!-- Breadcrumb -->
    <div class="breadcrumb-bar">
      <div class="container">
        <div class="breadcrumb-links">
          <router-link to="/" class="breadcrumb-link">Home</router-link>
          <i class="fas fa-chevron-right breadcrumb-sep"></i>
          <router-link to="/products" class="breadcrumb-link">Products</router-link>
          <i class="fas fa-chevron-right breadcrumb-sep"></i>
          <span class="breadcrumb-current" v-if="product">{{ product.name }}</span>
        </div>
      </div>
    </div>

    <div class="container">

      <!-- Product Detail -->
      <div v-if="product" class="product-detail-layout">

        <!-- Image Column -->
        <div class="product-image-col">
          <div class="product-image-main">
            <img
              :src="`${API_URL}/storage/${product.image}`"
              :alt="product.name"
              class="product-image"
            />
            <div class="product-badge" v-if="product.stock === 0">
              <span class="badge-soldout">Out of Stock</span>
            </div>
          </div>
        </div>

        <!-- Info Column -->
        <div class="product-info-col">
          <div class="product-meta">
            <span class="product-category">{{ product.category?.name || 'Skincare' }}</span>
            <span class="product-skin-type" v-if="product.skin_type">
              <i class="fas fa-leaf"></i> {{ product.skin_type }}
            </span>
          </div>

          <h1 class="product-name">{{ product.name }}</h1>

          <div class="product-price-section">
            <span class="product-price">${{ product.price }}</span>
            <span class="product-stock" :class="{ 'stock-low': product.stock > 0 && product.stock <= 10 }">
              <i :class="product.stock > 0 ? 'fas fa-check-circle' : 'fas fa-times-circle'"></i>
              {{ product.stock > 0 ? (product.stock <= 10 ? 'Only ' + product.stock + ' left' : 'In Stock') : 'Out of Stock' }}
            </span>
          </div>

          <p class="product-description">{{ product.description }}</p>

          <div class="product-details-grid" v-if="product.ingredients || product.how_to_use">
            <div class="detail-block" v-if="product.ingredients">
              <h4 class="detail-title">
                <i class="fas fa-flask"></i> Ingredients
              </h4>
              <p class="detail-text">{{ product.ingredients }}</p>
            </div>

            <div class="detail-block" v-if="product.how_to_use">
              <h4 class="detail-title">
                <i class="fas fa-book-open"></i> How to Use
              </h4>
              <p class="detail-text">{{ product.how_to_use }}</p>
            </div>
          </div>

          <!-- Add to Cart -->
          <div class="add-to-cart-section">
            <div class="quantity-control">
              <button
                class="qty-btn"
                @click="decrementQty"
                :disabled="quantity <= 1"
                aria-label="Decrease quantity"
              >
                <i class="fas fa-minus"></i>
              </button>
              <input
                type="number"
                class="qty-input"
                v-model.number="quantity"
                min="1"
                :max="product.stock"
              />
              <button
                class="qty-btn"
                @click="incrementQty"
                :disabled="quantity >= product.stock"
                aria-label="Increase quantity"
              >
                <i class="fas fa-plus"></i>
              </button>
            </div>

            <button
              class="cart-btn"
              @click="addToCart"
              :disabled="product.stock === 0"
            >
              <i class="fas fa-shopping-bag"></i>
              <span>{{ product.stock === 0 ? 'Out of Stock' : 'Add to Cart' }}</span>
            </button>
          </div>
        </div>

      </div>

      <!-- Reviews Section -->
      <div v-if="product" class="reviews-section">
        <div class="reviews-header">
          <h2 class="reviews-title">
            <i class="fas fa-star"></i> Reviews
            <span class="reviews-count" v-if="product.reviews">({{ product.reviews.length }})</span>
          </h2>
        </div>

        <!-- Review List -->
        <div v-if="product.reviews && product.reviews.length > 0" class="reviews-list">
          <div v-for="review in product.reviews" :key="review.id" class="review-card">
            <div class="review-header">
              <div class="review-avatar">
                {{ (review.user?.name || 'A')[0] }}
              </div>
              <div class="review-user-info">
                <span class="review-user-name">{{ review.user?.name || 'Anonymous' }}</span>
                <div class="review-stars">
                  <i
                    v-for="i in 5"
                    :key="i"
                    class="fas fa-star"
                    :class="i <= review.rating ? 'star-filled' : 'star-empty'"
                  ></i>
                </div>
              </div>
              <span class="review-date">{{ new Date(review.created_at).toLocaleDateString() }}</span>
            </div>
            <p class="review-comment">{{ review.comment }}</p>
          </div>
        </div>

        <div v-else class="reviews-empty">
          <div class="empty-icon"><i class="fas fa-comment-dots"></i></div>
          <p class="empty-text">No reviews yet. Be the first to share your experience!</p>
        </div>

        <!-- Write Review -->
        <div v-if="authStore.isAuthenticated" class="review-form-card">
          <h3 class="review-form-title">Write a Review</h3>
          <form @submit.prevent="submitReview">
            <div class="review-form-rating">
              <label class="form-field-label">Rating</label>
              <div class="star-picker">
                <i
                  v-for="i in 5"
                  :key="i"
                  class="fas fa-star star-pick"
                  :class="{ picked: i <= reviewData.rating }"
                  @click="reviewData.rating = i"
                ></i>
              </div>
            </div>
            <div class="review-form-field">
              <label class="form-field-label">Your Review</label>
              <textarea
                v-model="reviewData.comment"
                class="form-textarea"
                rows="3"
                placeholder="Share your experience with this product..."
              ></textarea>
            </div>
            <button type="submit" class="submit-review-btn">
              <i class="fas fa-paper-plane"></i> Submit Review
            </button>
          </form>
        </div>
      </div>

    </div>
  </div>
</template>

<script>
import axios from 'axios'
import { useCartStore } from '../stores/cart'
import { useAuthStore } from '../stores/auth'

export default {
  name: 'ProductDetail',
  data() {
    return {
      product: null,
      quantity: 1,
      reviewData: {
        rating: 0,
        comment: ''
      },
      API_URL: import.meta.env.VITE_API_URL || 'http://localhost:8000'
    }
  },
  setup() {
    const cartStore = useCartStore()
    const authStore = useAuthStore()
    return { cartStore, authStore }
  },
  mounted() {
    this.fetchProduct()
  },
  methods: {
    async fetchProduct() {
      try {
        const response = await axios.get(`/products/${this.$route.params.id}`)
        this.product = response.data
      } catch (error) {
        console.error('Failed to fetch product:', error)
        this.$router.push('/products')
      }
    },

    incrementQty() {
      if (this.quantity < this.product.stock) {
        this.quantity++
      }
    },

    decrementQty() {
      if (this.quantity > 1) {
        this.quantity--
      }
    },

    async addToCart() {
      if (!this.authStore.isAuthenticated) {
        this.$router.push('/login')
        return
      }

      const result = await this.cartStore.addToCart(this.product.id, this.quantity)
      if (result.success) {
        alert('Product added to cart!')
      } else {
        alert(result.error || 'Failed to add to cart')
      }
    },

    async submitReview() {
      if (this.reviewData.rating === 0) {
        alert('Please select a rating')
        return
      }
      try {
        await axios.post('/reviews', {
          product_id: this.product.id,
          rating: this.reviewData.rating,
          comment: this.reviewData.comment
        })
        alert('Review submitted!')
        this.reviewData.rating = 0
        this.reviewData.comment = ''
        await this.fetchProduct()
      } catch (error) {
        alert('Failed to submit review')
      }
    }
  }
}
</script>

<style scoped>
/* ============================================
   PRODUCT DETAIL — Blush Pink Theme
   ============================================ */

.product-detail-page {
  background: #fdf2f6;
  min-height: 100vh;
  padding-bottom: 60px;
}

/* ---- Breadcrumb ---- */
.breadcrumb-bar {
  padding: 16px 0;
  background: #ffffff;
  border-bottom: 1px solid #f0e0e6;
  margin-bottom: 32px;
}

.breadcrumb-links {
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 13px;
}

.breadcrumb-link {
  color: #8a7a82;
  text-decoration: none;
  transition: color 0.2s ease;
}

.breadcrumb-link:hover {
  color: #667eea;
}

.breadcrumb-sep {
  color: #d0c0c8;
  font-size: 10px;
}

.breadcrumb-current {
  color: #555;
  font-weight: 500;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  max-width: 300px;
}

/* ---- Layout ---- */
.product-detail-layout {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 48px;
  align-items: start;
}

/* ---- Image Column ---- */
.product-image-col {
  position: sticky;
  top: 88px;
}

.product-image-main {
  position: relative;
  border-radius: 16px;
  overflow: hidden;
  background: #ffffff;
  border: 1px solid #f0e0e6;
  box-shadow: 0 2px 12px rgba(180, 120, 140, 0.08);
}

.product-image {
  width: 100%;
  display: block;
  object-fit: cover;
}

.product-badge {
  position: absolute;
  top: 16px;
  right: 16px;
}

.badge-soldout {
  background: rgba(244, 67, 54, 0.9);
  color: #ffffff;
  font-size: 12px;
  font-weight: 600;
  padding: 6px 14px;
  border-radius: 50px;
  letter-spacing: 0.3px;
}

/* ---- Info Column ---- */
.product-info-col {
  padding-top: 4px;
}

.product-meta {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 12px;
  flex-wrap: wrap;
}

.product-category {
  font-size: 12px;
  font-weight: 600;
  color: #667eea;
  text-transform: uppercase;
  letter-spacing: 0.8px;
  background: rgba(102, 126, 234, 0.1);
  padding: 4px 12px;
  border-radius: 50px;
}

.product-skin-type {
  font-size: 13px;
  color: #8a7a82;
  display: inline-flex;
  align-items: center;
  gap: 6px;
}

.product-skin-type i {
  color: #4caf50;
  font-size: 12px;
}

.product-name {
  font-size: 28px;
  font-weight: 700;
  color: #2c3e50;
  margin: 0 0 16px;
  line-height: 1.3;
  letter-spacing: -0.5px;
}

/* Price Section */
.product-price-section {
  display: flex;
  align-items: center;
  gap: 16px;
  margin-bottom: 20px;
  padding-bottom: 20px;
  border-bottom: 1px solid #f0e0e6;
}

.product-price {
  font-size: 32px;
  font-weight: 700;
  color: #2c3e50;
  letter-spacing: -0.5px;
  line-height: 1;
}

.product-stock {
  font-size: 13px;
  display: inline-flex;
  align-items: center;
  gap: 6px;
  color: #4caf50;
  padding: 6px 12px;
  background: rgba(76, 175, 80, 0.1);
  border-radius: 50px;
}

.product-stock.stock-low {
  color: #ff9800;
  background: rgba(255, 152, 0, 0.1);
}

.product-stock i {
  font-size: 14px;
}

.product-description {
  color: #6b6b80;
  font-size: 15px;
  line-height: 1.7;
  margin: 0 0 24px;
}

/* Detail Blocks */
.product-details-grid {
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin-bottom: 28px;
}

.detail-block {
  background: #ffffff;
  border: 1px solid #f0e0e6;
  border-radius: 12px;
  padding: 18px 20px;
}

.detail-title {
  font-size: 14px;
  font-weight: 600;
  color: #2c3e50;
  margin: 0 0 8px;
  display: flex;
  align-items: center;
  gap: 8px;
}

.detail-title i {
  color: #667eea;
  font-size: 13px;
}

.detail-text {
  color: #6b6b80;
  font-size: 14px;
  line-height: 1.6;
  margin: 0;
}

/* ---- Add to Cart ---- */
.add-to-cart-section {
  display: flex;
  gap: 14px;
  align-items: center;
  margin-bottom: 32px;
}

.quantity-control {
  display: flex;
  align-items: center;
  background: #ffffff;
  border: 1px solid #f0e0e6;
  border-radius: 12px;
  overflow: hidden;
  flex-shrink: 0;
}

.qty-btn {
  width: 42px;
  height: 42px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: transparent;
  border: none;
  color: #8a7a82;
  cursor: pointer;
  transition: all 0.2s ease;
  font-size: 12px;
}

.qty-btn:hover:not(:disabled) {
  background: #fdf2f6;
  color: #2c3e50;
}

.qty-btn:disabled {
  opacity: 0.3;
  cursor: not-allowed;
}

.qty-input {
  width: 50px;
  height: 42px;
  text-align: center;
  border: none;
  background: transparent;
  color: #2c3e50;
  font-size: 15px;
  font-weight: 600;
  outline: none;
  -moz-appearance: textfield;
}

.qty-input::-webkit-outer-spin-button,
.qty-input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

.cart-btn {
  flex: 1;
  height: 42px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border: none;
  border-radius: 12px;
  color: #ffffff;
  font-size: 15px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  padding: 0 24px;
}

.cart-btn:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 6px 24px rgba(102, 126, 234, 0.4);
}

.cart-btn:disabled {
  opacity: 0.4;
  cursor: not-allowed;
}

/* ---- Reviews Section ---- */
.reviews-section {
  margin-top: 60px;
  padding-top: 40px;
  border-top: 1px solid #f0e0e6;
}

.reviews-header {
  margin-bottom: 28px;
}

.reviews-title {
  font-size: 22px;
  font-weight: 700;
  color: #2c3e50;
  margin: 0;
  display: flex;
  align-items: center;
  gap: 10px;
}

.reviews-title i {
  color: #ff9800;
  font-size: 20px;
}

.reviews-count {
  color: #bbaab2;
  font-weight: 500;
  font-size: 18px;
}

/* Review Cards */
.reviews-list {
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin-bottom: 32px;
}

.review-card {
  background: #ffffff;
  border: 1px solid #f0e0e6;
  border-radius: 14px;
  padding: 20px 22px;
  transition: border-color 0.2s ease;
  box-shadow: 0 2px 8px rgba(180, 120, 140, 0.06);
}

.review-card:hover {
  border-color: #d0b8c4;
}

.review-header {
  display: flex;
  align-items: center;
  gap: 14px;
  margin-bottom: 12px;
}

.review-avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: #ffffff;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  font-size: 15px;
  flex-shrink: 0;
}

.review-user-info {
  flex: 1;
  min-width: 0;
}

.review-user-name {
  display: block;
  color: #2c3e50;
  font-size: 14px;
  font-weight: 600;
  margin-bottom: 3px;
}

.review-stars {
  display: flex;
  gap: 2px;
}

.star-filled {
  color: #ff9800;
  font-size: 12px;
}

.star-empty {
  color: #dcc8d0;
  font-size: 12px;
}

.review-date {
  color: #bbaab2;
  font-size: 12px;
  flex-shrink: 0;
}

.review-comment {
  color: #6b6b80;
  font-size: 14px;
  line-height: 1.6;
  margin: 0;
}

/* Empty Reviews */
.reviews-empty {
  text-align: center;
  padding: 48px 20px;
  background: #ffffff;
  border: 1px dashed #e0c8d0;
  border-radius: 14px;
  margin-bottom: 32px;
}

.empty-icon {
  font-size: 36px;
  color: #dcc8d0;
  margin-bottom: 12px;
}

.empty-text {
  color: #8a7a82;
  font-size: 14px;
  margin: 0;
}

/* Review Form */
.review-form-card {
  background: #ffffff;
  border: 1px solid #f0e0e6;
  border-radius: 14px;
  padding: 24px;
  box-shadow: 0 2px 8px rgba(180, 120, 140, 0.06);
}

.review-form-title {
  font-size: 17px;
  font-weight: 600;
  color: #2c3e50;
  margin: 0 0 20px;
}

.review-form-rating {
  margin-bottom: 16px;
}

.form-field-label {
  display: block;
  color: #6b6b80;
  font-size: 13px;
  font-weight: 500;
  margin-bottom: 8px;
}

.star-picker {
  display: flex;
  gap: 6px;
}

.star-pick {
  font-size: 22px;
  color: #dcc8d0;
  cursor: pointer;
  transition: all 0.2s ease;
}

.star-pick:hover,
.star-pick.picked {
  color: #ff9800;
  transform: scale(1.1);
}

.review-form-field {
  margin-bottom: 16px;
}

.form-textarea {
  width: 100%;
  padding: 12px 14px;
  background: #fdf2f6;
  border: 1px solid #f0e0e6;
  border-radius: 10px;
  color: #333;
  font-size: 14px;
  font-family: inherit;
  outline: none;
  resize: vertical;
  transition: border-color 0.2s ease;
}

.form-textarea::placeholder {
  color: #bbaab2;
}

.form-textarea:focus {
  border-color: #667eea;
}

.submit-review-btn {
  padding: 10px 24px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border: none;
  border-radius: 10px;
  color: #ffffff;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  display: inline-flex;
  align-items: center;
  gap: 8px;
}

.submit-review-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(102, 126, 234, 0.35);
}

/* ============================================
   RESPONSIVE
   ============================================ */

@media (max-width: 992px) {
  .product-detail-layout {
    grid-template-columns: 1fr;
    gap: 32px;
  }

  .product-image-col {
    position: static;
  }

  .product-name {
    font-size: 24px;
  }

  .product-price {
    font-size: 28px;
  }

  .breadcrumb-current {
    max-width: 200px;
  }
}

@media (max-width: 768px) {
  .product-detail-page {
    padding-bottom: 40px;
  }

  .breadcrumb-bar {
    padding: 12px 0;
    margin-bottom: 24px;
  }

  .add-to-cart-section {
    flex-direction: column;
  }

  .cart-btn {
    width: 100%;
  }

  .quantity-control {
    width: 100%;
  }

  .qty-input {
    flex: 1;
  }

  .product-name {
    font-size: 22px;
  }

  .product-price-section {
    flex-direction: column;
    align-items: flex-start;
    gap: 8px;
  }

  .reviews-section {
    margin-top: 40px;
    padding-top: 28px;
  }
}

@media (max-width: 480px) {
  .product-detail-layout {
    gap: 24px;
  }

  .review-card {
    padding: 16px;
  }

  .review-form-card {
    padding: 18px;
  }

  .breadcrumb-current {
    max-width: 140px;
  }
}
</style>