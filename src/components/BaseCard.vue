<template>
  <div
      class="base-card"
      :class="{ 'skeleton': isLoading }"
      @click="handleClick"
  >
    <div class="card-image-container">
      <img
          v-if="image && !isLoading"
          :src="image"
          :alt="title"
          class="card-image"
          loading="lazy"
      />
      <div v-else class="image-skeleton"></div>
      <div v-if="!isLoading" class="card-overlay">
        <div class="card-rating" v-if="rating">
          <i class="fas fa-star"></i>
          <span>{{ rating.toFixed(1) }}</span>
        </div>
        <div class="card-year" v-if="year">{{ year }}</div>
      </div>
    </div>
    <div class="card-content">
      <h3 class="card-title" v-if="!isLoading">{{ title }}</h3>
      <div v-else class="title-skeleton"></div>
      <div class="card-subtitle" v-if="subtitle && !isLoading">{{ subtitle }}</div>
      <div v-else-if="isLoading" class="subtitle-skeleton"></div>
      <div class="card-genres" v-if="genres && genres.length > 0 && !isLoading">
        <span v-for="genre in genres.slice(0, 2)" :key="genre" class="genre-tag">
          {{ genre }}
        </span>
        <span v-if="genres.length > 2" class="genre-more">+{{ genres.length - 2 }}</span>
      </div>
    </div>
    <button
        v-if="!isLoading && showFavorite"
        class="favorite-btn"
        @click.stop="toggleFavorite"
        :aria-label="isFavorite ? 'Удалить из избранного' : 'Добавить в избранное'"
    >
      <i :class="['fas', isFavorite ? 'fa-heart' : 'fa-heart-o']"></i>
    </button>
  </div>
</template>

<script>
export default {
  name: 'BaseCard',
  props: {
    id: {
      type: [String, Number],
      required: true
    },
    title: {
      type: String,
      default: ''
    },
    subtitle: {
      type: String,
      default: ''
    },
    image: {
      type: String,
      default: ''
    },
    year: {
      type: [String, Number],
      default: null
    },
    rating: {
      type: Number,
      default: null
    },
    genres: {
      type: Array,
      default: () => []
    },
    isLoading: {
      type: Boolean,
      default: false
    },
    showFavorite: {
      type: Boolean,
      default: true
    },
    isFavorite: {
      type: Boolean,
      default: false
    }
  },
  emits: ['click', 'favorite-toggle'],
  methods: {
    handleClick() {
      if (!this.isLoading) {
        this.$emit('click', this.id);
      }
    },
    toggleFavorite() {
      this.$emit('favorite-toggle', { id: this.id, isFavorite: !this.isFavorite });
    }
  }
}
</script>

<style scoped>
.base-card {
  position: relative;
  background-color: #1C1C1C;
  border-radius: 12px;
  overflow: hidden;
  transition: all 0.3s ease;
  cursor: pointer;
  height: 100%;
  display: flex;
  flex-direction: column;
}

.base-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 15px 30px rgba(239, 149, 155, 0.15);
}

.base-card.skeleton:hover {
  transform: none;
  box-shadow: none;
}

.card-image-container {
  position: relative;
  width: 100%;
  aspect-ratio: 2/3;
  overflow: hidden;
}

.card-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s ease;
}

.base-card:hover .card-image {
  transform: scale(1.05);
}

.image-skeleton {
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, #2a2a2a 25%, #333 50%, #2a2a2a 75%);
  background-size: 200% 100%;
  animation: loading 1.5s infinite;
}

.card-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  padding: 12px;
  display: flex;
  justify-content: space-between;
  background: linear-gradient(to bottom, rgba(0,0,0,0.7) 0%, transparent 100%);
}

.card-rating, .card-year {
  background-color: rgba(0, 0, 0, 0.7);
  color: #EF959B;
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 12px;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 4px;
}

.card-content {
  padding: 16px;
  flex-grow: 1;
  display: flex;
  flex-direction: column;
}

.card-title {
  color: white;
  font-size: 16px;
  font-weight: 600;
  margin-bottom: 8px;
  line-height: 1.3;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.title-skeleton {
  height: 20px;
  width: 80%;
  background: linear-gradient(90deg, #2a2a2a 25%, #333 50%, #2a2a2a 75%);
  background-size: 200% 100%;
  animation: loading 1.5s infinite;
  margin-bottom: 8px;
  border-radius: 4px;
}

.card-subtitle {
  color: #888;
  font-size: 14px;
  margin-bottom: 12px;
  line-height: 1.3;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.subtitle-skeleton {
  height: 16px;
  width: 60%;
  background: linear-gradient(90deg, #2a2a2a 25%, #333 50%, #2a2a2a 75%);
  background-size: 200% 100%;
  animation: loading 1.5s infinite;
  margin-bottom: 12px;
  border-radius: 4px;
}

.card-genres {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  margin-top: auto;
}

.genre-tag {
  background-color: rgba(239, 149, 155, 0.1);
  color: #EF959B;
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 12px;
}

.genre-more {
  color: #888;
  font-size: 12px;
  align-self: center;
}

.favorite-btn {
  position: absolute;
  top: 12px;
  right: 12px;
  background-color: rgba(0, 0, 0, 0.7);
  border: none;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;
  color: #EF959B;
  z-index: 2;
}

.favorite-btn:hover {
  background-color: rgba(239, 149, 155, 0.2);
  transform: scale(1.1);
}

@keyframes loading {
  0% { background-position: 200% 0; }
  100% { background-position: -200% 0; }
}

@media (max-width: 768px) {
  .card-title {
    font-size: 14px;
  }

  .card-subtitle {
    font-size: 12px;
  }

  .favorite-btn {
    width: 32px;
    height: 32px;
  }
}
</style>