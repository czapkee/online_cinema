<script setup>
  import { useRoute } from 'vue-router'
  import KinoHeader from "@/components/header.vue";
  import RoutesTestComponent from "@/components/RoutesTestComponent.vue";
  useRoute();
</script>

<template>
  <div id="app">
    <main class="container">
      <kino-header/>
      <routes-test-component/>
      <router-view />
    </main>
  </div>
</template>

<style scoped>

</style>
