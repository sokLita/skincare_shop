<template>
  <div class="landing-page">

    <!-- ============================================
         HERO / SPLIT LAYOUT
         ============================================ -->
    <section class="hero-section">
      <!-- Decorative background blobs -->
      <div class="hero-bg-blob blob--1"></div>
      <div class="hero-bg-blob blob--2"></div>
      <div class="hero-bg-blob blob--3"></div>
      <div class="hero-bg-glow glow--tl"></div>
      <div class="hero-bg-glow glow--br"></div>

      <!-- Floating botanical decorations -->
      <div class="botanical botanical--leaf-1">
        <svg viewBox="0 0 60 80" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M30 80C30 80 5 55 5 30C5 13.4 18.4 0 35 0C42 0 48 2.5 52 7C56 11.5 58 17.5 58 24C58 38 45 50 35 55" stroke="#a8d5ba" stroke-width="1.5" fill="none" opacity="0.6"/>
          <path d="M30 80C30 80 55 55 55 30C55 13.4 41.6 0 25 0C18 0 12 2.5 8 7C4 11.5 2 17.5 2 24C2 38 15 50 25 55" stroke="#c5e0c9" stroke-width="1" fill="none" opacity="0.4"/>
        </svg>
      </div>
      <div class="botanical botanical--leaf-2">
        <svg viewBox="0 0 50 70" fill="none" xmlns="http://www.w3.org/2000/svg">
          <ellipse cx="25" cy="35" rx="22" ry="32" fill="rgba(200, 230, 200, 0.15)" stroke="#b8d8be" stroke-width="1"/>
          <path d="M25 10C25 10 15 22 15 35C15 45 20 55 25 60" stroke="#a8d5ba" stroke-width="1.2" fill="none" opacity="0.5"/>
          <path d="M25 10C25 10 35 22 35 35C35 45 30 55 25 60" stroke="#c5e0c9" stroke-width="0.8" fill="none" opacity="0.4"/>
        </svg>
      </div>
      <div class="botanical botanical--flower-1">
        <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="20" cy="20" r="8" fill="#f5d5d5" opacity="0.3"/>
          <circle cx="20" cy="12" r="8" fill="#fce8e8" opacity="0.3"/>
          <circle cx="28" cy="20" r="8" fill="#fce8e8" opacity="0.3"/>
          <circle cx="12" cy="20" r="8" fill="#fce8e8" opacity="0.3"/>
          <circle cx="20" cy="28" r="8" fill="#fce8e8" opacity="0.3"/>
          <circle cx="20" cy="20" r="4" fill="#f5e6c8" opacity="0.5"/>
        </svg>
      </div>
      <div class="botanical botanical--flower-2">
        <svg viewBox="0 0 35 35" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="17.5" cy="17.5" r="7" fill="#e8f0e8" opacity="0.25"/>
          <circle cx="17.5" cy="10.5" r="7" fill="#f0f8f0" opacity="0.25"/>
          <circle cx="24.5" cy="17.5" r="7" fill="#f0f8f0" opacity="0.25"/>
          <circle cx="10.5" cy="17.5" r="7" fill="#f0f8f0" opacity="0.25"/>
          <circle cx="17.5" cy="24.5" r="7" fill="#f0f8f0" opacity="0.25"/>
          <circle cx="17.5" cy="17.5" r="3.5" fill="#f7f0d8" opacity="0.5"/>
        </svg>
      </div>

      <div class="hero-container">
        <!-- ========== LEFT COLUMN: HERO CONTENT ========== -->
        <div class="hero-left">

          <!-- Badge -->
          <div class="hero-badge">
            <span class="hero-badge-dot"></span>
            {{ t('login.badge') }}
          </div>

          <!-- Headline -->
          <h1 class="hero-headline">
            {{ t('login.headline1') }}<br/>
            <span class="hero-headline-accent">{{ t('login.headline2') }}</span>
          </h1>

          <!-- Subtitle -->
          <p class="hero-subtitle">
            {{ t('login.subtitle') }}
          </p>

          <!-- ===== PRODUCT SHOWCASE ===== -->
          <div class="product-showcase">
            <!-- Stone platform base -->
            <div class="stone-platform">
              <div class="stone-surface"></div>
              <div class="stone-body"></div>
              <div class="stone-shadow"></div>
            </div>

            <!-- Products arranged on the platform -->
            <div class="products-arrangement">
              <!-- Facial Cleanser -->
              <div class="product-item product--cleanser">
                <div class="product-card-img">
                  <img src="/images/facial-cleanser.jpg" :alt="t('login.cleanser')" class="product-real-img" />
                </div>
                <span class="product-label">{{ t('login.cleanser') }}</span>
              </div>

              <!-- Vitamin C Serum -->
              <div class="product-item product--serum">
                <div class="product-card-img">
                  <img src="/images/vitamin-c-serum.jpg" :alt="t('login.serum')" class="product-real-img" />
                </div>
                <span class="product-label">{{ t('login.serum') }}</span>
              </div>

              <!-- Moisturizer Cream -->
              <div class="product-item product--moisturizer">
                <div class="product-card-img">
                  <img src="/images/moisturizer.jpg" :alt="t('login.moisturizer')" class="product-real-img" />
                </div>
                <span class="product-label">{{ t('login.moisturizer') }}</span>
              </div>

              <!-- Toner Bottle -->
              <div class="product-item product--toner">
                <div class="product-card-img">
                  <img src="/images/toner.jpg" :alt="t('login.toner')" class="product-real-img" />
                </div>
                <span class="product-label">{{ t('login.toner') }}</span>
              </div>
            </div>

            <!-- Botanicals on the platform -->
            <div class="platform-botanicals">
              <div class="platform-leaf leaf--1">
                <svg viewBox="0 0 24 40" fill="none">
                  <path d="M12 40C6 32 0 20 0 12C0 5.4 5.4 0 12 0C18.6 0 24 5.4 24 12C24 20 18 32 12 40Z" fill="#a8d5ba" opacity="0.6"/>
                  <path d="M12 40C8 30 4 18 4 10C4 5 7 0 12 0" fill="#c5e0c9" opacity="0.4"/>
                </svg>
              </div>
              <div class="platform-leaf leaf--2">
                <svg viewBox="0 0 20 32" fill="none">
                  <path d="M10 32C5 25 0 16 0 9C0 4 4.5 0 10 0C15.5 0 20 4 20 9C20 16 15 25 10 32Z" fill="#b8d8be" opacity="0.5"/>
                </svg>
              </div>
              <div class="platform-leaf leaf--3">
                <svg viewBox="0 0 18 28" fill="none">
                  <path d="M9 28C4 22 0 14 0 8C0 3.6 4 0 9 0C14 0 18 3.6 18 8C18 14 14 22 9 28Z" fill="#c5e0c9" opacity="0.5"/>
                </svg>
              </div>
              <div class="platform-flower flower--1">
                <svg viewBox="0 0 24 24">
                  <circle cx="12" cy="12" r="5" fill="white" opacity="0.8"/>
                  <circle cx="12" cy="7" r="4" fill="white" opacity="0.6"/>
                  <circle cx="17" cy="12" r="4" fill="white" opacity="0.6"/>
                  <circle cx="7" cy="12" r="4" fill="white" opacity="0.6"/>
                  <circle cx="12" cy="17" r="4" fill="white" opacity="0.6"/>
                  <circle cx="12" cy="12" r="2.5" fill="#f5e6c8"/>
                </svg>
              </div>
              <div class="platform-flower flower--2">
                <svg viewBox="0 0 20 20">
                  <circle cx="10" cy="10" r="4" fill="white" opacity="0.7"/>
                  <circle cx="10" cy="6" r="3.5" fill="white" opacity="0.5"/>
                  <circle cx="14" cy="10" r="3.5" fill="white" opacity="0.5"/>
                  <circle cx="6" cy="10" r="3.5" fill="white" opacity="0.5"/>
                  <circle cx="10" cy="14" r="3.5" fill="white" opacity="0.5"/>
                  <circle cx="10" cy="10" r="2" fill="#e8e0c8"/>
                </svg>
              </div>
            </div>

            <!-- Glowing circles -->
            <div class="product-glow glow--c1"></div>
            <div class="product-glow glow--c2"></div>
            <div class="product-glow glow--c3"></div>
          </div>

          <!-- ===== FEATURE ICONS ===== -->
          <div class="feature-icons">
            <div class="feature-icon-item">
              <div class="feature-icon-circle">
                <span class="feature-icon-emoji">🌿</span>
              </div>
              <span class="feature-icon-text">{{ t('login.natural') }}</span>
            </div>
            <div class="feature-icon-item">
              <div class="feature-icon-circle">
                <span class="feature-icon-emoji">🧪</span>
              </div>
              <span class="feature-icon-text">{{ t('login.dermatologistTested') }}</span>
            </div>
            <div class="feature-icon-item">
              <div class="feature-icon-circle">
                <span class="feature-icon-emoji">🐰</span>
              </div>
              <span class="feature-icon-text">{{ t('login.crueltyFree') }}</span>
            </div>
            <div class="feature-icon-item">
              <div class="feature-icon-circle">
                <span class="feature-icon-emoji">💧</span>
              </div>
              <span class="feature-icon-text">{{ t('login.hydrating') }}</span>
            </div>
          </div>

        </div>

        <!-- ========== RIGHT COLUMN: SIGN IN CARD ========== -->
        <div class="hero-right">
          <div class="signup-card">

            <!-- Logo -->
            <div class="signup-logo">
              <div class="logo-circle">
                <svg viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="30" cy="30" r="28" stroke="url(#logoGrad)" stroke-width="2" fill="url(#logoBg)"/>
                  <path d="M16 30C16 22.3 22.3 16 30 16C37.7 16 44 22.3 44 30C44 33.5 42.5 36.7 40 39" stroke="url(#logoGrad)" stroke-width="2" stroke-linecap="round" fill="none"/>
                  <path d="M30 22V30L36 34" stroke="url(#logoGrad)" stroke-width="2.5" stroke-linecap="round" fill="none"/>
                  <defs>
                    <linearGradient id="logoGrad" x1="10" y1="10" x2="50" y2="50">
                      <stop offset="0%" stop-color="#667eea"/>
                      <stop offset="100%" stop-color="#764ba2"/>
                    </linearGradient>
                    <radialGradient id="logoBg" cx="0.5" cy="0.5" r="0.5">
                      <stop offset="0%" stop-color="rgba(255,255,255,0.9)"/>
                      <stop offset="100%" stop-color="rgba(255,255,255,0.5)"/>
                    </radialGradient>
                  </defs>
                </svg>
                <div class="logo-inner-icon">
                  <svg viewBox="0 0 24 24" fill="none">
                    <path d="M12 2L15 9L22 9L16.5 14L18.5 21L12 17L5.5 21L7.5 14L2 9L9 9L12 2Z" fill="url(#starGrad)"/>
                    <defs>
                      <linearGradient id="starGrad" x1="2" y1="2" x2="22" y2="21">
                        <stop offset="0%" stop-color="#667eea"/>
                        <stop offset="100%" stop-color="#764ba2"/>
                      </linearGradient>
                    </defs>
                  </svg>
                </div>
              </div>
            </div>

            <!-- Title -->
            <h2 class="signup-title">{{ t('login.welcomeBack') }}</h2>
            <p class="signup-subtitle">{{ t('login.signInSubtitle') }}</p>

            <!-- Form -->
            <form @submit.prevent="handleSignIn" class="signup-form">

              <!-- Email -->
              <div class="form-field">
                <label for="signin-email" class="sr-only">{{ t('login.emailLabel') }}</label>
                <div class="input-wrapper">
                  <svg class="input-icon" viewBox="0 0 20 16" fill="none" width="18" height="18" aria-hidden="true">
                    <rect x="1" y="1" width="18" height="14" rx="3" stroke="currentColor" stroke-width="1.5" fill="none"/>
                    <path d="M1 3L10 10L19 3" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" fill="none"/>
                  </svg>
                  <input
                    id="signin-email"
                    type="email"
                    v-model="signinForm.email"
                    :placeholder="t('login.emailPlaceholder')"
                    class="form-input"
                    autocomplete="email"
                    required
                  />
                </div>
              </div>

              <!-- Password -->
              <div class="form-field">
                <label for="signin-password" class="sr-only">{{ t('login.passwordLabel') }}</label>
                <div class="input-wrapper">
                  <svg class="input-icon" viewBox="0 0 18 20" fill="none" width="18" height="18" aria-hidden="true">
                    <rect x="2" y="9" width="14" height="10" rx="2" stroke="currentColor" stroke-width="1.5" fill="none"/>
                    <path d="M5 9V5C5 2.8 6.8 1 9 1C11.2 1 13 2.8 13 5V9" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" fill="none"/>
                  </svg>
                  <input
                    id="signin-password"
                    :type="showPassword ? 'text' : 'password'"
                    v-model="signinForm.password"
                    :placeholder="t('login.passwordPlaceholder')"
                    class="form-input"
                    autocomplete="current-password"
                    required
                  />
                  <button type="button" class="password-toggle" @click="showPassword = !showPassword" tabindex="-1" :aria-label="showPassword ? t('login.hidePassword') : t('login.showPassword')">
                    <svg v-if="!showPassword" viewBox="0 0 22 16" width="18" height="18" aria-hidden="true">
                      <path d="M1 8C1 8 4.5 1 11 1C17.5 1 21 8 21 8C21 8 17.5 15 11 15C4.5 15 1 8 1 8Z" stroke="currentColor" stroke-width="1.5" fill="none"/>
                      <circle cx="11" cy="8" r="3" stroke="currentColor" stroke-width="1.5" fill="none"/>
                    </svg>
                    <svg v-else viewBox="0 0 22 16" width="18" height="18" aria-hidden="true">
                      <path d="M1 1L21 15" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
                      <path d="M8.5 4.5C9.3 3.5 10.4 3 11.5 3C14.5 3 17 7 17 8C17 8.5 16 10 14.5 11" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" fill="none"/>
                      <path d="M4.5 6C3 7.5 2 8 2 8C2 8 4.5 13 11 13C12 13 13 12.5 14 12" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" fill="none"/>
                      <circle cx="12.5" cy="7.5" r="1.5" stroke="currentColor" stroke-width="1.5" fill="none"/>
                    </svg>
                  </button>
                </div>
              </div>

              <!-- Forgot Password -->
              <div class="form-forgot">
                <router-link to="/forgot-password" class="forgot-link">{{ t('login.forgotPassword') }}</router-link>
              </div>

              <!-- Error Message -->
              <div v-if="signinError" class="form-error">
                <svg viewBox="0 0 20 20" width="16" height="16" fill="none" aria-hidden="true">
                  <circle cx="10" cy="10" r="10" fill="#e86070" opacity="0.15"/>
                  <path d="M10 6V11" stroke="#e86070" stroke-width="1.5" stroke-linecap="round"/>
                  <circle cx="10" cy="14" r="1" fill="#e86070"/>
                </svg>
                <span>{{ signinError }}</span>
              </div>

              <!-- Submit Button -->
              <button type="submit" class="signup-btn" :disabled="signinLoading">
                <span v-if="signinLoading" class="btn-spinner"></span>
                <span v-else>{{ t('login.signIn') }}</span>
              </button>
            </form>

            <!-- Register link -->
            <p class="login-link">
              {{ t('login.noAccount') }} <router-link to="/register" class="login-link-text">{{ t('login.createAccount') }}</router-link>
            </p>

            <!-- Divider -->
            <div class="divider">
              <span class="divider-line"></span>
              <span class="divider-text">{{ t('login.orContinueWith') }}</span>
              <span class="divider-line"></span>
            </div>

            <!-- Social buttons -->
            <div class="social-buttons">
              <button type="button" class="social-btn social-btn--google">
                <svg viewBox="0 0 24 24" width="20" height="20">
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                </svg>
                <span>{{ t('login.google') }}</span>
              </button>
              <button type="button" class="social-btn social-btn--facebook">
                <svg viewBox="0 0 24 24" width="20" height="20">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12S0 5.446 0 12.073c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" fill="#1877F2"/>
                </svg>
                <span>{{ t('login.facebook') }}</span>
              </button>
            </div>

            <!-- Footer links -->
            <div class="signup-footer">
              <a href="#" class="footer-link">{{ t('login.termsOfService') }}</a>
              <span class="footer-dot">·</span>
              <a href="#" class="footer-link">{{ t('login.privacyPolicy') }}</a>
            </div>

          </div>
        </div>
      </div>
    </section>

  </div>
</template>

<script>
import { useAuthStore } from '../stores/auth'
import { useTranslation } from '../composables/useTranslation'

export default {
  name: 'LoginPage',
  data() {
    return {
      signinForm: {
        email: '',
        password: ''
      },
      signinLoading: false,
      signinError: '',
      showPassword: false
    }
  },
  setup() {
    const authStore = useAuthStore()
    const { t } = useTranslation()
    authStore.initAxios()
    return { authStore, t }
  },
  methods: {
    async handleSignIn() {
      this.signinLoading = true
      this.signinError = ''
      try {
        const result = await this.authStore.login(this.signinForm.email, this.signinForm.password)
        if (result.success) {
          this.$router.push(this.$route.query.redirect || '/')
        } else {
          this.signinError = result.error || this.t('login.invalidCredentials')
        }
      } catch (error) {
        this.signinError = error.response?.data?.message || this.t('login.signInError')
      } finally {
        this.signinLoading = false
      }
    }
  }
}
</script>

<style scoped>
/* ============================================
   LOGIN PAGE — Blush Pink Theme (matching Home page)
   ============================================ */
.landing-page {
  min-height: 100vh;
  overflow-x: hidden;
  background: #fdf2f6;
  position: relative;
}

/* ==============================================
   HERO SECTION — Split Layout
   ============================================== */
.hero-section {
  position: relative;
  min-height: 100vh;
  display: flex;
  align-items: center;
  overflow: hidden;
  padding: 100px 0 60px;
  background: linear-gradient(135deg, #fce4ec 0%, #fdf2f6 40%, #ffffff 100%);
}

/* ---- Background Decorations ---- */
.hero-bg-blob {
  position: absolute;
  border-radius: 50%;
  pointer-events: none;
  filter: blur(80px);
}
.blob--1 {
  width: 600px; height: 600px;
  background: radial-gradient(circle, rgba(168, 213, 186, 0.25), transparent 70%);
  top: -200px; left: -100px;
  animation: blobFloat 12s ease-in-out infinite;
}
.blob--2 {
  width: 500px; height: 500px;
  background: radial-gradient(circle, rgba(240, 200, 180, 0.2), transparent 70%);
  bottom: -150px; right: -80px;
  animation: blobFloat 15s ease-in-out infinite 2s;
}
.blob--3 {
  width: 400px; height: 400px;
  background: radial-gradient(circle, rgba(200, 225, 240, 0.15), transparent 70%);
  top: 40%; left: 30%;
  animation: blobFloat 10s ease-in-out infinite 4s;
}

@keyframes blobFloat {
  0%, 100% { transform: translate(0, 0) scale(1); }
  33% { transform: translate(30px, -30px) scale(1.05); }
  66% { transform: translate(-20px, 20px) scale(0.95); }
}

.hero-bg-glow {
  position: absolute;
  border-radius: 50%;
  pointer-events: none;
  filter: blur(120px);
}
.glow--tl {
  width: 300px; height: 300px;
  background: rgba(168, 213, 186, 0.15);
  top: 10%; left: 15%;
  animation: glowPulse 6s ease-in-out infinite;
}
.glow--br {
  width: 250px; height: 250px;
  background: rgba(230, 200, 180, 0.12);
  bottom: 20%; right: 10%;
  animation: glowPulse 8s ease-in-out infinite 2s;
}

@keyframes glowPulse {
  0%, 100% { opacity: 0.3; transform: scale(1); }
  50% { opacity: 0.7; transform: scale(1.2); }
}

/* ---- Botanical Decorations ---- */
.botanical {
  position: absolute;
  pointer-events: none;
  opacity: 0.5;
  z-index: 1;
}
.botanical--leaf-1 {
  top: 12%; left: 5%;
  width: 80px;
  animation: sway 8s ease-in-out infinite;
}
.botanical--leaf-2 {
  bottom: 20%; left: 8%;
  width: 60px;
  animation: sway 10s ease-in-out infinite 2s;
}
.botanical--flower-1 {
  top: 25%; right: 38%;
  width: 50px;
  animation: sway 7s ease-in-out infinite 1s;
}
.botanical--flower-2 {
  bottom: 30%; right: 5%;
  width: 45px;
  animation: sway 9s ease-in-out infinite 3s;
}

@keyframes sway {
  0%, 100% { transform: rotate(-2deg) translateY(0); }
  50% { transform: rotate(2deg) translateY(-5px); }
}

/* ---- Container ---- */
.hero-container {
  max-width: 1320px;
  margin: 0 auto;
  padding: 0 40px;
  width: 100%;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 60px;
  align-items: center;
  position: relative;
  z-index: 2;
}

/* ==============================================
   LEFT COLUMN
   ============================================== */
.hero-left {
  max-width: 580px;
}

/* Badge */
.hero-badge {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  font-size: 13px;
  font-weight: 500;
  color: #7a9e7e;
  background: rgba(168, 213, 186, 0.2);
  padding: 8px 18px 8px 14px;
  border-radius: 50px;
  margin-bottom: 28px;
  letter-spacing: 0.3px;
  backdrop-filter: blur(4px);
  border: 1px solid rgba(168, 213, 186, 0.2);
}
.hero-badge-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: #8ab894;
  animation: dotPulse 2s ease-in-out infinite;
}
@keyframes dotPulse {
  0%, 100% { opacity: 1; transform: scale(1); }
  50% { opacity: 0.5; transform: scale(0.8); }
}

/* Headline */
.hero-headline {
  font-family: 'Playfair Display', Georgia, serif;
  font-size: 58px;
  font-weight: 700;
  color: #3d3d3d;
  line-height: 1.15;
  margin: 0 0 18px;
  letter-spacing: -0.5px;
}
.hero-headline-accent {
  background: linear-gradient(135deg, #7a9e7e 0%, #a8d5ba 40%, #8ab894 100%);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
}

/* Subtitle */
.hero-subtitle {
  font-size: 17px;
  color: #8a7a7a;
  line-height: 1.7;
  margin: 0 0 36px;
  max-width: 480px;
  font-weight: 400;
}

/* ==============================================
   PRODUCT SHOWCASE
   ============================================== */
.product-showcase {
  position: relative;
  height: 240px;
  margin-bottom: 36px;
  width: 100%;
}

/* Stone Platform */
.stone-platform {
  position: absolute;
  bottom: 10px;
  left: 50%;
  transform: translateX(-50%);
  width: 420px;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.stone-surface {
  width: 100%;
  height: 28px;
  background: linear-gradient(180deg, #e8dcc8, #d4c8b4, #c8bca8);
  border-radius: 50%;
  position: relative;
  z-index: 2;
  box-shadow:
    inset 0 -2px 6px rgba(0,0,0,0.06),
    0 4px 15px rgba(0,0,0,0.05);
}
.stone-body {
  width: 85%;
  height: 12px;
  background: linear-gradient(180deg, #d4c8b4, #c0b49e);
  border-radius: 0 0 50% 50%;
  margin-top: -2px;
  position: relative;
  z-index: 1;
}
.stone-shadow {
  width: 90%;
  height: 20px;
  background: radial-gradient(ellipse, rgba(0,0,0,0.04) 0%, transparent 70%);
  border-radius: 50%;
  margin-top: -6px;
  filter: blur(4px);
}

/* Products Arrangement */
.products-arrangement {
  position: absolute;
  bottom: 38px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  align-items: flex-end;
  gap: 20px;
  z-index: 3;
}

.product-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
}

.product-label {
  font-size: 10px;
  font-weight: 500;
  color: #9a8a8a;
  text-align: center;
  white-space: nowrap;
  letter-spacing: 0.3px;
  opacity: 0;
  transform: translateY(4px);
  transition: all 0.3s ease;
}
.product-item:hover .product-label {
  opacity: 1;
  transform: translateY(0);
}

/* ---- Product Real Images ---- */
.product-card-img {
  position: relative;
  width: 70px;
  height: 100px;
  border-radius: 12px;
  overflow: hidden;
  transition: transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.08);
  background: #fff;
}
.product-item:hover .product-card-img {
  transform: translateY(-8px);
}

.product-real-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

.product--cleanser {
  transform: translateY(8px);
}
.product--serum {
  transform: translateY(-18px);
  z-index: 2;
}
.product--moisturizer {
  transform: translateY(4px);
}
.product--toner {
  transform: translateY(12px);
}

/* ---- Platform Botanicals ---- */
.platform-botanicals {
  position: absolute;
  bottom: 10px;
  left: 50%;
  transform: translateX(-50%);
  width: 460px;
  height: 100px;
  z-index: 1;
  pointer-events: none;
}
.platform-leaf {
  position: absolute;
  width: 30px;
  opacity: 0.6;
}
.leaf--1 { bottom: 18px; left: -20px; transform: rotate(-20deg); }
.leaf--2 { bottom: 12px; right: -15px; transform: rotate(30deg) scaleX(-1); }
.leaf--3 { bottom: 8px; left: 50%; transform: translateX(-50%) rotate(180deg); }

.platform-flower {
  position: absolute;
  width: 24px;
  opacity: 0.7;
}
.flower--1 { bottom: 28px; left: 30px; animation: flowerSway 4s ease-in-out infinite; }
.flower--2 { bottom: 32px; right: 35px; animation: flowerSway 5s ease-in-out infinite 1s; }

@keyframes flowerSway {
  0%, 100% { transform: rotate(-5deg); }
  50% { transform: rotate(5deg); }
}

/* ---- Glowing Circles behind products ---- */
.product-glow {
  position: absolute;
  border-radius: 50%;
  pointer-events: none;
  filter: blur(40px);
}
.glow--c1 {
  width: 120px; height: 120px;
  background: rgba(168, 213, 186, 0.2);
  bottom: 20px; left: 50%;
  transform: translateX(-50%);
  animation: glowPulse 4s ease-in-out infinite;
}
.glow--c2 {
  width: 80px; height: 80px;
  background: rgba(200, 225, 240, 0.15);
  bottom: 40px; left: 30%;
  animation: glowPulse 5s ease-in-out infinite 1s;
}
.glow--c3 {
  width: 90px; height: 90px;
  background: rgba(255, 220, 200, 0.15);
  bottom: 30px; right: 25%;
  animation: glowPulse 4.5s ease-in-out infinite 2s;
}

/* ==============================================
   FEATURE ICONS
   ============================================== */
.feature-icons {
  display: flex;
  gap: 24px;
  flex-wrap: wrap;
}
.feature-icon-item {
  display: flex;
  align-items: center;
  gap: 10px;
}
.feature-icon-circle {
  width: 42px;
  height: 42px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(255, 255, 255, 0.7);
  border-radius: 14px;
  backdrop-filter: blur(8px);
  border: 1px solid rgba(200, 190, 180, 0.15);
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.03);
  transition: all 0.3s ease;
}
.feature-icon-item:hover .feature-icon-circle {
  transform: translateY(-3px) scale(1.05);
  box-shadow: 0 8px 20px rgba(168, 213, 186, 0.15);
  border-color: rgba(168, 213, 186, 0.3);
}
.feature-icon-emoji {
  font-size: 18px;
}
.feature-icon-text {
  font-size: 13px;
  font-weight: 500;
  color: #6a7a6a;
  white-space: nowrap;
}

/* ==============================================
   RIGHT COLUMN — SIGN IN CARD
   ============================================== */
.hero-right {
  display: flex;
  justify-content: center;
  align-items: center;
}

.signup-card {
  width: 100%;
  max-width: 440px;
  background: rgba(255, 255, 255, 0.55);
  backdrop-filter: blur(24px);
  -webkit-backdrop-filter: blur(24px);
  border-radius: 28px;
  border: 1px solid rgba(255, 255, 255, 0.6);
  box-shadow:
    0 20px 60px rgba(0, 0, 0, 0.06),
    0 8px 24px rgba(168, 213, 186, 0.08),
    inset 0 1px 0 rgba(255, 255, 255, 0.6);
  padding: 40px 36px 32px;
  transition: all 0.3s ease;
}

/* Logo */
.signup-logo {
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
}
.logo-circle {
  position: relative;
  width: 72px;
  height: 72px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.logo-circle svg:first-child {
  position: absolute;
  inset: 0;
}
.logo-inner-icon {
  position: relative;
  z-index: 1;
  width: 28px;
  height: 28px;
}

/* Title */
.signup-title {
  font-family: 'Playfair Display', Georgia, serif;
  font-size: 26px;
  font-weight: 700;
  color: #3d3d3d;
  text-align: center;
  margin: 0 0 6px;
}
.signup-subtitle {
  font-size: 14px;
  color: #9a8a8a;
  text-align: center;
  margin: 0 0 28px;
  line-height: 1.5;
}

/* Form */
.signup-form {
  display: flex;
  flex-direction: column;
  gap: 14px;
}
.form-field {
  width: 100%;
}

.input-wrapper {
  position: relative;
  display: flex;
  align-items: center;
  background: rgba(255, 255, 255, 0.7);
  border: 1.5px solid rgba(200, 190, 180, 0.2);
  border-radius: 14px;
  padding: 0 14px;
  transition: all 0.25s ease;
}
.input-wrapper:focus-within {
  border-color: rgba(168, 213, 186, 0.5);
  box-shadow: 0 0 0 4px rgba(168, 213, 186, 0.1);
  background: rgba(255, 255, 255, 0.9);
}
.input-icon {
  color: #b8a8a8;
  flex-shrink: 0;
  transition: color 0.25s ease;
}
.input-wrapper:focus-within .input-icon {
  color: #8ab894;
}

.form-input {
  flex: 1;
  padding: 14px 10px;
  border: none;
  background: transparent;
  font-size: 14px;
  font-family: 'Inter', 'Segoe UI', sans-serif;
  color: #3d3d3d;
  outline: none;
  min-width: 0;
}
.form-input::placeholder {
  color: #c0b0b0;
  font-weight: 400;
}
.form-input:-webkit-autofill {
  -webkit-box-shadow: 0 0 0 30px rgba(255, 255, 255, 0.7) inset !important;
  -webkit-text-fill-color: #3d3d3d !important;
}

.password-toggle {
  background: none;
  border: none;
  color: #c0b0b0;
  cursor: pointer;
  padding: 4px;
  display: flex;
  align-items: center;
  transition: color 0.2s;
  flex-shrink: 0;
}
.password-toggle:hover {
  color: #8ab894;
}

/* Forgot Password */
.form-forgot {
  text-align: right;
  margin-top: -4px;
}
.forgot-link {
  font-size: 13px;
  color: #8ab894;
  text-decoration: none;
  font-weight: 500;
  transition: color 0.2s;
}
.forgot-link:hover {
  color: #6a9a74;
  text-decoration: underline;
}

/* Error Message */
.form-error {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px 14px;
  background: rgba(232, 96, 112, 0.08);
  border: 1px solid rgba(232, 96, 112, 0.15);
  border-radius: 12px;
  font-size: 13px;
  color: #c05060;
  line-height: 1.4;
}

/* Submit Button */
.signup-btn {
  width: 100%;
  padding: 16px;
  background: linear-gradient(135deg, #8ab894 0%, #6a9a74 40%, #7aad84 100%);
  color: white;
  border: none;
  border-radius: 14px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.35s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  font-family: 'Inter', 'Segoe UI', sans-serif;
  box-shadow: 0 4px 16px rgba(106, 154, 116, 0.3);
  letter-spacing: 0.3px;
  margin-top: 6px;
}
.signup-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 28px rgba(106, 154, 116, 0.4);
}

/* ... rest of styles remain unchanged ... */
</style>