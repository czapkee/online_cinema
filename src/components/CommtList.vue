<template>
  <div class="post-list">
    <div v-if="posts.length === 0" class="empty-message">
      Комментариев пока нет. Будьте первым!
    </div>

    <div v-else>
      <div class="post" v-for="post in posts" :key="post.id">
        <div class="post-title">
          <strong class="post-label">Тема:</strong>
          <span class="post-title-text">{{ post.title }}</span>
        </div>
        <div class="post-body">
          <strong class="post-label">Комментарий:</strong>
          <span class="post-body-text">{{ post.body }}</span>
        </div>
        <div class="post-divider"></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props:{
    posts:{
      type:Array,
      required:true
    }
  }
}
</script>

<style scoped>
.post-list {
  margin-top: 30px;
}

.empty-message {
  text-align: center;
  padding: 40px 20px;
  color: #888;
  font-style: italic;
  background-color: #2a2a2a;
  border-radius: 8px;
  border: 1px dashed #444;
}

.post {
  background-color: #2a2a2a;
  padding: 16px 20px;
  margin-bottom: 16px;
  border-radius: 0 8px 8px 0;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
  transition: transform 0.2s ease;

  &:hover {
    transform: translateX(4px);
  }
}

.post-title {
  font-size: 1.1rem;
  margin-bottom: 8px;
  color: #fff;
}

.post-body {
  font-size: 0.95rem;
  line-height: 1.5;
  color: #d1d1d1;
}

.post-label {
  color: #EF959B;
  margin-right: 8px;
}

.post-title-text {
  color: #fff;
  font-weight: 600;
}

.post-body-text {
  color: #ccc;
}

.post-divider {
  height: 1px;
  margin-top: 14px;
}
</style>