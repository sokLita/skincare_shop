<template>
  <div class="product-image-wrapper">
    <img
      v-if="imgSrc && !imgError"
      :src="imgSrc"
      :alt="alt"
      class="product-img"
      @error="onError"
      v-bind="$attrs"
    />
    <component :is="randomFallback" v-else class="product-img product-img--fallback" />
  </div>
</template>

<script>
import { ref, computed } from 'vue'
import ProductImageCleanser from '../ProductImageCleanser.vue'
import ProductImageMoisturizer from '../ProductImageMoisturizer.vue'
import ProductImageSerum from '../ProductImageSerum.vue'

const FALLBACKS = [
  ProductImageCleanser,
  ProductImageMoisturizer,
  ProductImageSerum
]

// Deterministic random based on product name for consistency
function pickFallback(alt) {
  const index = alt
    ? Math.abs(alt.split('').reduce((acc, c) => acc + c.charCodeAt(0), 0)) % FALLBACKS.length
    : Math.floor(Math.random() * FALLBACKS.length)
  return FALLBACKS[index]
}

export default {
  name: 'ProductImage',
  components: { ProductImageCleanser, ProductImageMoisturizer, ProductImageSerum },
  props: {
    src: { type: String, default: '' },
    alt: { type: String, default: 'Product' }
  },
  setup(props) {
    const imgError = ref(false)
    const imgSrc = computed(() => props.src)
    const randomFallback = computed(() => pickFallback(props.alt))

    function onError() {
      imgError.value = true
    }

    return { imgSrc, imgError, randomFallback, onError }
  }
}
</script>

<style scoped>
.product-image-wrapper {
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
}

.product-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.product-img--fallback {
  object-fit: contain;
  background: #faf5ef;
}
</style>
