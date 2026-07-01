<template>
  <div class="orders-page">
    <!-- Page Header -->
    <section class="orders-header">
      <div class="container">
        <div class="orders-header-content">
          <h1 class="orders-title">{{ t('orders.title') }}</h1>
          <p class="orders-subtitle">{{ t('orders.subtitle') }}</p>
        </div>
      </div>
    </section>

    <!-- Content -->
    <section class="orders-content">
      <div class="container">

        <!-- Loading -->
        <div v-if="loading" class="state-message">
          <div class="spinner">
            <div class="spinner-ring"></div>
          </div>
          <p class="state-text">{{ t('orders.loading') }}</p>
        </div>

        <!-- Empty -->
        <div v-else-if="orders.length === 0" class="state-message">
          <div class="state-icon">
            <i class="fas fa-box-open"></i>
          </div>
          <h3 class="state-title">{{ t('orders.emptyTitle') }}</h3>
          <p class="state-text">{{ t('orders.emptyDesc') }}</p>
          <router-link to="/products" class="shop-btn">
            <i class="fas fa-shopping-bag"></i> {{ t('orders.shopNow') }}
          </router-link>
        </div>

        <!-- Orders List -->
        <div v-else class="orders-list">
          <div v-for="order in orders" :key="order.id" class="order-card">
            
            <!-- Order Header -->
            <div class="order-card-header">
              <div class="order-info">
                <span class="order-number">{{ t('orders.orderNumber', { number: String(order.order_number) }) }}</span>
                <span v-if="authStore.isAdmin && order.user" class="order-customer">
                  <i class="fas fa-user"></i> {{ order.user.name }}
                </span>

                <span class="order-date">{{ new Date(order.created_at).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }) }}</span>
              </div>
              <div class="order-status-group">
                <span class="order-status" :class="'status-' + order.status">
                  {{ order.status }}
                </span>
                <button class="track-btn" @click="openChatWithOrder(order.id)" title="Check with Order Assistant">
                  <i class="fas fa-robot"></i>
                </button>
              </div>
            </div>

            <!-- Order Items -->
            <div class="order-card-body">
              <div v-for="item in order.items" :key="item.id" class="order-item">
                <div class="order-item-image">
            <img
                    :src="item.product.image_url || `${API_URL}/storage/${item.product.image}`"
                    :alt="item.product.name"
                  />
                </div>
                <div class="order-item-info">
                  <h4 class="order-item-name">{{ item.product.name }}</h4>
                  <p class="order-item-meta">
                    {{ t('orders.qty') }}: {{ item.quantity }} &times; ${{ parseFloat(item.price).toFixed(2) }}
                  </p>
                </div>
                <div class="order-item-total">
                  ${{ (parseFloat(item.quantity) * parseFloat(item.price)).toFixed(2) }}
                </div>
              </div>
            </div>

            <!-- Order Footer -->
            <div class="order-card-footer">
              <div class="order-details">
                <span class="order-detail-label">
                  <i class="fas fa-credit-card"></i> {{ order.payment_method }}
                </span>
                <span class="order-detail-label">
                  <i class="fas fa-truck"></i> {{ order.shipping_method }}
                </span>
              </div>
              <div class="order-total">
                <span class="order-total-label">{{ t('orders.total') }}</span>
                <span class="order-total-amount">${{ parseFloat(order.total_amount).toFixed(2) }}</span>
              </div>
            </div>

          </div>

          <!-- Pagination -->
          <nav v-if="pagination.total > 1" class="pagination-nav">
            <button
              class="page-btn"
              @click="fetchOrders(pagination.prev)"
              :disabled="!pagination.prev"
            >
              <i class="fas fa-chevron-left"></i>
            </button>
            <div class="page-numbers">
              <button
                v-for="page in pagination.total"
                :key="page"
                class="page-num"
                :class="{ active: page === pagination.current }"
                @click="fetchOrders(page)"
              >
                {{ page }}
              </button>
            </div>
            <button
              class="page-btn"
              @click="fetchOrders(pagination.next)"
              :disabled="!pagination.next"
            >
              <i class="fas fa-chevron-right"></i>
            </button>
          </nav>

        </div>
      </div>
    </section>
  </div>
</template>

<script>
import axios from 'axios'
import { useAuthStore } from '../stores/auth'
import { useTranslation } from '../composables/useTranslation'

export default {
  name: 'Orders',
  data() {
    return {
      orders: [],
      loading: false,
      pagination: {
        current: 1,
        total: 0,
        prev: null,
        next: null
      },
      API_URL: import.meta.env.VITE_API_URL || 'http://localhost:8000'
    }
  },
  mounted() {
    this.fetchOrders()
  },
  setup() {
    const authStore = useAuthStore()
    const { t } = useTranslation()
    return { authStore, t }
  },

  methods: {
    async fetchOrders(page = 1) {
      this.loading = true
      try {
        const response = await axios.get('/orders', { params: { page } })
        this.orders = response.data.data
        this.pagination = {
          current: response.data.current_page,
          total: response.data.last_page,
          prev: response.data.prev_page_url ? response.data.current_page - 1 : null,
          next: response.data.next_page_url ? response.data.current_page + 1 : null
        }
      } catch (error) {
        console.error('Failed to fetch orders:', error)
      } finally {
        this.loading = false
      }
    },

    openChatWithOrder(orderId) {
      // Dispatch event that App.vue listens for to open the chatbot with this order
      window.dispatchEvent(new CustomEvent('open-order-chat', { detail: { orderId } }))
      // Scroll to bottom right to show the chatbot
      window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' })
    }
  }
}
</script>

<style scoped>
/* ============================================
   ORDERS PAGE — Blush Pink Theme
   ============================================ */

.orders-page {
  background: #fdf2f6;
  min-height: 100vh;
}

/* ---- Page Header ---- */
.orders-header {
  background: #ffffff;
  border-bottom: 1px solid #f0e0e6;
  padding: 40px 0 32px;
}

.orders-header-content {
  text-align: center;
}

.orders-title {
  font-size: 28px;
  font-weight: 700;
  color: #2c3e50;
  margin: 0 0 8px;
  letter-spacing: -0.5px;
}

.orders-subtitle {
  font-size: 15px;
  color: #8a7a82;
  margin: 0;
}

/* ---- Content ---- */
.orders-content {
  padding: 32px 0 60px;
}

/* State Messages */
.state-message {
  text-align: center;
  padding: 80px 20px;
}

.spinner {
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
}

.spinner-ring {
  width: 40px;
  height: 40px;
  border: 3px solid rgba(102, 126, 234, 0.1);
  border-top-color: #667eea;
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
}

@keyframes spin {
  to { transform: rotate(360deg); }
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
  margin: 0 0 20px;
}

.shop-btn {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 12px 28px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: #ffffff;
  border-radius: 12px;
  font-size: 14px;
  font-weight: 600;
  text-decoration: none;
  transition: all 0.3s ease;
}

.shop-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(102, 126, 234, 0.35);
  color: #ffffff;
}

/* ---- Orders List ---- */
.orders-list {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

/* Order Card */
.order-card {
  background: #ffffff;
  border: 1px solid #f0e0e6;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 2px 12px rgba(180, 120, 140, 0.08);
  transition: box-shadow 0.3s ease;
}

.order-card:hover {
  box-shadow: 0 8px 24px rgba(180, 120, 140, 0.12);
}

/* Card Header */
.order-card-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 18px 22px;
  background: #fdf2f6;
  border-bottom: 1px solid #f0e0e6;
}

.order-info {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.order-number {
  font-size: 15px;
  font-weight: 600;
  color: #2c3e50;
}

.order-date {
  font-size: 13px;
  color: #8a7a82;
}

.order-status-group {
  display: flex;
  align-items: center;
  gap: 8px;
}

.order-status {
  display: inline-flex;
  align-items: center;
  padding: 6px 14px;
  border-radius: 50px;
  font-size: 12px;
  font-weight: 600;
  text-transform: capitalize;
  letter-spacing: 0.3px;
}

.track-btn {
  width: 34px;
  height: 34px;
  border-radius: 50%;
  border: 1px solid #f0e0e6;
  background: #ffffff;
  color: #b8456a;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  transition: all 0.25s ease;
}

.track-btn:hover {
  background: #fdf2f6;
  border-color: #b8456a;
  transform: scale(1.1);
  box-shadow: 0 2px 8px rgba(184, 69, 106, 0.15);
}

.status-pending {
  background: rgba(255, 152, 0, 0.12);
  color: #e65100;
}

.status-processing {
  background: rgba(33, 150, 243, 0.12);
  color: #1565c0;
}

.status-shipped {
  background: rgba(102, 126, 234, 0.12);
  color: #667eea;
}

.status-delivered {
  background: rgba(76, 175, 80, 0.12);
  color: #2e7d32;
}

.status-cancelled {
  background: rgba(244, 67, 54, 0.12);
  color: #c62828;
}

/* Card Body */
.order-card-body {
  padding: 16px 22px;
}

.order-item {
  display: flex;
  align-items: center;
  gap: 14px;
  padding: 10px 0;
  border-bottom: 1px solid #f0e0e6;
}

.order-item:last-child {
  border-bottom: none;
}

.order-item-image {
  width: 56px;
  height: 56px;
  border-radius: 10px;
  overflow: hidden;
  background: #fdf2f6;
  flex-shrink: 0;
  border: 1px solid #f0e0e6;
}

.order-item-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;

.order-customer {
  display: inline-flex;
  align-items: center;
  gap: 5px;
  font-size: 13px;
  color: #667eea;
  font-weight: 600;
}
.order-customer i {
  font-size: 12px;
}

}

.order-item-info {
  flex: 1;
  min-width: 0;
}

.order-item-name {
  font-size: 14px;
  font-weight: 600;
  color: #2c3e50;
  margin: 0 0 4px;
}

.order-item-meta {
  font-size: 13px;
  color: #8a7a82;
  margin: 0;
}

.order-item-total {
  font-size: 15px;
  font-weight: 600;
  color: #2c3e50;
  flex-shrink: 0;
}

/* Card Footer */
.order-card-footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 14px 22px;
  border-top: 1px solid #f0e0e6;
  background: #faf0f4;
}

.order-details {
  display: flex;
  gap: 16px;
  flex-wrap: wrap;
}

.order-detail-label {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-size: 13px;
  color: #6b6b80;
}

.order-detail-label i {
  color: #667eea;
  font-size: 13px;
}

.order-total {
  display: flex;
  align-items: center;
  gap: 10px;
}

.order-total-label {
  font-size: 13px;
  color: #8a7a82;
  font-weight: 500;
}

.order-total-amount {
  font-size: 20px;
  font-weight: 700;
  color: #2c3e50;
}

/* ---- Pagination ---- */
.pagination-nav {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  margin-top: 40px;
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

@media (max-width: 768px) {
  .orders-header {
    padding: 28px 0 24px;
  }

  .orders-title {
    font-size: 24px;
  }

  .order-card-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 10px;
  }

  .order-card-footer {
    flex-direction: column;
    gap: 12px;
    align-items: flex-start;
  }

  .order-total {
    width: 100%;
    justify-content: space-between;
  }

  .order-item {
    flex-wrap: wrap;
  }

  .order-item-total {
    width: 100%;
    padding-left: 70px;
  }
}

@media (max-width: 480px) {
  .order-card-header,
  .order-card-body,
  .order-card-footer {
    padding-left: 16px;
    padding-right: 16px;
  }

  .order-details {
    flex-direction: column;
    gap: 6px;
  }
}
</style>