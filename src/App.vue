<template>
  <section class="control">
    Вибрано книгу {{ selected }}
    <input type="button" value="Додат нову книгу" v-on:click="showForm" />
    <input type="button" value="Редагувати книгу" v-on:click="showEditForm" />
    <input type="button" value="Вилучити" v-on:click="deleteBook" />
    <input type="button" value="Сортувати" @click="sortBooksByPrice"/>
    <input type="text" placeholder="Шукати по назві" v-model="searchTitleString">
  </section>
  <div class="wrap">
  <div v-if="showNewBookForm" class="whiteboard">
    <form
      v-on:submit.prevent="addNewBook"
      class="newForm"
      
    >
      <button v-on:click="closeForm"> X </button>
      Назва <input v-model="newBook.Title" /><br />
      Автори <input v-model="newBook.Author" /> <br />
      Ціна <input type="number" v-model.number="newBook.Price" /> <br />
      Знижка <input type="number" v-model.number="newBook.Disount" /> <br />
       Обгортка <input type="file" v-on:change="selectCover"> <br>
       <img :src="newBook.Cover" alt="Cover" width="100" height="200"><br> 
      <button type="submit">Додати</button>
      <button type="reset">Очистити</button>
    </form>
  </div>
    <form
      v-on:submit.prevent="editSelectedBook"
      class="newForm"
      v-if="showEditBookForm"
    >
      Назва <input v-model="editBook.Title" /><br />
      Автори <input v-model="editBook.Author" /> <br />
      Ціна <input type="number" v-model.number="editBook.Price" /> <br />
      Знижка <input type="number" v-model.number="editBook.Disount" /> <br />
      <!-- Обгортка <input type="image" v-model="editBook.Cover"> <br> -->
      <button type="submit">Редагувати</button>
      <button type="reset">Очистити</button>
    </form>

    <ul>
      <li
        v-for="(b, i) in filtredBooks"
        :key="i"
        class="bookvie"
        v-on:click="selectBook(i)"
        :style="i == selected ? 'border:10px solid black' : ''"
      >
        <h2>{{ b.Title }}</h2>
        <p class="authors">{{ b.Author }}</p>
        <p>{{ b.Price.toFixed(2) }}</p>
        <img alt="Cover" :src="b.Cover" class="cover" />
        <div v-if="b.Disount > 0" class="discount">Знижка {{ b.Disount }}%</div>
        Рейтинг
        <div class="stars">
          <div v-if="b.Stars > 0" class="star">*</div>
          <div v-if="b.Stars > 1" class="star">*</div>
          <div v-if="b.Stars > 2" class="star">*</div>
          <div v-if="b.Stars > 3" class="star">*</div>
          <div v-if="b.Stars > 4" class="star">*</div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>

export default {
  name: "App",
  data() {
    return {
      searchTitleString:"",
      selected: -1,
      newComment: "",
      showComments: true,
      showNewBookForm: false,
      showEditBookForm: false,
      books: [
        {
          Stars: 5,
          Disount: 10,
          Title: "Кобзар",
          Author: "Т.Г. Шевченко",
          Price: 450.0,
          Cover:
            "https://img.yakaboo.ua/media/catalog/product/cache/1/image/398x565/234c7c011ba026e66d29567e1be1d1f7/1/8/18291_26236_13.jpg",
          Comments: ["Найкраща книга", "Дуже патріотично", "Супер"],
        },
        {
          Stars: 4,
          Disount: 0,
          Title: "Vue.js: Up and Running: Building Accessible and",
          Author: "Каллум Макрей",
          Price: 800.50,
          Cover:
            "https://images-na.ssl-images-amazon.com/images/I/51ooMi3IrCL._SX379_BO1,204,203,200_.jpg",
          Comments: ["Найкраща книга", "Дуже патріотично", "Супер"],
        },
        {
          Stars: 3,
          Disount: 0,
          Title: "Node.js Design Patterns",
          Author: "Mario Casciaro  (Author), Luciano Mammino  (Author)",
          Price: 50.0,
          Cover:
            "https://images-na.ssl-images-amazon.com/images/I/515wgVc7S9L._SX404_BO1,204,203,200_.jpg",
          Comments: ["Найкраща книга", "Дуже патріотично", "Супер"],
        },
      ],
      newBook: {
        Disount: 0,
        Title: "",
        Author: "",
        Price: 0,
        Cover: "",
      },
      editBook: null,
    };
  },
  methods: {
    sortBooksByPrice(){
      this.books.sort((book1, book2) =>  book1.Price>book2.Price?1:-1);
    },
    addComment() {
      this.book.Comments.push(this.newComment);
    },
    showHideComments() {
      this.showComments = !this.showComments;
    },
    addNewBook() {
      let newBookCopy = Object.assign({}, this.newBook);
      this.books.push(newBookCopy);
      this.showNewBookForm = false;
    },
    showForm() {
      this.showNewBookForm = true;
    },
    selectBook(index) {
      this.selected = index;
    },
    showEditForm() {
      if (this.selected >= 0) {
        this.editBook = this.books[this.selected];
        this.showEditBookForm = true;
      } else alert("Виберіть книгу");
    },
    editSelectedBook() {
      this.showEditBookForm = false;
    },
    deleteBook() {
      if (this.selected >= 0) this.books.splice(this.selected, 1);
    },
    closeForm(){
      this.showNewBookForm = false;
    },
    selectCover(event){
      const cover = event.target.files[0];
      this.newBook.Cover = URL.createObjectURL(cover);
    }
  },
  computed:{
      sortedBooks(){
        function CompareBooks(book1, book2){
            if (book1.Price>book2.Price)
              return 1;
            if (book1.Price<book2.Price)
              return -1;
            if (book1.Title>book2.Title)
              return 1;
            if (book1.Title<book2.Title)
              return -1;
            return 0;
        }
        return [...this.books].sort(CompareBooks);
      },
      filtredBooks(){
        if (this.searchTitleString == "")
          return this.sortedBooks;
        return this.sortedBooks.filter(b => b.Title.includes(this.searchTitleString));
      }
  }
};
</script>

<style scoped>
.whiteboard{
  width: 1000px;
  height: 1000px;
  background: rgba(255, 255, 255, 0.384);
  position: absolute;
  z-index: 9;
}
ul {
  list-style: none;
  position: relative;
}
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

form {
  position: absolute;
  z-index: 10;
  background: oldlace;
  margin: 100px auto;
  width: 50%;
}

.wrap {
  position: relative;
}
</style>