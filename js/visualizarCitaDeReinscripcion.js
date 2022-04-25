import {db} from './firebase.js';
import {getFirestore, collection, addDoc, query, where, getDocs, getDoc, doc} from "http://www.gstatic.com/firebasejs/9.6.10/firebase-firestore.js"

window.addEventListener('DOMContentLoaded', async () => {

    const numBoleta = localStorage.getItem("boleta");

    //Obtiene el promedio
    const coleccionKardex = await getDocs(collection(db, "Kardex"));
    const kardex = getKardex(numBoleta, coleccionKardex);
    const promedio = kardex.calificacion;

    //Obtiene el número de materias reprobadas
    const periodos = [kardex.periodos];
    for(var i = 0; i < kardex.periodos.length; i++) {
        let periodo = await getInscripcion(kardex.periodos[i]);
        periodos[i] = periodo.data();
    }
    const coleccionEts = await getDocs(collection(db, "ets"));
    const ets = getEts(numBoleta, coleccionEts);
    const cantMatReprobadas = numMateriasReprobadas(periodos, ets);

    //Obtiene la cita de reinscripción
    const cita = getCita(periodos);

    //Genera la tabla
    addFila(promedio, cantMatReprobadas, cita);
})

//Obtiene el kárdex del alumnno
function getKardex(numBoleta, coleccionKardex) {
    let kardex;
    coleccionKardex.forEach(doc => {
        const datos = doc.data();
        if(datos.boleta == numBoleta)
            kardex = datos;
    });
    return kardex;
}

//Obtiene una inscripción de la colección, de acuerdo al ID 
const getInscripcion = (id) => getDoc(doc(db,"Inscripciones", id))

//Obtiene los ETS del alumno
function getEts(numBoleta, coleccionEts) {
    const ets = [];
    coleccionEts.forEach(doc => {
        const datos = doc.data();
        if(datos.boleta == numBoleta)
            ets.push(datos);
    });
    return ets;
}

//Regresa el número de materias reprobadas considerando que se cumpla todo lo siguiente:
//ordinario: calificación < 6
//extra : calificación < 6 o "NP"
//ets : cuando no haya hecho el ets de la materia que no pasó en ordinario ni extra
//o haya reprobado el ets
function numMateriasReprobadas(periodos, ets) {
    var cantMatReprobadas = 0;
    periodos.forEach(periodo => {
        for(var i = 0; i < periodo.ordinario.length; i++)
            if(periodo.ordinario[i] < 6 
                && extraReprobado(periodo.extraordinario[i])
                && etsReprobado(periodo.materias[i], ets))
                    cantMatReprobadas++;
    });
    return cantMatReprobadas;
}

//Regresa true si : la calificación del extra es < 6 o "NP"
function extraReprobado(extraordinario) {
    let reprobado = false;
    if(extraordinario < 6 || extraordinario == "NP")
        reprobado = true;
    return reprobado;
}

//Regresa true si:
//no ha hecho el ets de la materia que no pasó en ordinario ni extra 
//(no tenga registro de la materia reprobada en la colección "ets")
//o haya reprobado el ets
function etsReprobado(idMatReprobada, ets) {
    let reprobado = true;
    ets.forEach(e => {
        for(var i = 0; i < e.materias.length; i++)
            if(e.materias[i] == idMatReprobada)
                if(e.calificaciones[i] >= 6)
                    reprobado = false;
    });
    return reprobado;
}

//Regresa la cita del documento cuyo campo "citaValida" sea true
//este campo lo agregué para diferenciar las reinscripciones pasadas de las actuales
function getCita(periodos) {
    let cita;
   periodos.forEach(periodo => {
        if(periodo.citaValida)
            cita = periodo.cita;
    });
    return cita;
}

//Regresa una fecha con el sigueinte formato: DD/MM/AAAA hh:mm:ss
function getFecha(date) {

    let día = date.getDate();
    let mes = date.getMonth() + 1; //Se suma 1 porque la función regresa un valor entre 0 y 11
    const año = date.getFullYear();
    let hora = date.getHours();
    let minutos = date.getMinutes();
    let segundos = date.getSeconds();

    //En caso de que el valor solo tenga una cifra
    if(día <= 9)
        día = "0" + día;
    
    if(mes <= 9)
        mes = "0" + mes;

    if(hora <= 9)
        hora = "0" + hora;
    
    if(minutos <= 9)
        minutos = "0" + minutos;
    
    if(segundos <= 9)
        segundos = "0" + segundos;

    return día + "/" + mes + "/" + año + " " + hora + ":" + minutos + ":" + segundos;
}

Date.prototype.sumarUnaHora = function(){
    this.setHours(this.getHours() + 1);
};

//Añade a la tabla de la cita de reinscripción los siguientes datos:
//promedio, número de materias reprobadas, fecha de inscripción y fecha de caducidad
function addFila(promedio, cantMatReprobadas, cita) {
    let tabla = document.getElementById("tablaCitaReinscripcion");
    let cuerpoTabla = document.createElement("tbody");

    let date = cita.toDate();

    const fechaInscripcion = getFecha(date); 

    date.sumarUnaHora();//Se incrementa una hora a la cita para obtener la fecha de caducidad

    const fechaCaducidad = getFecha(date);

    let fila = document.createElement("tr");

    let td = document.createElement("td");
    td.innerText = promedio;
    fila.appendChild(td);

    td = document.createElement("td");
    td.innerText = cantMatReprobadas;
    fila.appendChild(td);

    td = document.createElement("td");
    td.innerText = fechaInscripcion;
    fila.appendChild(td);

    td = document.createElement("td");
    td.innerText = fechaCaducidad;
    fila.appendChild(td);
    
    cuerpoTabla.appendChild(fila);

    tabla.appendChild(cuerpoTabla);
}