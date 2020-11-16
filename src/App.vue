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
    <new-book-form 
      v-model = "newBook"
      @submit.prevent="addNewBook"
      ref="newBookForm"
    > </new-book-form>
    <new-book-form
      v-model = "editBook"
      ref="editBookForm"
    >
    </new-book-form>

    <ul>
      <book-template
        v-for="b in filtredBooks"
        :key="b.Id"
        class="bookvie"
        v-on:click="selectBook(b.Id)"
        v-bind:book="b"
      >
      </book-template>
    </ul>
  </div>
</template>

<script>
import BookTemplate from './components/BookTemplate.vue';
import NewBookForm from './components/NewBookForm.vue';


export default {
  name: "App",
  components:{
    BookTemplate,
    NewBookForm
  },
  data() {
    return {
      searchTitleString:"",
      selected: -1,

      books: [
        {
          Id:54564,
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
          Id:1322222,
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
          Id:13136346,
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
      editBook: {},
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
      console.log(this.newBook);
      let newBookCopy = Object.assign({}, this.newBook);
      newBookCopy.Id = parseInt(Date.now());
      this.books.push(newBookCopy);
      this.showNewBookForm = false;
    },
    showForm() {
      this.$refs.newBookForm.show();
    },
    selectBook(id) {
      this.selected = id;
    },
    showEditForm() {
      if (this.selected >= 0) {
        let index = this.books.findIndex(book => book.Id == this.selected);
        this.editBook = this.books[index];
        console.log(this.editBook);
        this.$refs.editBookForm.show();
      } else alert("Виберіть книгу");
    },
    deleteBook() {
      let index = this.books.findIndex(book => book.Id == this.selected);
      if (this.selected >= 0) this.books.splice(index, 1);
    },
    closeForm(){
      this.showNewBookForm = false;
    },
 
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
      },
      selectedIndex(){
        if (this.selected>0)
          return this.books.findIndex(book => book.Id == this.selected);
        return -1;
      }
  }
};
</script>

<style scoped>

ul {
  list-style: none;
  position: relative;
}



.wrap {
  position: relative;
}
</style>