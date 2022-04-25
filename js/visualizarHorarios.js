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
        //console.log(materia.data())

        var profesor = await getProfesor(materia.data().titular)
        console.log(profesor.data())

        addMateria(materia, profesor)
    }
})

function addMateria(materia, profesor) {
    let tabla = document.getElementById('tablaHorario');
    let cuerpoTabla = document.createElement('tbody');
    const datos = materia.data()
    const prof = profesor.data()

        let fila = document.createElement('tr');

        let td = document.createElement('td');
        td.innerText = datos.grupo;
        fila.appendChild(td);

        td = document.createElement('td');
        td.innerText = datos.nombre;
        fila.appendChild(td);

        td = document.createElement('td');
        td.innerText = prof.aPaterno + " " + prof.aMaterno + " " + prof.nombre;
        fila.appendChild(td);

        td = document.createElement('td');
        td.innerText = datos.edificio;
        fila.appendChild(td);

        td = document.createElement('td');
        td.innerText = datos.hLunes;
        fila.appendChild(td);

        td = document.createElement('td');
        td.innerText = datos.hMartes;
        fila.appendChild(td);

        td = document.createElement('td');
        td.innerText = datos.hMiercoles;
        fila.appendChild(td);

        td = document.createElement('td');
        td.innerText = datos.hJueves;
        fila.appendChild(td);

        td = document.createElement('td');
        td.innerText = datos.hViernes;
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