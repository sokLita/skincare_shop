# Write the redesigned Profile.vue
import os

content = r'''<template>
  <div class="profile-page">
    <div class="profile-container">
      <!-- Header -->
      <div class="profile-header">
        <div class="header-glow"></div>
        <div class="header-badge">
          <i class="fas fa-user-circle"></i>
        </div>
        <h2 class="profile-title">{{ t('profile.title') || 'My Profile' }}</h2>
        <p class="profile-subtitle">{{ t('profile.subtitle') || 'Manage your account information' }}</p>
      </div>

      <!-- Three-column Grid -->
      <div class="profile-grid">

        <!-- Column 1: Profile Photo Card -->
        <div class="profile-card profile-card--photo">
          <div class="card-accent-bar"></div>
          <div class="card-body text-center">
            <div class="profile-photo-wrapper" @click="triggerPhotoUpload">
              <div class="profile-photo-ring">
                <div class="profile-photo" v-if="photoPreview || authStore.user?.profile_photo">
                  <img :src="photoPreview || getPhotoUrl(authStore.user?.profile_photo)" alt="Profile" class="profile-img" />
                </div>
                <div class="profile-photo profile-photo--placeholder" v-else>
                  <span class="profile-initial">{{ userInitial }}</span>
                </div>
              </div>
              <div class="profile-photo-overlay">
                <i class="fas fa-camera"></i>
                <span>{{ t('profile.changePhoto') || 'Change Photo' }}</span>
              </div>
            </div>
            <input
              ref="photoInput"
              type="file"
              accept="image/jpeg,image/png,image/jpg,image/gif,image/webp"
              class="d-none"
              @change="onPhotoSelected"
            />

            <h4 class="profile-name">{{ authStore.user?.name || 'User' }}</h4>
            <p class="profile-email">{{ authStore.user?.email }}</p>
            <p class="profile-phone">{{ authStore.user?.phone || t('profile.noPhone') || 'No phone number' }}</p>

            <button class="btn-upload-photo" @click="triggerPhotoUpload" :disabled="photoUploading">
              <i :class="photoUploading ? 'fas fa-spinner fa-spin' : 'fas fa-camera'" class="btn-icon"></i>
              {{ photoUploading ? (t('profile.uploading') || 'Uploading...') : (t('profile.uploadPhoto') || 'Upload Photo') }}
            </button>

            <div class="account-info">
              <div class="info-divider"></div>
              <div class="info-item">
                <div class="info-icon-box">
                  <i class="fas fa-calendar-alt"></i>
                </div>
                <span class="info-text">{{ t('profile.memberSince') || 'Member since' }}: {{ formatDate(authStore.user?.created_at) }}</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Column 2: Edit Profile Form -->
        <div class="profile-card profile-card--form">
          <div class="card-accent-bar"></div>
          <div class="card-body">
            <div class="section-header">
              <div class="section-icon">
                <i class="fas fa-user-edit"></i>
              </div>
              <h5 class="section-title">{{ t('profile.editInfo') || 'Edit Profile Information' }}</h5>
            </div>

            <!-- Success/Error Alert -->
            <transition name="alert-fade">
              <div v-if="alertMessage" :class="['alert-glass', alertType === 'success' ? 'alert-glass--success' : 'alert-glass--error']" role="alert">
                <div class="alert-content">
                  <i :class="alertType === 'success' ? 'fas fa-check-circle' : 'fas fa-exclamation-circle'" class="alert-icon"></i>
                  <span>{{ alertMessage }}</span>
                </div>
                <button type="button" class="alert-close" @click="alertMessage = ''">&times;</button>
              </div>
            </transition>

            <form @submit.prevent="updateProfile" class="profile-form">
              <!-- Full Name -->
              <div class="form-group">
                <label class="form-label">{{ t('profile.fullname') || 'Full Name' }} *</label>
                <div class="input-group-modern">
                  <span class="input-icon"><i class="fas fa-user"></i></span>
                  <input
                    type="text"
                    class="form-control-modern"
                    v-model="profile.name"
                    required
                    :placeholder="t('profile.fullnamePlaceholder') || 'Enter your full name'"
                  />
                </div>
              </div>

              <!-- Email (read-only) -->
              <div class="form-group">
                <label class="form-label">{{ t('profile.email') || 'Email' }} *</label>
                <div class="input-group-modern">
                  <span class="input-icon"><i class="fas fa-envelope"></i></span>
                  <input
                    type="email"
                    class="form-control-modern"
                    :value="authStore.user?.email"
                    disabled
                  />
                </div>
                <small class="form-hint">
                  <i class="fas fa-info-circle"></i>
                  {{ t('profile.emailNotChangeable') || 'Email cannot be changed' }}
                </small>
              </div>

              <!-- Phone Number -->
              <div class="form-group">
                <label class="form-label">{{ t('profile.phone') || 'Phone Number' }}</label>
                <div class="input-group-modern">
                  <span class="input-icon"><i class="fas fa-phone"></i></span>
                  <input
                    type="tel"
                    class="form-control-modern"
                    v-model="profile.phone"
                    :placeholder="t('profile.phonePlaceholder') || 'Enter your phone number'"
                  />
                </div>
              </div>

              <!-- Address -->
              <div class="form-group">
                <label class="form-label">{{ t('profile.address') || 'Address' }}</label>
                <div class="input-group-modern">
                  <span class="input-icon input-icon--textarea"><i class="fas fa-map-marker-alt"></i></span>
                  <textarea
                    class="form-control-modern form-control-modern--textarea"
                    v-model="profile.address"
                    rows="2"
                    :placeholder="t('profile.addressPlaceholder') || 'Enter your address'"
                  ></textarea>
                </div>
              </div>

              <div class="form-actions">
                <button type="submit" class="btn-save" :disabled="loading">
                  <span v-if="loading" class="spinner-border spinner-border-sm me-2"></span>
                  <i v-else class="fas fa-save"></i>
                  {{ loading ? (t('profile.saving') || 'Saving...') : (t('profile.saveChanges') || 'Save Changes') }}
                </button>
                <button type="button" class="btn-reset" @click="resetForm">
                  <i class="fas fa-undo"></i>
                  {{ t('profile.reset') || 'Reset' }}
                </button>
              </div>
            </form>
          </div>
        </div>

        <!-- Column 3: Change Password -->
        <div class="profile-card profile-card--password">
          <div class="card-accent-bar"></div>
          <div class="card-body">
            <div class="section-header">
              <div class="section-icon section-icon--lock">
                <i class="fas fa-lock"></i>
              </div>
              <h5 class="section-title">{{ t('profile.changePassword') || 'Change Password' }}</h5>
            </div>

            <form @submit.prevent="changePassword" class="profile-form">
              <div class="form-group">
                <label class="form-label">{{ t('profile.currentPassword') || 'Current Password' }} *</label>
                <div class="input-group-modern">
                  <span class="input-icon"><i class="fas fa-key"></i></span>
                  <input
                    type="password"
                    class="form-control-modern"
                    v-model="passwordData.current_password"
                    required
                    :placeholder="t('profile.currentPasswordPlaceholder') || 'Enter current password'"
                  />
                </div>
              </div>

              <div class="form-group">
                <label class="form-label">{{ t('profile.newPassword') || 'New Password' }} *</label>
                <div class="input-group-modern">
                  <span class="input-icon"><i class="fas fa-lock"></i></span>
                  <input
                    type="password"
                    class="form-control-modern"
                    v-model="passwordData.new_password"
                    required
                    minlength="8"
                    :placeholder="t('profile.newPasswordPlaceholder') || 'Enter new password (min 8 chars)'"
                  />
                </div>
                <div class="password-strength" v-if="passwordData.new_password">
                  <div class="strength-bar" :class="passwordStrengthClass"></div>
                  <span class="strength-text">{{ passwordStrengthText }}</span>
                </div>
              </div>

              <div class="form-group">
                <label class="form-label">{{ t('profile.confirmPassword') || 'Confirm New Password' }} *</label>
                <div class="input-group-modern">
                  <span class="input-icon"><i class="fas fa-check-circle"></i></span>
                  <input
                    type="password"
                    class="form-control-modern"
                    v-model="passwordData.confirm_password"
                    required
                    :placeholder="t('profile.confirmPasswordPlaceholder') || 'Confirm new password'"
                  />
                </div>
                <small v-if="passwordData.new_password && passwordData.confirm_password && passwordData.new_password !== passwordData.confirm_password" class="mismatch-hint mismatch-hint--error">
                  <i class="fas fa-exclamation-circle"></i>
                  {{ t('profile.passwordMismatch') || 'Passwords do not match' }}
                </small>
                <small v-else-if="passwordData.confirm_password && passwordData.new_password === passwordData.confirm_password" class="mismatch-hint mismatch-hint--success">
                  <i class="fas fa-check-circle"></i>
                  {{ t('profile.passwordsMatch') || 'Passwords match' }}
                </small>
              </div>

              <button type="submit" class="btn-change-password" :disabled="passwordLoading">
                <span v-if="passwordLoading" class="spinner-border spinner-border-sm me-2"></span>
                <i v-else class="fas fa-sync-alt"></i>
                {{ passwordLoading ? (t('profile.changing') || 'Changing...') : (t('profile.changePasswordBtn') || 'Change Password') }}
              </button>
            </form>
          </div>
        </div>

      </div>
    </div>
  </div>
</template>
'''

content2 = '''<script>
import { useAuthStore } from '../stores/auth'
import { useTranslation } from '../composables/useTranslation'
import axios from 'axios'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api'
// Strip '/api' suffix to get the root URL for serving static files (storage, etc.)
const APP_URL = API_URL.replace(/\\/api\\/?$/, '') || 'http://localhost:8000'

export default {
  name: 'ProfileView',
  data() {
    return {
      profile: {
        name: '',
        phone: '',
        address: ''
      },
      passwordData: {
        current_password: '',
        new_password: '',
        confirm_password: ''
      },
      loading: false,
      passwordLoading: false,
      photoUploading: false,
      photoPreview: null,
      selectedPhoto: null,
      alertMessage: '',
      alertType: 'success'
    }
  },
  setup() {
    const authStore = useAuthStore()
    const { t } = useTranslation()
    return { authStore, t }
  },
  computed: {
    userInitial() {
      return this.authStore.user?.name?.charAt(0)?.toUpperCase() || 'U'
    },
    passwordStrengthClass() {
      const pwd = this.passwordData.new_password
      if (!pwd) return ''
      const hasUpper = /[A-Z]/.test(pwd)
      const hasLower = /[a-z]/.test(pwd)
      const hasNumber = /\\d/.test(pwd)
      const hasSymbol = /[!@#$%^&*(),.?"{}|<>]/.test(pwd)
      const score = [hasUpper, hasLower, hasNumber, hasSymbol].filter(Boolean).length
      if (pwd.length < 8) return 'weak'
      if (score <= 1) return 'weak'
      if (score === 2) return 'medium'
      if (score >= 3) return 'strong'
      return ''
    },
    passwordStrengthText() {
      const pwd = this.passwordData.new_password
      if (!pwd) return ''
      if (this.passwordStrengthClass === 'weak') return this.t('profile.weak') || 'Weak'
      if (this.passwordStrengthClass === 'medium') return this.t('profile.medium') || 'Medium'
      if (this.passwordStrengthClass === 'strong') return this.t('profile.strong') || 'Strong'
      return ''
    }
  },
  async mounted() {
    // If user data isn't loaded yet, fetch it first
    if (!this.authStore.user && this.authStore.token) {
      await this.authStore.fetchProfile()
    }
    this.loadProfile()
  },
  watch: {
    'authStore.user': {
      handler(user) {
        if (user) this.loadProfile()
      },
      immediate: false
    }
  },
  methods: {
    loadProfile() {
      if (this.authStore.user) {
        this.profile = {
          name: this.authStore.user.name || '',
          phone: this.authStore.user.phone || '',
          address: this.authStore.user.address || ''
        }
      }
    },

    resetForm() {
      this.loadProfile()
      this.alertMessage = ''
    },

    getPhotoUrl(photoPath) {
      if (!photoPath) return ''
      // If it's already a full URL, return as-is
      if (photoPath.startsWith('http')) return photoPath
      // Use APP_URL (root) for storage, not API_URL (which has /api suffix)
      return APP_URL + '/storage/' + photoPath
    },

    triggerPhotoUpload() {
      this.$refs.photoInput?.click()
    },

    onPhotoSelected(event) {
      const file = event.target.files[0]
      if (!file) return

      // Preview
      const reader = new FileReader()
      reader.onload = (e) => {
        this.photoPreview = e.target.result
      }
      reader.readAsDataURL(file)

      this.selectedPhoto = file
      this.uploadPhoto()
    },

    async uploadPhoto() {
      if (!this.selectedPhoto) return

      this.photoUploading = true
      this.alertMessage = ''

      try {
        const formData = new FormData()
        formData.append('photo', this.selectedPhoto)

        const response = await axios.post('/profile/photo', formData, {
          headers: { 'Content-Type': 'multipart/form-data' }
        })

        // Update the user in the auth store with fresh data from the response
        if (response.data.user) {
          this.authStore.user = response.data.user
        }

        this.photoPreview = null
        this.selectedPhoto = null

        this.showAlert('success', this.t('profile.photoUpdated') || 'Profile photo updated successfully!')
      } catch (error) {
        const msg = error?.response?.data?.message || this.t('profile.photoFailed') || 'Failed to upload photo'
        this.showAlert('error', msg)
        this.photoPreview = null
      } finally {
        this.photoUploading = false
        // Reset file input
        if (this.$refs.photoInput) {
          this.$refs.photoInput.value = ''
        }
      }
    },

    async updateProfile() {
      this.loading = true
      this.alertMessage = ''

      const result = await this.authStore.updateProfile({
        name: this.profile.name,
        phone: this.profile.phone,
        address: this.profile.address
      })

      this.loading = false

      if (result.success) {
        this.showAlert('success', this.t('profile.updated') || 'Profile updated successfully!')
        this.loadProfile() // Re-sync with store data
      } else {
        const errorMsg = typeof result.error === 'object'
          ? Object.values(result.error).flat().join(', ')
          : result.error || this.t('profile.updateFailed') || 'Failed to update profile'
        this.showAlert('error', errorMsg)
      }
    },

    async changePassword() {
      if (this.passwordData.new_password !== this.passwordData.confirm_password) {
        this.showAlert('error', this.t('profile.passwordMismatch') || 'New passwords do not match!')
        return
      }

      this.passwordLoading = true
      this.alertMessage = ''

      const result = await this.authStore.changePassword({
        current_password: this.passwordData.current_password,
        new_password: this.passwordData.new_password,
        confirm_password: this.passwordData.confirm_password
      })

      this.passwordLoading = false

      if (result.success) {
        this.showAlert('success', this.t('profile.passwordChanged') || 'Password changed successfully!')
        this.passwordData = {
          current_password: '',
          new_password: '',
          confirm_password: ''
        }
      } else {
        this.showAlert('error', result.error || this.t('profile.passwordFailed') || 'Failed to change password')
      }
    },

    showAlert(type, message) {
      this.alertType = type
      this.alertMessage = message
      setTimeout(() => {
        this.alertMessage = ''
      }, 5000)
    },

    formatDate(dateStr) {
      if (!dateStr) return 'N/A'
      const date = new Date(dateStr)
      return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
    }
  }
}
</script>
'''

content3 = '''
<style scoped>
/* ============================================
   PROFILE PAGE — Modern Glassmorphism
   Premium Skincare / E-commerce Aesthetic
   ============================================ */

.profile-page {
  min-height: 100vh;
  background: linear-gradient(135deg, #fdf2f8 0%, #f8fafc 50%, #fdf2f8 100%);
  padding: 100px 0 80px;
  position: relative;
  overflow: hidden;
}

.profile-page::before {
  content: '';
  position: fixed;
  top: -40%;
  right: -20%;
  width: 700px;
  height: 700px;
  background: radial-gradient(circle, rgba(214, 55, 239, 0.06) 0%, transparent 70%);
  border-radius: 50%;
  pointer-events: none;
  z-index: 0;
}

.profile-page::after {
  content: '';
  position: fixed;
  bottom: -30%;
  left: -15%;
  width: 600px;
  height: 600px;
  background: radial-gradient(circle, rgba(99, 102, 241, 0.06) 0%, transparent 70%);
  border-radius: 50%;
  pointer-events: none;
  z-index: 0;
}

.profile-container {
  max-width: 1260px;
  margin: 0 auto;
  padding: 0 24px;
  position: relative;
  z-index: 1;
}

.profile-header {
  text-align: center;
  margin-bottom: 48px;
  position: relative;
}

.header-glow {
  position: absolute;
  top: -60px;
  left: 50%;
  transform: translateX(-50%);
  width: 300px;
  height: 300px;
  background: radial-gradient(circle, rgba(99, 102, 241, 0.08) 0%, transparent 70%);
  border-radius: 50%;
  pointer-events: none;
}

.header-badge {
  width: 72px;
  height: 72px;
  margin: 0 auto 20px;
  border-radius: 20px;
  background: linear-gradient(135deg, #6366f1, #d946ef);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 32px;
  color: #fff;
  box-shadow: 0 12px 32px rgba(99, 102, 241, 0.3);
  transition: all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
  position: relative;
}

.header-badge:hover {
  transform: translateY(-4px) scale(1.05);
  box-shadow: 0 16px 40px rgba(99, 102, 241, 0.4);
}

.profile-title {
  font-family: 'Playfair Display', Georgia, serif;
  font-weight: 700;
  font-size: 2.4rem;
  color: #1e1b2e;
  margin-bottom: 8px;
  letter-spacing: -0.5px;
}

.profile-subtitle {
  color: #6b6575;
  font-size: 1.05rem;
  font-weight: 400;
}

.profile-grid {
  display: grid;
  grid-template-columns: 1fr 1.4fr 1.2fr;
  gap: 24px;
  align-items: start;
}

.profile-card {
  background: rgba(255, 255, 255, 0.85);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.7);
  border-radius: 24px;
  box-shadow: 0 4px 20px rgba(180, 120, 140, 0.08), 0 1px 3px rgba(0, 0, 0, 0.02);
  overflow: hidden;
  transition: all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
  position: relative;
}

.profile-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 12px 40px rgba(180, 120, 140, 0.12), 0 4px 12px rgba(0, 0, 0, 0.04);
}

.card-accent-bar {
  height: 4px;
  background: linear-gradient(90deg, #6366f1, #d946ef, #f43f5e);
  border-radius: 0 0 4px 4px;
}

.card-body {
  padding: 32px 28px;
}

.section-header {
  display: flex;
  align-items: center;
  gap: 14px;
  margin-bottom: 28px;
}

.section-icon {
  width: 44px;
  height: 44px;
  border-radius: 14px;
  background: linear-gradient(135deg, #6366f1, #d946ef);
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  font-size: 18px;
  flex-shrink: 0;
  box-shadow: 0 6px 16px rgba(99, 102, 241, 0.25);
}

.section-icon--lock {
  background: linear-gradient(135deg, #d946ef, #f43f5e);
  box-shadow: 0 6px 16px rgba(217, 70, 239, 0.25);
}

.section-title {
  font-family: 'Playfair Display', Georgia, serif;
  font-weight: 700;
  font-size: 1.2rem;
  color: #1e1b2e;
  margin: 0;
}

.profile-card--photo {
  text-align: center;
  position: sticky;
  top: 100px;
}

.profile-photo-wrapper {
  position: relative;
  width: 150px;
  height: 150px;
  margin: 8px auto 0;
  cursor: pointer;
  border-radius: 50%;
}

.profile-photo-ring {
  position: relative;
  width: 100%;
  height: 100%;
  border-radius: 50%;
  padding: 4px;
  background: linear-gradient(135deg, #6366f1, #d946ef, #f43f5e);
  background-size: 200% 200%;
  animation: ringGradient 4s ease infinite;
  box-shadow: 0 8px 28px rgba(99, 102, 241, 0.2);
}

@keyframes ringGradient {
  0%, 100% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
}

.profile-photo {
  width: 100%;
  height: 100%;
  border-radius: 50%;
  overflow: hidden;
  border: 3px solid #fff;
  background: #fff;
}

.profile-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.profile-photo--placeholder {
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #e0d5f5, #f5d5e5);
}

.profile-initial {
  font-size: 3.2rem;
  font-weight: 800;
  color: #6366f1;
  text-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
}

.profile-photo-overlay {
  position: absolute;
  z-index: 2;
  inset: 4px;
  background: rgba(0, 0, 0, 0.45);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: #fff;
  font-size: 28px;
  opacity: 0;
  transition: all 0.35s ease;
  border-radius: 50%;
  gap: 6px;
  backdrop-filter: blur(3px);
}

.profile-photo-overlay i {
  font-size: 28px;
}

.profile-photo-overlay span {
  font-size: 0.72rem;
  font-weight: 600;
}

.profile-photo-wrapper:hover .profile-photo-overlay {
  opacity: 1;
}

.profile-name {
  font-family: 'Playfair Display', Georgia, serif;
  font-weight: 700;
  font-size: 1.35rem;
  color: #1e1b2e;
  margin: 20px 0 6px;
}

.profile-email {
  color: #6366f1;
  font-size: 0.9rem;
  font-weight: 500;
  margin-bottom: 2px;
}

.profile-phone {
  color: #6b6575;
  font-size: 0.85rem;
  margin-bottom: 0;
}

.btn-upload-photo {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  margin-top: 20px;
  width: 100%;
  padding: 12px 24px;
  border: none;
  border-radius: 14px;
  background: linear-gradient(135deg, #6366f1, #d946ef);
  color: #fff;
  font-weight: 600;
  font-size: 0.88rem;
  font-family: inherit;
  cursor: pointer;
  transition: all 0.35s cubic-bezier(0.34, 1.56, 0.64, 1);
  box-shadow: 0 6px 20px rgba(99, 102, 241, 0.3);
  position: relative;
  overflow: hidden;
}

.btn-upload-photo::before {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(135deg, #d946ef, #6366f1);
  opacity: 0;
  transition: opacity 0.35s ease;
  border-radius: 14px;
}

.btn-upload-photo:hover:not(:disabled) {
  transform: translateY(-3px);
  box-shadow: 0 8px 28px rgba(99, 102, 241, 0.4);
}

.btn-upload-photo:hover:not(:disabled)::before {
  opacity: 1;
}

.btn-upload-photo:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}

.btn-upload-photo .btn-icon,
.btn-upload-photo span {
  position: relative;
  z-index: 1;
}

.account-info {
  margin-top: 24px;
}

.info-divider {
  height: 1px;
  background: linear-gradient(90deg, transparent, #e8dce8, transparent);
  margin-bottom: 20px;
}

.info-item {
  display: flex;
  align-items: center;
  gap: 12px;
  justify-content: center;
}

.info-icon-box {
  width: 36px;
  height: 36px;
  border-radius: 10px;
  background: linear-gradient(135deg, rgba(99, 102, 241, 0.1), rgba(217, 70, 239, 0.1));
  display: flex;
  align-items: center;
  justify-content: center;
  color: #6366f1;
  font-size: 14px;
  flex-shrink: 0;
}

.info-text {
  font-size: 0.85rem;
  color: #6b6575;
  font-weight: 450;
}

.profile-form {
  width: 100%;
}

.form-group {
  margin-bottom: 20px;
}

.form-label {
  display: block;
  font-weight: 600;
  font-size: 0.83rem;
  color: #1e1b2e;
  margin-bottom: 8px;
  letter-spacing: 0.01em;
}

.input-group-modern {
  display: flex;
  align-items: stretch;
  border-radius: 14px;
  overflow: hidden;
  border: 1.5px solid #ede5ed;
  background: #fff;
  transition: all 0.35s ease;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.02);
}

.input-group-modern:focus-within {
  border-color: #6366f1;
  box-shadow: 0 4px 20px rgba(99, 102, 241, 0.12), 0 0 0 3px rgba(99, 102, 241, 0.06);
  transform: translateY(-1px);
}

.input-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 46px;
  min-height: 46px;
  background: #faf5f8;
  color: #a89ab0;
  font-size: 15px;
  flex-shrink: 0;
  border-right: 1.5px solid #ede5ed;
  transition: color 0.35s ease;
}

.input-group-modern:focus-within .input-icon {
  color: #6366f1;
}

.input-icon--textarea {
  align-items: flex-start;
  padding-top: 14px;
}

.form-control-modern {
  flex: 1;
  border: none;
  padding: 12px 14px;
  font-size: 0.9rem;
  font-family: inherit;
  color: #1e1b2e;
  background: transparent;
  outline: none;
  min-height: 46px;
}

.form-control-modern::placeholder {
  color: #b8aab8;
  font-weight: 400;
}

.form-control-modern:disabled {
  background: #f5f0f4;
  color: #8a7a8a;
  cursor: not-allowed;
}

.form-control-modern--textarea {
  resize: vertical;
  min-height: 70px;
  line-height: 1.5;
}

.form-hint {
  display: flex;
  align-items: center;
  gap: 6px;
  margin-top: 8px;
  font-size: 0.78rem;
  color: #a89ab0;
}

.form-hint i {
  font-size: 12px;
}

.password-strength {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-top: 10px;
}

.strength-bar {
  flex: 1;
  height: 5px;
  border-radius: 10px;
  background: #ede5ed;
  overflow: hidden;
  position: relative;
}

.strength-bar::after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  border-radius: 10px;
  transition: width 0.5s ease, background 0.3s ease;
}

.strength-bar.weak::after {
  width: 33%;
  background: linear-gradient(90deg, #f43f5e, #fb7185);
}

.strength-bar.medium::after {
  width: 66%;
  background: linear-gradient(90deg, #d946ef, #e879f9);
}

.strength-bar.strong::after {
  width: 100%;
  background: linear-gradient(90deg, #6366f1, #818cf8);
}

.strength-text {
  font-size: 0.78rem;
  font-weight: 600;
  white-space: nowrap;
}

.strength-bar.weak + .strength-text {
  color: #f43f5e;
}

.strength-bar.medium + .strength-text {
  color: #d946ef;
}

.strength-bar.strong + .strength-text {
  color: #6366f1;
}

.mismatch-hint {
  display: flex;
  align-items: center;
  gap: 6px;
  margin-top: 8px;
  font-size: 0.8rem;
}

.mismatch-hint--error {
  color: #f43f5e;
}

.mismatch-hint--success {
  color: #10b981;
}

.form-actions {
  display: flex;
  gap: 12px;
  margin-top: 28px;
}

.btn-save {
  flex: 1;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 13px 28px;
  border: none;
  border-radius: 14px;
  background: linear-gradient(135deg, #6366f1, #d946ef);
  color: #fff;
  font-weight: 600;
  font-size: 0.9rem;
  font-family: inherit;
  cursor: pointer;
  transition: all 0.35s cubic-bezier(0.34, 1.56, 0.64, 1);
  box-shadow: 0 6px 20px rgba(99, 102, 241, 0.3);
  position: relative;
  overflow: hidden;
}

.btn-save::before {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(135deg, #d946ef, #6366f1);
  opacity: 0;
  transition: opacity 0.35s ease;
  border-radius: 14px;
}

.btn-save:hover:not(:disabled) {
  transform: translateY(-3px);
  box-shadow: 0 8px 28px rgba(99, 102, 241, 0.4);
}

.btn-save:hover:not(:disabled)::before {
  opacity: 1;
}

.btn-save:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}

.btn-save i,
.btn-save span {
  position: relative;
  z-index: 1;
}

.btn-reset {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 13px 24px;
  border: 1.5px solid #ede5ed;
  border-radius: 14px;
  background: rgba(255, 255, 255, 0.5);
  color: #6b6575;
  font-weight: 600;
  font-size: 0.9rem;
  font-family: inherit;
  cursor: pointer;
  transition: all 0.35s cubic-bezier(0.34, 1.56, 0.64, 1);
  backdrop-filter: blur(4px);
}

.btn-reset:hover {
  border-color: #6366f1;
  color: #6366f1;
  background: rgba(99, 102, 241, 0.04);
  transform: translateY(-2px);
}

.btn-change-password {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  width: 100%;
  padding: 14px 28px;
  margin-top: 8px;
  border: none;
  border-radius: 14px;
  background: linear-gradient(135deg, #d946ef, #f43f5e);
  color: #fff;
  font-weight: 600;
  font-size: 0.92rem;
  font-family: inherit;
  cursor: pointer;
  transition: all 0.35s cubic-bezier(0.34, 1.56, 0.64, 1);
  box-shadow: 0 6px 20px rgba(217, 70, 239, 0.3);
  position: relative;
  overflow: hidden;
}

.btn-change-password::before {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(135deg, #f43f5e, #d946ef);
  opacity: 0;
  transition: opacity 0.35s ease;
  border-radius: 14px;
}

.btn-change-password:hover:not(:disabled) {
  transform: translateY(-3px);
  box-shadow: 0 8px 28px rgba(217, 70, 239, 0.4);
}

.btn-change-password:hover:not(:disabled)::before {
  opacity: 1;
}

.btn-change-password:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}

.btn-change-password i,
.btn-change-password span {
  position: relative;
  z-index: 1;
}

.alert-glass {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  padding: 14px 18px;
  border-radius: 14px;
  margin-bottom: 24px;
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.6);
  font-size: 0.88rem;
  animation: alertSlideDown 0.4s ease;
}

.alert-glass--success {
  background: rgba(16, 185, 129, 0.1);
  color: #065f46;
  border-color: rgba(16, 185, 129, 0.2);
  box-shadow: 0 4px 16px rgba(16, 185, 129, 0.1);
}

.alert-glass--error {
  background: rgba(244, 63, 94, 0.1);
  color: #9f1239;
  border-color: rgba(244, 63, 94, 0.2);
  box-shadow: 0 4px 16px rgba(244, 63, 94, 0.1);
}

.alert-content {
  display: flex;
  align-items: center;
  gap: 10px;
}

.alert-icon {
  font-size: 1.05rem;
}

.alert-close {
  background: none;
  border: none;
  font-size: 1.4rem;
  color: inherit;
  cursor: pointer;
  opacity: 0.5;
  padding: 0 4px;
  line-height: 1;
  transition: opacity 0.2s;
}

.alert-close:hover {
  opacity: 1;
}

.alert-fade-enter-active {
  animation: alertSlideDown 0.4s ease;
}

.alert-fade-leave-active {
  animation: alertSlideDown 0.35s ease reverse;
}

@keyframes alertSlideDown {
  from {
    opacity: 0;
    transform: translateY(-12px) scale(0.97);
  }
  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}

@media (max-width: 1024px) {
  .profile-grid {
    grid-template-columns: 1fr 1fr;
  }
  .profile-card--photo {
    position: static;
  }
  .profile-title {
    font-size: 2rem;
  }
  .profile-page {
    padding: 90px 0 60px;
  }
}

@media (max-width: 768px) {
  .profile-grid {
    grid-template-columns: 1fr;
    gap: 20px;
  }
  .profile-container {
    padding: 0 16px;
  }
  .profile-title {
    font-size: 1.75rem;
  }
  .profile-subtitle {
    font-size: 0.95rem;
  }
  .card-body {
    padding: 24px 20px;
  }
  .profile-photo-wrapper {
    width: 130px;
    height: 130px;
  }
  .profile-page {
    padding: 80px 0 40px;
  }
  .form-actions {
    flex-direction: column;
  }
  .btn-reset {
    width: 100%;
  }
  .header-badge {
    width: 60px;
    height: 60px;
    font-size: 26px;
  }
}

@media (max-width: 480px) {
  .profile-title {
    font-size: 1.5rem;
  }
  .card-body {
    padding: 20px 16px;
  }
  .profile-photo-wrapper {
    width: 110px;
    height: 110px;
  }
  .profile-initial {
    font-size: 2.6rem;
  }
}
</style>
'''

filepath = os.path.join('src', 'views', 'Profile.vue')
with open(filepath, 'w', encoding='utf-8', newline='\n') as f:
    f.write(content)
    f.write(content2)
    f.write(content3)
print("Written successfully")
print(f"File size: {os.path.getsize(filepath)} bytes")
