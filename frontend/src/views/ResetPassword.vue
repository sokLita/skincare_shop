<template>
  <div class="auth-page">
    <div class="auth-background">
      <div class="bg-orb bg-orb--1"></div>
      <div class="bg-orb bg-orb--2"></div>
      <div class="bg-orb bg-orb--3"></div>
      <div class="bg-grid"></div>
    </div>

    <div class="auth-floating-icons">
      <span class="float-icon float-icon--1"><i class="fas fa-leaf"></i></span>
      <span class="float-icon float-icon--2"><i class="fas fa-spa"></i></span>
      <span class="float-icon float-icon--3"><i class="fas fa-water"></i></span>
      <span class="float-icon float-icon--4"><i class="fas fa-sun"></i></span>
      <span class="float-icon float-icon--5"><i class="fas fa-seedling"></i></span>
    </div>

    <div class="container position-relative">
      <div class="row justify-content-center align-items-center min-vh-100 py-5">
        <div class="col-lg-5 col-md-7 col-11">
          <div class="auth-card">
            <div class="auth-card-inner">
              <div class="text-center mb-4">
                <div class="auth-icon mb-3">
                  <i class="fas fa-lock"></i>
                </div>
                <h3 class="auth-title">Reset Password</h3>
                <p class="auth-subtitle">Enter your new password below</p>
              </div>

              <div v-if="successMsg" class="auth-alert auth-alert--success">
                <i class="fas fa-check-circle me-2"></i>
                {{ successMsg }}
              </div>

              <div v-if="errorMsg" class="auth-alert auth-alert--error">
                <i class="fas fa-exclamation-circle me-2"></i>
                {{ errorMsg }}
              </div>

              <form v-if="!successMsg" @submit.prevent="handleResetPassword" class="auth-form">
                <div class="form-group">
                  <label for="password" class="form-label">New Password</label>
                  <div class="input-group-custom">
                    <span class="input-icon">
                      <i class="fas fa-lock"></i>
                    </span>
                    <input type="password" id="password" v-model="form.password" class="form-input" placeholder="Enter new password" required minlength="8" />
                    <span class="input-focus-ring"></span>
                  </div>
                </div>

                <div class="form-group">
                  <label for="confirmPassword" class="form-label">Confirm New Password</label>
                  <div class="input-group-custom">
                    <span class="input-icon">
                      <i class="fas fa-lock"></i>
                    </span>
                    <input type="password" id="confirmPassword" v-model="form.confirmPassword" class="form-input" placeholder="Confirm new password" required minlength="8" />
                    <span class="input-focus-ring"></span>
                  </div>
                </div>

                <button type="submit" class="auth-btn" :disabled="loading">
                  <span v-if="loading" class="spinner"></span>
                  <span v-if="loading">Resetting...</span>
                  <span v-else>Reset Password <i class="fas fa-check ms-2"></i></span>
                </button>
              </form>

              <div class="auth-footer">
                <p>
                  Remember your password?
                  <router-link to="/login" class="auth-link">Back to login</router-link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ResetPassword',
  data() {
    return {
      form: {
        password: '',
        confirmPassword: ''
      },
      loading: false,
      errorMsg: '',
      successMsg: ''
    }
  },
  methods: {
    async handleResetPassword() {
      if (this.form.password !== this.form.confirmPassword) {
        this.errorMsg = 'Passwords do not match.'
        return
      }

      this.loading = true
      this.errorMsg = ''
      this.successMsg = ''

      try {
        // Simulate API call - replace with actual API endpoint
        await new Promise(resolve => setTimeout(resolve, 1500))

        // For demo purposes, always show success
        this.successMsg = 'Your password has been reset successfully. You can now log in with your new password.'
        this.form.password = ''
        this.form.confirmPassword = ''
      } catch (error) {
        this.errorMsg = 'Something went wrong. Please try again later.'
      } finally {
        this.loading = false
      }
    }
  }
}
</script>

<style scoped>
.auth-page {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #fdf2f6;
  position: relative;
  overflow: hidden;
}
.auth-background {
  position: absolute;
  inset: 0;
  z-index: 0;
  overflow: hidden;
}
.bg-orb {
  position: absolute;
  border-radius: 50%;
  filter: blur(80px);
  opacity: 0.5;
  animation: orbFloat 12s ease-in-out infinite;
}
.bg-orb--1 {
  width: 500px; height: 500px;
  background: rgba(102,126,234,0.08);
  top: -150px; right: -100px;
  animation-delay: 0s;
}
.bg-orb--2 {
  width: 400px; height: 400px;
  background: rgba(118,75,162,0.06);
  bottom: -100px; left: -80px;
  animation-delay: 4s;
}
.bg-orb--3 {
  width: 300px; height: 300px;
  background: rgba(232,160,180,0.08);
  top: 40%; left: 50%;
  transform: translate(-50%, -50%);
  animation-delay: 8s;
}
@keyframes orbFloat {
  0%,100% { transform: translate(0,0) scale(1); }
  33% { transform: translate(30px,-20px) scale(1.05); }
  66% { transform: translate(-20px,15px) scale(0.95); }
}
.bg-grid {
  position: absolute;
  inset: 0;
  background-image: linear-gradient(rgba(180,120,140,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(180,120,140,0.03) 1px, transparent 1px);
  background-size: 60px 60px;
}
.auth-floating-icons {
  position: absolute;
  inset: 0;
  z-index: 0;
  pointer-events: none;
}
.float-icon {
  position: absolute;
  width: 48px; height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(255,255,255,0.7);
  backdrop-filter: blur(8px);
  border-radius: 14px;
  box-shadow: 0 4px 20px rgba(180,120,140,0.1);
  color: rgba(102,126,234,0.25);
  font-size: 20px;
  animation: floatIcon 6s ease-in-out infinite;
}
.float-icon--1 { top:12%; left:8%; animation-delay:0s; }
.float-icon--2 { top:18%; right:10%; animation-delay:1.2s; width:56px; height:56px; font-size:24px; }
.float-icon--3 { bottom:22%; left:12%; animation-delay:2.4s; }
.float-icon--4 { bottom:15%; right:8%; animation-delay:3.6s; width:42px; height:42px; font-size:16px; }
.float-icon--5 { top:50%; left:5%; animation-delay:4.8s; }
@keyframes floatIcon {
  0%,100% { transform: translateY(0) rotate(0deg); }
  50% { transform: translateY(-14px) rotate(5deg); }
}
.auth-card {
  position: relative;
  z-index: 1;
  animation: cardFadeIn 0.7s ease;
}
@keyframes cardFadeIn {
  from { opacity:0; transform: translateY(24px) scale(0.97); }
  to { opacity:1; transform: translateY(0) scale(1); }
}
.auth-card-inner {
  background: rgba(255,255,255,0.85);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border: 1px solid rgba(240,224,230,0.6);
  border-radius: 24px;
  padding: 40px 36px;
  box-shadow: 0 8px 32px rgba(180,120,140,0.12), 0 2px 8px rgba(180,120,140,0.06), inset 0 1px 0 rgba(255,255,255,0.8);
  transition: all 0.4s ease;
}
.auth-card-inner:hover {
  box-shadow: 0 16px 48px rgba(180,120,140,0.18), 0 4px 12px rgba(180,120,140,0.08), inset 0 1px 0 rgba(255,255,255,0.8);
}
.auth-icon {
  width: 80px; height: 80px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, rgba(102,126,234,0.12), rgba(118,75,162,0.12));
  border-radius: 22px;
  font-size: 34px;
  color: #667eea;
  transition: all 0.5s ease;
  position: relative;
  overflow: hidden;
}
.auth-icon::after {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(135deg, rgba(102,126,234,0.05), rgba(118,75,162,0.05));
  border-radius: inherit;
  opacity: 0;
  transition: opacity 0.5s ease;
}
.auth-card-inner:hover .auth-icon::after { opacity: 1; }
.auth-title { font-size:24px; font-weight:700; color:#2c3e50; margin:0 0 6px; letter-spacing:-0.3px; }
.auth-subtitle { font-size:14px; color:#8a7a82; margin:0; }
.auth-alert {
  display: flex;
  align-items: center;
  padding: 12px 16px;
  border-radius: 12px;
  font-size: 13px;
  margin-bottom: 20px;
  animation: alertSlide 0.4s ease;
}
@keyframes alertSlide {
  from { opacity:0; transform: translateY(-8px); }
  to { opacity:1; transform: translateY(0); }
}
.auth-alert--success {
  background: rgba(25,135,84,0.08);
  color: #198754;
  border: 1px solid rgba(25,135,84,0.12);
}
.auth-alert--error {
  background: rgba(220,53,69,0.08);
  color: #d6336c;
  border: 1px solid rgba(220,53,69,0.12);
}
.auth-form { display:flex; flex-direction:column; gap:20px; }
.form-group { display:flex; flex-direction:column; gap:6px; }
.form-label { font-size:13px; font-weight:600; color:#2c3e50; }
.input-group-custom { position:relative; display:flex; align-items:center; }
.input-icon {
  position: absolute;
  left: 14px;
  top: 50%;
  transform: translateY(-50%);
  color: #bbaab2;
  font-size: 15px;
  z-index: 2;
  pointer-events: none;
  transition: color 0.3s ease;
}
.form-input {
  width: 100%;
  padding: 14px 14px 14px 44px;
  border: 1.5px solid #f0e0e6;
  border-radius: 14px;
  font-size: 14px;
  background: rgba(253,242,246,0.5);
  color: #2c3e50;
  transition: all 0.3s ease;
  outline: none;
  position: relative;
  z-index: 1;
}
.form-input::placeholder { color: #bbaab2; }
.form-input:hover { border-color: #d0b8c4; background: rgba(253,242,246,0.8); }
.form-input:focus { border-color: #667eea; background: #ffffff; box-shadow: 0 0 0 4px rgba(102,126,234,0.1); }
.form-input:focus ~ .input-icon { color: #667eea; }
.input-focus-ring {
  position: absolute;
  inset: -2px;
  border-radius: 16px;
  border: 2px solid rgba(102,126,234,0.3);
  opacity: 0;
  transition: opacity 0.3s ease;
  pointer-events: none;
  z-index: 0;
}
.form-input:focus ~ .input-focus-ring { opacity:1; animation:focusPulse 2s ease-in-out infinite; }
@keyframes focusPulse { 0%,100% { opacity:0.3; } 50% { opacity:0.6; } }
.auth-btn {
  width: 100%;
  padding: 15px;
  border: none;
  border-radius: 14px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: #ffffff;
  font-size: 15px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.35s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  position: relative;
  overflow: hidden;
}
.auth-btn::before {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(135deg, #764ba2 0%, #667eea 100%);
  opacity: 0;
  transition: opacity 0.35s ease;
  border-radius: inherit;
}
.auth-btn:hover:not(:disabled)::before { opacity: 1; }
.auth-btn:hover:not(:disabled) { transform:translateY(-2px); box-shadow:0 12px 28px rgba(102,126,234,0.35); }
.auth-btn:active:not(:disabled) { transform:translateY(0); box-shadow:0 4px 12px rgba(102,126,234,0.3); }
.auth-btn span, .auth-btn i { position:relative; z-index:1; }
.auth-btn:disabled { opacity:0.7; cursor:not-allowed; }
.spinner { width:18px; height:18px; border:2.5px solid rgba(255,255,255,0.3); border-top-color:#fff; border-radius:50%; animation:spin 0.7s linear infinite; }
@keyframes spin { to { transform:rotate(360deg); } }
.auth-footer { text-align:center; margin-top:20px; }
.auth-footer p { font-size:13px; color:#8a7a82; margin:0; }
.auth-link { color:#667eea; text-decoration:none; font-weight:600; transition:all 0.3s ease; }
.auth-link:hover { color:#764ba2; text-decoration:underline; }
@media (max-width: 768px) {
  .auth-card-inner { padding:32px 24px; border-radius:20px; }
  .auth-title { font-size:22px; }
  .form-input { padding:13px 13px 13px 42px; font-size:14px; }
  .float-icon { display:none; }
}
@media (max-width: 480px) {
  .auth-card-inner { padding:28px 20px; }
  .auth-icon { width:64px; height:64px; font-size:26px; border-radius:18px; }
  .bg-orb { filter:blur(50px); }
}
</style>