<template>
    <div>
      <h1>INICIA SESION </h1>
      <form @submit.prevent="login">
         
          <input type="email" placeholder="email" required v-model="email">
          <input type="password" required placeholder="introduce una contraseña" v-model="password">
          <button type="submit">Iniciar Sesion</button>
          <p>No tienes cuena <router-link to="/">Registrase</router-link></p>
      </form>
    </div>
  </template>
  
  <script>
  import {auth} from '@/db/firebase'
  import {signInWithEmailAndPassword} from 'firebase/auth';
  export default {
      name:'LoginView',
      data(){
          return{
             
              email:'',
              password:''
          }
      },
      methods:{
        async login(){
            try {
                await signInWithEmailAndPassword(auth, this.email, this.password)
                this.$router.push('/perfil')
            } catch (error) {
                alert('Error al iniciar sesión')
            }
        }
    }
  
  }
  </script>
  
  <style>
  
  </style>