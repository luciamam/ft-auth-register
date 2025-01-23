<template>
    <section>
      <h1>Perfil</h1>
      <form @submit.prevent="saveProfile">
          <img :src="profile.image" :alt="`Foto de ${profile.fullName}`">
          <input type="text" v-model="profile.image" placeholder="Introcuce la url de tu imagen">
          <input type="text" v-model="profile.fullName" placeholder="Introcuce tu nombre completo" required>
          <input type="text" v-model="profile.profession" placeholder="¿En qué trabajas?" required>
          <input type="number" v-model="profile.age" placeholder="Dinos tu edad" required>
          <input type="text" v-model="profile.currentCity" placeholder="¿En qué ciudad vives?">
          <input type="text" v-model="profile.company" placeholder="¿Cual es tu empresa?">
          <textarea v-model="profile.bio" placeholder="Cuenta un poco sobre ti"></textarea>
          <h3>Motivaciones</h3>
          <div v-for="(motivation, index) in profile.motivations" :key="index">
              <input type="text" v-model="profile.motivations[index]" placeholder="añadir motivacion">
          </div>
          <button @click.prevent="addMotivation">Añadir motivación</button>
  
          <h3>Objetivos</h3>
          <div v-for="(goal, index) in profile.goals" :key="index">
              <input type="text" v-model="profile.goals[index]" placeholder="añadir objetivo">
          </div>
          <button @click.prevent="addGoal">Añadir objetivo</button>
  
          <h3>Preocupaciones</h3>
          <div v-for="(concern, index) in profile.concerns" :key="index">
              <input type="text" v-model="profile.concerns[index]" placeholder="añadir preocupacion">
          </div>
          <button @click.prevent="addConcern">Añadir preocupación</button>
  
          <button type="submit">Actualizar perfil</button>
      </form>
      <button @click="logout">Cerrar sesion</button>
    </section>
  </template>
  
  <script>
  import { auth, db } from "@/db/firebase"
  import { signOut } from 'firebase/auth'
  import { doc, getDoc, setDoc } from "firebase/firestore"
  export default {
      name:'PerfilView',
      data(){
          return{
              user: {
                  user: null
              },
              profile: {
                  fullName: "",
                  profession: "",
                  age: 0,
                  currentCity: "",
                  company: "",
                  bio: "",
                  image: "",
                  motivations: [],
                  goals: [],
                  concerns: []
              }
          }
      },
      methods:{
          async logout(){
              await signOut(auth)
              this.$router.push('/')
          },
          async fetchProfile(){
              if(!this.user) return
              try {
                  const docRef = doc(db, "users", this.user.uid)
                  const docSnap = await getDoc(docRef)
                  if(docSnap.exists()){
                      this.profile = {...docSnap.data()} 
                  }else{
                      console.warn("No se encontro el perfil")
                  }
              } catch (error) {
                  console.error("Error al obtener el perfil: ", error)
              }
          },
          async saveProfile(){
              if(!this.user) return
              try {
                  const docRef = doc(db, "users", this.user.uid)
                  await setDoc(docRef, this.profile)
                  alert ("Perfil guardado correctamente!😍")
              } catch (error) {
                 alert("Hubo un problema al guardar el perfil!🚨") 
              }
          },
          addMotivation(){
              this.profile.motivations.push("")
          },
          addGoal(){
              this.profile.goals.push("")
          },
          addConcern(){
              this.profile.concerns.push("")
          },
          handleAuthStateChange(){
              auth.onAuthStateChanged( (user) => {
                  this.user = user
                  if (user){
                      this.fetchProfile()
                  }
              })
          }
      },
      mounted(){
          this.user = auth.currentUser
          this.handleAuthStateChange()
      }
  
  }
  </script>
  
  <style>
  
  </style>