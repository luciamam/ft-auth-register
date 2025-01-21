import { createRouter, createWebHistory } from 'vue-router'



import { auth } from '@/db/firebase'


const routes = [
  
  {
    path: '/',
    name: 'register',
    component: () => import('../views/RegisterView.vue'), // como directamente hemos importado el componente no nos hace falta realizar el import de arriba 
    
    
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/LoginView.vue'), // como directamente hemos importado el componente no nos hace falta realizar el import de arriba 
    
    
  },
  {
    path: '/perfil',
    name: 'perfil',
    component: () => import('../views/PerfilView.vue'),
    meta: {requiredAuth: true}
  }
]




const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach((to,from,next)=>{
  const currrentUser=auth.currentUser
  //tiene que ver que la que el usuario primero este registrado , mira la ruta que que este con eso , si no lo estas te lleva a la ruta register
  if(to.matched.some((record)=>record.meta.requiresAuth) && !currrentUser){
    next({name:"register"})
  }else{
    next();// si esta utentificado 
  }
})

export default router
