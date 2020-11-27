<template>
  <form @submit.prevent="save" v-if="correctId">
    Назва <input v-model="book.Title" /><br />
    Автори <input v-model="book.Author" /> <br />
    Ціна <input type="number" v-model.number="book.Price" step="0.01" />
    <br />
    Знижка <input type="number" v-model.number="book.Disount" /> <br />
    Обгортка <input type="file" v-on:change="selectCover" /> <br />
    <img :src="book.Cover" alt="Cover" width="100" height="200" /><br />

    <button type="submit">Зберегти</button>
  </form>
  <p v-else> Невірний id </p>
</template>
<script>
import Storage from "../storage";

export default {
  props: {
    id: String,
  },
  data() {
    return {
      book: {},
      correctId: false
    };
  },
  mounted() {
    let book = Storage.books.find((book) => book.Id == Number(this.id));
    if (book){
        this.book = book;
        this.correctId = true;
    }
    else
        this.correctId = false;
  },
  methods: {
    save() {
      this.$router.push(`/book/${this.id}`);
    },
        selectCover(event){
            const cover = event.target.files[0];
            this.newBook.Cover = URL.createObjectURL(cover);
        }    
  },
};
</script>