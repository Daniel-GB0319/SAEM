import {db} from './firebase.js';
import { getFirestore, collection, addDoc,query, where, getDocs, getDoc, doc } from "http://www.gstatic.com/firebasejs/9.6.10/firebase-firestore.js"

window.addEventListener('DOMContentLoaded', async () => {
    const querySnapshot2 = await getInscripcion()

    let Inscripcion

    const miBoleta = localStorage.getItem('boleta');

    querySnapshot2.forEach(doc => {
        const datos = doc.data()
        console.log(datos)

        if(datos.boleta == miBoleta) {
            Inscripcion = datos;
        }
    })

    for(var i = 0; i < Inscripcion.materias.length; i++) {
        var materia = await getMateria(Inscripcion.materias[i])
        var calif = [Inscripcion.parcial1[i],Inscripcion.parcial2[i],Inscripcion.parcial3[i],Inscripcion.ordinario[i],Inscripcion.extraordinario[i]]

        addMateria(materia,calif)
    }
})

// Genera una fila con las calificaciones de la materia
function addMateria(materia,calif) {
    let tabla = document.getElementById('tablaCalificaciones');
    let cuerpoTabla = document.createElement('tbody');
    const datos = materia.data()

        let fila = document.createElement('tr');

        // Ingresa el Grupo donde pertenece la materia
        let td = document.createElement('td');
        td.innerText = datos.grupo;
        fila.appendChild(td);

        // Ingresa el nombre de la materia
        td = document.createElement('td');
        td.innerText = datos.nombre;
        fila.appendChild(td);

        // Ingresa la calificacion del primer parcial
        td = document.createElement('td');
        td.innerText = calif[0];
        fila.appendChild(td);

        // Ingresa la calificacion del segundo parcial
        td = document.createElement('td');
        td.innerText = calif[1];
        fila.appendChild(td);

        // Ingresa la calificacion del tercer parcial
        td = document.createElement('td');
        td.innerText = calif[2];
        fila.appendChild(td);

        // Ingresa la calificacion total del periodo ordinario
        td = document.createElement('td');
        td.innerText = calif[3];
        fila.appendChild(td);

        // Ingresa la calificacion del extraordinario
        td = document.createElement('td');
        td.innerText = calif[4];
        fila.appendChild(td);
    
        cuerpoTabla.appendChild(fila);

        tabla.appendChild(cuerpoTabla);
}
// Obtener datos de la tabla Materias
export const getMateria = (id) => getDoc(doc(db,"Materias", id))

// Obtener datos de la tabla Profesor
export const getProfesor = (id) => getDoc(doc(db,"Profesores", id))

// Obtener datos de la tabla Alumnos
export const getAlumno = (id) => getDoc(doc(db,"Alumnos", id))

// Obtener datos de la tabla Inscripcion
export const getInscripcion = () => getDocs(collection(db,'Inscripciones'))