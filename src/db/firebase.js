
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDnQO_qEvyX0TQ5LgEvww99hJPK06KDwTI",
  authDomain: "fir-auth-78662.firebaseapp.com",
  projectId: "fir-auth-78662",
  storageBucket: "fir-auth-78662.firebasestorage.app",
  messagingSenderId: "895743056128",
  appId: "1:895743056128:web:8fae68a50a3f64c8c1bbe5"
};


const app = initializeApp(firebaseConfig);

//esto es lo que ya hacemos nosotros 
const auth= getAuth(app)  //aqui es donde se hace la conexion , conexion con firebase 
export { auth }