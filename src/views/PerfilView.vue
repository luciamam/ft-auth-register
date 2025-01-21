<template>
  <section>
    <h1>Bienvenido {{ user.email }}</h1>
    <button @click="logout">cerrar Sesion</button>
    
  </section>
</template>

<script>
import {auth} from '@/db/firebase'
import {singOut} from "firebase/auth"
export default {
    name:'PerfilView',
    data(){
        return {
            user:{
                user:null
            }
        }
    },
    mounted(){
        this.user = auth.currentUser
        //obtenemos el usuario actual al montar el componente
        
    },
    methods:{
        async logout(){
           
                await singOut(auth);// ciera la sesion
                this.$router.push('/');  //regirigir al regristro 
            
            
        },
    }

}
</script>

<style>

</style>