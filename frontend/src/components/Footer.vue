<template>
  <footer class="site-footer">
    <!-- Main Footer Area -->
    <div class="footer-main">
      <div class="container">
        <div class="footer-grid">

          <!-- Column 1: Brand & About -->
          <div class="footer-col">
            <div class="footer-brand">
              <i class="fas fa-spa footer-brand-icon"></i>
              <span class="footer-brand-name">Skincare</span>
              <span class="footer-brand-shop">Shop</span>
            </div>
            <p class="footer-desc">
              Your trusted destination for premium skincare products. We believe in clean beauty that nurtures both skin and soul.
            </p>
            <div class="footer-social">
              <a href="#" class="social-link" aria-label="Facebook">
                <i class="fab fa-facebook-f"></i>
              </a>
              <a href="#" class="social-link" aria-label="Instagram">
                <i class="fab fa-instagram"></i>
              </a>
              <a href="#" class="social-link" aria-label="Twitter">
                <i class="fab fa-twitter"></i>
              </a>
              <a href="#" class="social-link" aria-label="YouTube">
                <i class="fab fa-youtube"></i>
              </a>
            </div>
          </div>

          <!-- Column 2: Quick Links -->
          <div class="footer-col">
            <h4 class="footer-heading">Quick Links</h4>
            <ul class="footer-links">
              <li><router-link to="/">Home</router-link></li>
              <li><router-link to="/products">Products</router-link></li>
              <li><a href="#">Our Story</a></li>
              <li><a href="#">Careers</a></li>
              <li><a href="#">Press Inquiries</a></li>
            </ul>
          </div>

          <!-- Column 3: Customer Support -->
          <div class="footer-col">
            <h4 class="footer-heading">Support</h4>
            <ul class="footer-links">
              <li><a href="#">Returns &amp; Exchanges</a></li>
              <li><a href="#">Shipping Info</a></li>
              <li><a href="#">Track Order</a></li>
              <li><a href="#">Help Center</a></li>
              <li><a href="#">Contact Us</a></li>
            </ul>
          </div>

          <!-- Column 4: Newsletter & Contact -->
          <div class="footer-col">
            <h4 class="footer-heading">Stay in Touch</h4>
            <p class="footer-newsletter-text">
              Subscribe for exclusive deals, new arrivals, and skincare tips.
            </p>
            <form class="footer-newsletter" @submit.prevent>
              <div class="newsletter-input-wrap">
                <input
                  type="email"
                  placeholder="Enter your email"
                  class="newsletter-input"
                  aria-label="Email address"
                />
                <button type="submit" class="newsletter-btn" aria-label="Subscribe">
                  <i class="fas fa-arrow-right"></i>
                </button>
              </div>
            </form>
            <div class="footer-contact">
              <p><i class="fas fa-envelope"></i> info@skincareshop.com</p>
              <p><i class="fas fa-phone"></i> +1 234 567 8900</p>
              <p><i class="fas fa-map-marker-alt"></i> Phnom Penh, Cambodia</p>
            </div>
          </div>

        </div>
      </div>
    </div>

    <!-- Bottom Bar -->
    <div class="footer-bottom">
      <div class="container">
        <div class="footer-bottom-content">
          <p class="footer-copyright">
            &copy; {{ new Date().getFullYear() }} Skincare Shop. All rights reserved.
          </p>
          <div class="footer-bottom-links">
            <a href="#">Privacy Policy</a>
            <span class="footer-divider">|</span>
            <a href="#">Terms &amp; Conditions</a>
            <span class="footer-divider">|</span>
            <a href="#">Accessibility</a>
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>

<script>
export default {
  name: 'SiteFooter'
}
</script>

<style scoped>
/* ============================================
   FOOTER — Blush Pink Theme
   ============================================ */

.site-footer {
  background: #ffffff;
  color: #555;
  font-size: 14px;
  line-height: 1.7;
  border-top: 1px solid #f0e0e6;
}

/* ---- Main ---- */
.footer-main {
  padding: 60px 0 40px;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 24px;
}

.footer-grid {
  display: grid;
  grid-template-columns: 1.4fr 1fr 1fr 1.3fr;
  gap: 40px;
}

/* ---- Brand ---- */
.footer-brand {
  display: flex;
  align-items: center;
  gap: 4px;
  margin-bottom: 16px;
}

.footer-brand-icon {
  font-size: 22px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  margin-right: 6px;
}

.footer-brand-name {
  font-size: 20px;
  font-weight: 700;
  color: #2c3e50;
  letter-spacing: -0.3px;
}

.footer-brand-shop {
  font-size: 20px;
  font-weight: 300;
  color: #667eea;
  letter-spacing: -0.3px;
}

.footer-desc {
  color: #6b6b80;
  font-size: 13.5px;
  line-height: 1.7;
  margin-bottom: 20px;
  max-width: 300px;
}

/* ---- Social ---- */
.footer-social {
  display: flex;
  gap: 10px;
}

.social-link {
  width: 36px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #fdf2f6;
  border-radius: 50%;
  color: #6b6b80;
  font-size: 15px;
  transition: all 0.3s ease;
  text-decoration: none;
}

.social-link:hover {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: #ffffff;
  transform: translateY(-3px);
  box-shadow: 0 6px 20px rgba(102, 126, 234, 0.35);
}

/* ---- Headings ---- */
.footer-heading {
  color: #2c3e50;
  font-size: 15px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin-bottom: 18px;
  position: relative;
  padding-bottom: 10px;
}

.footer-heading::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  width: 28px;
  height: 2px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 2px;
}

/* ---- Links ---- */
.footer-links {
  list-style: none;
  padding: 0;
  margin: 0;
}

.footer-links li {
  margin-bottom: 8px;
}

.footer-links a {
  color: #6b6b80;
  text-decoration: none;
  font-size: 13.5px;
  transition: all 0.2s ease;
  display: inline-flex;
  align-items: center;
  gap: 6px;
}

.footer-links a::before {
  content: '';
  display: inline-block;
  width: 0;
  height: 1.5px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  transition: width 0.2s ease;
}

.footer-links a:hover {
  color: #2c3e50;
  padding-left: 4px;
}

.footer-links a:hover::before {
  width: 12px;
}

/* ---- Newsletter ---- */
.footer-newsletter-text {
  color: #6b6b80;
  font-size: 13px;
  margin-bottom: 14px;
  line-height: 1.6;
}

.newsletter-input-wrap {
  display: flex;
  background: #fdf2f6;
  border: 1px solid #f0e0e6;
  border-radius: 50px;
  overflow: hidden;
  transition: border-color 0.3s ease;
  margin-bottom: 20px;
}

.newsletter-input-wrap:focus-within {
  border-color: #667eea;
  box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.15);
}

.newsletter-input {
  flex: 1;
  padding: 12px 18px;
  border: none;
  background: transparent;
  color: #333;
  font-size: 13px;
  outline: none;
}

.newsletter-input::placeholder {
  color: #aaa;
}

.newsletter-btn {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: #ffffff;
  border: none;
  padding: 0 20px;
  cursor: pointer;
  font-size: 16px;
  transition: all 0.3s ease;
}

.newsletter-btn:hover {
  opacity: 0.9;
  transform: scale(1.05);
}

/* ---- Contact ---- */
.footer-contact {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.footer-contact p {
  color: #6b6b80;
  font-size: 13px;
  display: flex;
  align-items: center;
  gap: 10px;
  margin: 0;
}

.footer-contact i {
  width: 18px;
  color: #667eea;
  font-size: 14px;
  text-align: center;
}

/* ---- Bottom Bar ---- */
.footer-bottom {
  border-top: 1px solid #f0e0e6;
  padding: 20px 0;
  background: #fdf2f6;
}

.footer-bottom-content {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  flex-wrap: wrap;
}

.footer-copyright {
  color: #8a7a82;
  font-size: 13px;
  margin: 0;
}

.footer-bottom-links {
  display: flex;
  align-items: center;
  gap: 10px;
}

.footer-bottom-links a {
  color: #6b6b80;
  text-decoration: none;
  font-size: 13px;
  transition: color 0.2s ease;
}

.footer-bottom-links a:hover {
  color: #667eea;
}

.footer-divider {
  color: #d0c0c8;
  font-size: 13px;
}

/* ============================================
   RESPONSIVE
   ============================================ */

@media (max-width: 992px) {
  .footer-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 32px;
  }

  .footer-main {
    padding: 48px 0 32px;
  }
}

@media (max-width: 768px) {
  .footer-grid {
    grid-template-columns: 1fr;
    gap: 28px;
  }

  .footer-main {
    padding: 40px 0 24px;
  }

  .footer-desc {
    max-width: 100%;
  }

  .footer-bottom-content {
    flex-direction: column;
    text-align: center;
  }
}

@media (max-width: 480px) {
  .container {
    padding: 0 16px;
  }

  .footer-social {
    justify-content: center;
  }

  .footer-bottom-links {
    flex-wrap: wrap;
    justify-content: center;
  }
}
</style>