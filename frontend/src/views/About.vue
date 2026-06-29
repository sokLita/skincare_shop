<template>
  <div class="about-page">

    <!-- ============================================
         HERO SECTION
         ============================================ -->
    <section class="hero-section">
      <div class="hero-bg-decor">
        <div class="hero-shape hero-shape--1"></div>
        <div class="hero-shape hero-shape--2"></div>
        <div class="hero-shape hero-shape--3"></div>
      </div>
      <div class="container">
        <div class="hero-layout">
          <div class="hero-text-col">
            <span class="hero-tag">{{ t('about.heroTag') }}</span>
            <h1 class="hero-title">{{ t('about.heroTitle') }}</h1>
            <p class="hero-desc">
              {{ t('about.heroDesc') }}
            </p>
          </div>
          <div class="hero-image-col">
            <div class="hero-image-wrap">
              <img
                src="https://i.pinimg.com/736x/cb/dd/21/cbdd215af15a22b17eaa3ce4c06a83d1.jpg"
                alt="Luxury Skincare Products"
                class="hero-image"
              />
              <div class="hero-image-ring"></div>
              <div class="hero-image-ring hero-image-ring--inner"></div>
            </div>
          </div>
        </div>
      </div>
      <div class="hero-wave">
        <svg viewBox="0 0 1440 80" preserveAspectRatio="none">
          <path d="M0,40 C360,80 1080,0 1440,40 L1440,80 L0,80 Z" fill="var(--bg-primary)"></path>
        </svg>
      </div>
    </section>

    <!-- ============================================
         WELCOME SECTION
         ============================================ -->
    <section class="welcome-section" ref="welcomeRef">
      <div class="container">
        <div class="welcome-layout">
          <div class="welcome-image-col fade-in-left">
            <div class="welcome-image-wrap">
              <img
                src="https://i.pinimg.com/1200x/a3/20/48/a320481f501bec266ffc9c8c494cff69.jpg"
                alt="Luxury Skincare Products on Marble"
                class="welcome-image"
              />
              <div class="welcome-image-badge">
                <i class="fas fa-spa"></i>
                <span>{{ t('about.welcomeBadge') }}</span>
              </div>
            </div>
          </div>
          <div class="welcome-text-col fade-in-right ">
            <span class="section-tag">{{ t('about.welcomeTag') }}</span>
            <h2 class="welcome-title">{{ t('about.welcomeTitle') }}</h2>
            <p class="welcome-text">
              {{ t('about.welcomeText1') }}
            </p>
            <p class="welcome-text">
              {{ t('about.welcomeText2') }}
            </p>
            <div class="welcome-feature-cards">
              <div class="welcome-feature-card fade-in-up">
                <div class="welcome-fc-icon"><i class="fas fa-leaf"></i></div>
                <span>{{ t('about.featureNatural') }}</span>
              </div>
              <div class="welcome-feature-card fade-in-up">
                <div class="welcome-fc-icon"><i class="fas fa-flask"></i></div>
                <span>{{ t('about.featureDermatologist') }}</span>
              </div>
              <div class="welcome-feature-card fade-in-up">
                <div class="welcome-fc-icon"><i class="fas fa-heart"></i></div>
                <span>{{ t('about.featureCrueltyFree') }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ============================================
         MISSION & VISION SECTION
         ============================================ -->
    <section class="mv-section" ref="mvRef">
      <div class="container">
        <div class="mv-grid">
          <!-- Mission Card -->
          <div class="mv-glass-card fade-in-up">
            <div class="mv-glass-glow"></div>
            <div class="mv-icon-wrap">
              <i class="fas fa-bullseye"></i>
            </div>
            <h3 class="mv-title">{{ t('about.missionTitle') }}</h3>
            <p class="mv-text">
              {{ t('about.missionText1') }}
            </p>
            <p class="mv-text">
              {{ t('about.missionText2') }}
            </p>
          </div>
          <!-- Vision Card -->
          <div class="mv-glass-card fade-in-up">
            <div class="mv-glass-glow"></div>
            <div class="mv-icon-wrap mv-icon-wrap--vision">
              <i class="fas fa-eye"></i>
            </div>
            <h3 class="mv-title">{{ t('about.visionTitle') }}</h3>
            <p class="mv-text">
              {{ t('about.visionText1') }}
            </p>
            <p class="mv-text">
              {{ t('about.visionText2') }}
            </p>
            <ul class="mv-list">
              <li><i class="fas fa-check-circle"></i> {{ t('about.visionList1') }}</li>
              <li><i class="fas fa-check-circle"></i> {{ t('about.visionList2') }}</li>
              <li><i class="fas fa-check-circle"></i> {{ t('about.visionList3') }}</li>
            </ul>
          </div>
        </div>
      </div>
    </section>

    <!-- ============================================
         STATISTICS SECTION
         ============================================ -->
    <section class="stats-section" ref="statsRef">
      <div class="container">
        <div class="stats-grid">
          <div class="stat-card fade-in-up" v-for="(stat, i) in stats" :key="i" :style="{ animationDelay: `${i * 0.15}s` }">
            <div class="stat-icon-wrap">
              <i :class="stat.icon"></i>
            </div>
            <span class="stat-value" :ref="el => { if (el) statRefs[i] = el }">{{ stat.value }}</span>
            <span class="stat-label">{{ t(stat.labelKey) }}</span>
          </div>
        </div>
      </div>
    </section>

    <!-- ============================================
         WHY CHOOSE US SECTION
         ============================================ -->
    <section class="why-section" ref="whyRef">
      <div class="container">
        <div class="section-header fade-in-up">
          <span class="section-tag">{{ t('about.whyTag') }}</span>
          <h2 class="section-title">{{ t('about.whyTitle') }}</h2>
        </div>
        <div class="why-grid">
          <div
            class="why-card fade-in-up"
            v-for="(item, i) in whyItems"
            :key="i"
            :style="{ animationDelay: `${i * 0.1}s` }">
            <div class="why-icon-wrap">
              <i :class="item.icon"></i>
            </div>
            <h3 class="why-title">{{ t(item.titleKey) }}</h3>
            <p class="why-text">{{ t(item.textKey) }}</p>
          </div>
        </div>
      </div>
    </section>

  </div>
</template>

<script>
import { useTranslation } from '../composables/useTranslation'

export default {
  name: 'AboutPage',
  setup() {
    const { t } = useTranslation()
    return { t }
  },
  data() {
    return {
      stats: [
        { icon: 'fas fa-box', value: '500+', labelKey: 'about.statProducts' },
        { icon: 'fas fa-users', value: '50K+', labelKey: 'about.statCustomers' },
        { icon: 'fas fa-leaf', value: '100%', labelKey: 'about.statCrueltyFree' }
      ],
      whyItems: [
        { icon: 'fas fa-leaf', titleKey: 'about.whyQualityTitle', textKey: 'about.whyQualityText' },
        { icon: 'fas fa-heart', titleKey: 'about.whyCustomerTitle', textKey: 'about.whyCustomerText' },
        { icon: 'fas fa-truck', titleKey: 'about.whyShippingTitle', textKey: 'about.whyShippingText' },
        { icon: 'fas fa-undo-alt', titleKey: 'about.whyReturnsTitle', textKey: 'about.whyReturnsText' },
        { icon: 'fas fa-flask', titleKey: 'about.whyDermatologistTitle', textKey: 'about.whyDermatologistText' },
        { icon: 'fas fa-globe-americas', titleKey: 'about.whySustainableTitle', textKey: 'about.whySustainableText' }
      ],
      statRefs: []
    }
  },
  mounted() {
    this.setupScrollAnimations()
  },
  beforeUnmount() {
    if (this._observer) this._observer.disconnect()
  },
  methods: {
    animateCounter(el, target) {
      const isPercent = target.toString().includes('%')
      const isK = target.toString().includes('K+')
      const isPlus = target.toString().includes('+')
      const maxVal = parseInt(target) || 0
      const duration = 1500
      const steps = 40
      const increment = maxVal / steps
      let current = 0
      let step = 0
      const timer = setInterval(() => {
        step++
        current = Math.min(Math.round(increment * step), maxVal)
        let display = current.toString()
        if (isPercent) display = current + '%'
        else if (isK) display = current + 'K+'
        else if (isPlus) display = current + '+'
        el.textContent = display
        if (step >= steps || current >= maxVal) {
          clearInterval(timer)
          el.textContent = target
        }
      }, duration / steps)
    },
    setupScrollAnimations() {
      const sections = ['welcomeRef', 'mvRef', 'statsRef', 'whyRef', 'ctaRef']
      this._observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const els = entry.target.querySelectorAll('.fade-in-up, .fade-in-left, .fade-in-right')
            els.forEach(el => el.classList.add('animate-visible'))
            // Trigger counter animation when stats section enters view
            if (entry.target === this.$refs.statsRef) {
              const statValues = entry.target.querySelectorAll('.stat-value')
              const targets = ['500', '50', '100']
              statValues.forEach((el, idx) => {
                if (idx < targets.length) {
                  setTimeout(() => this.animateCounter(el, this.stats[idx].value), idx * 300)
                }
              })
            }
            this._observer.unobserve(entry.target)
          }
        })
      }, { threshold: 0.15 })
      sections.forEach(key => {
        const el = this.$refs[key]
        if (el) this._observer.observe(el)
      })
    }
  }
}
</script>

<style>
/* ==============================================
   ABOUT PAGE
   ============================================== */
.about-page {
  overflow: hidden;
}

/* ==============================================
   HERO SECTION
   ============================================== */
.hero-section {
  position: relative;
  padding: 140px 0 100px;
  background:  #fdf2f6;
  overflow: hidden;
  
}

.hero-bg-decor {
  position: absolute;
  inset: 0;
  pointer-events: none;
}

.hero-shape {
  position: absolute;
  border-radius: 50%;
  opacity: 0.12;
}

.hero-shape--1 {
  width: 500px;
  height: 500px;
  background: #fff;
  top: -200px;
  right: -150px;
}

.hero-shape--2 {
  width: 300px;
  height: 300px;
  background: #fff;
  bottom: -100px;
  left: -80px;
}

.hero-shape--3 {
  width: 200px;
  height: 200px;
  background: #fff;
  top: 50%;
  left: 20%;
  transform: translateY(-50%);
}

.hero-layout {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 60px;
  align-items: center;
}

.hero-text-col {
  position: relative;
  z-index: 1;
  color:black;
}

.hero-tag {
  display: inline-block;
  font-size: 11px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 2px;
  color: rgb(89, 82, 82);
  background: rgba(255,255,255,0.15);
  padding: 5px 14px;
  border-radius: 50px;
  margin-bottom: 16px;
  backdrop-filter: blur(4px);
}

.hero-title {
  font-size: 48px;
  font-weight: 700;
  color:rgb(145, 137, 137);
  font-family: var(--font-display);
  margin: 0 0 16px;
  line-height: 1.2;
}

.hero-desc {
  font-size: 16px;
  color: rgb(103, 79, 79);
  line-height: 1.7;
  max-width: 480px;
  margin: 0;
}

.hero-image-col {
  position: relative;
  z-index: 1;
  display: flex;
  justify-content: center;
}

.hero-image-wrap {
  position: relative;
  width: 340px;
  height: 340px;
}

.hero-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 30px;
  position: relative;
  z-index: 2;
  box-shadow: 0 20px 60px rgba(0,0,0,0.2);
  animation: heroFloat 6s ease-in-out infinite;
}
@keyframes heroFloat {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-10px); }
}

.hero-image-ring {
  position: absolute;
  inset: -12px;
  border: 2px solid rgba(255,255,255,0.2);
  border-radius: 40px;
  z-index: 1;
  animation: spin 20s linear infinite;
}

.hero-image-ring--inner {
  inset: 12px;
  border-style: dashed;
  animation-duration: 15s;
  animation-direction: reverse;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

.hero-wave {
  position: absolute;
  bottom: -2px;
  left: 0;
  right: 0;
  line-height: 0;
  z-index: 2;
}

.hero-wave svg {
  display: block;
  width: 100%;
}

/* ==============================================
   SECTION COMMON
   ============================================== */
.section-tag {
  display: inline-block;
  font-size: 11px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 2px;
  color: #667eea;
  background: rgba(102,126,234,0.1);
  padding: 5px 14px;
  border-radius: 50px;
  margin-bottom: 16px;
}

.section-title {
  font-size: 32px;
  font-weight: 700;
  color: var(--text-primary);
  font-family: var(--font-display);
  margin: 0 0 16px;
}

.section-desc {
  font-size: 15px;
  color: var(--text-secondary);
  line-height: 1.7;
  margin: 0;
  max-width: 600px;
}

.section-header {
  text-align: center;
  margin-bottom: 48px;
}

.section-header .section-desc {
  margin: 0 auto;
}

/* ==============================================
   WELCOME SECTION
   ============================================== */
.welcome-section {
  padding: 100px 0;
  background: var(--bg-primary);
}

.welcome-layout {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 60px;
  align-items: center;
}

.welcome-image-col {
  position: relative;
}

.welcome-image-wrap {
  position: relative;
  border-radius: 20px;
  overflow: hidden;
  box-shadow: 0 20px 60px rgba(0,0,0,0.08);
}

.welcome-image {
  width: 100%;
  height: 500px;
  object-fit: cover;
  display: block;
}

.welcome-image-badge {
  position: absolute;
  bottom: 24px;
  left: 24px;
  background: rgba(255,255,255,0.95);
  backdrop-filter: blur(10px);
  padding: 12px 20px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 13px;
  font-weight: 600;
  color: var(--text-primary);
  box-shadow: 0 8px 24px rgba(0,0,0,0.08);
}

.welcome-image-badge i {
  color: #667eea;
  font-size: 16px;
}

.welcome-text-col {
  padding: 20px 0;
}

.welcome-title {
  font-size: 32px;
  font-weight: 700;
  color: var(--text-primary);
  font-family: var(--font-display);
  margin: 0 0 20px;
}

.welcome-text {
  font-size: 15px;
  color: var(--text-secondary);
  line-height: 1.8;
  margin: 0 0 16px;
}

.welcome-text:last-of-type {
  margin-bottom: 24px;
}

.welcome-feature-cards {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 14px;
  margin-top: 28px;
}
.welcome-feature-card {
  background: #fff;
  border: 1px solid var(--border-color);
  border-radius: 14px;
  padding: 20px 16px;
  text-align: center;
  transition: transform 0.3s ease, box-shadow 0.3s ease, border-color 0.3s ease;
  cursor: default;
}
.dark-mode .welcome-feature-card {
  background: var(--bg-card);
}
.welcome-feature-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 10px 30px rgba(102,126,234,0.12);
  border-color: #667eea;
}
.welcome-fc-icon {
  width: 44px;
  height: 44px;
  margin: 0 auto 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, rgba(102,126,234,0.1), rgba(118,75,162,0.1));
  border-radius: 12px;
  font-size: 18px;
  color: #667eea;
  transition: all 0.3s ease;
}
.welcome-feature-card:hover .welcome-fc-icon {
  background: linear-gradient(135deg, #667eea, #764ba2);
  color: #fff;
  transform: scale(1.05);
}
.welcome-feature-card span {
  font-size: 12px;
  font-weight: 600;
  color: var(--text-primary);
  display: block;
  line-height: 1.4;
}

/* ==============================================
   MISSION & VISION GLASSMORPHISM CARDS
   ============================================== */
.mv-section {
  padding: 100px 0;
  background: linear-gradient(135deg, #fff5f7 0%, #fdf2f6 50%, #f8f0ff 100%);
}
.dark-mode .mv-section {
  background: linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #1e1a30 100%);
}
.mv-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 32px;
  max-width: 960px;
  margin: 0 auto;
}
.mv-glass-card {
  position: relative;
  background: rgba(255, 255, 255, 0.75);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  border: 1px solid rgba(255, 255, 255, 0.6);
  border-radius: 24px;
  padding: 40px 36px;
  box-shadow: 0 8px 32px rgba(180, 120, 140, 0.1);
  overflow: hidden;
  transition: transform 0.4s cubic-bezier(0.4, 0, 0.2, 1), box-shadow 0.4s ease;
}
.dark-mode .mv-glass-card {
  background: rgba(30, 42, 69, 0.75);
  border-color: rgba(45, 45, 80, 0.4);
}
.mv-glass-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 20px 60px rgba(102, 126, 234, 0.15);
  border-color: rgba(102, 126, 234, 0.3);
}
.mv-glass-glow {
  position: absolute;
  top: -60px;
  right: -60px;
  width: 180px;
  height: 180px;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(102, 126, 234, 0.08), transparent 70%);
  pointer-events: none;
}
.mv-glass-card:nth-child(2) .mv-glass-glow {
  top: auto;
  bottom: -60px;
  right: auto;
  left: -60px;
  background: radial-gradient(circle, rgba(118, 75, 162, 0.08), transparent 70%);
}
.mv-icon-wrap {
  width: 56px;
  height: 56px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #667eea, #764ba2);
  border-radius: 16px;
  font-size: 24px;
  color: #fff;
  margin-bottom: 20px;
  box-shadow: 0 6px 20px rgba(102, 126, 234, 0.25);
}
.mv-icon-wrap--vision {
  background: linear-gradient(135deg, #764ba2, #667eea);
}
.mv-title {
  font-size: 24px;
  font-weight: 700;
  color: var(--text-primary);
  font-family: var(--font-display);
  margin: 0 0 14px;
}
.mv-text {
  font-size: 15px;
  color: var(--text-secondary);
  line-height: 1.8;
  margin: 0 0 12px;
}
.mv-text:last-of-type { margin-bottom: 0; }
.mv-list {
  list-style: none;
  padding: 0;
  margin: 20px 0 0;
  display: flex;
  flex-direction: column;
  gap: 10px;
}
.mv-list li {
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 14px;
  color: var(--text-primary);
}
.mv-list li i {
  color: #667eea;
  font-size: 16px;
}

/* ==============================================
   STATISTICS SECTION
   ============================================== */
.stats-section {
  padding: 80px 0;
  background: var(--bg-secondary);
}
.stats-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;
  max-width: 800px;
  margin: 0 auto;
}
.stat-card {
  background: var(--bg-card);
  border: 1px solid var(--border-color);
  border-radius: 20px;
  padding: 36px 24px;
  text-align: center;
  transition: transform 0.35s ease, box-shadow 0.35s ease;
}
.stat-card:hover {
  transform: translateY(-6px);
  box-shadow: 0 16px 40px rgba(102, 126, 234, 0.12);
  border-color: #667eea;
}
.stat-icon-wrap {
  width: 60px;
  height: 60px;
  margin: 0 auto 16px;
  background: linear-gradient(135deg, rgba(102,126,234,0.1), rgba(118,75,162,0.1));
  border-radius: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  color: #667eea;
  transition: all 0.35s ease;
}
.stat-card:hover .stat-icon-wrap {
  background: linear-gradient(135deg, #667eea, #764ba2);
  color: #fff;
  transform: scale(1.08) rotate(-5deg);
}
.stat-value {
  display: block;
  font-size: 34px;
  font-weight: 700;
  color: var(--text-primary);
  font-family: var(--font-display);
  background: linear-gradient(135deg, #667eea, #764ba2);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  margin-bottom: 4px;
  letter-spacing: -1px;
}
.stat-label {
  display: block;
  font-size: 14px;
  color: var(--text-secondary);
  font-weight: 500;
}

/* ==============================================
   WHY CHOOSE US SECTION
   ============================================== */
.why-section {
  padding: 100px 0;
  background: var(--bg-secondary);
}

.why-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;
}

.why-card {
  background: var(--bg-card);
  border: 1px solid var(--border-color);
  border-radius: 16px;
  padding: 32px 24px;
  text-align: center;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.why-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 12px 32px rgba(0,0,0,0.06);
}

.why-icon-wrap {
  width: 56px;
  height: 56px;
  margin: 0 auto 16px;
  background: linear-gradient(135deg, rgba(102,126,234,0.1), rgba(118,75,162,0.1));
  border-radius: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  color: #667eea;
}

.why-title {
  font-size: 18px;
  font-weight: 600;
  color: var(--text-primary);
  margin: 0 0 10px;
}

.why-text {
  font-size: 14px;
  color: var(--text-secondary);
  line-height: 1.7;
  margin: 0;
}
</style>