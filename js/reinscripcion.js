import {db} from './firebase.js';
//import {jsPDF} from 'https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js'

import { getFirestore, collection, addDoc,query, where, getDocs, getDoc, doc } from "http://www.gstatic.com/firebasejs/9.6.10/firebase-firestore.js"


const boleta =localStorage.getItem('boleta')
//este solo es una prueba para ver los creditos
let creditos = 18
console.log(boleta)

const buscar_formulario = document.getElementById('form_buscar');
console.log(buscar_formulario)

buscar_formulario.addEventListener('submit', (e)=>{
    e.preventDefault();
    const turno = buscar_formulario['turno'].value
    const carrera = buscar_formulario['carrera'].value
    const grupo = buscar_formulario['grupo'].value
    const materia =  buscar_formulario['materia'].value
    console.log(turno,carrera,grupo,materia)
    buscar_materias(turno, carrera, grupo, materia)
    
})

export const buscar_materias = async (turno, carrera, grupo, materia) => {
    
    if (carrera == 'ISC'){
        carrera = 'Ingenieria en Sistemas Computacionales'
    }else if (carrera == 'LCD'){
        carrera = 'Licenciatura en Ciencia de Datos'
    }else{
        carrera = 'Ingenieria en Inteligencia Artificial'
    }

    
    const q = query(collection(db, "Materias"), where("nombre", "==", materia));
    const q1 = query(collection(db, "Materias"), where("grupo", "==", grupo));
    const q2 = query(collection(db, "Materias"), where("turno", "==", turno), where("carrera", "==", carrera)); 
    //const q3 = query(collection(db, "Materias"), where("turno", "==", turno), where("carrera", "==", carrera));
    const q3 = query(collection(db, "Materias"), where("nombre", "==", materia), where("grupo", "==", grupo), where("carrera", "==", carrera));

    let arreglo = []
    let arreglo1 = []
    let arreglo2 = []
    //let arreglo3 = []

    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
    // doc.data() is never undefined for query doc snapshots
    arreglo.push(doc.id)

    });

    const querySnapshot1 = await getDocs(q1);
    querySnapshot1.forEach((doc) => {
    // doc.data() is never undefined for query doc snapshots
    arreglo1.push(doc.id)

    });
    //filtrado por turno y cual es la carrera
    const querySnapshot2 = await getDocs(q2);
    querySnapshot2.forEach((doc) => {
    // doc.data() is never undefined for query doc snapshots
    arreglo2.push(doc.id)

    });

    let elemento = document.getElementById('tabla-busqueda');
    console.log(elemento)
    let contenido = ''
    contenido += `
            <table class="table table-primary table-striped" id="tabla-busqueda">
            <tbody>
            <tr class="table-active">
                <th scope="row">Grupo</th>
                <th scope="row">Materia</th>
                <th scope="row">Profesor</th>
                <th scope="row">Lunes</th>
                <th scope="row">Martes</th>
                <th scope="row">Mi&eacute;rcoles</th>
                <th scope="row">Jueves</th>
                <th scope="row" colspan="2">Viernes</th>
            </tr>`

    // entra dependiendo de que datos estan vacios en el formulario mandado
    if(grupo ==='' && materia){
        let intersection = arreglo.filter(v => arreglo2.includes(v))
        //console.log(intersection)

        const consulta_materia = query(collection(db, "Materias"), where("__name__", "in", intersection));
        const querySnapshot3 = await getDocs(consulta_materia);
        querySnapshot3.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        console.log(doc.id, '=>', doc.data())
        contenido+=` <tr>
            <td>${doc.data().grupo}</td>
            <td>${doc.data().nombre}</td>
            <td>${doc.data().titular}</td>`
            if(doc.data().hLunes){
                contenido += `<td>${doc.data().hLunes}</td>`
            }else{
                contenido += `<td></td>`
            }

            if(doc.data().hMartes){
                contenido += `<td>${doc.data().hMartes}</td>`
            }else{
                contenido += `<td></td>`
            }

            if(doc.data().hMiercoles){
                contenido += `<td>${doc.data().hMiercoles}</td>`
            }else{
                contenido += `<td></td>`
            }

            if(doc.data().hJueves){
                contenido += `<td>${doc.data().hJueves}</td>`
            }else{
                contenido += `<td></td>`
            }

            if(doc.data().hViernes){
                contenido += `<td>${doc.data().hViernes}</td>`
            }else{
                contenido += `<td></td>`
            }
           
           contenido+=` <td class="d-flex justify-content-center"><button class="btn btn-primary btn-sm d-flex btn-id" data-id="${doc.id}">Inscribir</button></td>
            </tr>`
        });

        contenido+=`</table>`

        elemento.innerHTML = contenido
        const btn_id = elemento.querySelectorAll('.btn-id')

        getInscribir(btn_id)


    } else if (materia === '' && grupo){
        let intersection1 = arreglo1.filter(v => arreglo2.includes(v))
        console.log(intersection1)
        

        const consulta_grupo = query(collection(db, "Materias"), where("__name__", "in", intersection1));
        const querySnapshot4 = await getDocs(consulta_grupo);
        querySnapshot4.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        console.log(doc.id, '=>', doc.data())
    
        contenido+=` <tr>
            <td>${doc.data().grupo}</td>
            <td>${doc.data().nombre}</td>
            <td>${doc.data().titular}</td>`
            if(doc.data().hLunes){
                contenido += `<td>${doc.data().hLunes}</td>`
            }else{
                contenido += `<td></td>`
            }

            if(doc.data().hMartes){
                contenido += `<td>${doc.data().hMartes}</td>`
            }else{
                contenido += `<td></td>`
            }

            if(doc.data().hMiercoles){
                contenido += `<td>${doc.data().hMiercoles}</td>`
            }else{
                contenido += `<td></td>`
            }

            if(doc.data().hJueves){
                contenido += `<td>${doc.data().hJueves}</td>`
            }else{
                contenido += `<td></td>`
            }

            if(doc.data().hViernes){
                contenido += `<td>${doc.data().hViernes}</td>`
            }else{
                contenido += `<td></td>`
            }
           
           contenido+=` <td class="d-flex justify-content-center"><button class="btn btn-primary btn-sm d-flex btn-id" data-id="${doc.id}">Inscribir</button></td>
            </tr>`
        });

        contenido+=`</table>`

        elemento.innerHTML = contenido
        const btn_id = elemento.querySelectorAll('.btn-id')

        getInscribir(btn_id)
    } else if(materia === '' && grupo === ''){
        const querySnapshot2 = await getDocs(q2);
        querySnapshot2.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        console.log(doc.id ,'=>', doc.data())
        contenido+=` <tr>
            <td>${doc.data().grupo}</td>
            <td>${doc.data().nombre}</td>
            <td>${doc.data().titular}</td>`
            if(doc.data().hLunes){
                contenido += `<td>${doc.data().hLunes}</td>`
            }else{
                contenido += `<td></td>`
            }

            if(doc.data().hMartes){
                contenido += `<td>${doc.data().hMartes}</td>`
            }else{
                contenido += `<td></td>`
            }

            if(doc.data().hMiercoles){
                contenido += `<td>${doc.data().hMiercoles}</td>`
            }else{
                contenido += `<td></td>`
            }

            if(doc.data().hJueves){
                contenido += `<td>${doc.data().hJueves}</td>`
            }else{
                contenido += `<td></td>`
            }

            if(doc.data().hViernes){
                contenido += `<td>${doc.data().hViernes}</td>`
            }else{
                contenido += `<td></td>`
            }
           
           contenido+=` <td class="d-flex justify-content-center"><button class="btn btn-primary btn-sm d-flex btn-id" data-id="${doc.id}">Inscribir</button></td>
            </tr>`
        });

        contenido+=`</table>`

        elemento.innerHTML = contenido
        const btn_id = elemento.querySelectorAll('.btn-id')

        getInscribir(btn_id)
    }else {
        const querySnapshot3 = await getDocs(q3);
        querySnapshot3.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        console.log(doc.id,'=>',doc.data())
        contenido+=` <tr>
            <td>${doc.data().grupo}</td>
            <td>${doc.data().nombre}</td>
            <td>${doc.data().titular}</td>`
            if(doc.data().hLunes){
                contenido += `<td>${doc.data().hLunes}</td>`
            }else{
                contenido += `<td></td>`
            }

            if(doc.data().hMartes){
                contenido += `<td>${doc.data().hMartes}</td>`
            }else{
                contenido += `<td></td>`
            }

            if(doc.data().hMiercoles){
                contenido += `<td>${doc.data().hMiercoles}</td>`
            }else{
                contenido += `<td></td>`
            }

            if(doc.data().hJueves){
                contenido += `<td>${doc.data().hJueves}</td>`
            }else{
                contenido += `<td></td>`
            }

            if(doc.data().hViernes){
                contenido += `<td>${doc.data().hViernes}</td>`
            }else{
                contenido += `<td></td>`
            }
           
           contenido+=` <td class="d-flex justify-content-center"><button class="btn btn-primary btn-sm d-flex btn-id" data-id="${doc.id}">Inscribir</button></td>
            </tr>`
        });

        contenido+=`</table>`

        elemento.innerHTML = contenido
        const btn_id = elemento.querySelectorAll('.btn-id')

        getInscribir(btn_id)
    }



    //console.log(arreglo,arreglo1,arreglo2)

   

    // ya que lo tenemos filtrado podemos proceder a buscar



    
}

export const getMaterias = () => getDocs(collection(db,'Materias'))
//cuando se carga la pagina muestra todas las materias que tenemos en la base de datos
window.addEventListener("DOMContentLoaded", async ()=>{
    
    let elemento = document.getElementById('tabla-busqueda');
    console.log(elemento)
    let contenido = ''
    contenido += `
            <table class="table table-primary table-striped" id="tabla-busqueda">
            <tbody>
            <tr class="table-active">
                <th scope="row">Grupo</th>
                <th scope="row">Materia</th>
                <th scope="row">Profesor</th>
                <th scope="row">Lunes</th>
                <th scope="row">Martes</th>
                <th scope="row">Mi&eacute;rcoles</th>
                <th scope="row">Jueves</th>
                <th scope="row" colspan="2">Viernes</th>
            </tr>`
    const querySnapshot99 = await getMaterias()
    querySnapshot99.forEach(doc =>{
        contenido+=` <tr>
            <td>${doc.data().grupo}</td>
            <td>${doc.data().nombre}</td>
            <td>${doc.data().titular}</td>`
            if(doc.data().hLunes){
                contenido += `<td>${doc.data().hLunes}</td>`
            }else{
                contenido += `<td></td>`
            }

            if(doc.data().hMartes){
                contenido += `<td>${doc.data().hMartes}</td>`
            }else{
                contenido += `<td></td>`
            }

            if(doc.data().hMiercoles){
                contenido += `<td>${doc.data().hMiercoles}</td>`
            }else{
                contenido += `<td></td>`
            }

            if(doc.data().hJueves){
                contenido += `<td>${doc.data().hJueves}</td>`
            }else{
                contenido += `<td></td>`
            }

            if(doc.data().hViernes){
                contenido += `<td>${doc.data().hViernes}</td>`
            }else{
                contenido += `<td></td>`
            }
           
           contenido+=` <td class="d-flex justify-content-center"><button class="btn btn-primary btn-sm d-flex btn-id" data-id="${doc.id}">Inscribir</button></td>
            </tr>`
        });

        contenido+=`</table>`

        elemento.innerHTML = contenido

        const btn_id = elemento.querySelectorAll('.btn-id')

        getInscribir(btn_id)


})

//-------------horario actual funcion para inscribir las materias que requiera
//sera un dic que contenda el id de materia y creditos y con esto podemos ir restando o sumando
let diccionario_creditos = new Object();
let cuenta = 0
let cuenta_centinela=0
//cuando de click obtendremos el campo para ponerlo en la tabla de abajo

let elemento = document.getElementById('inscripcion-tabla');
console.log(elemento)
   
let contenido1 = `<tbody>
    <tr class="table-active">
        <th scope="row">Grupo</th>
        <th scope="row">Materia</th>
        <th scope="row">Profesor</th>
        <th scope="row">Lunes</th>
        <th scope="row">Martes</th>
        <th scope="row">Mi&eacute;rcoles</th>
        <th scope="row">Jueves</th>
        <th scope="row" colspan="2">Viernes</th>
    </tr>`



const getInscribir = (btn_id) =>{
    
    btn_id.forEach( btn =>{ 
        btn.addEventListener('click', async ({target:{dataset}}) =>{
            
            
        //console.log(dataset.id)
        const consulta_uno = query(collection(db, "Materias"), where("__name__", "==", dataset.id));
        const querySnapshot999 = await getDocs(consulta_uno);
        let contenido = `` 
        querySnapshot999.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots
        cuenta_centinela += doc.data().creditos
        if(cuenta_centinela > creditos){
                alert('no tienes suficientes creditos: ' + cuenta + " te faltan " +(creditos-cuenta)+" para inscribir esta materia")
                cuenta_centinela -= doc.data().creditos
        }else{
            
            console.log(doc.id, '=>', doc.data())
            contenido+=`<tr id="${doc.id}">
            <td>${doc.data().grupo}</td>
            <td>${doc.data().nombre}</td>
            <td>${doc.data().titular}</td>`
            if(doc.data().hLunes){
                contenido += `<td>${doc.data().hLunes}</td>`
            }else{
                contenido += `<td></td>`
            }

            if(doc.data().hMartes){
                contenido += `<td>${doc.data().hMartes}</td>`
            }else{
                contenido += `<td></td>`
            }

            if(doc.data().hMiercoles){
                contenido += `<td>${doc.data().hMiercoles}</td>`
            }else{
                contenido += `<td></td>`
            }

            if(doc.data().hJueves){
                contenido += `<td>${doc.data().hJueves}</td>`
            }else{
                contenido += `<td></td>`
            }

            if(doc.data().hViernes){
                contenido += `<td>${doc.data().hViernes}</td>`
            }else{
                contenido += `<td></td>`
            }
            
            contenido += `<td><button class="btn btn-primary btn-sm d-flex btn-id" data-id="${doc.id}">borrar</button></td>`
            contenido+=`</tr>`
            
            diccionario_creditos[doc.id] = doc.data().creditos;
            console.log(diccionario_creditos)
            

           
            //verificamos en el contenido1 si el patron de la fila ya se encuentra si es asi lo excluye 
            if(contenido1.search(contenido) != -1){
                alert("Materia ya inscrita")
            }else{
                cuenta += doc.data().creditos
                alert('Creditos disponibles: '+(creditos-cuenta))
                contenido1+=contenido
                console.log(cuenta)
            }
        }
            });

            
            
            contenido.replace(/ /g, "")
            elemento.innerHTML = contenido1
            console.log(elemento)
            const btn_id = elemento.querySelectorAll('.btn-id')
            //console.log(btn_id)
            
            borrar_seleccion(btn_id)
    })    
})
    
    
}


//debemos borrar el contenido que selecciono el usuario en caso de ser necesario
//contenido es una variable golbal donde pintamos la tabla para el horario que desea el usuuario, cuando le damos eliminar lo reemplazamos
//en el contenido
const borrar_seleccion = (btn_id) =>{
    btn_id.forEach( btn =>{ 
        btn.addEventListener('click', ({target:{dataset}}) =>{
            var opcion = confirm("¿Estas seguro de elimiar la materia?");
            if (opcion == true) {
                
                //le regresa la cuenta para que cuando se borre subo el puntaje de creditos
                let regresar_cuenta = diccionario_creditos[dataset.id]
                cuenta-=regresar_cuenta
                cuenta_centinela-=regresar_cuenta
                delete diccionario_creditos[dataset.id]

                console.log("Borramos una materia regresa creditos",diccionario_creditos)
                
                const fila_id = document.getElementById(dataset.id)
                fila_id.remove();
                let texto_borrar =`<tr id="${dataset.id}">`
                texto_borrar += fila_id.innerHTML;
                texto_borrar+=`</tr>`
                texto_borrar.replace(/ /g, "")
                console.log(texto_borrar)
                
                if (contenido1.search(texto_borrar) != -1) {
                    console.log('lo contiene');
                    contenido1 = contenido1.replace(texto_borrar, "")
                    console.log(contenido1)
                  }else{
                    console.log("que no esta dice")
                  }
                
                            
            }

        })
    })

    

}

let finalizar_boton = document.getElementById("finalizar"); // Encuentra el elemento "p" en el sitio
finalizar_boton.onclick = finalizar_horario;

async function finalizar_horario () {
    
    const confirmar = confirm('¿Estas Seguro de continuar?')
    if(confirmar == true){
        const inscribir = document.getElementById("inscripcion-tabla")
        let id_materia_inscribir =  []
        let nodo = inscribir.querySelectorAll("tr")
        if(nodo.length > 1){
        for(let i = 0;nodo.length > i; i++){
            id_materia_inscribir.push(nodo[i].id)
            console.log(nodo[i].id)
        }
        //borra el primer elemento ya que es el header del table de horario actual
        id_materia_inscribir.splice(0,1)
        console.log(id_materia_inscribir)
        // En esta parte llamamos a la base de datos para poder inscribir materias por el id y nombre del alumno
        const registros_materias_actual = query(collection(db, "Materias"), where("__name__", "in", id_materia_inscribir));
        const querySnapshot_actual = await getDocs(registros_materias_actual);
        querySnapshot_actual.forEach((doc) => {
            console.log(doc.id,"=>",doc.data())
        });
        //solo falta poner en una colección las materias que tenemos del semestre actual
        
        await saveInscripcion(boleta, id_materia_inscribir)
       


        // 
            alert('Proceso de inscripción finalizado')
            //NOTA: Linea de abajo nos regresa al index como de que si funciono todo
            window.location.href='./index.html'
        }else{
            alert("No tiene materias seleccionadas")
        }
        
    }
}

//guarda en la base de datos la boleta y el id de las materias cuando el visualizar horario solo debe
//consultar collecction inscripcionActual con el cual obtiene que te tenga boleta y arreglo de horario
// y con ese arreglo de los id de las materias puede traerlo con un query donde where id_materia "in" "arreglo_materia"
const saveInscripcion = async (boleta, materias_id)=>{
    await addDoc(collection(db,'inscripcionActual'), {boleta, materias_id})
}




