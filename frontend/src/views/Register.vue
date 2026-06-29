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
        <div class="col-lg-7 col-md-9 col-11">
          <div class="auth-card">
            <div class="auth-card-inner">
              <div class="text-center mb-4">
                <div class="auth-icon mb-3">
                  <i class="fas fa-spa"></i>
                </div>
                <h3 class="auth-title">{{ t('register.title') }}</h3>
                <p class="auth-subtitle">{{ t('register.subtitle') }}</p>
              </div>

              <div v-if="errorMsg" class="auth-alert auth-alert--error">
                <i class="fas fa-exclamation-circle me-2"></i>
                {{ errorMsg }}
              </div>

              <form @submit.prevent="handleRegister" class="auth-form">
                <div class="form-row">
                  <div class="form-group">
                    <label for="name" class="form-label">{{ t('register.fullName') }} <span class="required">*</span></label>
                    <div class="input-group-custom">
                      <span class="input-icon"><i class="fas fa-user"></i></span>
                      <input type="text" id="name" v-model="form.name" class="form-input" :placeholder="t('register.fullNamePlaceholder')" required />
                      <span class="input-focus-ring"></span>
                    </div>
                  </div>

                  <div class="form-group">
                    <label for="email" class="form-label">{{ t('register.emailAddress') }} <span class="required">*</span></label>
                    <div class="input-group-custom">
                      <span class="input-icon"><i class="fas fa-envelope"></i></span>
                      <input type="email" id="email" v-model="form.email" class="form-input" :placeholder="t('register.emailPlaceholder')" required />
                      <span class="input-focus-ring"></span>
                    </div>
                  </div>
                </div>

                <div class="form-row">
                  <div class="form-group">
                    <label for="password" class="form-label">{{ t('register.password') }} <span class="required">*</span></label>
                    <div class="input-group-custom">
                      <span class="input-icon"><i class="fas fa-lock"></i></span>
                      <input :type="showPassword ? 'text' : 'password'" id="password" v-model="form.password" class="form-input" :placeholder="t('register.passwordPlaceholder')" required minlength="8" />
                      <button type="button" class="input-toggle-pass" @click="showPassword = !showPassword" tabindex="-1">
                        <i :class="showPassword ? 'fas fa-eye-slash' : 'fas fa-eye'"></i>
                      </button>
                      <span class="input-focus-ring"></span>
                    </div>
                    <div class="password-hint">
                      <div class="password-strength" v-if="form.password.length > 0">
                        <div class="strength-bar" :class="passwordStrengthClass"></div>
                      </div>
                      <span class="hint-text" :class="{ 'hint-valid': form.password.length >= 8 }">
                        <i :class="form.password.length >= 8 ? 'fas fa-check-circle' : 'fas fa-circle'"></i>
                        {{ t('register.minChars') }}
                      </span>
                    </div>
                  </div>

                  <div class="form-group">
                    <label for="phone" class="form-label">{{ t('register.phoneNumber') }}</label>
                    <div class="input-group-custom">
                      <span class="input-icon"><i class="fas fa-phone"></i></span>
                      <input type="tel" id="phone" v-model="form.phone" class="form-input" :placeholder="t('register.phonePlaceholder')" />
                      <span class="input-focus-ring"></span>
                    </div>
                  </div>
                </div>

                <div class="form-group">
                  <label class="checkbox-wrap">
                    <input type="checkbox" v-model="agreeTerms" />
                    <span class="checkmark"></span>
                    <span class="checkbox-label">
                      {{ t('register.agreeTerms') }}
                      <router-link to="/terms" class="terms-link">{{ t('register.termsOfService') }}</router-link>
                      {{ t('register.andText') }}
                      <router-link to="/privacy" class="terms-link">{{ t('register.privacyPolicy') }}</router-link>
                      <span class="required">*</span>
                    </span>
                  </label>
                </div>

                <button type="submit" class="auth-btn" :disabled="loading || !agreeTerms">
                  <span v-if="loading" class="spinner"></span>
                  <span v-if="loading">{{ t('register.creatingAccount') }}</span>
                  <span v-else>{{ t('register.createAccount') }} <i class="fas fa-arrow-right ms-2"></i></span>
                </button>
              </form>

              <div class="auth-divider">
                <span>{{ t('register.orSignUpWith') }}</span>
              </div>

              <div class="social-btns">
                <button type="button" class="social-btn social-btn--google" @click="socialSignup('google')">
                  <i class="fab fa-google"></i>
                  <span>{{ t('register.google') }}</span>
                </button>
                <button type="button" class="social-btn social-btn--facebook" @click="socialSignup('facebook')">
                  <i class="fab fa-facebook-f"></i>
                  <span>{{ t('register.facebook') }}</span>
                </button>
              </div>

              <div class="auth-footer">
                <p>{{ t('register.alreadyHaveAccount') }}
                  <router-link to="/login" class="auth-link">{{ t('register.signIn') }}</router-link>
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
import { useAuthStore } from '../stores/auth'
import { useTranslation } from '../composables/useTranslation'

export default {
  name: 'Register',
  data() {
    return {
      form: { name: '', email: '', password: '', phone: '' },
      loading: false,
      errorMsg: '',
      showPassword: false,
      agreeTerms: false
    }
  },
  setup() {
    const authStore = useAuthStore()
    const { t } = useTranslation()
    authStore.initAxios()
    return { authStore, t }
  },
  computed: {
    passwordStrengthClass() {
      const len = this.form.password.length
      if (len === 0) return ''
      if (len < 4) return 'strength--weak'
      if (len < 6) return 'strength--fair'
      if (len < 8) return 'strength--good'
      return 'strength--strong'
    }
  },
  methods: {
    async handleRegister() {
      this.loading = true
      this.errorMsg = ''
      const result = await this.authStore.register({
        ...this.form,
        password_confirmation: this.form.password
      })
      this.loading = false
      if (result.success) {
        this.$router.push(this.$route.query.redirect || '/')
      } else {
        const errors = result.error
        this.errorMsg = typeof errors === 'object'
          ? Object.values(errors).flat().join('\n')
          : (errors || 'Registration failed. Please try again.')
      }
    },
    socialSignup(provider) {
      this.errorMsg = provider + ' signup coming soon!'
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
.bg-orb--1 { width:500px; height:500px; background:rgba(102,126,234,0.08); top:-150px; right:-100px; animation-delay:0s; }
.bg-orb--2 { width:400px; height:400px; background:rgba(118,75,162,0.06); bottom:-100px; left:-80px; animation-delay:4s; }
.bg-orb--3 { width:300px; height:300px; background:rgba(232,160,180,0.08); top:40%; left:50%; transform:translate(-50%,-50%); animation-delay:8s; }
@keyframes orbFloat {
  0%,100% { transform:translate(0,0) scale(1); }
  33% { transform:translate(30px,-20px) scale(1.05); }
  66% { transform:translate(-20px,15px) scale(0.95); }
}
.bg-grid {
  position: absolute; inset:0;
  background-image: linear-gradient(rgba(180,120,140,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(180,120,140,0.03) 1px, transparent 1px);
  background-size: 60px 60px;
}
.auth-floating-icons { position:absolute; inset:0; z-index:0; pointer-events:none; }
.float-icon {
  position:absolute; width:48px; height:48px;
  display:flex; align-items:center; justify-content:center;
  background:rgba(255,255,255,0.7); backdrop-filter:blur(8px); border-radius:14px;
  box-shadow:0 4px 20px rgba(180,120,140,0.1);
  color:rgba(102,126,234,0.25); font-size:20px;
  animation:floatIcon 6s ease-in-out infinite;
}
.float-icon--1 { top:12%; left:8%; animation-delay:0s; }
.float-icon--2 { top:18%; right:10%; animation-delay:1.2s; width:56px; height:56px; font-size:24px; }
.float-icon--3 { bottom:22%; left:12%; animation-delay:2.4s; }
.float-icon--4 { bottom:15%; right:8%; animation-delay:3.6s; width:42px; height:42px; font-size:16px; }
.float-icon--5 { top:50%; left:5%; animation-delay:4.8s; }
@keyframes floatIcon {
  0%,100% { transform:translateY(0) rotate(0deg); }
  50% { transform:translateY(-14px) rotate(5deg); }
}
.auth-card { position:relative; z-index:1; animation:cardFadeIn 0.7s ease; }
@keyframes cardFadeIn {
  from { opacity:0; transform:translateY(24px) scale(0.97); }
  to { opacity:1; transform:translateY(0) scale(1); }
}
.auth-card-inner {
  background:rgba(255,255,255,0.85); backdrop-filter:blur(20px); -webkit-backdrop-filter:blur(20px);
  border:1px solid rgba(240,224,230,0.6); border-radius:24px; padding:40px 36px;
  box-shadow:0 8px 32px rgba(180,120,140,0.12), 0 2px 8px rgba(180,120,140,0.06), inset 0 1px 0 rgba(255,255,255,0.8);
  transition:all 0.4s ease;
}
.auth-card-inner:hover {
  box-shadow:0 16px 48px rgba(180,120,140,0.18), 0 4px 12px rgba(180,120,140,0.08), inset 0 1px 0 rgba(255,255,255,0.8);
}
.auth-icon {
  width:80px; height:80px; margin:0 auto;
  display:flex; align-items:center; justify-content:center;
  background:linear-gradient(135deg, rgba(102,126,234,0.12), rgba(118,75,162,0.12));
  border-radius:22px; font-size:34px; color:#667eea;
  transition:all 0.5s ease; position:relative; overflow:hidden;
}
.auth-icon::after {
  content:''; position:absolute; inset:0;
  background:linear-gradient(135deg, rgba(102,126,234,0.05), rgba(118,75,162,0.05));
  border-radius:inherit; opacity:0; transition:opacity 0.5s ease;
}
.auth-card-inner:hover .auth-icon::after { opacity:1; }
.auth-title { font-size:24px; font-weight:700; color:#2c3e50; margin:0 0 6px; letter-spacing:-0.3px; }
.auth-subtitle { font-size:14px; color:#8a7a82; margin:0; }
.auth-alert {
  display:flex; align-items:center; padding:12px 16px; border-radius:12px;
  font-size:13px; margin-bottom:20px; animation:alertSlide 0.4s ease; white-space:pre-line;
}
@keyframes alertSlide { from { opacity:0; transform:translateY(-8px); } to { opacity:1; transform:translateY(0); } }
.auth-alert--error { background:rgba(220,53,69,0.08); color:#d6336c; border:1px solid rgba(220,53,69,0.12); }
.auth-form { display:flex; flex-direction:column; gap:18px; }
.form-row { display:grid; grid-template-columns:1fr 1fr; gap:18px; }
.form-group { display:flex; flex-direction:column; gap:6px; }
.form-label { font-size:13px; font-weight:600; color:#2c3e50; }
.required { color:#d6336c; }
.input-group-custom { position:relative; display:flex; align-items:center; }
.input-group-custom--textarea { align-items:stretch; }
.input-icon {
  position:absolute; left:14px; top:50%; transform:translateY(-50%);
  color:#bbaab2; font-size:15px; z-index:2; pointer-events:none; transition:color 0.3s ease;
}
.form-input {
  width:100%; padding:14px 14px 14px 44px;
  border:1.5px solid #f0e0e6; border-radius:14px; font-size:14px;
  background:rgba(253,242,246,0.5); color:#2c3e50;
  transition:all 0.3s ease; outline:none; position:relative; z-index:1;
}
.form-input::placeholder { color:#bbaab2; }
.form-input:hover { border-color:#d0b8c4; background:rgba(253,242,246,0.8); }
.form-input:focus { border-color:#667eea; background:#ffffff; box-shadow:0 0 0 4px rgba(102,126,234,0.1); }
.form-input:focus ~ .input-icon { color:#667eea; }
.form-input--textarea { padding:14px; resize:vertical; min-height:80px; line-height:1.5; }
.input-focus-ring {
  position:absolute; inset:-2px; border-radius:16px;
  border:2px solid rgba(102,126,234,0.3); opacity:0;
  transition:opacity 0.3s ease; pointer-events:none; z-index:0;
}
.form-input:focus ~ .input-focus-ring { opacity:1; animation:focusPulse 2s ease-in-out infinite; }
@keyframes focusPulse { 0%,100% { opacity:0.3; } 50% { opacity:0.6; } }
.input-toggle-pass {
  position:absolute; right:12px; top:50%; transform:translateY(-50%);
  background:none; border:none; color:#bbaab2; cursor:pointer;
  z-index:2; padding:4px; font-size:15px; transition:color 0.3s ease;
}
.input-toggle-pass:hover { color:#667eea; }
.password-hint { display:flex; align-items:center; gap:10px; flex-wrap:wrap; }
.password-strength { flex:1; min-width:80px; max-width:140px; height:4px; background:#f0e0e6; border-radius:4px; overflow:hidden; }
.strength-bar { height:100%; border-radius:4px; transition:all 0.4s ease; width:0; }
.strength--weak { width:25%; background:#dc3545; }
.strength--fair { width:50%; background:#ffc107; }
.strength--good { width:75%; background:#667eea; }
.strength--strong { width:100%; background:#28a745; }
.hint-text { font-size:11px; color:#bbaab2; display:flex; align-items:center; gap:4px; transition:color 0.3s ease; }
.hint-text i { font-size:8px; }
.hint-valid { color:#28a745; }
.checkbox-wrap { display:flex; align-items:flex-start; gap:10px; cursor:pointer; user-select:none; position:relative; padding-left:28px; line-height:1.4; }
.checkbox-wrap input { position:absolute; opacity:0; cursor:pointer; height:0; width:0; }
.checkmark {
  position:absolute; left:0; top:2px; width:18px; height:18px; flex-shrink:0;
  border:2px solid #d0b8c4; border-radius:5px; transition:all 0.25s ease;
}
.checkbox-wrap:hover .checkmark { border-color:#667eea; }
.checkbox-wrap input:checked ~ .checkmark { background:linear-gradient(135deg,#667eea,#764ba2); border-color:#667eea; }
.checkmark::after {
  content:''; position:absolute; display:none;
  left:4.5px; top:1.5px; width:5px; height:9px;
  border:solid white; border-width:0 2px 2px 0; transform:rotate(45deg);
}
.checkbox-wrap input:checked ~ .checkmark::after { display:block; }
.checkbox-label { font-size:13px; color:#6b5b63; }
.terms-link { color:#667eea; text-decoration:none; font-weight:500; }
.terms-link:hover { text-decoration:underline; color:#764ba2; }
.auth-btn {
  width:100%; padding:15px; border:none; border-radius:14px;
  background:linear-gradient(135deg,#667eea 0%,#764ba2 100%);
  color:#ffffff; font-size:15px; font-weight:600; cursor:pointer;
  transition:all 0.35s ease; display:flex; align-items:center; justify-content:center;
  gap:8px; position:relative; overflow:hidden;
}
.auth-btn::before {
  content:''; position:absolute; inset:0;
  background:linear-gradient(135deg,#764ba2 0%,#667eea 100%);
  opacity:0; transition:opacity 0.35s ease; border-radius:inherit;
}
.auth-btn:hover:not(:disabled)::before { opacity:1; }
.auth-btn:hover:not(:disabled) { transform:translateY(-2px); box-shadow:0 12px 28px rgba(102,126,234,0.35); }
.auth-btn:active:not(:disabled) { transform:translateY(0); box-shadow:0 4px 12px rgba(102,126,234,0.3); }
.auth-btn span, .auth-btn i { position:relative; z-index:1; }
.auth-btn:disabled { opacity:0.6; cursor:not-allowed; }
.spinner { width:18px; height:18px; border:2.5px solid rgba(255,255,255,0.3); border-top-color:#fff; border-radius:50%; animation:spin 0.7s linear infinite; }
@keyframes spin { to { transform:rotate(360deg); } }
.auth-divider { display:flex; align-items:center; gap:14px; margin:24px 0 20px; }
.auth-divider::before, .auth-divider::after { content:''; flex:1; height:1px; background:#f0e0e6; }
.auth-divider span { font-size:12px; color:#bbaab2; white-space:nowrap; font-weight:500; text-transform:uppercase; letter-spacing:0.5px; }
.social-btns { display:flex; gap:12px; }
.social-btn {
  flex:1; display:flex; align-items:center; justify-content:center; gap:8px;
  padding:12px; border:1.5px solid #f0e0e6; border-radius:12px;
  background:rgba(255,255,255,0.5); color:#2c3e50;
  font-size:13px; font-weight:500; cursor:pointer; transition:all 0.3s ease;
}
.social-btn:hover { transform:translateY(-2px); box-shadow:0 4px 16px rgba(180,120,140,0.1); }
.social-btn--google:hover { border-color:#ea4335; background:rgba(234,67,53,0.04); color:#ea4335; }
.social-btn--facebook:hover { border-color:#1877f2; background:rgba(24,119,242,0.04); color:#1877f2; }
.social-btn i { font-size:16px; }
.auth-footer { text-align:center; margin-top:20px; }
.auth-footer p { font-size:13px; color:#8a7a82; margin:0; }
.auth-link { color:#667eea; text-decoration:none; font-weight:600; transition:all 0.3s ease; }
.auth-link:hover { color:#764ba2; text-decoration:underline; }
@media (max-width: 992px) { .auth-card-inner { padding:36px 28px; } }
@media (max-width: 768px) {
  .form-row { grid-template-columns:1fr; gap:0; }
  .auth-card-inner { padding:32px 24px; border-radius:20px; }
  .auth-title { font-size:22px; }
  .form-input { padding:13px 13px 13px 42px; font-size:14px; }
  .float-icon { display:none; }
  .social-btns { flex-direction:column; }
}
@media (max-width: 480px) {
  .auth-card-inner { padding:28px 20px; }
  .auth-icon { width:64px; height:64px; font-size:26px; border-radius:18px; }
  .bg-orb { filter:blur(50px); }
}

/* Refined auth style */
.auth-page {
  background: linear-gradient(135deg, #fce4ec 0%, #fdf2f6 40%, #ffffff 100%);
  overflow: auto;
}

.auth-background,
.auth-floating-icons {
  display: none;
}

.auth-card {
  animation: cardFadeIn 0.45s ease;
}

.auth-card-inner {
  border-radius: 8px;
  padding: 34px;
  background: #ffffff;
  border: 1px solid #ead7df;
  box-shadow: 0 18px 45px rgba(44, 62, 80, 0.1);
}

.auth-card-inner:hover {
  box-shadow: 0 22px 52px rgba(44, 62, 80, 0.12);
}

.auth-icon {
  width: 58px;
  height: 58px;
  border-radius: 8px;
  color: #ffffff;
  background: linear-gradient(135deg, #667eea, #764ba2);
  font-size: 24px;
}

.auth-title {
  font-size: 26px;
  letter-spacing: 0;
}

.auth-subtitle {
  color: #6b6b80;
}

.form-label {
  color: #374151;
}

.form-input {
  min-height: 48px;
  border-radius: 8px;
  border: 1px solid #ead7df;
  background: #fffafd;
}

.form-input:hover,
.form-input:focus {
  background: #ffffff;
}

.input-focus-ring {
  display: none;
}

.auth-btn,
.social-btn,
.auth-alert,
.checkmark {
  border-radius: 8px;
}

.auth-btn {
  min-height: 48px;
  box-shadow: 0 10px 22px rgba(102, 126, 234, 0.25);
}

.social-btns {
  gap: 10px;
}

.social-btn {
  background: #ffffff;
}

@media (max-width: 768px) {
  .auth-page {
    background-size: 34px 34px;
  }

  .auth-card-inner {
    padding: 28px 22px;
  }
}
</style>