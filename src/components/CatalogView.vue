<template>
  <div class="catalog-view">
    <div class="catalog-header">
      <h1 class="catalog-title">{{ title }}</h1>
      <p class="catalog-subtitle" v-if="subtitle">{{ subtitle }}</p>
    </div>

    <div class="catalog-controls">
      <div class="filters">
        <div class="filter-group">
          <label class="filter-label">Сортировка:</label>
          <div class="custom-select">
            <div
                class="select-selected"
                :class="{ 'select-arrow-active': showSortDropdown }"
                @click="toggleSortDropdown"
            >
              {{ getSortLabel(sortBy) }}
            </div>
            <div class="select-items" v-if="showSortDropdown">
              <div
                  v-for="option in sortOptions"
                  :key="option.value"
                  @click="selectSort(option.value)"
                  :class="{ 'same-as-selected': option.value === sortBy }"
              >
                {{ option.label }}
              </div>
            </div>
          </div>
        </div>

        <div class="filter-group" v-if="genres.length > 0">
          <label class="filter-label">Жанры:</label>
          <div class="custom-select">
            <div
                class="select-selected"
                :class="{ 'select-arrow-active': showGenreDropdown }"
                @click="toggleGenreDropdown"
            >
              {{ selectedGenre || 'Все жанры' }}
            </div>
            <div class="select-items" v-if="showGenreDropdown">
              <div @click="selectGenre('')" :class="{ 'same-as-selected': selectedGenre === '' }">
                Все жанры
              </div>
              <div
                  v-for="genre in genres"
                  :key="genre"
                  @click="selectGenre(genre)"
                  :class="{ 'same-as-selected': selectedGenre === genre }"
              >
                {{ genre }}
              </div>
            </div>
          </div>
        </div>

        <div class="filter-group" v-if="years.length > 0">
          <label class="filter-label">Год:</label>
          <div class="custom-select">
            <div
                class="select-selected"
                :class="{ 'select-arrow-active': showYearDropdown }"
                @click="toggleYearDropdown"
            >
              {{ selectedYear || 'Все года' }}
            </div>
            <div class="select-items" v-if="showYearDropdown">
              <div @click="selectYear('')" :class="{ 'same-as-selected': selectedYear === '' }">
                Все года
              </div>
              <div
                  v-for="year in years"
                  :key="year"
                  @click="selectYear(year)"
                  :class="{ 'same-as-selected': selectedYear === year }"
              >
                {{ year }}
              </div>
            </div>
          </div>
        </div>

        <button class="reset-filters" @click="resetFilters" v-if="hasActiveFilters">
          <i class="fas fa-times"></i>
          Сбросить
        </button>
      </div>

      <div class="search-box">
        <i class="fas fa-search search-icon"></i>
        <input
            v-model="searchQuery"
            type="text"
            placeholder="Поиск..."
            class="search-input"
            @input="handleSearch"
            @focus="showAllDropdowns = false"
        />
      </div>
    </div>

    <div v-if="isLoading" class="loading-container">
      <div class="loading-spinner"></div>
      <p>Загрузка...</p>
    </div>

    <div v-else-if="filteredItems.length === 0" class="empty-state">
      <i class="fas fa-search empty-icon"></i>
      <h3>Ничего не найдено</h3>
      <p>Попробуйте изменить параметры поиска или фильтры</p>
      <button @click="resetFilters" class="reset-btn">
        <i class="fas fa-redo"></i>
        Сбросить фильтры
      </button>
    </div>

    <div v-else class="catalog-grid">
      <component
          :is="cardComponent"
          v-for="item in paginatedItems"
          :key="item.id"
          v-bind="getCardProps(item)"
          @click="handleItemClick(item)"
          @favorite-toggle="handleFavoriteToggle"
      />
    </div>

    <div class="pagination" v-if="totalPages > 1">
      <button
          class="pagination-btn"
          :disabled="currentPage === 1"
          @click="goToPage(1)"
      >
        <i class="fas fa-angle-double-left"></i>
      </button>
      <button
          class="pagination-btn"
          :disabled="currentPage === 1"
          @click="goToPage(currentPage - 1)"
      >
        <i class="fas fa-angle-left"></i>
      </button>

      <template v-for="page in visiblePages" :key="page">
        <button
            class="pagination-btn"
            :class="{ active: page === currentPage }"
            @click="goToPage(page)"
        >
          {{ page }}
        </button>
      </template>

      <button
          class="pagination-btn"
          :disabled="currentPage === totalPages"
          @click="goToPage(currentPage + 1)"
      >
        <i class="fas fa-angle-right"></i>
      </button>
      <button
          class="pagination-btn"
          :disabled="currentPage === totalPages"
          @click="goToPage(totalPages)"
      >
        <i class="fas fa-angle-double-right"></i>
      </button>
    </div>

    <div class="catalog-info">
      <span class="items-count">
        <i class="fas fa-film"></i>
        Найдено: {{ filteredItems.length }} {{ itemsWord }}
      </span>
      <span class="page-info">
        <i class="fas fa-file-alt"></i>
        Страница {{ currentPage }} из {{ totalPages }}
      </span>
    </div>
  </div>
</template>

<script>
import { ref, computed, watch, onMounted, onUnmounted } from 'vue'
import BaseCard from './BaseCard.vue'

export default {
  name: 'CatalogView',
  components: {
    BaseCard
  },
  props: {
    title: {
      type: String,
      required: true
    },
    subtitle: {
      type: String,
      default: ''
    },
    items: {
      type: Array,
      required: true
    },
    isLoading: {
      type: Boolean,
      default: false
    },
    cardComponent: {
      type: [Object, String],
      default: BaseCard
    },
    itemsPerPage: {
      type: Number,
      default: 12
    },
    itemsWord: {
      type: String,
      default: 'элементов'
    }
  },
  emits: ['item-click', 'favorite-toggle'],
  setup(props, { emit }) {
    const searchQuery = ref('')
    const sortBy = ref('rating_desc')
    const selectedGenre = ref('')
    const selectedYear = ref('')
    const currentPage = ref(1)
    const showSortDropdown = ref(false)
    const showGenreDropdown = ref(false)
    const showYearDropdown = ref(false)
    const showAllDropdowns = ref(false)

    const sortOptions = [
      { value: 'rating_desc', label: 'По рейтингу (высокий → низкий)' },
      { value: 'rating_asc', label: 'По рейтингу (низкий → высокий)' },
      { value: 'year_desc', label: 'По году (новые → старые)' },
      { value: 'year_asc', label: 'По году (старые → новые)' },
      { value: 'title_asc', label: 'По названию (А → Я)' },
      { value: 'title_desc', label: 'По названию (Я → А)' }
    ]

    const getSortLabel = (value) => {
      const option = sortOptions.find(opt => opt.value === value)
      return option ? option.label : sortOptions[0].label
    }

    const uniqueGenres = computed(() => {
      const genres = new Set()
      props.items.forEach(item => {
        if (item.genres && Array.isArray(item.genres)) {
          item.genres.forEach(genre => {
            if (genre && typeof genre === 'string') {
              genres.add(genre.trim())
            }
          })
        }
      })
      return Array.from(genres).sort()
    })

    const uniqueYears = computed(() => {
      const years = new Set()
      props.items.forEach(item => {
        if (item.year) {
          const year = parseInt(item.year)
          if (!isNaN(year) && year > 1900 && year <= new Date().getFullYear() + 5) {
            years.add(year)
          }
        }
      })
      return Array.from(years).sort((a, b) => b - a)
    })

    const filteredItems = computed(() => {
      let filtered = [...props.items]

      if (searchQuery.value.trim()) {
        const query = searchQuery.value.toLowerCase().trim()
        filtered = filtered.filter(item => {
          const searchInTitle = item.title?.toLowerCase().includes(query) || false
          const searchInSubtitle = item.subtitle?.toLowerCase().includes(query) || false
          const searchInDescription = item.description?.toLowerCase().includes(query) || false
          return searchInTitle || searchInSubtitle || searchInDescription
        })
      }

      if (selectedGenre.value) {
        filtered = filtered.filter(item => {
          if (!item.genres || !Array.isArray(item.genres)) return false
          return item.genres.some(genre =>
              genre && genre.toLowerCase().includes(selectedGenre.value.toLowerCase())
          )
        })
      }

      if (selectedYear.value) {
        filtered = filtered.filter(item =>
            item.year?.toString() === selectedYear.value.toString()
        )
      }

      filtered.sort((a, b) => {
        switch (sortBy.value) {
          case 'rating_desc':
            return (b.rating || 0) - (a.rating || 0)
          case 'rating_asc':
            return (a.rating || 0) - (b.rating || 0)
          case 'year_desc':
            return (b.year || 0) - (a.year || 0)
          case 'year_asc':
            return (a.year || 0) - (b.year || 0)
          case 'title_asc':
            return (a.title || '').localeCompare(b.title || '', 'ru')
          case 'title_desc':
            return (b.title || '').localeCompare(a.title || '', 'ru')
          default:
            return 0
        }
      })

      return filtered
    })

    const totalPages = computed(() =>
        Math.ceil(filteredItems.value.length / props.itemsPerPage)
    )

    const paginatedItems = computed(() => {
      const start = (currentPage.value - 1) * props.itemsPerPage
      const end = start + props.itemsPerPage
      return filteredItems.value.slice(start, end)
    })

    const visiblePages = computed(() => {
      const pages = []
      const maxVisible = 5
      let start = Math.max(1, currentPage.value - Math.floor(maxVisible / 2))
      let end = Math.min(totalPages.value, start + maxVisible - 1)

      if (end - start + 1 < maxVisible) {
        start = Math.max(1, end - maxVisible + 1)
      }

      for (let i = start; i <= end; i++) {
        pages.push(i)
      }

      return pages
    })

    const hasActiveFilters = computed(() =>
        searchQuery.value.trim() || selectedGenre.value || selectedYear.value
    )

    const getCardProps = (item) => ({
      id: item.id,
      title: item.title,
      subtitle: item.subtitle,
      image: item.image,
      year: item.year,
      rating: item.rating,
      genres: item.genres,
      isLoading: props.isLoading,
      showFavorite: item.showFavorite !== false,
      isFavorite: item.isFavorite || false
    })

    const handleSearch = () => {
      currentPage.value = 1
      closeAllDropdowns()
    }

    const resetFilters = () => {
      searchQuery.value = ''
      selectedGenre.value = ''
      selectedYear.value = ''
      currentPage.value = 1
      closeAllDropdowns()
    }

    const handleItemClick = (item) => {
      emit('item-click', item)
    }

    const handleFavoriteToggle = (data) => {
      emit('favorite-toggle', data)
    }

    const toggleSortDropdown = () => {
      showSortDropdown.value = !showSortDropdown.value
      showGenreDropdown.value = false
      showYearDropdown.value = false
    }

    const toggleGenreDropdown = () => {
      showGenreDropdown.value = !showGenreDropdown.value
      showSortDropdown.value = false
      showYearDropdown.value = false
    }

    const toggleYearDropdown = () => {
      showYearDropdown.value = !showYearDropdown.value
      showSortDropdown.value = false
      showGenreDropdown.value = false
    }

    const closeAllDropdowns = () => {
      showSortDropdown.value = false
      showGenreDropdown.value = false
      showYearDropdown.value = false
    }

    const selectSort = (value) => {
      sortBy.value = value
      currentPage.value = 1
      showSortDropdown.value = false
    }

    const selectGenre = (genre) => {
      selectedGenre.value = genre
      currentPage.value = 1
      showGenreDropdown.value = false
    }

    const selectYear = (year) => {
      selectedYear.value = year
      currentPage.value = 1
      showYearDropdown.value = false
    }

    const goToPage = (page) => {
      if (page >= 1 && page <= totalPages.value) {
        currentPage.value = page
      }
    }

    const handleClickOutside = (event) => {
      if (!event.target.closest('.custom-select')) {
        closeAllDropdowns()
      }
    }

    watch(filteredItems, () => {
      if (currentPage.value > totalPages.value) {
        currentPage.value = Math.max(1, totalPages.value)
      }
    })

    onMounted(() => {
      document.addEventListener('click', handleClickOutside)
    })

    onUnmounted(() => {
      document.removeEventListener('click', handleClickOutside)
    })

    return {
      searchQuery,
      sortBy,
      selectedGenre,
      selectedYear,
      currentPage,
      showSortDropdown,
      showGenreDropdown,
      showYearDropdown,
      genres: uniqueGenres,
      years: uniqueYears,
      sortOptions,
      filteredItems,
      paginatedItems,
      totalPages,
      visiblePages,
      hasActiveFilters,
      getSortLabel,
      getCardProps,
      handleSearch,
      resetFilters,
      handleItemClick,
      handleFavoriteToggle,
      toggleSortDropdown,
      toggleGenreDropdown,
      toggleYearDropdown,
      selectSort,
      selectGenre,
      selectYear,
      goToPage
    }
  }
}
</script>

<style scoped>
.catalog-view {
  padding: 30px 40px;
  min-height: calc(100vh - 80px);
  background-color: #000000;
}

.catalog-header {
  margin-bottom: 30px;
}

.catalog-title {
  color: #EF959B;
  font-size: 36px;
  font-weight: 700;
  margin-bottom: 8px;
}

.catalog-subtitle {
  color: #888;
  font-size: 18px;
}

.catalog-controls {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 20px;
  margin-bottom: 30px;
  flex-wrap: wrap;
}

.filters {
  display: flex;
  gap: 15px;
  flex-wrap: wrap;
  align-items: flex-end;
}

.filter-group {
  display: flex;
  flex-direction: column;
  min-width: 180px;
}

.filter-label {
  color: #EF959B;
  font-size: 14px;
  margin-bottom: 8px;
  font-weight: 600;
}

.custom-select {
  position: relative;
  width: 100%;
}

.select-selected {
  padding: 10px 12px;
  background-color: #1C1C1C;
  border: 2px solid #333;
  border-radius: 8px;
  color: white;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.3s;
  position: relative;
}

.select-selected:after {
  position: absolute;
  content: "";
  top: 50%;
  right: 12px;
  width: 0;
  height: 0;
  border: 6px solid transparent;
  border-color: #EF959B transparent transparent transparent;
  transform: translateY(-50%);
  transition: transform 0.3s;
}

.select-selected.select-arrow-active:after {
  transform: translateY(-50%) rotate(180deg);
}

.select-selected:hover {
  border-color: #444;
}

.select-selected.select-arrow-active {
  border-color: #EF959B;
  border-bottom-left-radius: 0;
  border-bottom-right-radius: 0;
}

.select-items {
  position: absolute;
  background-color: #1C1C1C;
  border: 2px solid #EF959B;
  border-top: none;
  border-bottom-left-radius: 8px;
  border-bottom-right-radius: 8px;
  z-index: 99;
  top: 100%;
  left: 0;
  right: 0;
  max-height: 250px;
  overflow-y: auto;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.5);
}

.select-items div {
  color: white;
  padding: 10px 12px;
  cursor: pointer;
  transition: all 0.2s;
  border-bottom: 1px solid #333;
}

.select-items div:last-child {
  border-bottom: none;
}

.select-items div:hover {
  background-color: #2a2a2a;
  color: #EF959B;
}

.same-as-selected {
  background-color: rgba(239, 149, 155, 0.1);
  color: #EF959B;
}

.reset-filters {
  background-color: transparent;
  color: #EF959B;
  border: 1px solid #EF959B;
  padding: 10px 15px;
  border-radius: 8px;
  cursor: pointer;
  font-size: 14px;
  transition: all 0.3s;
  white-space: nowrap;
  display: flex;
  align-items: center;
  gap: 8px;
  height: 40px;
}

.reset-filters:hover {
  background-color: rgba(239, 149, 155, 0.1);
  transform: translateY(-2px);
}

.search-box {
  position: relative;
  min-width: 300px;
}

.search-input {
  width: 100%;
  padding: 10px 20px 10px 40px;
  background-color: #1C1C1C;
  border: 2px solid #333;
  border-radius: 8px;
  color: white;
  font-size: 14px;
  transition: all 0.3s;
}

.search-input:focus {
  outline: none;
  border-color: #EF959B;
  box-shadow: 0 0 0 2px rgba(239, 149, 155, 0.2);
}

.search-icon {
  position: absolute;
  left: 12px;
  top: 50%;
  transform: translateY(-50%);
  color: #EF959B;
}

.loading-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 400px;
  gap: 20px;
}

.loading-spinner {
  width: 60px;
  height: 60px;
  border: 4px solid rgba(239, 149, 155, 0.1);
  border-top-color: #EF959B;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

.empty-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 400px;
  gap: 16px;
  text-align: center;
  padding: 40px;
  background-color: #1C1C1C;
  border-radius: 12px;
  border: 2px dashed #333;
}

.empty-icon {
  font-size: 48px;
  color: #EF959B;
  margin-bottom: 16px;
}

.empty-state h3 {
  color: white;
  font-size: 24px;
  margin-bottom: 8px;
}

.empty-state p {
  color: #888;
  font-size: 16px;
  margin-bottom: 20px;
}

.reset-btn {
  background-color: #EF959B;
  color: #000000;
  border: none;
  padding: 12px 24px;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s;
  display: flex;
  align-items: center;
  gap: 8px;
}

.reset-btn:hover {
  background-color: #e87c83;
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(239, 149, 155, 0.3);
}

.catalog-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 24px;
  margin-bottom: 30px;
}

.pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 8px;
  margin: 30px 0;
}

.pagination-btn {
  min-width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #1C1C1C;
  border: 1px solid #333;
  border-radius: 8px;
  color: white;
  cursor: pointer;
  transition: all 0.3s;
  font-size: 14px;
}

.pagination-btn:hover:not(:disabled) {
  background-color: #2a2a2a;
  border-color: #EF959B;
}

.pagination-btn.active {
  background-color: #EF959B;
  border-color: #EF959B;
  color: #000000;
  font-weight: 600;
}

.pagination-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.catalog-info {
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: #888;
  font-size: 14px;
  padding-top: 20px;
  border-top: 1px solid #333;
}

.catalog-info i {
  margin-right: 6px;
  color: #EF959B;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

@media (max-width: 1024px) {
  .catalog-view {
    padding: 20px;
  }

  .catalog-grid {
    grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
    gap: 20px;
  }
}

@media (max-width: 768px) {
  .catalog-view {
    padding: 15px;
  }

  .catalog-title {
    font-size: 28px;
  }

  .catalog-controls {
    flex-direction: column;
  }

  .search-box {
    min-width: 100%;
  }

  .catalog-grid {
    grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
    gap: 16px;
  }

  .filters {
    width: 100%;
  }

  .filter-group {
    flex: 1;
    min-width: 0;
  }

  .select-items {
    max-height: 200px;
  }
}
</style>