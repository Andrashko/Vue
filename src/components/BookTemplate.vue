<template>
     <li>
        <h2>{{ book.Title }}</h2>
        <p class="authors">{{ book.Author }}</p>
        <p>{{ book.Price.toFixed(2) }}</p>
        <img alt="Cover" :src="book.Cover" class="cover" />
        <div v-if="book.Disount > 0" class="discount">Знижка {{ book.Disount }}%</div>
        Рейтинг
        <div class="stars">
          <div v-if="book.Stars > 0" class="star">*</div>
          <div v-if="book.Stars > 1" class="star">*</div>
          <div v-if="book.Stars > 2" class="star">*</div>
          <div v-if="book.Stars > 3" class="star">*</div>
          <div v-if="book.Stars > 4" class="star">*</div>
        </div>
      </li>
</template>

<script>
export default {
  name:"BookTempate",
  props:{
      book: Object
  },
  data(){
      return{
      }
  }   
}
</script>

<style scoped>
.authors {
  font: 12px grey;
}
.bookvie {
  background: burlywood;
  width: 200px;
  position: relative;
  float: left;
  margin: 10px;
  height: 400px;
}
.discount {
  position: absolute;
  right: 0px;
  top: 30px;
  background: chartreuse;
  transform: rotate(45deg);
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