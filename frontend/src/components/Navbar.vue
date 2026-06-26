<template>
  <nav class="site-navbar" :class="{ 'nav-scrolled': isScrolled }">
    <div class="nav-container">

      <!-- Brand -->
      <router-link class="nav-brand" to="/">
        <i class="fas fa-spa nav-brand-icon"></i>
        <span class="nav-brand-name">Skincare</span>
        <span class="nav-brand-shop">Shop</span>
      </router-link>

      <!-- Mobile Toggle -->
      <button
        class="nav-toggler"
        type="button"
        @click="toggleNav"
        :class="{ active: isNavOpen }"
        aria-label="Toggle navigation"
      >
        <span class="toggler-line"></span>
        <span class="toggler-line"></span>
        <span class="toggler-line"></span>
      </button>

      <!-- Collapse -->
      <div class="nav-collapse" :class="{ show: isNavOpen }">

        <div class="nav-overlay" @click="closeNav"></div>

        <!-- Left Links -->
        <ul class="nav-links">
          <li class="nav-item">
            <router-link class="nav-link" to="/" @click="closeNav">Home</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/products" @click="closeNav">Products</router-link>
          </li>
          <li class="nav-item" v-if="authStore.isAuthenticated">
            <router-link class="nav-link" to="/orders" @click="closeNav">My Orders</router-link>
          </li>
          <li class="nav-item" v-if="authStore.isAdmin">
            <router-link class="nav-link" to="/admin" @click="closeNav">
              <i class="fas fa-cog"></i> Admin
            </router-link>
          </li>
        </ul>

        <!-- Right Actions -->
        <div class="nav-actions">

          <!-- Wishlist -->
          <router-link
            to="/wishlist"
            class="nav-btn nav-btn--icon"
            v-if="authStore.isAuthenticated"
            @click="closeNav"
            aria-label="Wishlist"
          >
            <i class="fas fa-heart"></i>
          </router-link>

          <!-- Cart -->
          <router-link
            to="/cart"
            class="nav-btn nav-btn--icon nav-btn--cart"
            @click="closeNav"
            aria-label="Shopping cart"
          >
            <i class="fas fa-shopping-cart"></i>
            <span class="cart-badge" v-if="cartStore.count > 0">
              {{ cartStore.count }}
            </span>
          </router-link>

          <!-- User Dropdown -->
          <div v-if="authStore.isAuthenticated" class="nav-dropdown">
            <button
              class="nav-btn nav-btn--user"
              @click="isDropdownOpen = !isDropdownOpen"
              @blur="onDropdownBlur"
            >
              <i class="fas fa-user"></i>
              <span class="user-name">{{ authStore.user?.name }}</span>
              <i class="fas fa-chevron-down dropdown-arrow" :class="{ open: isDropdownOpen }"></i>
            </button>

            <div class="dropdown-menu" :class="{ show: isDropdownOpen }">
              <router-link class="dropdown-item" to="/profile" @click="closeNav">
                <i class="fas fa-id-card"></i> Profile
              </router-link>
              <div class="dropdown-divider"></div>
              <button class="dropdown-item dropdown-item--danger" @click="logout">
                <i class="fas fa-sign-out-alt"></i> Logout
              </button>
            </div>
          </div>

          <!-- Login -->
          <router-link v-else to="/login" class="nav-btn nav-btn--login" @click="closeNav">
            <i class="fas fa-sign-in-alt"></i>
            <span>Login</span>
          </router-link>

        </div>
      </div>

    </div>
  </nav>
</template>

<script>
import { useAuthStore } from '../stores/auth'
import { useCartStore } from '../stores/cart'

export default {
  name: 'SiteNavbar',

  data() {
    return {
      isNavOpen: false,
      isDropdownOpen: false,
      isScrolled: false
    }
  },

  setup() {
    const authStore = useAuthStore()
    const cartStore = useCartStore()
    return { authStore, cartStore }
  },

  mounted() {
    if (this.authStore.isAuthenticated) {
      this.cartStore.fetchCart()
    }
    window.addEventListener('scroll', this.onScroll)
  },

  beforeUnmount() {
    window.removeEventListener('scroll', this.onScroll)
  },

  methods: {
    toggleNav() {
      this.isNavOpen = !this.isNavOpen
      document.body.style.overflow = this.isNavOpen ? 'hidden' : ''
    },

    closeNav() {
      this.isNavOpen = false
      document.body.style.overflow = ''
    },

    onDropdownBlur() {
      setTimeout(() => {
        this.isDropdownOpen = false
      }, 150)
    },

    onScroll() {
      this.isScrolled = window.scrollY > 20
    },

    async logout() {
      this.closeNav()
      await this.authStore.logout()
      this.$router.push('/login')
      this.isDropdownOpen = false
    }
  }
}
</script>

<style scoped>
/* ===========================
   MODERN GLASS NAVBAR UI
   =========================== */

.site-navbar {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1050;

  background: rgba(255, 255, 255, 0.75);
  backdrop-filter: blur(14px);
  -webkit-backdrop-filter: blur(14px);

  border-bottom: 1px solid rgba(240, 224, 230, 0.6);
  transition: all 0.3s ease;
}

.site-navbar.nav-scrolled {
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.08);
  background: rgba(255, 255, 255, 0.9);
}

.nav-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 24px;
  height: 68px;

  display: flex;
  align-items: center;
  justify-content: space-between;
}

/* BRAND */
.nav-brand {
  display: flex;
  align-items: center;
  gap: 6px;
  text-decoration: none;
}

.nav-brand-icon {
  font-size: 22px;
  background: linear-gradient(135deg, #667eea, #764ba2);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.nav-brand-name {
  font-size: 20px;
  font-weight: 700;
  color: #2c3e50;
}

.nav-brand-shop {
  font-size: 20px;
  font-weight: 300;
  color: #667eea;
}

/* TOGGLER */
.nav-toggler {
  display: none;
  width: 42px;
  height: 42px;
  border-radius: 12px;
  border: 1px solid rgba(0,0,0,0.08);
  background: white;
  cursor: pointer;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 5px;
  transition: 0.3s;
}

.nav-toggler:hover {
  transform: scale(1.05);
}

.toggler-line {
  width: 18px;
  height: 2px;
  background: #6b6b80;
  border-radius: 2px;
  transition: 0.3s;
}

.nav-toggler.active .toggler-line:nth-child(1) {
  transform: rotate(45deg) translateY(6px);
}
.nav-toggler.active .toggler-line:nth-child(2) {
  opacity: 0;
}
.nav-toggler.active .toggler-line:nth-child(3) {
  transform: rotate(-45deg) translateY(-6px);
}

/* LINKS */
.nav-links {
  display: flex;
  list-style: none;
  gap: 6px;
  /* margin-right: auto; */
}

.nav-link {
  padding: 10px 16px;
  border-radius: 10px;
  font-size: 14px;
  color: #6b6b80;
  text-decoration: none;
  transition: 0.25s;
}

.nav-link:hover {
  background: rgba(102, 126, 234, 0.08);
  color: #2c3e50;
}

.nav-link.router-link-exact-active {
  background: rgba(102, 126, 234, 0.12);
  color: #667eea;
  font-weight: 600;
}

/* ACTIONS */
.nav-actions {
  display: flex;
  align-items: center;
  gap: 10px;
}

.nav-btn {
  height: 40px;
  min-width: 40px;
  border-radius: 12px;
  border: 1px solid rgba(0,0,0,0.08);
  background: white;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: 0.25s;
  position: relative;
}

.nav-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 18px rgba(0,0,0,0.08);
}

/* CART */
.nav-btn--cart {
  position: relative;
}

.cart-badge {
  position: absolute;
  top: -5px;
  right: -5px;
  background: linear-gradient(135deg, #667eea, #764ba2);
  color: white;
  font-size: 10px;
  font-weight: 700;
  padding: 2px 6px;
  border-radius: 999px;
}

/* LOGIN */
.nav-btn--login {
  padding: 0 16px;
  background: linear-gradient(135deg, #667eea, #764ba2);
  color: white;
  border: none;
}

.nav-btn--login:hover {
  opacity: 0.9;
}

/* DROPDOWN */
.nav-dropdown {
  position: relative;
}

.dropdown-menu {
  position: absolute;
  right: 0;
  top: 120%;
  width: 200px;
  background: white;
  border-radius: 12px;
  border: 1px solid rgba(0,0,0,0.06);
  box-shadow: 0 10px 30px rgba(0,0,0,0.1);

  opacity: 0;
  visibility: hidden;
  transform: translateY(8px);
  transition: 0.25s;
}

.dropdown-menu.show {
  opacity: 1;
  visibility: visible;
  transform: translateY(0);
}

.dropdown-item {
  padding: 10px 12px;
  display: flex;
  gap: 10px;
  font-size: 13px;
  cursor: pointer;
  border-radius: 8px;
}

.dropdown-item:hover {
  background: rgba(102, 126, 234, 0.08);
}

.dropdown-divider {
  height: 1px;
  background: #eee;
  margin: 6px 0;
}

/* RESPONSIVE */
@media (max-width: 992px) {
  .nav-toggler {
    display: flex;
  }

  .nav-collapse {
    position: fixed;
    inset: 0;
    background: white;
    flex-direction: column;
    padding: 80px 24px;
    opacity: 0;
    visibility: hidden;
    transform: translateY(-10px);
    transition: 0.3s;
  }

  .nav-collapse.show {
    opacity: 1;
    visibility: visible;
    transform: translateY(0);
  }

  .nav-links {
    flex-direction: column;
    margin: 0 0 20px;
  }

  .nav-actions {
    flex-wrap: wrap;
  }
}
</style>