<template>
    <nav> 
        <router-link to="/"> Додому </router-link>
        <router-link to="/about"> про автора </router-link>
        <router-link to="/chart">Графік </router-link>
    </nav>
    <router-view></router-view>
</template>

<script>
export default {
    name:"App",
    data(){
        return{

        }
    }
}
</script>