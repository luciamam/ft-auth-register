<template>
    <section>
        <h2>Registro de usuarios </h2>
        <form @submit.prevent="registerUser" >
            <div>
                <label >Correo Electronico</label>
                <input type="email" id="email" v-model="email" placeholder="Introduce tu correo" required>
            </div>
            <div>
                <label >Contraseña</label>
                <input type="password" id="email" v-model="password" placeholder="Introduce la contraseña" required>
            </div>
            <button type="submit">Registrarse</button>
            <div>
                <span>ya tienes cuenta </span>
                <router-link to="/login"> iniciar sesion </router-link>
            </div>

            
        </form>
    </section>
  
</template>

<script>
//aunque esta credencial no este en mis credenciales lo necesito para poder autentificarme 
import { auth } from '@/db/firebase'
// esto busca la cuenta de usuario de contraseña
import {createUserWithEmailAndPassword} from "firebase/auth"
 export default {
    name:'RegisterView',
    data(){
        return {
            email:'',
            password:''

        }
    },
    methods:{
        async registerUser(){
            
            try {
                await createUserWithEmailAndPassword(auth, this.email, this.password)
                //alert("estoy en el register")
                this.$router.push('/perfil')
            } catch (error) {
                console.error("Error al registrar usuario: ", error.message)
                alert(error.message)
            }
        }
    }
    

}
</script>

