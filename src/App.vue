<script setup>
import { useRoute } from 'vue-router'
import KinoHeader from "@/components/Header.vue";
import SideMenu from '@/components/Side-menu.vue'
const route = useRoute();
</script>

<template>
  <div id="app">
    <kino-header/>
    <div class="main-layout">
      <side-menu/>
      <div class="content-wrapper">
        <router-view :key="route.fullPath"/>
      </div>
    </div>
  </div>
</template>

<style scoped>
#app {
  min-height: 100vh;
  background-color: #000000;
}

.main-layout {
  display: flex;
  min-height: 100vh;
  background-color: #000000;
}

.content-wrapper {
  flex: 1;
  padding: 0;
  margin-left: 240px;
  padding-top: 80px;
  width: calc(100% - 240px);
  background-color: #000000;
}

@media (max-width: 768px) {
  .content-wrapper {
    margin-left: 0;
    width: 100%;
    padding-top: 70px;
  }
}
</style>