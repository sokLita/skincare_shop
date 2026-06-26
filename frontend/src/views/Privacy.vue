<template>
  <div class="legal-page">
    <div class="container py-5">
      <div class="row justify-content-center">
        <div class="col-lg-8 col-md-10">
          <div class="legal-card">
            <h1 class="legal-title">Privacy Policy</h1>
            <p class="legal-updated">Last updated: {{ currentDate }}</p>
            
            <div class="legal-content">
              <section class="legal-section">
                <h2>1. Information We Collect</h2>
                <p>We collect information you provide directly to us when you create an account, make a purchase, or contact us for support. This includes your name, email address, and payment information.</p>
              </section>

              <section class="legal-section">
                <h2>2. How We Use Your Information</h2>
                <p>We use the information we collect to provide, maintain, and improve our services, to process transactions, and to send you technical notices and support messages.</p>
              </section>

              <section class="legal-section">
                <h2>3. Information Sharing</h2>
                <p>We do not share, sell, or rent your personal information to third parties except as described in this policy. We may share your information with service providers who assist us in operating our website and conducting business.</p>
              </section>

              <section class="legal-section">
                <h2>4. Data Security</h2>
                <p>We take reasonable measures to help protect your personal information from loss, theft, misuse, unauthorized access, disclosure, alteration, and destruction.</p>
              </section>

              <section class="legal-section">
                <h2>5. Cookies and Tracking</h2>
                <p>We use cookies and similar tracking technologies to track activity on our website and hold certain information. You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent.</p>
              </section>

              <section class="legal-section">
                <h2>6. Your Rights</h2>
                <p>You have the right to access, update, or delete your personal information at any time. You can do this through your account settings or by contacting us directly.</p>
              </section>

              <section class="legal-section">
                <h2>7. Contact Us</h2>
                <p>If you have any questions about this Privacy Policy, please contact us at privacy@skincare.com</p>
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
  name: 'Privacy',
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