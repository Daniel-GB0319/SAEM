import {db} from './firebase.js';
import { getFirestore, collection, addDoc,query, where, getDocs, getDoc, doc } from "http://www.gstatic.com/firebasejs/9.6.10/firebase-firestore.js"


const login_formulario = document.getElementById('LoginForm');

login_formulario.addEventListener('submit', (e)=>{
    e.preventDefault();

    const boleta = login_formulario['userName']
    const contrasena = login_formulario['password']
    Login(boleta.value, contrasena.value)
})

export const Login = async (boleta, contrasena) => {
    const docRef = doc(db, "Alumnos", boleta);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
        if(docSnap.data().password == contrasena){
            localStorage.setItem('boleta', boleta);
            localStorage.setItem('nombre_completo', docSnap.data().nombre + ' ' + docSnap.data().aPaterno + ' ' + docSnap.data().aMaterno);
            localStorage.setItem('nombre', docSnap.data().nombre);
            window.location.href = "../index.html";
        } else {
            alert('Datos incorrectos')
            window.location.href = "../login.html";
        }
    } else {
        alert('Datos incorrectos')
        window.location.href = "../login.html"; 
    }
}