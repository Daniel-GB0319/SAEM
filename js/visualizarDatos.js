import { getFirestore, collection, addDoc,query, where, getDocs, getDoc, doc } from "http://www.gstatic.com/firebasejs/9.6.10/firebase-firestore.js";
import {db} from './firebase.js';

const contenedor = document.querySelector("#contenedor");

window.onload = async () => {
  const boleta = localStorage.getItem('boleta') || '';
  const ref = doc(db, "Alumnos", boleta);
  const querySnapshot = await getDoc(ref);
  const data = querySnapshot.data();
  
  contenedor.innerHTML = `
    <p>Nombre: ${data.nombre + " " + data.aPaterno + " " + data.aMaterno}</p>
    <p>Fecha de nacimiento: ${data.diaNac+"/"+data.mesNac+"/"+data.anioNac}</p>
    <p>Nacionalidad: ${data.nacionalidad}</p>
    <p>CURP: ${data.curp}</p>
    <p>E-mail: ${data.correo}</p>
    <p>Teléfono: ${data.telefono}</p>
    <h2>Dirección</h2>
    <p>Calle: ${data.calle}</p>
    <p>Número exterior: ${data.numExt}</p>
    <p>Número interior: ${data?.numInt || 'N/A'}</p>
    <p>Colonia: ${data.colonia}</p>
    <p>Delegacion o Municipio: ${data.delegacion}</p>
    <p>Estado: ${data.estado}</p>
  `;
}