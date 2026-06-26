<template>
  <div class="checkout-page">
    <!-- Page Header -->
    <div class="page-header">
      <div class="container">
        <h1 class="page-title">Checkout</h1>
        <p class="page-subtitle">Complete your order</p>
      </div>
    </div>

    <div class="container">
      <div class="checkout-layout">
        <!-- Checkout Form -->
        <div class="checkout-form-section">
          <form @submit.prevent="placeOrder" class="checkout-form">
            <!-- Shipping -->
            <div class="form-card">
              <div class="form-card-header">
                <i class="fas fa-truck"></i>
                <span>Shipping Information</span>
              </div>
              <div class="form-card-body">
                <div class="form-group">
                  <label class="form-label">Shipping Address <span class="required">*</span></label>
                  <textarea class="form-input" v-model="order.shipping_address" rows="3" required placeholder="Enter your shipping address"></textarea>
                </div>
                <div class="form-group">
                  <label class="form-label">Billing Address <span class="required">*</span></label>
                  <textarea class="form-input" v-model="order.billing_address" rows="3" required placeholder="Enter your billing address"></textarea>
                </div>
              </div>
            </div>

            <!-- Payment & Shipping -->
            <div class="form-card">
              <div class="form-card-header">
                <i class="fas fa-credit-card"></i>
                <span>Payment &amp; Delivery</span>
              </div>
              <div class="form-card-body">
                <div class="form-group">
                  <label class="form-label">Payment Method <span class="required">*</span></label>
                  <div class="select-wrapper">
                    <select class="form-select" v-model="order.payment_method" required>
                      <option value="" disabled>Select Payment Method</option>
                      <option value="Credit Card">💳 Credit Card</option>
                      <option value="PayPal">🅿️ PayPal</option>
                      <option value="Bank Transfer">🏦 Bank Transfer</option>
                      <option value="Cash on Delivery">💵 Cash on Delivery</option>
                    </select>
                    <i class="fas fa-chevron-down select-arrow"></i>
                  </div>
                </div>
                <div class="form-group">
                  <label class="form-label">Shipping Method <span class="required">*</span></label>
                  <div class="select-wrapper">
                    <select class="form-select" v-model="order.shipping_method" required>
                      <option value="" disabled>Select Shipping Method</option>
                      <option value="Standard">📦 Standard (3-5 days) — Free</option>
                      <option value="Express">🚀 Express (1-2 days) — $8.00</option>
                      <option value="Next Day">⚡ Next Day Delivery — $15.00</option>
                    </select>
                    <i class="fas fa-chevron-down select-arrow"></i>
                  </div>
                </div>
              </div>
            </div>

            <!-- Notes -->
            <div class="form-card">
              <div class="form-card-header">
                <i class="fas fa-pen"></i>
                <span>Order Notes</span>
              </div>
              <div class="form-card-body">
                <div class="form-group">
                  <label class="form-label">Special Instructions</label>
                  <textarea class="form-input" v-model="order.notes" rows="2" 
                            placeholder="Any special instructions for your order..."></textarea>
                </div>
              </div>
            </div>

            <!-- Submit -->
            <button type="submit" class="place-order-btn" :disabled="loading">
              <span v-if="loading" class="spinner"></span>
              <span v-else><i class="fas fa-check-circle"></i> Place Order</span>
            </button>
          </form>
        </div>

        <!-- Order Summary Sidebar -->
        <div class="checkout-summary-section">
          <div class="summary-card">
            <h5 class="summary-title">Order Summary</h5>

            <div class="summary-rows">
              <div class="summary-row">
                <span class="summary-label">Items</span>
                <span class="summary-value">{{ cartStore.count }}</span>
              </div>
              <div class="summary-row">
                <span class="summary-label">Subtotal</span>
                <span class="summary-value">${{ cartStore.total.toFixed(2) }}</span>
              </div>
              <div class="summary-row">
                <span class="summary-label">Shipping</span>
                <span class="summary-value summary-free">Free</span>
              </div>
            </div>

            <div class="summary-divider"></div>

            <div class="summary-total">
              <span>Total</span>
              <span class="total-amount">${{ cartStore.total.toFixed(2) }}</span>
            </div>

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
import axios from 'axios'
import { useCartStore } from '../stores/cart'
import { useAuthStore } from '../stores/auth'

export default {
  name: 'Checkout',
  data() {
    return {
      order: {
        shipping_address: '',
        billing_address: '',
        payment_method: '',
        shipping_method: '',
        notes: ''
      },
      loading: false
    }
  },
  setup() {
    const cartStore = useCartStore()
    const authStore = useAuthStore()
    return { cartStore, authStore }
  },
  mounted() {
    // Pre-fill with user data if available
    if (this.authStore.user) {
      this.order.shipping_address = this.authStore.user.address || ''
      this.order.billing_address = this.authStore.user.address || ''
    }
  },
  methods: {
    async placeOrder() {
      this.loading = true
      try {
        const response = await axios.post('/orders', this.order)
        alert('Order placed successfully! 🎉')
        this.$router.push('/orders')
      } catch (error) {
        alert(error.response?.data?.message || 'Failed to place order')
      } finally {
        this.loading = false
      }
    }
  }
}
</script>

<style scoped>
/* ========== CHECKOUT PAGE ========== */
.checkout-page {
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

/* Layout */
.checkout-layout {
  display: grid;
  grid-template-columns: 1fr 380px;
  gap: 30px;
  margin-top: 30px;
}

@media (max-width: 992px) {
  .checkout-layout {
    grid-template-columns: 1fr;
  }
}

/* ========== FORM SECTION ========== */
.checkout-form-section {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.form-card {
  background: #ffffff;
  border-radius: 16px;
  border: 1px solid #f0e0e6;
  overflow: hidden;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.04);
}

.form-card-header {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 18px 24px;
  background: #fdf2f6;
  font-weight: 600;
  font-size: 1rem;
  color: #2c3e50;
  border-bottom: 1px solid #f0e0e6;
}

.form-card-header i {
  color: #764ba2;
  font-size: 1.1rem;
}

.form-card-body {
  padding: 24px;
}

.form-group {
  margin-bottom: 18px;
}

.form-group:last-child {
  margin-bottom: 0;
}

.form-label {
  display: block;
  font-size: 0.85rem;
  font-weight: 600;
  color: #2c3e50;
  margin-bottom: 8px;
}

.required {
  color: #e86070;
}

.form-input {
  width: 100%;
  padding: 12px 16px;
  border: 1.5px solid #f0e0e6;
  border-radius: 10px;
  font-size: 0.9rem;
  color: #2c3e50;
  background: #fdf2f6;
  outline: none;
  transition: border-color 0.2s, box-shadow 0.2s;
  font-family: inherit;
  resize: vertical;
}

.form-input:focus {
  border-color: #764ba2;
  box-shadow: 0 0 0 3px rgba(118, 75, 162, 0.1);
}

.form-input::placeholder {
  color: #d0c0c8;
}

.select-wrapper {
  position: relative;
}

.form-select {
  width: 100%;
  padding: 12px 40px 12px 16px;
  border: 1.5px solid #f0e0e6;
  border-radius: 10px;
  font-size: 0.9rem;
  color: #2c3e50;
  background: #fdf2f6;
  outline: none;
  appearance: none;
  -webkit-appearance: none;
  cursor: pointer;
  transition: border-color 0.2s, box-shadow 0.2s;
}

.form-select:focus {
  border-color: #764ba2;
  box-shadow: 0 0 0 3px rgba(118, 75, 162, 0.1);
}

.select-arrow {
  position: absolute;
  right: 14px;
  top: 50%;
  transform: translateY(-50%);
  color: #b0a0a8;
  font-size: 0.75rem;
  pointer-events: none;
}

/* Place Order Button */
.place-order-btn {
  width: 100%;
  padding: 16px;
  background: linear-gradient(135deg, #667eea, #764ba2);
  color: #fff;
  border: none;
  border-radius: 12px;
  font-weight: 700;
  font-size: 1.05rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px rgba(102, 126, 234, 0.3);
}

.place-order-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(102, 126, 234, 0.4);
}

.place-order-btn:disabled {
  opacity: 0.7;
  cursor: not-allowed;
  transform: none;
}

.spinner {
  display: inline-block;
  width: 20px;
  height: 20px;
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-top-color: #fff;
  border-radius: 50%;
  animation: spin 0.6s linear infinite;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

/* ========== SUMMARY SIDEBAR ========== */
.checkout-summary-section {
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
}

.total-amount {
  font-size: 1.3rem;
  font-weight: 700;
  background: linear-gradient(135deg, #667eea, #764ba2);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.payment-icons {
  display: flex;
  justify-content: center;
  gap: 16px;
  margin-top: 24px;
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
  .form-card-body {
    padding: 16px;
  }
  .summary-card {
    padding: 20px 16px;
  }
}
</style>