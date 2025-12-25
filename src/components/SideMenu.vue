<template>
  <aside class="side-menu" :class="{ 'side-menu-collapsed': isCollapsed }">

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
            <transition name="slide">
              <span v-show="!isCollapsed" class="menu-text">{{ item.title }}</span>
            </transition>
          </div>

          <div
              class="hover-line"
              :class="{ 'visible': hoveredItem === item.id || activeItem === item.id }"
          ></div>
        </li>
      </ul>
    </nav>

    <div class="mobile-indicator" v-if="isMobile && isCollapsed" @click="toggleMenu">
      <i class="fas fa-bars"></i>
    </div>
  </aside>
</template>

<script>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'

export default {
  name: 'SideMenu',

  setup() {
    const router = useRouter()
    const isCollapsed = ref(false)
    const hoveredItem = ref(null)
    const activeItem = ref('player')
    const isMobile = ref(false)

    const menuItems = ref([
      { id: 'player', title: 'плеер', icon: 'fas fa-play-circle', route: '/play' },
      { id: 'movies', title: 'фильмы', icon: 'fas fa-film', route: '/films' },
      { id: 'series', title: 'сериалы', icon: 'fas fa-tv', route: '/series' },
      { id: 'actors', title: 'актеры', icon: 'fas fa-user-friends', route: '/artists' },
      { id: 'about', title: 'о нас', icon: 'fas fa-info-circle', route: '/about' }
    ])

    const checkMobile = () => {
      isMobile.value = window.innerWidth <= 768
      if (isMobile.value) {
        isCollapsed.value = true
      }
    }

    const navigateTo = (item) => {
      activeItem.value = item.id
      router.push(item.route).catch(err => {
        console.log('Навигация:', err)
        alert(`Переход к: ${item.title}`)
      })
    }

    const toggleMenu = () => {
      isCollapsed.value = !isCollapsed.value
    }

    const toggleIcon = computed(() => {
      return isCollapsed.value ? 'fas fa-chevron-right' : 'fas fa-chevron-left'
    })

    onMounted(() => {
      checkMobile()
      window.addEventListener('resize', checkMobile)
    })

    onUnmounted(() => {
      window.removeEventListener('resize', checkMobile)
    })

    return {
      isCollapsed,
      hoveredItem,
      activeItem,
      isMobile,
      menuItems,
      toggleIcon,
      navigateTo,
      toggleMenu
    }
  }
}
</script>

<style scoped>
.side-menu {
  position: fixed;
  left: 0;
  top: 0;
  height: 100vh;
  width: 240px;
  background-color: #000000;
  color: white;
  transition: all 0.3s ease;
  z-index: 1000;
  display: flex;
  flex-direction: column;
  box-shadow: 4px 0 15px rgba(0, 0, 0, 0.5);
  padding-top: 100px; /* Отступ для хедера */
}

.side-menu-collapsed {
  width: 70px;
}

.toggle-btn {
  position: absolute;
  top: 20px;
  right: -15px;
  width: 30px;
  height: 30px;
  background-color: #EF959B;
  color: #000000;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  z-index: 1001;
  box-shadow: 0 2px 8px rgba(239, 149, 155, 0.3);
  transition: all 0.3s;
}

.toggle-btn:hover {
  background-color: #e87c83;
  transform: scale(1.1);
}

.menu-nav {
  flex: 1;
  padding: 20px 0;
}

.menu-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.menu-list li {
  position: relative;
  padding: 0 20px;
  margin-bottom: 8px;
  cursor: pointer;
  transition: all 0.3s;
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
  padding: 15px 0;
  color: #ffffff;
  transition: color 0.3s;
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

.side-menu-collapsed .menu-item-content i {
  margin-right: 0;
}

.menu-text {
  font-size: 16px;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  opacity: 1;
  transition: opacity 0.3s;
}

.side-menu-collapsed .menu-text {
  opacity: 0;
  width: 0;
}

.slide-enter-active,
.slide-leave-active {
  transition: all 0.3s ease;
}

.slide-enter-from,
.slide-leave-to {
  opacity: 0;
  transform: translateX(-10px);
}

.hover-line {
  position: absolute;
  right: 0;
  top: 0;
  height: 100%;
  width: 4px;
  background-color: #EF959B;
  opacity: 0;
  transform: scaleY(0);
  transition: all 0.3s ease;
}

.hover-line.visible {
  opacity: 1;
  transform: scaleY(1);
}

.mobile-indicator {
  position: fixed;
  left: 10px;
  top: 10px;
  width: 40px;
  height: 40px;
  background-color: #EF959B;
  color: #000000;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  z-index: 1002;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.3);
}


@media (max-width: 768px) {
  .side-menu {
    width: 70px;
    padding-top: 70px;
  }

  .side-menu:not(.side-menu-collapsed) {
    width: 240px;
    box-shadow: 4px 0 20px rgba(0, 0, 0, 0.7);
  }

  .toggle-btn {
    display: none;
  }

  .menu-list li {
    padding: 0 15px;
  }

  .menu-item-content {
    padding: 12px 0;
  }
}
</style>