<template>
  <div class="bookvie">
    <h2>{{ book.Title }}</h2>
    <p class="authors">{{ book.Author }}</p>
    <p>{{ book.Price.toFixed(2) }}</p>
    <img alt="Cover" :src="book.Cover" class="cover" />

    <div v-if="book.Disount > 0" class="discount">
      Знижка {{ book.Disount }}%
    </div>
    <br />
    Рейтинг
    <div class="stars">
      <div v-if="book.Stars > 0" class="star">*</div>
      <div v-if="book.Stars > 1" class="star">*</div>
      <div v-if="book.Stars > 2" class="star">*</div>
      <div v-if="book.Stars > 3" class="star">*</div>
      <div v-if="book.Stars > 4" class="star">*</div>
    </div>

    <br />
    <p v-on:click="showHideComments">Коментарі</p>
    <div v-if="showComments">
      <ul v-if="book.Comments.length>0">
        <li v-for="comment in book.Comments" :key="comment">{{ comment }}</li>
      </ul>
      <p v-else> коментів нема </p>
      <form>
        <input type="text" placeholder="Новий коментар" v-model="newComment" />
        <input type="button" value="Додати" v-on:click="addComment" />
      </form>
    </div>
  </div>
</template>

<script>
export default {
  name: "App",
  data() {
    return {
      newComment: "",
      showComments: true,
      book: {
        Stars: 3,
        Disount: 10,
        Title: "Кобзар",
        Author: "Т.Г. Шевченко",
        Price: 450.0,
        Cover:
          "https://img.yakaboo.ua/media/catalog/product/cache/1/image/398x565/234c7c011ba026e66d29567e1be1d1f7/1/8/18291_26236_13.jpg",
        Comments: ["Найкраща книга", "Дуже патріотично", "Супер"],
      },
    };
  },
  methods: {
    addComment() {
      this.book.Comments.push(this.newComment);
    },
    showHideComments(){
      this.showComments = !this.showComments
    }
  },
};
</script>

<style scoped>
.authors {
  font: 12px grey;
}
.bookvie {
  background: burlywood;
  width: 200px;
  position: relative;
}
.discount {
  position: absolute;
  right: 10px;
  top: 10px;
  background: chartreuse;
}
.star {
  float: left;
}
.cover {
  position: relative;
  width: 100px;
  height: 150px;
}
</style>