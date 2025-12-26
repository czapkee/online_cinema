<script>
import CommForm from "../components/CommForm.vue";
import CommtList from "../components/CommtList.vue";
export default {
  components: {
    CommForm,
    CommtList
  },
  data(){
    return{
      posts: []
    }
  },
  methods: {
    createPost(post) {
      if (post.title.trim() && post.body.trim()) {
        this.posts.push(post);
      } else {
        alert("Пожалуйста, заполните все поля!");
      }
    },
  }
}
</script>

<template>
  <div class="app">
    <CommForm
        @create="createPost"
    />
    <CommtList
        :posts="posts"
    />
  </div>
</template>

<style scoped>
.app {
  max-width: 800px;
  margin: 40px auto;
  padding: 20px;
  background-color: #1C1C1C;
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.5);
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  color: #fff;
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
</style>