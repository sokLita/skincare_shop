<template>
    <!-- New Order Notification Toast -->
    <transition name="toast-slide">
      <div v-if="showNewOrderToast" class="new-order-toast">
        <i class="fas fa-shopping-bag"></i>
        <span>{{ t('admin.newOrderToast') }} <router-link to="/admin/orders" class="toast-link">{{ t('admin.viewOrders') }}</router-link></span>
        <button class="toast-close" @click="showNewOrderToast = false">&times;</button>
      </div>
    </transition>


  <div class="admin-dashboard">
    <div class="dashboard-header">
      <h1>{{ t('admin.dashboard') }}</h1>
      <p class="welcome-text">{{ t('admin.welcomeBack', { name: authStore.user?.name || '' }) }}</p>
    </div>

    <div class="stats-grid">
      <div class="stat-card">
        <div class="stat-icon">
          <i class="fas fa-box"></i>
        </div>
        <div class="stat-content">
          <h3>{{ t('admin.totalProducts') }}</h3>
          <p class="stat-value">{{ stats.totalProducts }}</p>
        </div>
      </div>

      <div class="stat-card">
        <div class="stat-icon">
          <i class="fas fa-shopping-bag"></i>
        </div>
        <div class="stat-content">
          <h3>{{ t('admin.totalOrders') }}</h3>
          <p class="stat-value">{{ stats.totalOrders }}</p>
        </div>
      </div>

      <div class="stat-card">
        <div class="stat-icon">
          <i class="fas fa-users"></i>
        </div>
        <div class="stat-content">
          <h3>{{ t('admin.totalCustomers') }}</h3>
          <p class="stat-value">{{ stats.totalUsers }}</p>
        </div>
      </div>

      <div class="stat-card">
        <div class="stat-icon">
          <i class="fas fa-dollar-sign"></i>
        </div>
        <div class="stat-content">
          <h3>{{ t('admin.totalRevenue') }}</h3>
          <p class="stat-value">${{ stats.totalRevenue }}</p>
        </div>
      </div>
    </div>

    <!-- Quick Actions -->
    <div class="quick-actions">
      <router-link to="/admin/products" class="action-card">
        <i class="fas fa-boxes"></i>
        <span>{{ t('admin.manageProducts') }}</span>
      </router-link>
      <router-link to="/admin/orders" class="action-card">
        <i class="fas fa-shopping-cart"></i>
        <span>{{ t('admin.viewAllOrders') }}</span>
      </router-link>
    </div>

    <!-- Recent Orders -->
    <div class="recent-orders">
      <h2>{{ t('admin.recentOrders') }}</h2>
      <div class="table-responsive">
        <table class="orders-table">
          <thead>
            <tr>
              <th>{{ t('admin.orderNumber') }}</th>
              <th>{{ t('admin.customer') }}</th>
              <th>{{ t('admin.status') }}</th>
              <th>{{ t('admin.total') }}</th>
              <th>{{ t('admin.date') }}</th>
            </tr>
          </thead>
          <tbody>
            <tr v-if="recentOrders.length === 0">
              <td colspan="5" class="text-center">{{ t('admin.noRecentOrders') }}</td>
            </tr>
            <tr v-for="order in recentOrders" :key="order.id">
              <td>#{{ order.order_number }}</td>
              <td>{{ order.user?.name || 'N/A' }}</td>
              <td><span class="status-badge" :class="'status-' + order.status">{{ order.status }}</span></td>
              <td>${{ parseFloat(order.total_amount).toFixed(2) }}</td>
              <td>{{ new Date(order.created_at).toLocaleDateString() }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import { useAuthStore } from '../stores/auth'
import { useTranslation } from '../composables/useTranslation'

export default {
  name: 'AdminDashboard',
  data() {
    return {
      stats: {
        totalProducts: 0,
        totalOrders: 0,
        totalUsers: 0,
        totalRevenue: 0
      },
      recentOrders: [],
      showNewOrderToast: false,
      pollingInterval: null
    }
  },
  setup() {
    const authStore = useAuthStore()
    const { t } = useTranslation()
    return { authStore, t }
  },
  mounted() {
    this.fetchDashboardData()
    this.startPolling()
  },
  beforeUnmount() {
    this.stopPolling()
  },
  methods: {
    async fetchDashboardData() {
      try {
        const response = await axios.get('/admin/dashboard')
        this.stats = response.data.stats
        this.recentOrders = response.data.recentOrders || []
      } catch (error) {
        console.error('Failed to fetch dashboard data:', error)
      }
    },

    startPolling() {
      this.pollingInterval = setInterval(async () => {
        try {
          const response = await axios.get('/admin/new-orders-check')
          if (response.data.hasNewOrders) {
            this.showNewOrderToast = true
            this.fetchDashboardData()
          }
        } catch (error) {
          // silently fail
        }
      }, 30000)
    },

    stopPolling() {
      if (this.pollingInterval) {
        clearInterval(this.pollingInterval)
        this.pollingInterval = null
      }
    }
  }
}
</script>

<style scoped>
.admin-dashboard {
  padding: 24px;
  max-width: 1200px;
  margin: 0 auto;
}

.dashboard-header {
  margin-bottom: 32px;
}

.dashboard-header h1 {
  font-size: 28px;
  font-weight: 700;
  color: #2c3e50;
  margin: 0 0 8px;
}

.welcome-text {
  color: #8a7a82;
  font-size: 15px;
  margin: 0;
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 20px;
  margin-bottom: 32px;
}

.stat-card {
  background: #ffffff;
  border: 1px solid #f0e0e6;
  border-radius: 16px;
  padding: 24px;
  display: flex;
  align-items: center;
  gap: 16px;
  box-shadow: 0 2px 12px rgba(180, 120, 140, 0.08);
  transition: all 0.3s ease;
}

.stat-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 24px rgba(180, 120, 140, 0.12);
}

.stat-icon {
  width: 56px;
  height: 56px;
  border-radius: 14px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: #ffffff;
  flex-shrink: 0;
}

.stat-content h3 {
  font-size: 13px;
  font-weight: 500;
  color: #8a7a82;
  margin: 0 0 4px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.stat-value {
  font-size: 28px;
  font-weight: 700;
  color: #2c3e50;
  margin: 0;
}

.quick-actions {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 16px;
  margin-bottom: 32px;
}

.action-card {
  background: #ffffff;
  border: 1px solid #f0e0e6;
  border-radius: 16px;
  padding: 20px;
  display: flex;
  align-items: center;
  gap: 12px;
  text-decoration: none;
  color: #2c3e50;
  transition: all 0.3s ease;
  box-shadow: 0 2px 12px rgba(180, 120, 140, 0.08);
}

.action-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 24px rgba(180, 120, 140, 0.12);
  border-color: #667eea;
}

.action-card i {
  font-size: 24px;
  color: #667eea;
}

.action-card span {
  font-weight: 600;
  font-size: 14px;
}

.recent-orders {
  background: #ffffff;
  border: 1px solid #f0e0e6;
  border-radius: 16px;
  padding: 24px;
  box-shadow: 0 2px 12px rgba(180, 120, 140, 0.08);
}

.recent-orders h2 {
  font-size: 18px;
  font-weight: 600;
  color: #2c3e50;
  margin: 0 0 20px;
}

.orders-table {
  width: 100%;
  border-collapse: collapse;
}

.orders-table th {
  text-align: left;
  padding: 12px 16px;
  font-size: 12px;
  font-weight: 600;
  color: #8a7a82;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  border-bottom: 2px solid #f0e0e6;
}

.orders-table td {
  padding: 12px 16px;
  font-size: 14px;
  color: #2c3e50;
  border-bottom: 1px solid #f5e8ee;
}

.orders-table tr:last-child td {
  border-bottom: none;
}

.status-badge {
  display: inline-block;
  padding: 4px 12px;
  border-radius: 50px;
  font-size: 12px;
  font-weight: 600;
  text-transform: capitalize;
}

.status-pending { background: rgba(255, 152, 0, 0.12); color: #e65100; }
.status-processing { background: rgba(33, 150, 243, 0.12); color: #1565c0; }
.status-shipped { background: rgba(102, 126, 234, 0.12); color: #667eea; }
.status-delivered { background: rgba(76, 175, 80, 0.12); color: #2e7d32; }
.status-cancelled { background: rgba(244, 67, 54, 0.12); color: #c62828; }

.new-order-toast {
  position: fixed;
  top: 80px;
  right: 24px;
  z-index: 9999;
  background: linear-gradient(135deg, #667eea, #764ba2);
  color: #ffffff;
  padding: 16px 24px;
  border-radius: 12px;
  box-shadow: 0 8px 24px rgba(102, 126, 234, 0.3);
  display: flex;
  align-items: center;
  gap: 12px;
  font-size: 14px;
  font-weight: 500;
}

.toast-link {
  color: #ffffff;
  font-weight: 700;
  text-decoration: underline;
}

.toast-close {
  background: none;
  border: none;
  color: #ffffff;
  font-size: 20px;
  cursor: pointer;
  padding: 0 4px;
  opacity: 0.8;
}

.toast-close:hover {
  opacity: 1;
}

.toast-slide-enter-active,
.toast-slide-leave-active {
  transition: all 0.3s ease;
}

.toast-slide-enter-from,
.toast-slide-leave-to {
  transform: translateX(100%);
  opacity: 0;
}

@media (max-width: 768px) {
  .admin-dashboard {
    padding: 16px;
  }

  .stats-grid {
    grid-template-columns: 1fr;
  }

  .quick-actions {
    grid-template-columns: 1fr;
  }

  .table-responsive {
    overflow-x: auto;
  }
}
</style>