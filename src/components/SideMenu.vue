<template>
  <aside class="side-menu">
    <div class="menu-content">
      <nav class="menu-nav">
        <ul class="menu-list">
          <li
              v-for="item in menuItems"
              :key="item.id"
              :class="{ 'active': activeItem === item.id }"
              @mouseenter="hoveredItem = item.id"
              @mouseleave="hoveredItem = null"
              @click="navigateTo(item)"
          >
            <div class="menu-item-content">
              <i :class="item.icon"></i>
              <span class="menu-text">{{ item.title }}</span>
            </div>
            <div
                class="hover-line"
                :class="{ 'visible': hoveredItem === item.id || activeItem === item.id }"
            ></div>
          </li>
        </ul>
      </nav>
    </div>
  </aside>
</template>

<script>
import { ref, computed, onMounted, watch } from 'vue'
import { useRouter, useRoute } from 'vue-router'

export default {
  name: 'SideMenu',
  setup() {
    const router = useRouter()
    const route = useRoute()
    const hoveredItem = ref(null)
    const activeItem = ref('player')

    const menuItems = ref([
      { id: 'player', title: 'плеер', icon: 'fas fa-play-circle', route: '/play' },
      { id: 'movies', title: 'фильмы', icon: 'fas fa-film', route: '/films' },
      { id: 'series', title: 'сериалы', icon: 'fas fa-tv', route: '/series' },
      { id: 'actors', title: 'актеры', icon: 'fas fa-user-friends', route: '/artists' },
      { id: 'about', title: 'о нас', icon: 'fas fa-info-circle', route: '/about' }
    ])

    const updateActiveItemFromRoute = () => {
      const currentPath = route.path
      const menuItem = menuItems.value.find(item =>
          item.route === currentPath || currentPath.startsWith(item.route + '/')
      )
      if (menuItem) {
        activeItem.value = menuItem.id
      } else if (currentPath === '/') {
        activeItem.value = 'player'
      }
    }

    const navigateTo = (item) => {
      activeItem.value = item.id
      router.push(item.route).catch(err => {
        console.log('Навигация:', err)
      })
    }

    onMounted(() => {
      updateActiveItemFromRoute()
    })

    watch(() => route.path, () => {
      updateActiveItemFromRoute()
    })

    return {
      hoveredItem,
      activeItem,
      menuItems,
      navigateTo
    }
  }
}
</script>

<style scoped>
.side-menu {
  position: fixed;
  left: 0;
  top: 80px;
  height: calc(100vh - 80px);
  width: 240px;
  background-color: #000000;
  color: white;
  z-index: 900;
  display: flex;
  flex-direction: column;
  border-right: 1px solid #333;
  overflow-y: auto;
  box-shadow: 4px 0 15px rgba(0, 0, 0, 0.5);
}

.menu-content {
  flex: 1;
  padding-top: 30px;
}

.menu-nav {
  padding: 10px 0;
}

.menu-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.menu-list li {
  position: relative;
  padding: 0 20px;
  margin-bottom: 12px;
  cursor: pointer;
  transition: all 0.3s;
  border-radius: 12px;
  margin: 0 15px 12px 15px;
}

.menu-list li:hover {
  background-color: rgba(239, 149, 155, 0.1);
}

.menu-list li.active {
  background-color: rgba(239, 149, 155, 0.15);
}

.menu-item-content {
  display: flex;
  align-items: center;
  padding: 16px 0;
  color: #ffffff;
  transition: all 0.3s;
  white-space: nowrap;
  overflow: hidden;
}

.menu-list li:hover .menu-item-content,
.menu-list li.active .menu-item-content {
  color: #EF959B;
}

.menu-item-content i {
  font-size: 22px;
  min-width: 30px;
  text-align: center;
  margin-right: 15px;
  transition: margin 0.3s;
}

.menu-text {
  font-size: 16px;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  opacity: 1;
}

.hover-line {
  position: absolute;
  right: 0;
  top: 0;
  height: 100%;
  width: 4px;
  background-color: #EF959B;
  border-radius: 2px;
  opacity: 0;
  transform: scaleY(0);
  transition: all 0.3s ease;
}

.hover-line.visible {
  opacity: 1;
  transform: scaleY(1);
}

@media (max-width: 768px) {
  .side-menu {
    width: 240px;
    top: 70px;
    height: calc(100vh - 70px);
  }

  .menu-list li {
    padding: 0 15px;
    margin: 0 10px 10px 10px;
  }

  .menu-item-content {
    padding: 14px 0;
  }
}
</style>