<template>
  <div class="order-detail-page">
    <!-- Page Header -->
    <section class="order-detail-header">
      <div class="container">
        <div class="order-detail-header-content">
          <h1 class="order-detail-title">Order Details</h1>
          <p class="order-detail-subtitle">View and track your order</p>
        </div>
      </div>
    </section>

    <!-- Content -->
    <section class="order-detail-content">
      <div class="container">

        <!-- Loading -->
        <div v-if="loading" class="state-message">
          <div class="spinner">
            <div class="spinner-ring"></div>
          </div>
          <p class="state-text">Loading order details...</p>
        </div>

        <!-- Error -->
        <div v-else-if="error" class="state-message">
          <div class="state-icon">
            <i class="fas fa-exclamation-circle"></i>
          </div>
          <h3 class="state-title">Order not found</h3>
          <p class="state-text">{{ error }}</p>
          <router-link to="/orders" class="shop-btn">
            <i class="fas fa-arrow-left"></i> Back to Orders
          </router-link>
        </div>

        <!-- Order Details -->
        <div v-else-if="order" class="order-detail-wrapper">

          <!-- Order Summary Card -->
          <div class="order-summary-card">
            <div class="order-summary-header">
              <div class="order-summary-info">
                <h2 class="order-number">Order #{{ order.order_number }}</h2>
                <p class="order-date">
                  <i class="fas fa-calendar-alt"></i>
                  {{ new Date(order.created_at).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }) }}
                </p>
              </div>
              <span class="order-status" :class="'status-' + order.status">
                {{ order.status }}
              </span>
            </div>

            <!-- Order Meta -->
            <div class="order-meta-grid">
              <div class="meta-item">
                <span class="meta-label">
                  <i class="fas fa-credit-card"></i> Payment Method
                </span>
                <span class="meta-value">{{ order.payment_method }}</span>
              </div>
              <div class="meta-item">
                <span class="meta-label">
                  <i class="fas fa-truck"></i> Shipping Method
                </span>
                <span class="meta-value">{{ order.shipping_method }}</span>
              </div>
              <div class="meta-item" v-if="order.tracking_number">
                <span class="meta-label">
                  <i class="fas fa-shipping-fast"></i> Tracking Number
                </span>
                <span class="meta-value">{{ order.tracking_number }}</span>
              </div>
              <div class="meta-item" v-if="order.estimated_delivery">
                <span class="meta-label">
                  <i class="fas fa-clock"></i> Estimated Delivery
                </span>
                <span class="meta-value">{{ new Date(order.estimated_delivery).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }) }}</span>
              </div>
            </div>
          </div>

          <!-- Order Items -->
          <div class="order-items-card">
            <h3 class="card-title">Order Items</h3>
            <div class="order-items-list">
              <div v-for="item in order.items" :key="item.id" class="order-item">
                <div class="order-item-image">
                  <img
                    :src="item.product.image_url || `${API_URL}/storage/${item.product.image}`"
                    :alt="item.product.name"
                  />
                </div>
                <div class="order-item-info">
                  <h4 class="order-item-name">{{ item.product.name }}</h4>
                  <p class="order-item-sku">SKU: {{ item.product.sku || 'N/A' }}</p>
                  <p class="order-item-meta">
                    Qty: {{ item.quantity }} &times; ${{ parseFloat(item.price).toFixed(2) }}
                  </p>
                </div>
                <div class="order-item-total">
                  ${{ (parseFloat(item.quantity) * parseFloat(item.price)).toFixed(2) }}
                </div>
              </div>
            </div>
          </div>

          <!-- Shipping Address -->
          <div class="order-address-card" v-if="order.shipping_address">
            <h3 class="card-title">Shipping Address</h3>
            <div class="address-content">
              <p class="address-name">{{ order.shipping_address.name }}</p>
              <p class="address-line">{{ order.shipping_address.address_line1 }}</p>
              <p class="address-line" v-if="order.shipping_address.address_line2">
                {{ order.shipping_address.address_line2 }}
              </p>
              <p class="address-city">
                {{ order.shipping_address.city }}, {{ order.shipping_address.state }} {{ order.shipping_address.postal_code }}
              </p>
              <p class="address-country">{{ order.shipping_address.country }}</p>
              <p class="address-phone" v-if="order.shipping_address.phone">
                <i class="fas fa-phone"></i> {{ order.shipping_address.phone }}
              </p>
            </div>
          </div>

          <!-- Order Summary -->
          <div class="order-summary-card">
            <h3 class="card-title">Order Summary</h3>
            <div class="summary-rows">
              <div class="summary-row">
                <span class="summary-label">Subtotal</span>
                <span class="summary-value">${{ parseFloat(order.subtotal || order.total_amount).toFixed(2) }}</span>
              </div>
              <div class="summary-row" v-if="order.shipping_cost">
                <span class="summary-label">Shipping</span>
                <span class="summary-value">${{ parseFloat(order.shipping_cost).toFixed(2) }}</span>
              </div>
              <div class="summary-row" v-if="order.tax">
                <span class="summary-label">Tax</span>
                <span class="summary-value">${{ parseFloat(order.tax).toFixed(2) }}</span>
              </div>
              <div class="summary-row" v-if="order.discount">
                <span class="summary-label">Discount</span>
                <span class="summary-value discount">-${{ parseFloat(order.discount).toFixed(2) }}</span>
              </div>
              <div class="summary-row total">
                <span class="summary-label">Total</span>
                <span class="summary-value">${{ parseFloat(order.total_amount).toFixed(2) }}</span>
              </div>
            </div>
          </div>

          <!-- Actions -->
          <div class="order-actions">
            <router-link to="/orders" class="back-btn">
              <i class="fas fa-arrow-left"></i> Back to Orders
            </router-link>
            <button v-if="canCancel" class="cancel-btn" @click="cancelOrder">
              <i class="fas fa-times"></i> Cancel Order
            </button>
          </div>

        </div>
      </div>
    </section>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'OrderDetail',
  data() {
    return {
      order: null,
      loading: false,
      error: null,
      API_URL: import.meta.env.VITE_API_URL || 'http://localhost:8000'
    }
  },
  computed: {
    orderId() {
      return this.$route.params.id
    },
    canCancel() {
      if (!this.order) return false
      return ['pending', 'processing'].includes(this.order.status.toLowerCase())
    }
  },
  mounted() {
    this.fetchOrderDetail()
  },
  methods: {
    async fetchOrderDetail() {
      this.loading = true
      this.error = null
      try {
        const response = await axios.get(`/orders/${this.orderId}`)
        this.order = response.data.data
      } catch (error) {
        console.error('Failed to fetch order detail:', error)
        this.error = error.response?.data?.message || 'Unable to load order details. Please try again later.'
      } finally {
        this.loading = false
      }
    },
    async cancelOrder() {
      if (!confirm('Are you sure you want to cancel this order?')) return
      
      this.loading = true
      try {
        await axios.post(`/orders/${this.orderId}/cancel`)
        this.order.status = 'cancelled'
        this.$nextTick(() => {
          this.$forceUpdate()
        })
      } catch (error) {
        console.error('Failed to cancel order:', error)
        alert(error.response?.data?.message || 'Unable to cancel order. Please try again.')
      } finally {
        this.loading = false
      }
    }
  },
  watch: {
    orderId() {
      this.fetchOrderDetail()
    }
  }
}
</script>

<style scoped>
/* ============================================
   ORDER DETAIL PAGE — Blush Pink Theme
   ============================================ */

.order-detail-page {
  background: #fdf2f6;
  min-height: 100vh;
}

/* ---- Page Header ---- */
.order-detail-header {
  background: #ffffff;
  border-bottom: 1px solid #f0e0e6;
  padding: 40px 0 32px;
}

.order-detail-header-content {
  text-align: center;
}

.order-detail-title {
  font-size: 28px;
  font-weight: 700;
  color: #2c3e50;
  margin: 0 0 8px;
  letter-spacing: -0.5px;
}

.order-detail-subtitle {
  font-size: 15px;
  color: #8a7a82;
  margin: 0;
}

/* ---- Content ---- */
.order-detail-content {
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

/* ---- Order Detail Wrapper ---- */
.order-detail-wrapper {
  display: flex;
  flex-direction: column;
  gap: 24px;
  max-width: 900px;
  margin: 0 auto;
}

/* ---- Cards ---- */
.order-summary-card,
.order-items-card,
.order-address-card {
  background: #ffffff;
  border: 1px solid #f0e0e6;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 2px 12px rgba(180, 120, 140, 0.08);
}

/* Order Summary Header */
.order-summary-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px 24px;
  background: #fdf2f6;
  border-bottom: 1px solid #f0e0e6;
  flex-wrap: wrap;
  gap: 12px;
}

.order-summary-info {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.order-number {
  font-size: 18px;
  font-weight: 700;
  color: #2c3e50;
  margin: 0;
}

.order-date {
  font-size: 13px;
  color: #8a7a82;
  margin: 0;
  display: flex;
  align-items: center;
  gap: 6px;
}

.order-date i {
  color: #667eea;
}

/* Order Status */
.order-status {
  display: inline-flex;
  align-items: center;
  padding: 8px 16px;
  border-radius: 50px;
  font-size: 13px;
  font-weight: 600;
  text-transform: capitalize;
  letter-spacing: 0.3px;
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

/* Order Meta Grid */
.order-meta-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 20px;
  padding: 20px 24px;
}

.meta-item {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.meta-label {
  font-size: 12px;
  color: #8a7a82;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 6px;
}

.meta-label i {
  color: #667eea;
  font-size: 12px;
}

.meta-value {
  font-size: 14px;
  color: #2c3e50;
  font-weight: 500;
}

/* Card Title */
.card-title {
  font-size: 16px;
  font-weight: 600;
  color: #2c3e50;
  margin: 0 0 16px;
  padding: 20px 24px 0;
}

/* Order Items */
.order-items-list {
  padding: 0 24px 24px;
}

.order-item {
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 16px 0;
  border-bottom: 1px solid #f0e0e6;
}

.order-item:last-child {
  border-bottom: none;
}

.order-item-image {
  width: 72px;
  height: 72px;
  border-radius: 12px;
  overflow: hidden;
  background: #fdf2f6;
  flex-shrink: 0;
  border: 1px solid #f0e0e6;
}

.order-item-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.order-item-info {
  flex: 1;
  min-width: 0;
}

.order-item-name {
  font-size: 15px;
  font-weight: 600;
  color: #2c3e50;
  margin: 0 0 4px;
}

.order-item-sku {
  font-size: 12px;
  color: #8a7a82;
  margin: 0 0 4px;
}

.order-item-meta {
  font-size: 13px;
  color: #8a7a82;
  margin: 0;
}

.order-item-total {
  font-size: 16px;
  font-weight: 700;
  color: #2c3e50;
  flex-shrink: 0;
}

/* Shipping Address */
.address-content {
  padding: 0 24px 24px;
}

.address-name {
  font-size: 15px;
  font-weight: 600;
  color: #2c3e50;
  margin: 0 0 8px;
}

.address-line,
.address-city,
.address-country {
  font-size: 14px;
  color: #6b6b80;
  margin: 0 0 4px;
}

.address-phone {
  font-size: 13px;
  color: #667eea;
  margin: 8px 0 0;
  display: flex;
  align-items: center;
  gap: 6px;
}

/* Order Summary */
.summary-rows {
  padding: 0 24px 24px;
}

.summary-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 0;
  border-bottom: 1px solid #f0e0e6;
}

.summary-row:last-child {
  border-bottom: none;
}

.summary-row.total {
  padding-top: 14px;
  margin-top: 4px;
  border-top: 2px solid #2c3e50;
  border-bottom: none;
}

.summary-label {
  font-size: 14px;
  color: #6b6b80;
  font-weight: 500;
}

.summary-row.total .summary-label {
  font-size: 16px;
  font-weight: 700;
  color: #2c3e50;
}

.summary-value {
  font-size: 14px;
  color: #2c3e50;
  font-weight: 600;
}

.summary-row.total .summary-value {
  font-size: 18px;
  font-weight: 700;
  color: #667eea;
}

.summary-value.discount {
  color: #2e7d32;
}

/* Order Actions */
.order-actions {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  flex-wrap: wrap;
}

.back-btn {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 12px 24px;
  background: #ffffff;
  border: 1px solid #f0e0e6;
  border-radius: 12px;
  color: #2c3e50;
  font-size: 14px;
  font-weight: 600;
  text-decoration: none;
  transition: all 0.3s ease;
}

.back-btn:hover {
  background: #fdf2f6;
  border-color: #d0b8c4;
  color: #2c3e50;
}

.cancel-btn {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 12px 24px;
  background: #ffffff;
  border: 1px solid #ef9a9a;
  border-radius: 12px;
  color: #c62828;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
}

.cancel-btn:hover {
  background: #ffebee;
  border-color: #c62828;
}

/* ============================================
   RESPONSIVE
   ============================================ */

@media (max-width: 768px) {
  .order-detail-header {
    padding: 28px 0 24px;
  }

  .order-detail-title {
    font-size: 24px;
  }

  .order-summary-header {
    flex-direction: column;
    align-items: flex-start;
  }

  .order-meta-grid {
    grid-template-columns: 1fr;
  }

  .order-item {
    flex-wrap: wrap;
  }

  .order-item-total {
    width: 100%;
    padding-left: 88px;
    margin-top: 8px;
  }

  .order-actions {
    flex-direction: column;
  }

  .back-btn,
  .cancel-btn {
    width: 100%;
    justify-content: center;
  }
}

@media (max-width: 480px) {
  .order-summary-header,
  .order-meta-grid,
  .order-items-list,
  .address-content,
  .summary-rows {
    padding-left: 16px;
    padding-right: 16px;
  }

  .card-title {
    padding-left: 16px;
    padding-right: 16px;
  }

  .order-item-image {
    width: 60px;
    height: 60px;
  }

  .order-item-total {
    padding-left: 76px;
  }
}
</style>