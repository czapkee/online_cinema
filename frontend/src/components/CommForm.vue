<template>
  <form @submit.prevent class="post-form">
    <h3 class="form-title">Добавить комментарий</h3>

    <input
        v-model="post.title"
        class="input"
        type="text"
        placeholder="Тема комментария"
        required
    >

    <input
        v-model="post.body"
        class="input"
        type="text"
        placeholder="Текст комментария"
        required
    >

    <button
        class="button"
        @click="createPost"
    >
      Опубликовать
    </button>
  </form>
</template>

<script>
export default {
  data(){
    return{
      post:{
        title: '',
        body: '',
      }
    }
  },
  methods:{
    createPost(){
      if (!this.post.title.trim() || !this.post.body.trim()) {
        alert("Пожалуйста, заполните все поля!");
        return;
      }

      this.post.id = Date.now();
      this.$emit('create', this.post);
      this.post = {
        title: '',
        body: '',
      }
    }
  }
}
</script>

<style scoped>
.post-form {
  background-color: #2a2a2a;
  padding: 24px;
  border-radius: 12px;
  border: 1px solid #444;
}

.form-title {
  color: #EF959B;
  margin-bottom: 20px;
  font-size: 1.3rem;
  font-weight: 600;
}

.input {
  width: 100%;
  padding: 14px 16px;
  margin-bottom: 16px;
  background-color: #1C1C1C;
  border: 2px solid #444;
  border-radius: 8px;
  color: #fff;
  font-size: 1rem;
  transition: border-color 0.3s ease;

  &::placeholder {
    color: #888;
  }

  &:focus {
    outline: none;
    border-color: #EF959B;
    box-shadow: 0 0 0 2px rgba(239, 149, 155, 0.2);
  }
}

.button {
  background-color: #EF959B;
  color: #000000;
  border: none;
  padding: 14px 28px;
  font-size: 1rem;
  font-weight: 600;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease;
  width: 100%;
  text-transform: uppercase;
  letter-spacing: 0.5px;

  &:hover {
    background-color: #ffa7ad;
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(239, 149, 155, 0.4);
  }

  &:active {
    transform: translateY(0);
  }
}
</style>