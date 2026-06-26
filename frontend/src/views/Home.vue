<template>
  <div class="home-page">
    <!-- Hero Section -->
    <section class="hero-section">
      <div class="hero-bg"></div>
      <div class="container">
        <div class="hero-content">
          <div class="hero-text">
            <span class="hero-badge">Premium Skincare</span>
            <h1 class="hero-title">Welcome to <span class="hero-highlight">Skincare Shop</span></h1>
            <p class="hero-subtitle">Discover the perfect skincare routine for your unique skin. Clean beauty that nurtures both skin and soul.</p>
            <div class="hero-actions">
              <router-link to="/products" class="hero-btn hero-btn--primary">
                <i class="fas fa-shopping-bag"></i>
                Shop Now
              </router-link>
              <router-link to="/products" class="hero-btn hero-btn--secondary">
                <i class="fas fa-eye"></i>
                Explore
              </router-link>
            </div>
          </div>
          <div class="hero-visual">
            <div class="hero-icon-circle">
              <i class="fas fa-spa"></i>
            </div>
            <div class="hero-floating-icons">
              <span class="float-icon float-icon-1"><i class="fas fa-leaf"></i></span>
              <span class="float-icon float-icon-2"><i class="fas fa-water"></i></span>
              <span class="float-icon float-icon-3"><i class="fas fa-sun"></i></span>
            </div>
          </div>
        </div>
      </div>
      <div class="hero-wave">
        <svg viewBox="0 0 1440 100" preserveAspectRatio="none">
          <path d="M0,50 C360,100 1080,0 1440,50 L1440,100 L0,100 Z" fill="#fdf2f6"></path>
        </svg>
      </div>
    </section>

    <!-- Featured Products -->
    <section class="featured-section">
      <div class="container">
        <div class="section-header">
          <span class="section-tag">Featured</span>
          <h2 class="section-title">Handpicked for You</h2>
          <p class="section-desc">Our most loved products, selected just for your skincare journey</p>
        </div>

        <div v-if="featuredProducts.length === 0" class="featured-empty">
          <p>Loading featured products...</p>
        </div>

        <div v-else class="featured-grid">
          <div
            v-for="product in featuredProducts"
            :key="product.id"
            class="featured-card"
          >
            <div class="featured-image-wrap">
              <router-link :to="`/products/${product.id}`">
                <img
                  :src="`${API_URL}/storage/${product.image}`"
                  :alt="product.name"
                  class="featured-image"
                />
              </router-link>
              <div class="featured-actions">
                <button
                  class="featured-cart-btn"
                  @click="addToCart(product.id)"
                  title="Add to Cart"
                >
                  <i class="fas fa-shopping-bag"></i>
                </button>
              </div>
            </div>
            <div class="featured-info">
              <span class="featured-category">{{ product.category?.name || 'Skincare' }}</span>
              <h3 class="featured-name">
                <router-link :to="`/products/${product.id}`">{{ product.name }}</router-link>
              </h3>
              <div class="featured-footer">
                <span class="featured-price">${{ product.price }}</span>
                <button class="featured-add-btn" @click="addToCart(product.id)">
                  <i class="fas fa-plus"></i>
                </button>
              </div>
            </div>
          </div>
        </div>

        <div class="featured-more" v-if="featuredProducts.length > 0">
          <router-link to="/products" class="view-all-btn">
            View All Products <i class="fas fa-arrow-right"></i>
          </router-link>
        </div>
      </div>
    </section>

    <!-- Features Section -->
    <section class="features-section">
      <div class="container">
        <div class="section-header">
          <span class="section-tag">Why Choose Us</span>
          <h2 class="section-title">We Care About Your Skin</h2>
          <p class="section-desc">Everything you need for a complete skincare experience</p>
        </div>

        <div class="features-grid">
          <div class="feature-card">
            <div class="feature-icon-wrap">
              <i class="fas fa-shipping-fast"></i>
            </div>
            <h3 class="feature-title">Free Shipping</h3>
            <p class="feature-text">On all orders over $50 with express delivery available</p>
          </div>

          <div class="feature-card">
            <div class="feature-icon-wrap">
              <i class="fas fa-undo"></i>
            </div>
            <h3 class="feature-title">Easy Returns</h3>
            <p class="feature-text">30-day return policy. Not happy? Send it back, no questions asked</p>
          </div>

          <div class="feature-card">
            <div class="feature-icon-wrap">
              <i class="fas fa-shield-alt"></i>
            </div>
            <h3 class="feature-title">Secure Payment</h3>
            <p class="feature-text">100% secure checkout with encrypted transactions</p>
          </div>

          <div class="feature-card">
            <div class="feature-icon-wrap">
              <i class="fas fa-certificate"></i>
            </div>
            <h3 class="feature-title">Premium Quality</h3>
            <p class="feature-text">All products are dermatologist tested and approved</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Newsletter CTA -->
    <section class="cta-section">
      <div class="container">
        <div class="cta-card">
          <div class="cta-content">
            <h2 class="cta-title">Join Our Skincare Community</h2>
            <p class="cta-text">Subscribe for exclusive deals, new arrivals, and skincare tips delivered to your inbox</p>
            <form class="cta-form" @submit.prevent>
              <div class="cta-input-wrap">
                <input
                  type="email"
                  placeholder="Enter your email"
                  class="cta-input"
                  aria-label="Email address"
                />
                <button type="submit" class="cta-btn">
                  Subscribe <i class="fas fa-paper-plane"></i>
                </button>
              </div>
            </form>
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
  name: 'Home',
  data() {
    return {
      featuredProducts: [],
      API_URL: import.meta.env.VITE_API_URL || 'http://localhost:8000'
    }
  },
  setup() {
    const cartStore = useCartStore()
    const authStore = useAuthStore()
    return { cartStore, authStore }
  },
  mounted() {
    this.fetchFeaturedProducts()
  },
  methods: {
    async fetchFeaturedProducts() {
      try {
        const response = await axios.get('/products', { params: { limit: 4 } })
        this.featuredProducts = response.data.data || []
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
    }
  }
}
</script>

<style scoped>
/* ============================================
   HOME PAGE — Blush Pink Theme
   ============================================ */

.home-page {
  background: #fdf2f6;
  min-height: 100vh;
}

/* ---- Hero Section ---- */
.hero-section {
  position: relative;
  min-height: 520px;
  display: flex;
  align-items: center;
  overflow: hidden;
  background: linear-gradient(135deg, #fce4ec 0%, #fdf2f6 40%, #ffffff 100%);
}

.hero-bg {
  position: absolute;
  inset: 0;
  background:
    radial-gradient(ellipse at 20% 50%, rgba(102, 126, 234, 0.06) 0%, transparent 60%),
    radial-gradient(ellipse at 80% 50%, rgba(118, 75, 162, 0.04) 0%, transparent 60%);
  z-index: 0;
}

.hero-content {
  position: relative;
  z-index: 1;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 48px;
  padding: 60px 0 80px;
}

.hero-text {
  flex: 1;
  max-width: 560px;
}

.hero-badge {
  display: inline-block;
  font-size: 12px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 1px;
  color: #667eea;
  background: rgba(102, 126, 234, 0.1);
  padding: 6px 14px;
  border-radius: 50px;
  margin-bottom: 16px;
}

.hero-title {
  font-size: 42px;
  font-weight: 700;
  color: #2c3e50;
  line-height: 1.2;
  margin: 0 0 16px;
  letter-spacing: -0.5px;
}

.hero-highlight {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
}

.hero-subtitle {
  font-size: 17px;
  color: #8a7a82;
  line-height: 1.7;
  margin: 0 0 28px;
}

.hero-actions {
  display: flex;
  gap: 12px;
}

.hero-btn {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  padding: 14px 28px;
  border-radius: 12px;
  font-size: 15px;
  font-weight: 600;
  text-decoration: none;
  transition: all 0.3s ease;
  cursor: pointer;
}

.hero-btn--primary {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: #ffffff;
  border: none;
}

.hero-btn--primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 24px rgba(102, 126, 234, 0.35);
  color: #ffffff;
}

.hero-btn--secondary {
  background: #ffffff;
  color: #2c3e50;
  border: 1px solid #f0e0e6;
}

.hero-btn--secondary:hover {
  background: #fdf2f6;
  color: #2c3e50;
  border-color: #d0b8c4;
}

/* Hero Visual */
.hero-visual {
  position: relative;
  width: 240px;
  height: 240px;
  flex-shrink: 0;
}

.hero-icon-circle {
  width: 220px;
  height: 220px;
  border-radius: 50%;
  background: linear-gradient(135deg, rgba(102, 126, 234, 0.08), rgba(118, 75, 162, 0.08));
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 80px;
  color: rgba(102, 126, 234, 0.2);
  border: 2px solid rgba(240, 224, 230, 0.6);
  animation: pulse 3s ease-in-out infinite;
}

@keyframes pulse {
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.03); }
}

.hero-floating-icons {
  position: absolute;
  inset: 0;
}

.float-icon {
  position: absolute;
  width: 44px;
  height: 44px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #ffffff;
  border-radius: 12px;
  box-shadow: 0 4px 16px rgba(180, 120, 140, 0.12);
  color: #667eea;
  font-size: 18px;
  animation: float 4s ease-in-out infinite;
}

.float-icon-1 { top: -10px; right: 20px; animation-delay: 0s; }
.float-icon-2 { bottom: 10px; left: -10px; animation-delay: 1.5s; }
.float-icon-3 { bottom: 30px; right: -5px; animation-delay: 3s; }

@keyframes float {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-8px); }
}

/* Wave Divider */
.hero-wave {
  position: absolute;
  bottom: -1px;
  left: 0;
  right: 0;
  line-height: 0;
  z-index: 1;
}

.hero-wave svg {
  width: 100%;
  height: 60px;
}

/* ---- Section Header ---- */
.section-header {
  text-align: center;
  margin-bottom: 40px;
}

.section-tag {
  display: inline-block;
  font-size: 12px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 1px;
  color: #667eea;
  background: rgba(102, 126, 234, 0.1);
  padding: 5px 12px;
  border-radius: 50px;
  margin-bottom: 12px;
}

.section-title {
  font-size: 30px;
  font-weight: 700;
  color: #2c3e50;
  margin: 0 0 10px;
  letter-spacing: -0.3px;
}

.section-desc {
  font-size: 15px;
  color: #8a7a82;
  margin: 0;
}

/* ---- Featured Section ---- */
.featured-section {
  padding: 60px 0;
}

.featured-empty {
  text-align: center;
  color: #8a7a82;
  padding: 40px;
}

.featured-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 24px;
}

.featured-card {
  background: #ffffff;
  border: 1px solid #f0e0e6;
  border-radius: 16px;
  overflow: hidden;
  transition: all 0.35s ease;
  box-shadow: 0 2px 12px rgba(180, 120, 140, 0.08);
}

.featured-card:hover {
  transform: translateY(-6px);
  border-color: #d0b8c4;
  box-shadow: 0 12px 32px rgba(180, 120, 140, 0.15);
}

.featured-image-wrap {
  position: relative;
  overflow: hidden;
  aspect-ratio: 1;
  background: #fdf2f6;
}

.featured-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.6s ease;
}

.featured-card:hover .featured-image {
  transform: scale(1.08);
}

.featured-actions {
  position: absolute;
  top: 12px;
  right: 12px;
  opacity: 0;
  transform: translateY(-8px);
  transition: all 0.3s ease;
}

.featured-card:hover .featured-actions {
  opacity: 1;
  transform: translateY(0);
}

.featured-cart-btn {
  width: 36px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(255, 255, 255, 0.95);
  border: 1px solid #f0e0e6;
  border-radius: 10px;
  color: #6b6b80;
  cursor: pointer;
  transition: all 0.25s ease;
  font-size: 14px;
  box-shadow: 0 2px 8px rgba(180, 120, 140, 0.1);
}

.featured-cart-btn:hover {
  border-color: #667eea;
  color: #667eea;
  background: #ffffff;
}

.featured-info {
  padding: 14px 16px 16px;
}

.featured-category {
  display: block;
  font-size: 11px;
  font-weight: 500;
  color: #667eea;
  text-transform: uppercase;
  letter-spacing: 0.8px;
  margin-bottom: 4px;
}

.featured-name {
  font-size: 15px;
  font-weight: 600;
  margin: 0 0 12px;
  line-height: 1.4;
}

.featured-name a {
  color: #2c3e50;
  text-decoration: none;
  transition: color 0.2s ease;
}

.featured-name a:hover {
  color: #667eea;
}

.featured-footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-top: 12px;
  border-top: 1px solid #f0e0e6;
}

.featured-price {
  font-size: 18px;
  font-weight: 700;
  color: #2c3e50;
}

.featured-add-btn {
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border: none;
  border-radius: 8px;
  color: #ffffff;
  cursor: pointer;
  transition: all 0.25s ease;
  font-size: 12px;
}

.featured-add-btn:hover {
  transform: scale(1.1);
  box-shadow: 0 4px 12px rgba(102, 126, 234, 0.4);
}

.featured-more {
  text-align: center;
  margin-top: 40px;
}

.view-all-btn {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 12px 28px;
  background: #ffffff;
  color: #2c3e50;
  border: 1px solid #f0e0e6;
  border-radius: 12px;
  font-size: 14px;
  font-weight: 600;
  text-decoration: none;
  transition: all 0.3s ease;
}

.view-all-btn:hover {
  background: #fdf2f6;
  border-color: #d0b8c4;
  color: #2c3e50;
  transform: translateY(-2px);
}

/* ---- Features Section ---- */
.features-section {
  padding: 60px 0 80px;
  background: #ffffff;
}

.features-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 24px;
}

.feature-card {
  text-align: center;
  padding: 36px 20px;
  background: #fdf2f6;
  border: 1px solid #f0e0e6;
  border-radius: 16px;
  transition: all 0.3s ease;
}

.feature-card:hover {
  background: #ffffff;
  border-color: #d0b8c4;
  transform: translateY(-4px);
  box-shadow: 0 8px 24px rgba(180, 120, 140, 0.1);
}

.feature-icon-wrap {
  width: 64px;
  height: 64px;
  margin: 0 auto 18px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, rgba(102, 126, 234, 0.1), rgba(118, 75, 162, 0.1));
  border-radius: 16px;
  font-size: 24px;
  color: #667eea;
  transition: all 0.3s ease;
}

.feature-card:hover .feature-icon-wrap {
  background: linear-gradient(135deg, #667eea, #764ba2);
  color: #ffffff;
  transform: scale(1.05);
}

.feature-title {
  font-size: 17px;
  font-weight: 600;
  color: #2c3e50;
  margin: 0 0 8px;
}

.feature-text {
  font-size: 14px;
  color: #8a7a82;
  margin: 0;
  line-height: 1.6;
}

/* ---- CTA Section ---- */
.cta-section {
  padding: 0 0 60px;
}

.cta-card {
  background: linear-gradient(135deg, #fce4ec 0%, #fdf2f6 50%, #ffffff 100%);
  border: 1px solid #f0e0e6;
  border-radius: 24px;
  padding: 60px 40px;
  text-align: center;
  position: relative;
  overflow: hidden;
}

.cta-card::before {
  content: '';
  position: absolute;
  inset: 0;
  background:
    radial-gradient(ellipse at 30% 50%, rgba(102, 126, 234, 0.04) 0%, transparent 60%),
    radial-gradient(ellipse at 70% 50%, rgba(118, 75, 162, 0.03) 0%, transparent 60%);
  z-index: 0;
}

.cta-content {
  position: relative;
  z-index: 1;
  max-width: 520px;
  margin: 0 auto;
}

.cta-title {
  font-size: 28px;
  font-weight: 700;
  color: #2c3e50;
  margin: 0 0 12px;
}

.cta-text {
  font-size: 15px;
  color: #8a7a82;
  margin: 0 0 24px;
  line-height: 1.6;
}

.cta-input-wrap {
  display: flex;
  background: #ffffff;
  border: 1px solid #f0e0e6;
  border-radius: 12px;
  overflow: hidden;
  transition: border-color 0.3s ease, box-shadow 0.3s ease;
  max-width: 420px;
  margin: 0 auto;
}

.cta-input-wrap:focus-within {
  border-color: #667eea;
  box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.15);
}

.cta-input {
  flex: 1;
  padding: 14px 18px;
  border: none;
  background: transparent;
  color: #333;
  font-size: 14px;
  outline: none;
}

.cta-input::placeholder {
  color: #bbaab2;
}

.cta-btn {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 14px 24px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border: none;
  color: #ffffff;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
}

.cta-btn:hover {
  opacity: 0.9;
}

/* ============================================
   RESPONSIVE
   ============================================ */

@media (max-width: 992px) {
  .hero-content {
    flex-direction: column;
    text-align: center;
    padding: 40px 0 60px;
  }

  .hero-text {
    max-width: 100%;
  }

  .hero-actions {
    justify-content: center;
  }

  .hero-visual {
    width: 180px;
    height: 180px;
  }

  .hero-icon-circle {
    width: 160px;
    height: 160px;
    font-size: 60px;
  }

  .hero-title {
    font-size: 34px;
  }

  .featured-grid {
    grid-template-columns: repeat(2, 1fr);
  }

  .features-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 768px) {
  .hero-section {
    min-height: 400px;
  }

  .hero-title {
    font-size: 28px;
  }

  .hero-subtitle {
    font-size: 15px;
  }

  .hero-btn {
    padding: 12px 22px;
    font-size: 14px;
  }

  .featured-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 16px;
  }

  .features-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 16px;
  }

  .section-title {
    font-size: 24px;
  }

  .cta-card {
    padding: 40px 24px;
  }

  .cta-title {
    font-size: 22px;
  }
}

@media (max-width: 480px) {
  .featured-grid {
    grid-template-columns: 1fr 1fr;
    gap: 12px;
  }

  .features-grid {
    grid-template-columns: 1fr;
  }

  .hero-actions {
    flex-direction: column;
  }

  .hero-btn {
    width: 100%;
    justify-content: center;
  }

  .cta-input-wrap {
    flex-direction: column;
    border-radius: 12px;
  }

  .cta-btn {
    width: 100%;
    justify-content: center;
  }
}
</style>