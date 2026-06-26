<template>
  <div class="admin-dashboard">
    <div class="dashboard-header">
      <h1>Admin Dashboard</h1>
      <p class="welcome-text">Welcome back, {{ authStore.user?.name }}</p>
    </div>

    <div class="stats-grid">
      <div class="stat-card">
        <div class="stat-icon">
          <i class="fas fa-box"></i>
        </div>
        <div class="stat-content">
          <h3>Total Products</h3>
          <p class="stat-value">{{ stats.totalProducts }}</p>
        </div>
      </div>

      <div class="stat-card">
        <div class="stat-icon">
          <i class="fas fa-shopping-bag"></i>
        </div>
        <div class="stat-content">
          <h3>Total Orders</h3>
          <p class="stat-value">{{ stats.totalOrders }}</p>
        </div>
      </div>

      <div class="stat-card">
        <div class="stat-icon">
          <i class="fas fa-users"></i>
        </div>
        <div class="stat-content">
          <h3>Total Customers</h3>
          <p class="stat-value">{{ stats.totalUsers }}</p>
        </div>
      </div>

      <div class="stat-card">
        <div class="stat-icon">
          <i class="fas fa-dollar-sign"></i>
        </div>
        <div class="stat-content">
          <h3>Total Revenue</h3>
          <p class="stat-value">${{ formatNumber(stats.totalRevenue) }}</p>
        </div>
      </div>
    </div>

    <div class="recent-orders">
      <h2>Recent Orders</h2>
      <div v-if="loading" class="loading">Loading...</div>
      <div v-else-if="stats.recentOrders.length === 0" class="no-data">
        No orders yet
      </div>
      <table v-else class="orders-table">
        <thead>
          <tr>
            <th>Order ID</th>
            <th>Customer</th>
            <th>Total</th>
            <th>Status</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="order in stats.recentOrders" :key="order.id">
            <td>#{{ order.id }}</td>
            <td>{{ order.user?.name || 'N/A' }}</td>
            <td>${{ formatNumber(order.total_amount) }}</td>
            <td>
              <span class="status-badge" :class="getStatusClass(order.status)">
                {{ order.status }}
              </span>
            </td>
            <td>{{ formatDate(order.created_at) }}</td>
          </tr>
        </tbody>
      </table>
    </div>

    <div class="quick-actions">
      <h2>Quick Actions</h2>
      <div class="actions-grid">
        <router-link to="/admin/products" class="action-card">
          <i class="fas fa-boxes"></i>
          <span>Manage Products</span>
        </router-link>
        <router-link to="/admin/orders" class="action-card">
          <i class="fas fa-clipboard-list"></i>
          <span>View Orders</span>
        </router-link>
        <router-link to="/admin/categories" class="action-card">
          <i class="fas fa-tags"></i>
          <span>Manage Categories</span>
        </router-link>
        <router-link to="/admin/customers" class="action-card">
          <i class="fas fa-user-friends"></i>
          <span>View Customers</span>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import { useAuthStore } from '../stores/auth'
import axios from 'axios'

export default {
  name: 'AdminDashboard',
  setup() {
    const authStore = useAuthStore()
    return { authStore }
  },
  data() {
    return {
      loading: true,
      stats: {
        totalProducts: 0,
        totalOrders: 0,
        totalUsers: 0,
        totalRevenue: 0,
        recentOrders: []
      }
    }
  },
  async mounted() {
    await this.fetchDashboardData()
  },
  methods: {
    async fetchDashboardData() {
      this.loading = true
      try {
        const response = await axios.get('/admin/dashboard')
        this.stats = response.data
      } catch (error) {
        console.error('Failed to fetch dashboard data:', error)
      } finally {
        this.loading = false
      }
    },
    formatNumber(num) {
      return num?.toLocaleString() || '0'
    },
    formatDate(date) {
      return new Date(date).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      })
    },
    getStatusClass(status) {
      return {
        'pending': 'status-pending',
        'processing': 'status-processing',
        'completed': 'status-completed',
        'cancelled': 'status-cancelled'
      }[status] || 'status-default'
    }
  }
}
</script>

<style scoped>
.admin-dashboard {
  max-width: 1400px;
  margin: 0 auto;
  padding: 32px 24px;
}

.dashboard-header {
  margin-bottom: 32px;
}

.dashboard-header h1 {
  font-size: 32px;
  font-weight: 700;
  color: #2c3e50;
  margin: 0 0 8px 0;
}

.welcome-text {
  color: #6b6b80;
  font-size: 16px;
  margin: 0;
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 24px;
  margin-bottom: 40px;
}

.stat-card {
  background: #ffffff;
  border: 1px solid #f0e0e6;
  border-radius: 16px;
  padding: 24px;
  display: flex;
  align-items: center;
  gap: 20px;
  transition: all 0.3s ease;
}

.stat-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 12px 32px rgba(180, 120, 140, 0.15);
  border-color: #e0c0cc;
}

.stat-icon {
  width: 64px;
  height: 64px;
  border-radius: 14px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 28px;
  flex-shrink: 0;
}

.stat-card:nth-child(1) .stat-icon {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: #ffffff;
}

.stat-card:nth-child(2) .stat-icon {
  background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
  color: #ffffff;
}

.stat-card:nth-child(3) .stat-icon {
  background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%);
  color: #ffffff;
}

.stat-card:nth-child(4) .stat-icon {
  background: linear-gradient(135deg, #43e97b 0%, #38f9d7 100%);
  color: #ffffff;
}

.stat-content h3 {
  font-size: 14px;
  font-weight: 500;
  color: #6b6b80;
  margin: 0 0 8px 0;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.stat-value {
  font-size: 28px;
  font-weight: 700;
  color: #2c3e50;
  margin: 0;
}

.recent-orders {
  background: #ffffff;
  border: 1px solid #f0e0e6;
  border-radius: 16px;
  padding: 28px;
  margin-bottom: 40px;
}

.recent-orders h2 {
  font-size: 22px;
  font-weight: 600;
  color: #2c3e50;
  margin: 0 0 24px 0;
}

.loading, .no-data {
  text-align: center;
  padding: 40px;
  color: #6b6b80;
  font-size: 15px;
}

.orders-table {
  width: 100%;
  border-collapse: collapse;
}

.orders-table thead {
  background: #fdf2f6;
  border-bottom: 2px solid #f0e0e6;
}

.orders-table th {
  padding: 14px 16px;
  text-align: left;
  font-size: 13px;
  font-weight: 600;
  color: #6b6b80;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.orders-table td {
  padding: 16px;
  border-bottom: 1px solid #f0e0e6;
  font-size: 14px;
  color: #2c3e50;
}

.orders-table tbody tr:last-child td {
  border-bottom: none;
}

.orders-table tbody tr:hover {
  background: #fdf2f6;
}

.status-badge {
  display: inline-block;
  padding: 6px 12px;
  border-radius: 20px;
  font-size: 12px;
  font-weight: 600;
  text-transform: capitalize;
}

.status-pending {
  background: #fff3cd;
  color: #856404;
}

.status-processing {
  background: #cce5ff;
  color: #004085;
}

.status-completed {
  background: #d4edda;
  color: #155724;
}

.status-cancelled {
  background: #f8d7da;
  color: #721c24;
}

.status-default {
  background: #e2e3e5;
  color: #383d41;
}

.quick-actions {
  background: #ffffff;
  border: 1px solid #f0e0e6;
  border-radius: 16px;
  padding: 28px;
}

.quick-actions h2 {
  font-size: 22px;
  font-weight: 600;
  color: #2c3e50;
  margin: 0 0 24px 0;
}

.actions-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 16px;
}

.action-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 12px;
  padding: 28px 20px;
  background: #fdf2f6;
  border: 2px solid #f0e0e6;
  border-radius: 14px;
  text-decoration: none;
  color: #2c3e50;
  font-weight: 600;
  font-size: 15px;
  transition: all 0.3s ease;
}

.action-card i {
  font-size: 36px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
}

.action-card:hover {
  background: #ffffff;
  border-color: #667eea;
  transform: translateY(-4px);
  box-shadow: 0 8px 24px rgba(102, 126, 234, 0.2);
}

@media (max-width: 768px) {
  .admin-dashboard {
    padding: 20px 16px;
  }

  .dashboard-header h1 {
    font-size: 26px;
  }

  .stats-grid {
    grid-template-columns: 1fr;
  }

  .orders-table {
    font-size: 12px;
  }

  .orders-table th,
  .orders-table td {
    padding: 10px 8px;
  }

  .actions-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}
</style>