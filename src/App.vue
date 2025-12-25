<script setup>
  import { useRoute } from 'vue-router'
  import KinoHeader from "@/components/header.vue";
  import SideMenu from '@/components/SideMenu.vue'
  import RoutesTestComponent from "@/components/RoutesTestComponent.vue";
  useRoute();
</script>

<template>
  <div id="app">
    <main class="container">
      <kino-header/>
      <side-menu></side-menu>
      <routes-test-component/>
      <router-view />
    </main>
  </div>
</template>

<style scoped>

</style>
