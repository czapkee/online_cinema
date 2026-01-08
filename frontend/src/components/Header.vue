<template>
  <div class="header-container">
    <header class="header">
      <div class="logo" @click="goHome">
        <i class="fas fa-film"></i>
        <span>Kino</span>
      </div>

      <div class="search-container">
        <i class="fas fa-search search-icon"></i>
        <input
            type="text"
            class="search-box"
            placeholder="search..."
            :value="searchQuery"
            @input="handleSearchInput"
            @focus="showResults = true"
        >

        <div class="search-results" v-if="showResults && searchQuery">
          <ul>
            <li v-for="result in searchResults" :key="result.id" @click="selectResult(result)">
              <i class="fas fa-play-circle" style="margin-right: 10px; color: #EF959B;"></i>
              {{ result.title }} ({{ result.year }})
            </li>
            <li v-if="searchResults.length === 0">
              Ничего не найдено по запросу "{{ searchQuery }}"
            </li>
          </ul>
        </div>
      </div>

      <div class="user-menu" v-if="!isLoggedIn">
        <button class="login-btn" @click="login">
          <i class="fas fa-sign-in-alt"></i>
          <span>login</span>
        </button>
      </div>

      <div class="user-menu" v-else>
        <div class="user-info" @click="toggleDropdown">
          <div class="user-avatar">{{ userInitials }}</div>
          <span>{{ userName }}</span>
          <i class="fas fa-chevron-down"></i>
        </div>

        <div class="user-dropdown" v-if="showDropdown">
          <ul>
            <li @click="goToProfile">
              <i class="fas fa-user"></i>
              <span>Мой профиль</span>
            </li>
            <li @click="goToFavorites">
              <i class="fas fa-heart"></i>
              <span>Избранное</span>
            </li>
            <li @click="goToSettings">
              <i class="fas fa-cog"></i>
              <span>Настройки</span>
            </li>
            <li @click="logout" style="color: #EF959B;">
              <i class="fas fa-sign-out-alt"></i>
              <span>Выйти</span>
            </li>
          </ul>
        </div>
      </div>
    </header>
  </div>
</template>

<script>
const mockMovies = [
  { id: 1, title: 'Интерстеллар', year: 2014 },
  { id: 2, title: 'Начало', year: 2010 },
  { id: 3, title: 'Паразиты', year: 2019 },
  { id: 4, title: 'Криминальное чтиво', year: 1994 },
  { id: 5, title: 'Форрест Гамп', year: 1994 },
  { id: 6, title: 'Зеленая книга', year: 2018 },
  { id: 7, title: 'Побег из Шоушенка', year: 1994 },
  { id: 8, title: 'Король Лев', year: 1994 },
  { id: 9, title: 'Темный рыцарь', year: 2008 },
  { id: 10, title: 'Бойцовский клуб', year: 1999 }
];

export default {
  name: 'KinoHeader',

  props: {
    initialLoggedIn: {
      type: Boolean,
      default: false
    },
    initialUserName: {
      type: String,
      default: ''
    },
    initialSearchQuery: {
      type: String,
      default: ''
    }
  },

  data() {
    return {
      searchQuery: this.initialSearchQuery,
      showResults: false,
      isLoggedIn: this.initialLoggedIn,
      showDropdown: false,
      movies: mockMovies
    };
  },

  computed: {
    userInitials() {
      if (this.userName) {
        return this.userName.split(' ').map(n => n[0]).join('').toUpperCase();
      }
      return 'ГС';
    },

    userName() {
      return this.initialUserName || 'Гость';
    },

    searchResults() {
      if (!this.searchQuery) return [];
      const query = this.searchQuery.toLowerCase();
      return this.movies.filter(movie =>
          movie.title.toLowerCase().includes(query) ||
          movie.year.toString().includes(query)
      ).slice(0, 5);
    }
  },

  methods: {
    handleSearchInput(event) {
      this.searchQuery = event.target.value;
      this.$emit('search', this.searchQuery);
    },

    selectResult(result) {
      this.searchQuery = result.title;
      this.showResults = false;
      this.$emit('select-result', result);
    },

    login() {
      this.isLoggedIn = true;
      this.$emit('login');
    },

    logout() {
      this.isLoggedIn = false;
      this.showDropdown = false;
      this.$emit('logout');
    },

    toggleDropdown() {
      this.showDropdown = !this.showDropdown;
    },

    goHome() {
      this.searchQuery = '';
      this.showResults = false;
      this.showDropdown = false;
      this.$emit('go-home');
    },

    goToProfile() {
      this.showDropdown = false;
      this.$emit('go-to-profile');
    },

    goToFavorites() {
      this.showDropdown = false;
      this.$emit('go-to-favorites');
    },

    goToSettings() {
      this.showDropdown = false;
      this.$emit('go-to-settings');
    }
  },

  mounted() {
    document.addEventListener('click', (event) => {
      if (!event.target.closest('.search-container')) {
        this.showResults = false;
      }
      if (!event.target.closest('.user-menu')) {
        this.showDropdown = false;
      }
    });
  }
};
</script>

<style scoped>
.header-container {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  background-color: #000000;
  z-index: 1000;
  height: 80px;
  display: flex;
  align-items: center;
  border-bottom: 1px solid #333;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.5);
  padding: 0 30px;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 100%;
}

.logo {
  font-size: 32px;
  font-weight: 600;
  color: #EF959B;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 10px;
  white-space: nowrap;
  transition: all 0.3s;
}

.logo:hover {
  color: #e87c83;
  transform: scale(1.05);
}

.logo i {
  font-size: 34px;
}

.search-container {
  position: relative;
  flex-grow: 1;
  max-width: 600px;
  margin: 0 40px;
}

.search-box {
  width: 100%;
  padding: 14px 20px 14px 55px;
  border-radius: 50px;
  border: 2px solid #1C1C1C;
  background-color: #1C1C1C;
  color: white;
  font-size: 16px;
  transition: all 0.3s;
  outline: none;
}

.search-box:focus {
  border-color: #EF959B;
  box-shadow: 0 0 0 3px rgba(239, 149, 155, 0.2);
}

.search-icon {
  position: absolute;
  left: 20px;
  top: 50%;
  transform: translateY(-50%);
  color: #EF959B;
  font-size: 18px;
}

.login-btn {
  background-color: #EF959B;
  color: #000000;
  border: none;
  padding: 12px 28px;
  border-radius: 50px;
  font-weight: 600;
  font-size: 16px;
  cursor: pointer;
  transition: all 0.3s;
  display: flex;
  align-items: center;
  gap: 10px;
  white-space: nowrap;
}

.login-btn:hover {
  background-color: #e87c83;
  transform: translateY(-2px);
  box-shadow: 0 6px 15px rgba(239, 149, 155, 0.3);
}

.login-btn i {
  font-size: 18px;
}

.search-results {
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  background-color: #1C1C1C;
  border-radius: 16px;
  margin-top: 10px;
  padding: 15px;
  box-shadow: 0 15px 35px rgba(0, 0, 0, 0.6);
  z-index: 100;
  max-height: 300px;
  overflow-y: auto;
  border: 1px solid #333;
}

.search-results ul {
  list-style: none;
  margin: 0;
  padding: 0;
}

.search-results li {
  padding: 12px 15px;
  border-radius: 10px;
  border-bottom: 1px solid #333;
  cursor: pointer;
  transition: all 0.2s;
  color: white;
  margin-bottom: 5px;
}

.search-results li:hover {
  background-color: #2a2a2a;
  color: #EF959B;
  transform: translateX(5px);
}

.search-results li:last-child {
  border-bottom: none;
}

.user-menu {
  position: relative;
}

.user-info {
  display: flex;
  align-items: center;
  gap: 12px;
  cursor: pointer;
  padding: 10px 20px;
  border-radius: 50px;
  transition: all 0.3s;
  color: white;
  white-space: nowrap;
  background-color: #1a1a1a;
}

.user-info:hover {
  background-color: #2a2a2a;
  transform: scale(1.05);
}

.user-avatar {
  width: 45px;
  height: 45px;
  border-radius: 50%;
  background-color: #EF959B;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  color: #000000;
  font-size: 18px;
}

.user-dropdown {
  position: absolute;
  top: 100%;
  right: 0;
  background-color: #1C1C1C;
  border-radius: 16px;
  margin-top: 10px;
  padding: 15px;
  box-shadow: 0 15px 35px rgba(0, 0, 0, 0.6);
  z-index: 100;
  min-width: 220px;
  border: 1px solid #333;
}

.user-dropdown ul {
  list-style: none;
  margin: 0;
  padding: 0;
}

.user-dropdown li {
  padding: 12px 15px;
  border-radius: 10px;
  cursor: pointer;
  transition: all 0.2s;
  display: flex;
  align-items: center;
  gap: 12px;
  color: white;
  margin-bottom: 5px;
}

.user-dropdown li:hover {
  background-color: #2a2a2a;
  color: #EF959B;
  transform: translateX(5px);
}

@media (max-width: 768px) {
  .header-container {
    padding: 0 15px;
    height: 70px;
  }

  .search-container {
    margin: 0 15px;
  }

  .logo span {
    display: none;
  }

  .search-box {
    padding: 12px 15px 12px 45px;
  }

  .login-btn {
    padding: 10px 20px;
  }
}
</style>