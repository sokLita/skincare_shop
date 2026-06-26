<template>
  <div class="legal-page">
    <div class="container py-5">
      <div class="row justify-content-center">
        <div class="col-lg-8 col-md-10">
          <div class="legal-card">
            <h1 class="legal-title">Terms of Service</h1>
            <p class="legal-updated">Last updated: {{ currentDate }}</p>
            
            <div class="legal-content">
              <section class="legal-section">
                <h2>1. Acceptance of Terms</h2>
                <p>By accessing and using Skincare Shop, you accept and agree to be bound by the terms and provision of this agreement.</p>
              </section>

              <section class="legal-section">
                <h2>2. Use License</h2>
                <p>Permission is granted to temporarily use this website for personal, non-commercial transitory viewing only.</p>
              </section>

              <section class="legal-section">
                <h2>3. User Account</h2>
                <p>You are responsible for maintaining the confidentiality of your account and password. You agree to accept responsibility for all activities that occur under your account.</p>
              </section>

              <section class="legal-section">
                <h2>4. Products and Pricing</h2>
                <p>All products are subject to availability. We reserve the right to discontinue any product at any time. Prices for our products are subject to change without notice.</p>
              </section>

              <section class="legal-section">
                <h2>5. Limitation of Liability</h2>
                <p>In no event shall Skincare Shop be liable for any indirect, incidental, special, consequential or punitive damages.</p>
              </section>

              <section class="legal-section">
                <h2>6. Contact Information</h2>
                <p>If you have any questions about these Terms, please contact us at support@skincare.com</p>
              </section>
            </div>

            <div class="legal-footer">
              <router-link to="/" class="btn btn-primary">Back to Home</router-link>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Terms',
  data() {
    return {
      currentDate: new Date().toLocaleDateString('en-US', { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
      })
    }
  }
}
</script>

<style scoped>
.legal-page {
  min-height: 100vh;
  background: linear-gradient(135deg, #fdf2f6 0%, #f8f0f3 100%);
  padding: 40px 0;
}

.legal-card {
  background: white;
  border-radius: 20px;
  padding: 50px;
  box-shadow: 0 10px 40px rgba(180, 120, 140, 0.1);
}

.legal-title {
  font-size: 2.5rem;
  font-weight: 700;
  color: #2c3e50;
  margin-bottom: 10px;
}

.legal-updated {
  color: #8a7a82;
  font-size: 0.9rem;
  margin-bottom: 40px;
}

.legal-content {
  line-height: 1.8;
  color: #4a4a4a;
}

.legal-section {
  margin-bottom: 30px;
}

.legal-section h2 {
  font-size: 1.5rem;
  font-weight: 600;
  color: #2c3e50;
  margin-bottom: 15px;
  margin-top: 30px;
}

.legal-section h2:first-child {
  margin-top: 0;
}

.legal-section p {
  margin-bottom: 15px;
  color: #5a5a5a;
}

.legal-footer {
  margin-top: 50px;
  padding-top: 30px;
  border-top: 1px solid #f0e0e6;
  text-align: center;
}

.btn-primary {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
  padding: 12px 30px;
  border-radius: 10px;
  text-decoration: none;
  font-weight: 600;
  transition: all 0.3s ease;
}

.btn-primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 20px rgba(102, 126, 234, 0.3);
  color: white;
}

@media (max-width: 768px) {
  .legal-card {
    padding: 30px 25px;
  }
  
  .legal-title {
    font-size: 2rem;
  }
}
</style>