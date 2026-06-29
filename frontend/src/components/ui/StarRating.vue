<template>
  <div class="star-rating" :class="sizeClass">
    <template v-for="i in 5" :key="i">
      <i
        class="star"
        :class="[
          i <= fullStars ? 'fas fa-star' : i <= fullStars + hasHalfStar ? 'fas fa-star-half-alt' : 'far fa-star'
        ]"
        :style="{ color: i <= fullStars || i <= fullStars + hasHalfStar ? '#f4a340' : '#ddd' }"
      ></i>
    </template>
    <span v-if="showCount" class="rating-count">({{ count }})</span>
  </div>
</template>

<script>
export default {
  name: 'StarRating',
  props: {
    rating: { type: Number, default: 0 },
    count: { type: Number, default: 0 },
    size: { type: String, default: 'sm' },
    showCount: { type: Boolean, default: false }
  },
  computed: {
    fullStars() {
      return Math.floor(this.rating)
    },
    hasHalfStar() {
      return this.rating - this.fullStars >= 0.3
    },
    sizeClass() {
      return `star-rating--${this.size}`
    }
  }
}
</script>

<style scoped>
.star-rating {
  display: inline-flex;
  align-items: center;
  gap: 2px;
}

.star {
  font-size: 12px;
  transition: transform 0.2s ease;
}

.star-rating:hover .star {
  transform: scale(1.1);
}

.star-rating--sm .star { font-size: 12px; }
.star-rating--md .star { font-size: 16px; }
.star-rating--lg .star { font-size: 20px; }

.rating-count {
  font-size: 12px;
  color: #8a7a82;
  margin-left: 4px;
}
</style>
