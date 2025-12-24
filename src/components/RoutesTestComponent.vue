<script setup>

</script>

<template>
  <h1> Тестовый компонент для проверки ссылок</h1>
  <h2>Расположение: <code>app/src/components/RoutesTestComponent</code></h2>
  <ul>
    <router-link to="/unexpected"> <li>Ошибка</li> </router-link>
    <router-link to="/"> <li>Домашняя страница</li> </router-link>
    <router-link to="/play"> <li>Плеер</li> </router-link>
    <router-link to="/films"> <li>Каталог фильмов</li> </router-link>
    <router-link to="/artists"> <li>Актеры</li> </router-link>
    <router-link to="/about"> <li>О нас</li> </router-link>
  </ul>
</template>

<style scoped>

</style>