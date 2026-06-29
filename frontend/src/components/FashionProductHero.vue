<template>
  <div class="fashion-hero-wrapper">
    <div class="fashion-frame">
      <!-- Ambient glow behind the circle -->
      <div class="ambient-glow"></div>

      <img
        class="hero-real-image"
        src="/images/hero-skincare.jpg"
        alt="Luxury Skincare Products"
      />

      <!-- Decorative ring accents -->
      <div class="ring-outer"></div>
      <div class="ring-inner"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'FashionProductHero'
}
</script>

<style scoped>
.fashion-hero-wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
}

.fashion-frame {
  position: relative;
  width: 380px;
  height: 380px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}

/* Ambient glow behind the circle */
.ambient-glow {
  position: absolute;
  inset: -20px;
  border-radius: 50%;
  background: radial-gradient(circle at 35% 25%, rgba(102, 126, 234, 0.12) 0%, transparent 60%),
              radial-gradient(circle at 70% 75%, rgba(118, 75, 162, 0.08) 0%, transparent 50%);
  filter: blur(40px);
  pointer-events: none;
  animation: ambientPulse 6s ease-in-out infinite;
}

@keyframes ambientPulse {
  0%, 100% { opacity: 0.6; }
  50% { opacity: 1; }
}

.hero-real-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  position: relative;
  z-index: 2;
  border-radius: 50%;
  filter: drop-shadow(0 8px 32px rgba(180, 120, 140, 0.15));
  transition: transform 0.6s ease;
}

.fashion-frame:hover .hero-real-image {
  transform: scale(1.05);
}

/* Decorative ring outer */
.ring-outer {
  position: absolute;
  inset: -6px;
  border-radius: 50%;
  border: 1px solid rgba(200, 190, 180, 0.12);
  pointer-events: none;
  z-index: 1;
}

/* Decorative ring inner */
.ring-inner {
  position: absolute;
  inset: 8px;
  border-radius: 50%;
  border: 1px solid rgba(200, 190, 180, 0.08);
  pointer-events: none;
  z-index: 3;
}

/* ===== RESPONSIVE ===== */
@media (max-width: 1200px) {
  .fashion-frame {
    width: 340px;
    height: 340px;
  }
}

@media (max-width: 992px) {
  .fashion-frame {
    width: 300px;
    height: 300px;
  }
}

@media (max-width: 768px) {
  .fashion-frame {
    width: 260px;
    height: 260px;
  }
}

@media (max-width: 480px) {
  .fashion-frame {
    width: 220px;
    height: 220px;
  }

  .ambient-glow {
    inset: -12px;
    filter: blur(24px);
  }
}
</style>