<template>
  <div class="container py-4">
    <h2>👤 My Profile</h2>
    
    <div class="row">
      <div class="col-md-6">
        <div class="card">
          <div class="card-body">
            <h5>Profile Information</h5>
            <form @submit.prevent="updateProfile">
              <div class="mb-3">
                <label class="form-label">Name *</label>
                <input type="text" class="form-control" v-model="profile.name" required>
              </div>
              
              <div class="mb-3">
                <label class="form-label">Email *</label>
                <input type="email" class="form-control" v-model="profile.email" required>
              </div>
              
              <div class="mb-3">
                <label class="form-label">Phone</label>
                <input type="text" class="form-control" v-model="profile.phone">
              </div>
              
              <div class="mb-3">
                <label class="form-label">Address</label>
                <textarea class="form-control" v-model="profile.address" rows="2"></textarea>
              </div>
              
              <button type="submit" class="btn btn-primary" :disabled="loading">
                <span v-if="loading" class="spinner-border spinner-border-sm me-2"></span>
                Update Profile
              </button>
            </form>
          </div>
        </div>
      </div>
      
      <div class="col-md-6">
        <div class="card">
          <div class="card-body">
            <h5>Change Password</h5>
            <form @submit.prevent="changePassword">
              <div class="mb-3">
                <label class="form-label">Current Password *</label>
                <input type="password" class="form-control" v-model="passwordData.current_password" required>
              </div>
              
              <div class="mb-3">
                <label class="form-label">New Password *</label>
                <input type="password" class="form-control" v-model="passwordData.new_password" required>
              </div>
              
              <div class="mb-3">
                <label class="form-label">Confirm New Password *</label>
                <input type="password" class="form-control" v-model="passwordData.confirm_password" required>
              </div>
              
              <button type="submit" class="btn btn-warning" :disabled="passwordLoading">
                <span v-if="passwordLoading" class="spinner-border spinner-border-sm me-2"></span>
                Change Password
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { useAuthStore } from '../stores/auth'

export default {
  name: 'Profile',
  data() {
    return {
      profile: {
        name: '',
        email: '',
        phone: '',
        address: ''
      },
      passwordData: {
        current_password: '',
        new_password: '',
        confirm_password: ''
      },
      loading: false,
      passwordLoading: false
    }
  },
  setup() {
    const authStore = useAuthStore()
    return { authStore }
  },
  mounted() {
    if (this.authStore.user) {
      this.profile = { ...this.authStore.user }
    }
  },
  methods: {
    async updateProfile() {
      this.loading = true
      const result = await this.authStore.updateProfile(this.profile)
      this.loading = false
      if (result.success) {
        alert('Profile updated successfully!')
      } else {
        alert(result.error || 'Failed to update profile')
      }
    },
    
    async changePassword() {
      if (this.passwordData.new_password !== this.passwordData.confirm_password) {
        alert('New passwords do not match!')
        return
      }
      
      this.passwordLoading = true
      const result = await this.authStore.changePassword(this.passwordData)
      this.passwordLoading = false
      
      if (result.success) {
        alert('Password changed successfully!')
        this.passwordData = {
          current_password: '',
          new_password: '',
          confirm_password: ''
        }
      } else {
        alert(result.error || 'Failed to change password')
      }
    }
  }
}
</script>