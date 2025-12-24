<script setup>
  import { useRoute } from 'vue-router'
  import MainPage from "@/components/MainPage.vue";
  const route = useRoute()
  // import Footer from '@/components/Footer.vue'
  useRoute();
</script>

<template>
  <div id="app">
    <main class="container">
      <router-view v-slot="{ Component }">
        <transition name="fade" mode="out-in">
          <component :is="Component" />
        </transition>
      </router-view>
      {{ MainPage }}
    </main>
  </div>
</template>

<style scoped>

</style>
