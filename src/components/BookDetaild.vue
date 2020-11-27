<template>
    <button type="button" @click="edit"> Редагувати </button>
    <h2> {{book.Title}} </h2>
    <p> {{book.Author}}</p>
    <img :src="book.Cover">
    
</template>

<script>
import Storage from "../storage";

export default {
    props:{
        id:String
    },
    data(){
        return{
            book:{}
        }
    },
    mounted(){
        this.book = Storage.books.find(book => book.Id == Number(this.id));
    },
    methods:{
        edit(){
            this.$router.push(`${this.book.Id}/edit`);
        }
    }
}
</script>