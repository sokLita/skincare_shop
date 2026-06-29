<template>
  <div class="skeleton" :class="[variant, `skeleton--${type}`]" :style="customStyle">
    <div class="skeleton-shimmer"></div>
  </div>
</template>

<script>
export default {
  name: 'LoadingSkeleton',
  props: {
    type: { type: String, default: 'text' },
    width: { type: String, default: null },
    height: { type: String, default: null },
    variant: { type: String, default: 'light' }
  },
  computed: {
    customStyle() {
      const style = {}
      if (this.width) style.width = this.width
      if (this.height) style.height = this.height
      return style
    }
  }
}
</script>

<style scoped>
.skeleton {
  position: relative;
  overflow: hidden;
  border-radius: 8px;
  background: #f0e0e6;
}

.skeleton.light { background: #f0e0e6; }
.skeleton.dark { background: #2d2d3d; }

.skeleton-shimmer {
  position: absolute;
  inset: 0;
  background: linear-gradient(
    90deg,
    transparent 0%,
    rgba(255, 255, 255, 0.4) 50%,
    transparent 100%
  );
  animation: shimmer 1.5s ease-in-out infinite;
}

.dark .skeleton-shimmer {
  background: linear-gradient(
    90deg,
    transparent 0%,
    rgba(255, 255, 255, 0.08) 50%,
    transparent 100%
  );
}

@keyframes shimmer {
  0% { transform: translateX(-100%); }
  100% { transform: translateX(100%); }
}

.skeleton--text { height: 16px; width: 100%; }
.skeleton--title { height: 24px; width: 60%; }
.skeleton--avatar { height: 48px; width: 48px; border-radius: 50%; }
.skeleton--image { height: 200px; width: 100%; border-radius: 12px; }
.skeleton--card { height: 320px; width: 100%; border-radius: 16px; }
.skeleton--button { height: 40px; width: 120px; border-radius: 10px; }
</style>
