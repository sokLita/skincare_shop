<template>
  <nav class="site-navbar" :class="{ 'nav-scrolled': isScrolled }">
    <div class="nav-container">

      <!-- Brand -->
      <router-link class="nav-brand" to="/">
        <span class="nav-brand-mark" aria-hidden="true">J</span>
        <span class="nav-brand-name">June</span>
        <span class="nav-brand-shop">Shop</span>
      </router-link>

      <!-- Mobile Toggle -->
      <button class="nav-toggler" type="button" @click="toggleNav" :class="{ active: isNavOpen }" aria-label="Toggle navigation">
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
            <router-link class="nav-link" to="/" @click="closeNav">{{ t('nav.home') }}</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/products" @click="closeNav">{{ t('nav.products') }}</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/about" @click="closeNav">{{ t('nav.about') }}</router-link>
          </li>
          <li class="nav-item" v-if="authStore.isAuthenticated">
            <router-link class="nav-link" to="/orders" @click="closeNav">{{ t('nav.myOrders') }}</router-link>
          </li>
          <li class="nav-item" v-if="authStore.isAdmin">
            <router-link class="nav-link" to="/admin" @click="closeNav">{{ t('nav.admin') }}</router-link>
          </li>
        </ul>

        <!-- Right Actions -->
        <div class="nav-actions">
          <!-- Dark Mode Toggle -->
          <button class="nav-btn nav-btn--icon dark-mode-trigger" @click="toggleDarkMode" :title="isDark ? 'Switch to light mode' : 'Switch to dark mode'" aria-label="Toggle dark mode">
            <i :class="isDark ? 'fas fa-sun' : 'fas fa-moon'"></i>
          </button>

          <!-- Language Switcher -->
          <div class="nav-dropdown lang-switcher">
            <button class="nav-btn nav-btn--icon" @click="isLangOpen = !isLangOpen" @blur="onLangBlur" :title="t('nav.language')">
              <i class="fas fa-globe"></i>
              <span class="lang-label">{{ currentLocale === 'kh' ? 'KH' : 'EN' }}</span>
            </button>
            <div class="dropdown-menu lang-menu" :class="{ show: isLangOpen }">
              <button class="dropdown-item" :class="{ active: currentLocale === 'en' }" @click="switchLang('en')">
                <span class="lang-flag">🇬🇧</span> English
              </button>
              <button class="dropdown-item" :class="{ active: currentLocale === 'kh' }" @click="switchLang('kh')">
                <span class="lang-flag">🇰🇭</span> ភាសាខ្មែរ
              </button>
            </div>
          </div>

          <!-- Wishlist -->
          <router-link to="/wishlist" class="nav-btn nav-btn--icon" @click="closeNav" aria-label="Wishlist">
            <i class="fas fa-heart"></i>
            <span>{{ t('nav.wishlist') }}</span>
            <span class="cart-badge wishlist-badge" v-if="authStore.isAuthenticated && wishlistStore.count > 0">{{ wishlistStore.count }}</span>
          </router-link>
          <!-- Cart -->
          <router-link to="/cart" class="nav-btn nav-btn--icon nav-btn--cart" @click="closeNav" aria-label="Shopping cart">
            <i class="fas fa-shopping-bag"></i>
            <span>{{ t('nav.cart') }}</span>
            <span class="cart-badge" v-if="cartStore.count > 0">{{ cartStore.count }}</span>
          </router-link>

          <!-- Admin Notifications Bell -->
          <div v-if="authStore.isAdmin" class="nav-btn nav-btn--icon" style="position:relative;">
            <router-link to="/admin" @click="closeNav" style="color:inherit;text-decoration:none;display:flex;align-items:center;gap:4px;">
              <i class="fas fa-bell"></i>
              <span class="cart-badge notification-badge" v-if="newOrdersCount > 0">{{ newOrdersCount }}</span>
            </router-link>
          </div>

          <!-- User Dropdown -->
          <div v-if="authStore.isAuthenticated" class="nav-dropdown" ref="dropdownContainer">
            <button
              class="nav-btn nav-btn--user"
              @click="isDropdownOpen = !isDropdownOpen"
              ref="dropdownToggle"
            >
              <span class="user-avatar">{{ userInitial }}</span>
              <span class="user-name">{{ authStore.user?.name }}</span>
              <span class="dropdown-arrow" :class="{ open: isDropdownOpen }" aria-hidden="true"></span>
            </button>
            <div class="dropdown-menu" :class="{ show: isDropdownOpen }">
              <button class="dropdown-item" @click="goToProfile" type="button">{{ t('nav.profile') }}</button>
              <div class="dropdown-divider"></div>
              <button class="dropdown-item dropdown-item--danger" @click="handleLogout" type="button">{{ t('nav.logout') }}</button>
            </div>
          </div>

          <!-- Login -->
          <router-link v-else to="/login" class="nav-btn nav-btn--login" @click="closeNav"><span>{{ t('nav.login') }}</span></router-link>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
import { useAuthStore } from '../stores/auth'
import { useCartStore } from '../stores/cart'
import { useWishlistStore } from '../stores/wishlist'
import { useDarkMode } from '../composables/useDarkMode'
import { useTranslation } from '../composables/useTranslation'
import axios from 'axios'

export default {
  name: 'SiteNavbar',

  data() {
    return {
      isNavOpen: false,
      isDropdownOpen: false,
      isLangOpen: false,
      isScrolled: false,
      newOrdersCount: 0,
      newOrdersPolling: null
    }
  },

  setup() {
    const authStore = useAuthStore()
    const cartStore = useCartStore()
    const wishlistStore = useWishlistStore()
    const darkMode = useDarkMode()
    const { t, currentLocale, setLocale } = useTranslation()
    return { authStore, cartStore, wishlistStore, darkMode, t, currentLocale, setLocale }
  },

  mounted() {
    if (this.authStore.isAuthenticated) {
      this.cartStore.fetchCart()
      this.wishlistStore.fetchWishlist()
    }
    if (this.authStore.isAdmin) {
      this.startNewOrdersPolling()
    }
    window.addEventListener('scroll', this.onScroll)
    document.addEventListener('click', this.onClickOutside)
  },

  beforeUnmount() {
    window.removeEventListener('scroll', this.onScroll)
    document.removeEventListener('click', this.onClickOutside)
    this.stopNewOrdersPolling()
  },

  computed: {
    userInitial() {
      return this.authStore.user?.name?.charAt(0)?.toUpperCase() || 'U'
    },
    isDark() {
      return this.darkMode.isDark
    }
  },

  watch: {
    'authStore.isAuthenticated'(isAuthenticated) {
      if (isAuthenticated) {
        this.cartStore.fetchCart()
        this.wishlistStore.fetchWishlist()
        return
      }
      this.cartStore.clearLocalCart()
      this.wishlistStore.clearWishlist()
    },
    'authStore.isAdmin'(isAdmin) {
      if (isAdmin) {
        this.startNewOrdersPolling()
      } else {
        this.stopNewOrdersPolling()
        this.newOrdersCount = 0
      }
    }
  },

  methods: {
    toggleDarkMode() {
      this.darkMode.toggle()
    },

    toggleNav() {
      this.isNavOpen = !this.isNavOpen
      document.body.style.overflow = this.isNavOpen ? 'hidden' : ''
    },

    closeNav() {
      this.isNavOpen = false
      document.body.style.overflow = ''
    },

    onClickOutside(event) {
      const container = this.$refs.dropdownContainer
      if (container && !container.contains(event.target)) {
        this.isDropdownOpen = false
      }
    },

    onLangBlur() {
      setTimeout(() => {
        this.isLangOpen = false
      }, 150)
    },

    switchLang(lang) {
      this.setLocale(lang)
      this.isLangOpen = false
    },

    onScroll() {
      this.isScrolled = window.scrollY > 20
    },

    goToProfile() {
      this.isDropdownOpen = false
      this.closeNav()
      this.$router.push('/profile')
    },

    async handleLogout() {
      this.isDropdownOpen = false
      this.closeNav()
      await this.authStore.logout()
      this.$router.push('/login')
    },

    async fetchNewOrdersCount() {
      if (!this.authStore.isAdmin) return
      try {
        const response = await axios.get('/admin/new-orders-count')
        this.newOrdersCount = response.data.count || 0
      } catch (error) {
        // silently fail
      }
    },

    startNewOrdersPolling() {
      this.fetchNewOrdersCount()
      this.newOrdersPolling = setInterval(() => {
        this.fetchNewOrdersCount()
      }, 30000)
    },

    stopNewOrdersPolling() {
      if (this.newOrdersPolling) {
        clearInterval(this.newOrdersPolling)
        this.newOrdersPolling = null
      }
    }
  }
}
</script>

<style scoped>
.site-navbar { position: fixed; top: 0; left: 0; right: 0; z-index: 1050; background: rgba(255,255,255,.75); backdrop-filter: blur(14px); -webkit-backdrop-filter: blur(14px); border-bottom: 1px solid rgba(240,224,230,.6); transition: all .3s ease; }
.site-navbar.nav-scrolled { box-shadow: 0 8px 30px rgba(0,0,0,.08); background: rgba(255,255,255,.9); }
.nav-container { max-width: 1200px; margin: 0 auto; padding: 0 24px; height: 68px; display: flex; align-items: center; justify-content: space-between; }
.nav-collapse { display: flex; align-items: center; justify-content: flex-end; gap: 28px; flex: 1; }
.nav-overlay { display: none; }
.nav-brand { display: flex; align-items: center; gap: 6px; text-decoration: none; }
.nav-brand-mark { width: 32px; height: 32px; border-radius: 10px; background: linear-gradient(135deg,#667eea,#764ba2); color: #fff; display: inline-flex; align-items: center; justify-content: center; font-weight: 800; font-size: 16px; }
.nav-brand-name { font-weight: 800; font-size: 18px; color: #2c3e50; letter-spacing: -.5px; }
.nav-brand-shop { font-weight: 400; font-size: 14px; color: #8a7a82; }
.nav-toggler { display: none; flex-direction: column; justify-content: center; gap: 5px; background: transparent; border: none; padding: 8px; cursor: pointer; z-index: 1060; }
.toggler-line { display: block; width: 24px; height: 2px; background: #2c3e50; border-radius: 2px; transition: .3s; }
.nav-toggler.active .toggler-line:nth-child(1) { transform: rotate(45deg) translate(4px,4px); }
.nav-toggler.active .toggler-line:nth-child(2) { opacity: 0; }
.nav-toggler.active .toggler-line:nth-child(3) { transform: rotate(-45deg) translate(4px,-4px); }
.nav-links { display: flex; align-items: center; gap: 8px; list-style: none; margin: 0; padding: 0; }
.nav-link { padding: 8px 14px; border-radius: 8px; font-size: 14px; font-weight: 600; color: #5a4a52; text-decoration: none; transition: .25s; }
.nav-link:hover, .nav-link.router-link-exact-active { background: rgba(102,126,234,.08); color: #667eea; }
.nav-actions { display: flex; align-items: center; gap: 10px; }
.nav-btn { display: inline-flex; align-items: center; gap: 6px; padding: 7px 12px; border-radius: 10px; background: transparent; border: 1px solid rgba(0,0,0,.04); cursor: pointer; transition: .25s; position: relative; color: #2c3e50; font-size: 14px; font-weight: 600; text-decoration: none; }
.nav-btn:hover { transform: translateY(-2px); box-shadow: 0 6px 18px rgba(0,0,0,.08); }
.user-avatar { width: 24px; height: 24px; border-radius: 999px; display: inline-flex; align-items: center; justify-content: center; background: rgba(102,126,234,.12); color: #667eea; font-size: 12px; font-weight: 800; }
.user-name { max-width: 120px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
.dropdown-arrow { width: 8px; height: 8px; border-right: 2px solid currentColor; border-bottom: 2px solid currentColor; transform: rotate(45deg) translateY(-2px); transition: transform .2s ease; }
.dropdown-arrow.open { transform: rotate(225deg) translateY(-2px); }
.cart-badge { position: absolute; top: -5px; right: -5px; background: linear-gradient(135deg,#667eea,#764ba2); color: #fff; font-size: 10px; font-weight: 700; padding: 2px 6px; border-radius: 999px; }
.notification-badge { background: linear-gradient(135deg,#f093fb,#f5576c); animation: pulse 2s infinite; }
@keyframes pulse { 0% { transform: scale(1); } 50% { transform: scale(1.1); } 100% { transform: scale(1); } }
.nav-btn--login { padding: 0 16px; background: linear-gradient(135deg,#667eea,#764ba2); color: #fff; border: none; }
.nav-btn--login:hover { opacity: .9; }
.nav-dropdown { position: relative; }
.dropdown-menu { position: absolute; right: 0; top: 120%; width: 200px; background: #fff; border-radius: 12px; border: 1px solid rgba(0,0,0,.06); box-shadow: 0 10px 30px rgba(0,0,0,.1); opacity: 0; visibility: hidden; transform: translateY(8px); transition: .25s; }
.dropdown-menu.show { opacity: 1; visibility: visible; transform: translateY(0); }
.dropdown-item { padding: 10px 12px; display: flex; gap: 10px; font-size: 13px; cursor: pointer; border-radius: 8px; color: #2c3e50; text-decoration: none; width: 100%; border: 0; background: transparent; text-align: left; }
.dropdown-item--danger { color: #c2415b; }
.dropdown-item:hover { background: rgba(102,126,234,.08); }
.dropdown-divider { height: 1px; background: #eee; margin: 6px 0; }
.lang-switcher .lang-label { font-weight: 700; font-size: 12px; letter-spacing: 0.5px; }
.lang-menu { width: 180px; left: 0; right: auto; }
.lang-menu .dropdown-item.active { background: rgba(102,126,234,.1); color: #667eea; font-weight: 700; }
.lang-flag { font-size: 16px; }
@media (max-width: 992px) {
  .lang-menu { width: 100%; left: auto; right: 0; }
}
@media (max-width: 992px) {
  .nav-toggler { display: flex; }
  .nav-collapse { position: fixed; inset: 0; background: #fff; display: flex; flex-direction: column; align-items: stretch; justify-content: flex-start; gap: 0; padding: 80px 24px; opacity: 0; visibility: hidden; transform: translateY(-10px); transition: .3s; }
  .nav-collapse.show { opacity: 1; visibility: visible; transform: translateY(0); }
  .nav-links { flex-direction: column; margin: 0 0 20px; }
  .nav-actions { flex-wrap: wrap; align-items: stretch; }
  .nav-btn, .nav-link { width: 100%; justify-content: center; }
}
</style>