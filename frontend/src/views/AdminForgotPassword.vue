<template>
  <div class="admin-auth-page">
    <!-- Background Elements -->
    <div class="bg-overlay"></div>
    <div class="bg-blob blob--1"></div>
    <div class="bg-blob blob--2"></div>
    <div class="bg-blob blob--3"></div>
    <div class="bg-glow glow--tl"></div>
    <div class="bg-glow glow--br"></div>

    <!-- Floating Sparkle Particles -->
    <div class="sparkle sparkle--1"></div>
    <div class="sparkle sparkle--2"></div>
    <div class="sparkle sparkle--3"></div>
    <div class="sparkle sparkle--4"></div>
    <div class="sparkle sparkle--5"></div>
    <div class="sparkle sparkle--6"></div>

    <!-- Skincare Product Decorations -->
    <div class="product-deco product-serum">
      <svg viewBox="0 0 40 100" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="8" y="15" width="24" height="60" rx="8" fill="rgba(230,210,220,0.25)" stroke="rgba(255,255,255,0.4)" stroke-width="0.8"/>
        <rect x="8" y="15" width="24" height="60" rx="8" fill="url(#serumGrad)" opacity="0.3"/>
        <rect x="12" y="10" width="16" height="8" rx="3" fill="rgba(210,190,180,0.2)" stroke="rgba(255,255,255,0.3)" stroke-width="0.5"/>
        <circle cx="20" cy="30" r="4" fill="rgba(255,220,230,0.2)"/>
        <circle cx="20" cy="45" r="3" fill="rgba(255,220,230,0.15)"/>
        <circle cx="26" cy="55" r="2" fill="rgba(255,220,230,0.1)"/>
        <defs>
          <linearGradient id="serumGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stop-color="rgba(255,220,230,0.2)"/>
            <stop offset="100%" stop-color="rgba(240,200,210,0.1)"/>
          </linearGradient>
        </defs>
      </svg>
    </div>

    <div class="product-deco product-cream">
      <svg viewBox="0 0 50 45" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="10" y="12" width="30" height="28" rx="6" fill="rgba(240,220,210,0.2)" stroke="rgba(255,255,255,0.35)" stroke-width="0.8"/>
        <rect x="10" y="12" width="30" height="28" rx="6" fill="url(#creamGrad)" opacity="0.25"/>
        <rect x="18" y="6" width="14" height="8" rx="4" fill="rgba(230,200,190,0.15)" stroke="rgba(255,255,255,0.25)" stroke-width="0.5"/>
        <ellipse cx="25" cy="28" rx="8" ry="4" fill="rgba(255,230,240,0.15)"/>
        <defs>
          <linearGradient id="creamGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stop-color="rgba(255,235,240,0.2)"/>
            <stop offset="100%" stop-color="rgba(240,215,205,0.1)"/>
          </linearGradient>
        </defs>
      </svg>
    </div>

    <div class="product-deco product-toner">
      <svg viewBox="0 0 30 90" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="5" y="12" width="20" height="60" rx="6" fill="rgba(220,230,240,0.18)" stroke="rgba(255,255,255,0.35)" stroke-width="0.8"/>
        <rect x="5" y="12" width="20" height="60" rx="6" fill="url(#tonerGrad)" opacity="0.2"/>
        <rect x="9" y="8" width="12" height="6" rx="2" fill="rgba(200,210,230,0.2)" stroke="rgba(255,255,255,0.25)" stroke-width="0.5"/>
        <line x1="10" y1="30" x2="20" y2="30" stroke="rgba(255,255,255,0.2)" stroke-width="0.5"/>
        <line x1="10" y1="40" x2="20" y2="40" stroke="rgba(255,255,255,0.15)" stroke-width="0.5"/>
        <defs>
          <linearGradient id="tonerGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stop-color="rgba(220,235,245,0.2)"/>
            <stop offset="100%" stop-color="rgba(200,215,230,0.1)"/>
          </linearGradient>
        </defs>
      </svg>
    </div>

    <div class="product-deco product-lipoil">
      <svg viewBox="0 0 25 60" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="4" y="8" width="17" height="40" rx="10" fill="rgba(245,210,215,0.2)" stroke="rgba(255,255,255,0.35)" stroke-width="0.8"/>
        <rect x="4" y="8" width="17" height="40" rx="10" fill="url(#lipoilGrad)" opacity="0.25"/>
        <circle cx="12.5" cy="48" r="3" fill="rgba(255,200,210,0.15)"/>
        <defs>
          <linearGradient id="lipoilGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stop-color="rgba(255,215,225,0.2)"/>
            <stop offset="100%" stop-color="rgba(245,195,205,0.1)"/>
          </linearGradient>
        </defs>
      </svg>
    </div>

    <!-- Botanical Decorations -->
    <div class="botanical botanical--leaf-1">
      <svg viewBox="0 0 60 80" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M30 80C30 80 5 55 5 30C5 13.4 18.4 0 35 0C42 0 48 2.5 52 7C56 11.5 58 17.5 58 24C58 38 45 50 35 55" stroke="#d4b8b8" stroke-width="1.5" fill="none" opacity="0.4"/>
        <path d="M30 80C30 80 55 55 55 30C55 13.4 41.6 0 25 0C18 0 12 2.5 8 7C4 11.5 2 17.5 2 24C2 38 15 50 25 55" stroke="#e0c8c8" stroke-width="1" fill="none" opacity="0.3"/>
      </svg>
    </div>
    <div class="botanical botanical--leaf-2">
      <svg viewBox="0 0 50 70" fill="none" xmlns="http://www.w3.org/2000/svg">
        <ellipse cx="25" cy="35" rx="22" ry="32" fill="rgba(230,200,200,0.12)" stroke="#d4c0c0" stroke-width="0.8"/>
        <path d="M25 10C25 10 15 22 15 35C15 45 20 55 25 60" stroke="#d4b8b8" stroke-width="1" fill="none" opacity="0.4"/>
        <path d="M25 10C25 10 35 22 35 35C35 45 30 55 25 60" stroke="#e0c8c8" stroke-width="0.8" fill="none" opacity="0.3"/>
      </svg>
    </div>
    <div class="botanical botanical--flower-1">
      <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="20" cy="20" r="8" fill="#f5d5d5" opacity="0.2"/>
        <circle cx="20" cy="12" r="8" fill="#fce8e8" opacity="0.2"/>
        <circle cx="28" cy="20" r="8" fill="#fce8e8" opacity="0.2"/>
        <circle cx="12" cy="20" r="8" fill="#fce8e8" opacity="0.2"/>
        <circle cx="20" cy="28" r="8" fill="#fce8e8" opacity="0.2"/>
        <circle cx="20" cy="20" r="4" fill="#f5e6c8" opacity="0.35"/>
      </svg>
    </div>
    <div class="botanical botanical--flower-2">
      <svg viewBox="0 0 35 35" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="17.5" cy="17.5" r="7" fill="#f0e8e8" opacity="0.18"/>
        <circle cx="17.5" cy="10.5" r="7" fill="#f8f0f0" opacity="0.18"/>
        <circle cx="24.5" cy="17.5" r="7" fill="#f8f0f0" opacity="0.18"/>
        <circle cx="10.5" cy="17.5" r="7" fill="#f8f0f0" opacity="0.18"/>
        <circle cx="17.5" cy="24.5" r="7" fill="#f8f0f0" opacity="0.18"/>
        <circle cx="17.5" cy="17.5" r="3.5" fill="#f7f0d8" opacity="0.35"/>
      </svg>
    </div>

    <!-- Floating Action Buttons -->
    <div class="floating-actions">
      <button class="float-btn float-btn--expand" @click="toggleExpand" title="Toggle Fullscreen">
        <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <polyline v-if="!isExpanded" points="15 3 21 3 21 9"/>
          <polyline v-if="!isExpanded" points="9 21 3 21 3 15"/>
          <line v-if="!isExpanded" x1="21" y1="3" x2="14" y2="10"/>
          <line v-if="!isExpanded" x1="3" y1="21" x2="10" y2="14"/>
          <polyline v-if="isExpanded" points="4 14 4 20 10 20"/>
          <polyline v-if="isExpanded" points="20 10 20 4 14 4"/>
          <line v-if="isExpanded" x1="10" y1="10" x2="4" y2="4"/>
          <line v-if="isExpanded" x1="14" y1="14" x2="20" y2="20"/>
        </svg>
      </button>
      <button class="float-btn float-btn--refresh" @click="refreshPage" title="Refresh">
        <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <polyline points="23 4 23 10 17 10"/>
          <polyline points="1 20 1 14 7 14"/>
          <path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"/>
        </svg>
      </button>
      <a href="/" class="float-btn float-btn--visit" title="Visit Site">
        <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <circle cx="12" cy="12" r="10"/>
          <line x1="2" y1="12" x2="22" y2="12"/>
          <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
        </svg>
      </a>
    </div>

    <!-- Auth Card -->
    <div class="auth-container" :class="{ 'auth-expanded': isExpanded }">
      <div class="auth-card">
        <!-- Back to Login -->
        <router-link to="/admin/login" class="btn-back">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M19 12H5M12 19l-7-7 7-7"/>
          </svg>
          Back to Login
        </router-link>

        <!-- Logo -->
        <div class="auth-logo">
          <div class="logo-circle">
            <svg viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg" class="logo-ring">
              <defs>
                <linearGradient id="logoGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stop-color="#e8b4b4"/>
                  <stop offset="50%" stop-color="#d49a9a"/>
                  <stop offset="100%" stop-color="#c48888"/>
                </linearGradient>
                <linearGradient id="logoBg" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stop-color="rgba(255,255,255,0.35)"/>
                  <stop offset="100%" stop-color="rgba(255,240,240,0.15)"/>
                </linearGradient>
                <linearGradient id="starGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stop-color="#e8b4b4"/>
                  <stop offset="50%" stop-color="#d49a9a"/>
                  <stop offset="100%" stop-color="#c48888"/>
                </linearGradient>
              </defs>
              <circle cx="30" cy="30" r="28" stroke="url(#logoGrad)" stroke-width="2" fill="url(#logoBg)"/>
              <path d="M16 30C16 22.3 22.3 16 30 16C37.7 16 44 22.3 44 30C44 33.5 42.5 36.7 40 39" stroke="url(#logoGrad)" stroke-width="2" stroke-linecap="round" fill="none"/>
              <path d="M30 22V30L36 34" stroke="url(#logoGrad)" stroke-width="2.5" stroke-linecap="round" fill="none"/>
            </svg>
            <div class="logo-star">
              <svg viewBox="0 0 24 24" fill="none" width="28" height="28">
                <defs>
                  <linearGradient id="starGrad2" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stop-color="#f0cece"/>
                    <stop offset="100%" stop-color="#dbb0b0"/>
                  </linearGradient>
                </defs>
                <path d="M12 2L15 9L22 9L16.5 14L18.5 21L12 17L5.5 21L7.5 14L2 9L9 9L12 2Z" fill="url(#starGrad2)"/>
              </svg>
            </div>
          </div>
        </div>

        <!-- Badge -->
        <div class="auth-badge">
          <span class="badge-dot"></span>
          <span>Password Reset</span>
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
            <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>
          </svg>
        </div>

        <!-- Title -->
        <h1 class="auth-title">Forgot Password?</h1>
        <p class="auth-subtitle">Enter your email and we'll send you a reset link</p>

        <!-- Error Alert -->
        <div v-if="error" class="error-alert">
          <svg viewBox="0 0 20 20" width="16" height="16" fill="none">
            <circle cx="10" cy="10" r="10" fill="#e86070" opacity="0.15"/>
            <path d="M10 6V11" stroke="#e86070" stroke-width="1.5" stroke-linecap="round"/>
            <circle cx="10" cy="14" r="1" fill="#e86070"/>
          </svg>
          <span>{{ error }}</span>
        </div>

        <!-- Success Alert -->
        <div v-if="success" class="success-alert">
          <svg viewBox="0 0 20 20" width="16" height="16" fill="none">
            <circle cx="10" cy="10" r="10" fill="#8ab894" opacity="0.15"/>
            <path d="M6 10l3 3 5-5" stroke="#8ab894" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
          <span>{{ success }}</span>
        </div>

        <!-- Form -->
        <form @submit.prevent="handleForgotPassword" class="auth-form">
          <div class="form-group">
            <label class="form-label" for="email">Email Address</label>
            <div class="input-wrapper">
              <svg class="input-icon" viewBox="0 0 20 16" fill="none" width="18" height="18" aria-hidden="true">
                <rect x="1" y="1" width="18" height="14" rx="3" stroke="currentColor" stroke-width="1.5" fill="none"/>
                <path d="M1 3L10 10L19 3" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" fill="none"/>
              </svg>
              <input
                class="form-input"
                id="email"
                type="email"
                v-model="email"
                placeholder="Enter your email address"
                required
                autofocus
              >
            </div>
          </div>

          <button class="btn-submit" type="submit" :disabled="loading">
            <span v-if="loading" class="btn-spinner"></span>
            <span v-else>Send Reset Link</span>
          </button>
        </form>

        <!-- Footer -->
        <div class="auth-footer">
          <span>Remember your password?</span>
          <router-link to="/admin/login" class="footer-link">Sign in</router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import axios from 'axios'

const email = ref('')
const loading = ref(false)
const error = ref(null)
const success = ref(null)
const isExpanded = ref(false)

function toggleExpand() {
  isExpanded.value = !isExpanded.value
}

function refreshPage() {
  window.location.reload()
}

async function handleForgotPassword() {
  loading.value = true
  error.value = null
  success.value = null

  try {
    const response = await axios.post('/forgot-password', { email: email.value })
    success.value = response.data.message || 'Password reset link has been sent to your email.'
  } catch (err) {
    const data = err.response?.data
    if (data?.message) {
      error.value = data.message
    } else if (data?.errors) {
      const messages = Object.values(data.errors).flat()
      error.value = messages[0] || 'Failed to send reset link.'
    } else {
      error.value = 'Failed to send reset link. Please try again.'
    }
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>
/* ===== Page Container ===== */
.admin-auth-page {
  position: fixed;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #fdf2f6 0%, #f8ecec 30%, #f5ece8 60%, #faf0f2 100%);
  overflow: hidden;
  font-family: 'Inter', 'Segoe UI', sans-serif;
}

.bg-overlay {
  position: absolute;
  inset: 0;
  background:
    radial-gradient(ellipse at 20% 50%, rgba(230,200,210,0.12) 0%, transparent 50%),
    radial-gradient(ellipse at 80% 20%, rgba(240,215,205,0.1) 0%, transparent 50%),
    radial-gradient(ellipse at 50% 80%, rgba(220,210,240,0.08) 0%, transparent 50%);
  pointer-events: none;
}

/* ===== Background Blobs ===== */
.bg-blob {
  position: absolute;
  border-radius: 50%;
  pointer-events: none;
  filter: blur(80px);
}
.blob--1 {
  width: 600px; height: 600px;
  background: radial-gradient(circle, rgba(230,200,210,0.2), transparent 70%);
  top: -200px; left: -100px;
  animation: blobFloat 12s ease-in-out infinite;
}
.blob--2 {
  width: 500px; height: 500px;
  background: radial-gradient(circle, rgba(240,215,205,0.15), transparent 70%);
  bottom: -150px; right: -80px;
  animation: blobFloat 15s ease-in-out infinite 2s;
}
.blob--3 {
  width: 400px; height: 400px;
  background: radial-gradient(circle, rgba(220,210,240,0.12), transparent 70%);
  top: 40%; left: 30%;
  animation: blobFloat 10s ease-in-out infinite 4s;
}
@keyframes blobFloat {
  0%, 100% { transform: translate(0, 0) scale(1); }
  33% { transform: translate(30px, -30px) scale(1.05); }
  66% { transform: translate(-20px, 20px) scale(0.95); }
}

/* ===== Glows ===== */
.bg-glow {
  position: absolute;
  border-radius: 50%;
  pointer-events: none;
  filter: blur(120px);
}
.glow--tl {
  width: 300px; height: 300px;
  background: rgba(230,200,210,0.12);
  top: 10%; left: 15%;
  animation: glowPulse 6s ease-in-out infinite;
}
.glow--br {
  width: 250px; height: 250px;
  background: rgba(240,215,205,0.1);
  bottom: 20%; right: 10%;
  animation: glowPulse 8s ease-in-out infinite 2s;
}
@keyframes glowPulse {
  0%, 100% { opacity: 0.3; transform: scale(1); }
  50% { opacity: 0.7; transform: scale(1.2); }
}

/* ===== Sparkle Particles ===== */
.sparkle {
  position: absolute;
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: rgba(255, 220, 230, 0.6);
  pointer-events: none;
  z-index: 1;
  box-shadow: 0 0 8px 2px rgba(255, 200, 210, 0.3);
  animation: sparkleFloat 6s ease-in-out infinite;
}
.sparkle--1 { top: 15%; left: 10%; animation-delay: 0s; }
.sparkle--2 { top: 30%; right: 15%; width: 4px; height: 4px; animation-delay: 1s; }
.sparkle--3 { top: 60%; left: 5%; width: 5px; height: 5px; animation-delay: 2s; }
.sparkle--4 { bottom: 25%; right: 8%; width: 7px; height: 7px; animation-delay: 0.5s; }
.sparkle--5 { top: 12%; right: 25%; width: 3px; height: 3px; animation-delay: 3s; }
.sparkle--6 { bottom: 35%; left: 12%; width: 4px; height: 4px; animation-delay: 2.5s; }
@keyframes sparkleFloat {
  0%, 100% { transform: translateY(0) scale(1); opacity: 0.3; }
  50% { transform: translateY(-15px) scale(1.5); opacity: 0.9; }
}

/* ===== Skincare Product Decorations ===== */
.product-deco {
  position: absolute;
  pointer-events: none;
  opacity: 0.5;
  z-index: 1;
}
.product-serum {
  top: 8%; left: 6%;
  width: 40px;
  animation: floatProduct 8s ease-in-out infinite;
}
.product-cream {
  bottom: 12%; right: 8%;
  width: 50px;
  animation: floatProduct 10s ease-in-out infinite 2s;
}
.product-toner {
  top: 25%; right: 4%;
  width: 30px;
  animation: floatProduct 9s ease-in-out infinite 1s;
}
.product-lipoil {
  bottom: 30%; left: 4%;
  width: 25px;
  animation: floatProduct 7s ease-in-out infinite 3s;
}
@keyframes floatProduct {
  0%, 100% { transform: translateY(0) rotate(0deg); }
  50% { transform: translateY(-8px) rotate(2deg); }
}

/* ===== Botanical Decorations ===== */
.botanical {
  position: absolute;
  pointer-events: none;
  opacity: 0.4;
  z-index: 1;
}
.botanical--leaf-1 { top: 10%; left: 5%; width: 80px; animation: sway 8s ease-in-out infinite; }
.botanical--leaf-2 { bottom: 18%; left: 8%; width: 60px; animation: sway 10s ease-in-out infinite 2s; }
.botanical--flower-1 { top: 22%; right: 35%; width: 50px; animation: sway 7s ease-in-out infinite 1s; }
.botanical--flower-2 { bottom: 25%; right: 5%; width: 45px; animation: sway 9s ease-in-out infinite 3s; }
@keyframes sway {
  0%, 100% { transform: rotate(-2deg) translateY(0); }
  50% { transform: rotate(2deg) translateY(-5px); }
}

/* ===== Floating Action Buttons ===== */
.floating-actions {
  position: fixed;
  top: 24px;
  right: 24px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  z-index: 100;
}
.float-btn {
  width: 40px;
  height: 40px;
  border-radius: 12px;
  border: 1px solid rgba(255,255,255,0.5);
  background: rgba(255,255,255,0.5);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  color: #9a8a8a;
  transition: all 0.3s ease;
  box-shadow: 0 4px 12px rgba(0,0,0,0.04);
}
.float-btn:hover {
  background: rgba(255,255,255,0.8);
  color: #c49a9a;
  transform: translateY(-2px);
  box-shadow: 0 8px 20px rgba(0,0,0,0.08);
}
.float-btn:active {
  transform: translateY(0);
}
.float-btn--visit {
  background: rgba(230,200,210,0.3);
  color: #c49a9a;
}
.float-btn--visit:hover {
  background: rgba(230,200,210,0.5);
  color: #b08888;
}

/* ===== Auth Card Container ===== */
.auth-container {
  position: relative;
  z-index: 2;
  width: 100%;
  max-width: 420px;
  padding: 20px;
  transition: all 0.4s ease;
}
.auth-expanded {
  max-width: 520px;
}

/* ===== Auth Card ===== */
.auth-card {
  background: rgba(255, 255, 255, 0.55);
  backdrop-filter: blur(24px);
  -webkit-backdrop-filter: blur(24px);
  border-radius: 28px;
  border: 1px solid rgba(255, 255, 255, 0.6);
  box-shadow:
    0 20px 60px rgba(0, 0, 0, 0.06),
    0 8px 24px rgba(230, 200, 210, 0.08),
    inset 0 1px 0 rgba(255, 255, 255, 0.6);
  padding: 40px 36px 32px;
  transition: all 0.3s ease;
}

/* ===== Back Button ===== */
.btn-back {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-size: 13px;
  font-weight: 500;
  color: #b09a9a;
  text-decoration: none;
  margin-bottom: 16px;
  transition: color 0.2s;
}
.btn-back:hover {
  color: #c49a9a;
}

/* ===== Logo ===== */
.auth-logo {
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
.logo-ring {
  position: absolute;
  inset: 0;
}
.logo-star {
  position: relative;
  z-index: 1;
  width: 28px;
  height: 28px;
}

/* ===== Badge ===== */
.auth-badge {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  font-size: 12px;
  font-weight: 500;
  color: #c49a9a;
  background: rgba(230,200,210,0.15);
  padding: 6px 14px 6px 12px;
  border-radius: 50px;
  margin: 0 auto 20px;
  letter-spacing: 0.3px;
  backdrop-filter: blur(4px);
  border: 1px solid rgba(230,200,210,0.2);
  width: fit-content;
}
.badge-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: #c49a9a;
  animation: dotPulse 2s ease-in-out infinite;
}
@keyframes dotPulse {
  0%, 100% { opacity: 1; transform: scale(1); }
  50% { opacity: 0.5; transform: scale(0.8); }
}

/* ===== Title ===== */
.auth-title {
  font-family: 'Playfair Display', Georgia, serif;
  font-size: 28px;
  font-weight: 700;
  color: #3d2d2d;
  text-align: center;
  margin: 0 0 6px;
  letter-spacing: -0.3px;
}
.auth-subtitle {
  font-size: 14px;
  color: #b09a9a;
  text-align: center;
  margin: 0 0 28px;
  line-height: 1.5;
}

/* ===== Error ===== */
.error-alert {
  background: rgba(232, 96, 112, 0.08);
  border: 1px solid rgba(232, 96, 112, 0.2);
  border-radius: 12px;
  padding: 12px 16px;
  display: flex;
  align-items: center;
  gap: 10px;
  color: #c2415b;
  font-size: 13px;
  font-weight: 500;
  margin-bottom: 16px;
}

/* ===== Success ===== */
.success-alert {
  background: rgba(138, 184, 148, 0.08);
  border: 1px solid rgba(138, 184, 148, 0.2);
  border-radius: 12px;
  padding: 12px 16px;
  display: flex;
  align-items: center;
  gap: 10px;
  color: #5a8a64;
  font-size: 13px;
  font-weight: 500;
  margin-bottom: 16px;
}

/* ===== Form ===== */
.auth-form {
  display: flex;
  flex-direction: column;
  gap: 14px;
}
.form-group {
  width: 100%;
}
.form-label {
  display: block;
  font-size: 13px;
  font-weight: 500;
  color: #7a6a6a;
  margin-bottom: 6px;
}
.input-wrapper {
  position: relative;
  display: flex;
  align-items: center;
  background: rgba(255, 255, 255, 0.7);
  border: 1.5px solid rgba(210, 195, 190, 0.2);
  border-radius: 14px;
  padding: 0 14px;
  transition: all 0.25s ease;
}
.input-wrapper:focus-within {
  border-color: rgba(230, 200, 210, 0.5);
  box-shadow: 0 0 0 4px rgba(230, 200, 210, 0.12);
  background: rgba(255, 255, 255, 0.9);
}
.input-icon {
  color: #c8b0b0;
  flex-shrink: 0;
  width: 18px;
  height: 18px;
  transition: color 0.25s ease;
}
.input-wrapper:focus-within .input-icon {
  color: #c49a9a;
}
.form-input {
  flex: 1;
  padding: 14px 10px;
  border: none;
  background: transparent;
  font-size: 14px;
  font-family: 'Inter', 'Segoe UI', sans-serif;
  color: #3d2d2d;
  outline: none;
  min-width: 0;
}
.form-input::placeholder { color: #d0baba; font-weight: 400; }
.form-input:-webkit-autofill {
  -webkit-box-shadow: 0 0 0 30px rgba(255, 255, 255, 0.7) inset !important;
  -webkit-text-fill-color: #3d2d2d !important;
}

/* ===== Submit Button ===== */
.btn-submit {
  width: 100%;
  padding: 14px 24px;
  border: none;
  border-radius: 14px;
  font-size: 15px;
  font-weight: 600;
  font-family: 'Inter', 'Segoe UI', sans-serif;
  color: #fff;
  background: linear-gradient(135deg, #e8b4b4 0%, #d49a9a 50%, #c48888 100%);
  cursor: pointer;
  transition: all 0.3s ease;
  margin-top: 4px;
  position: relative;
  letter-spacing: 0.3px;
}
.btn-submit:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 24px rgba(196, 154, 154, 0.35);
}
.btn-submit:active {
  transform: translateY(0);
}
.btn-submit:disabled {
  opacity: 0.7;
  cursor: not-allowed;
  transform: none;
}
.btn-spinner {
  display: inline-block;
  width: 18px;
  height: 18px;
  border: 2px solid rgba(255,255,255,0.3);
  border-top-color: #fff;
  border-radius: 50%;
  animation: spin 0.6s linear infinite;
}
@keyframes spin {
  to { transform: rotate(360deg); }
}

/* ===== Footer ===== */
.auth-footer {
  text-align: center;
  margin-top: 24px;
  font-size: 13px;
  color: #b09a9a;
}
.footer-link {
  color: #c49a9a;
  text-decoration: none;
  font-weight: 600;
  transition: color 0.2s;
  margin-left: 4px;
}
.footer-link:hover {
  color: #b08888;
  text-decoration: underline;
}

/* ===== Responsive ===== */
@media (max-width: 576px) {
  .auth-container {
    padding: 12px;
  }
  .auth-card {
    padding: 32px 24px 28px;
    border-radius: 24px;
  }
  .auth-title {
    font-size: 24px;
  }
  .floating-actions {
    top: 16px;
    right: 16px;
  }
  .float-btn {
    width: 36px;
    height: 36px;
  }
  .product-serum { width: 30px; top: 5%; left: 3%; }
  .product-cream { width: 40px; bottom: 8%; right: 4%; }
  .product-toner { width: 22px; top: 20%; right: 2%; }
  .product-lipoil { width: 20px; bottom: 25%; left: 2%; }
  .sparkle { display: none; }
}

@media (max-width: 400px) {
  .auth-card {
    padding: 28px 18px 24px;
  }
}
</style>