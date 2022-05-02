import{getMaterias} from './firebase.js';
import { getFirestore, collection, addDoc,query, where, getDocs, getDoc, doc, setDoc, updateDoc} from "http://www.gstatic.com/firebasejs/9.6.10/firebase-firestore.js"
const db = getFirestore();
let cont = 0;
//Funciones para hacer consultas a la db 
//Obtenemos las claves de las materias
const clavesProfesores = await getMaterias();
let clavesP = new Array();
clavesProfesores.forEach(doc =>{
    clavesP.push(doc.data().titular);
});
//Obtenemos el nombre del profesor asociado a la materia
let nombresP = new Array()
for(cont = 0; cont < clavesP.length;cont++){
    const profRef = collection(db,"Profesores");
    const nombreP =  query(profRef, where("ID", "==", clavesP[cont]));
    const referencia = await getDocs(nombreP);
    referencia.forEach((doc)=>{
        nombresP.push(doc.data().aPaterno + " " + doc.data().aMaterno + " " + doc.data().nombre);
    });
}
cont = 0;
//alert(nombresP);

//Obtenemos las materias del alumno
let arrayMaterias = new Array();
const contenedor = document.getElementById('table');
const querySnapshot = await getMaterias();
let html = '';//Creamos el arreglo vacio para ordenarlo en pantalla
querySnapshot.forEach(doc =>{//Solo mostramos los documentos
    console.log(doc.data());//doc.data transforma el objeto a datos
    const materia = doc.data();
    arrayMaterias.push(materia.nombre);

    html += `
    <tr class = "table-primary">
    <th scope="row">${materia.grupo}</th>
    <td>${materia.nombre}</td>
    <td>${nombresP[cont]}</td>
    <td id="${materia.nombre}1">SIN EVALUAR</td>
    <td>
        <button type="button" class="btn btn-primary btn-lg btn-sm" id="${materia.nombre}" onclick ="actualizarProfesor('${nombresP[cont]}');" >EVALUARLO</button>
    </td>
    </tr>
    `
    //document.getElementById(nombresP[cont]).onclick = actualizarProfesor(nombresP[cont]);
    //actualizarProfesor(nombresP[cont]);
    cont+=1;
});
contenedor.innerHTML = html;
cont = 0;
//Hacemos las cosultas para obtener las preguntas por seccion en la db
//Seccion Conocimientos
let arrayPreguntas = new Array();
const table2 = document.getElementById("tabla-conocimientos");
const seccionPreguntas = doc(db,"Preguntas","Conocimientos");
//const preguntas = query(seccionPreguntas, where("ID","==","Conocimientos"));
//let longitud = 0;
const pregunta = await getDoc(seccionPreguntas);
if (pregunta.exists()){
    console.log("Datos del documento:",pregunta.data());
    //longitud = Object.keys(pregunta.data()).length - 1;//Object keys devuelve las claves del objeto
    arrayPreguntas = Object.values(pregunta.data());//Object value devuelve el valor en cada clave del array 
    var indice = arrayPreguntas.indexOf('Conocimientos');//Obtenemos el indice del id
    arrayPreguntas.splice(indice,1);//eliminamos el id para solo tener las preguntas
}else{
    console.log("No hay nada");
}
let content = '';
for(cont = 0; cont < arrayPreguntas.length; cont++){
    content += `
    <tr class="table-table-light">
        <th scope="row">${cont+1}. ${arrayPreguntas[cont]} </th>

        <fieldset class="form-group">
            <td>
                <div class="form-check">
                        <label class="form-check-label">
                            <input type="radio" class="form-check-input2" name="optionsRadios2-${cont+1}" id="optionsRadios1" value="option1">
                            Excelente
                        </label>
                </div>
            </td>

            <td>
                <div class="form-check">
                    <label class="form-check-label">
                        <input type="radio" class="form-check-input2" name="optionsRadios2-${cont+1}" id="optionsRadios2" value="option2">
                        Buena
                    </label>
                </div>
            </td>

            <td>
                <div class="form-check">
                    <label class="form-check-label">
                        <input type="radio" class="form-check-input2" name="optionsRadios2-${cont+1}" id="optionsRadios3" value="option3">
                        Mediana
                    </label>
                </div>
            </td>

            <td>
                <div class="form-check">
                    <label class="form-check-label">
                        <input type="radio" class="form-check-input2" name="optionsRadios2-${cont+1}" id="optionsRadios4" value="option4">
                        Mala
                    </label>
                </div>
            </td>

        </fieldset>
    </tr>
    ` 
};
table2.innerHTML = content;
//Seccion Desempeño
let arrayPreguntas1 = new Array();
const table1 = document.getElementById('tabla-desempeño');
const seccionPreguntas1 = doc(db,"Preguntas","Desempeño");
const pregunta1 = await getDoc(seccionPreguntas1);
if(pregunta1.exists()){
    console.log("Datos del documento Desempeño:",pregunta1.data());
    arrayPreguntas1 = Object.values(pregunta1.data());
    indice = arrayPreguntas1.indexOf('Desempenio');
    arrayPreguntas1.splice(indice,1);//Eliminamos el ID y solamente dejamos las preguntas
}else{
    console.log("No hay nada");
}
content = '';
for(cont = 0; cont < arrayPreguntas1.length; cont++){
    content += `
    <tr class="table-table-light">
        <th scope="row">${cont+1}. ${arrayPreguntas1[cont]} </th>

        <fieldset class="form-group">
            <td>
                <div class="form-check">
                        <label class="form-check-label">
                            <input type="radio" class="form-check-input1" name="optionsRadios1-${cont+1}" id="optionsRadios1" value="option1">
                            Excelente
                        </label>
                </div>
            </td>

            <td>
                <div class="form-check">
                    <label class="form-check-label">
                        <input type="radio" class="form-check-input1" name="optionsRadios1-${cont+1}" id="optionsRadios2" value="option2">
                        Buena
                    </label>
                </div>
            </td>

            <td>
                <div class="form-check">
                    <label class="form-check-label">
                        <input type="radio" class="form-check-input1" name="optionsRadios1-${cont+1}" id="optionsRadios3" value="option3">
                        Mediana
                    </label>
                </div>
            </td>

            <td>
                <div class="form-check">
                    <label class="form-check-label">
                        <input type="radio" class="form-check-input1" name="optionsRadios1-${cont+1}" id="optionsRadios4" value="option4">
                        Mala
                    </label>
                </div>
            </td>

        </fieldset>
    </tr>
    `
}
table1.innerHTML = content;
//Seccion Material Didactico
let arrayPreguntas3 = new Array();
const table3 = document.getElementById('tabla-material');
const seccionPreguntas3 = doc(db,"Preguntas","MaterialDidactico");
const pregunta3 = await getDoc(seccionPreguntas3);
if(pregunta3.exists()){
    console.log("Datos del documento material:",pregunta3.data());
    arrayPreguntas3 = Object.values(pregunta3.data());
    indice = arrayPreguntas3.indexOf('Material');
    arrayPreguntas3.splice(indice,1);
}else{
    console.log("No hay nada");
}
content = '';
for(cont = 0; cont < arrayPreguntas3.length; cont++){
    content += `
    <tr class="table-table-light">
        <th scope="row">${cont+1}. ${arrayPreguntas3[cont]} </th>

        <fieldset class="form-group">
            <td>
                <div class="form-check">
                        <label class="form-check-label">
                            <input type="radio" class="form-check-input3" name="optionsRadios3-${cont+1}" id="optionsRadios1" value="option1">
                            Excelente
                        </label>
                </div>
            </td>

            <td>
                <div class="form-check">
                    <label class="form-check-label">
                        <input type="radio" class="form-check-input3" name="optionsRadios3-${cont+1}" id="optionsRadios2" value="option2">
                        Buena
                    </label>
                </div>
            </td>

            <td>
                <div class="form-check">
                    <label class="form-check-label">
                        <input type="radio" class="form-check-input3" name="optionsRadios3-${cont+1}" id="optionsRadios3" value="option3">
                        Mediana
                    </label>
                </div>
            </td>

            <td>
                <div class="form-check">
                    <label class="form-check-label">
                        <input type="radio" class="form-check-input3" name="optionsRadios3-${cont+1}" id="optionsRadios4" value="option4">
                        Mala
                    </label>
                </div>
            </td>

        </fieldset>
    </tr>
    `
}
table3.innerHTML = content;
//Codigo para obtener el id de materia que se esta evaluando
var i = 0;
var idmateria = "";
var test = document.getElementsByClassName('btn btn-primary btn-lg btn-sm');//Obtenemos los elementos cuya clase sean los mismos para recuperar el id de materias
console.log(test.length);
for(i = 0; i< test.length; i++){
    test[i].addEventListener("click", function(){
        idmateria = this.id;
        console.log(idmateria);
    })
}
console.log(test);
//Funcionalidad de los botones para la evaluación
//funcion para guardar los radiobuttons de la seccion desempeño
const saveOptions = (opciones) => {
     //setDoc(doc(db,"Evaluaciones",localStorage.getItem("boleta"),'Desempeño','b3JStNugQJQCsmxSozgV'), opciones);
     console.log(opciones);
     addDoc(collection(db,'Evaluaciones',localStorage.getItem("boleta"),'Desempeño'), {opciones});
}
//funcion para guardar las opciones de la seccion conocimientos
const saveOptions2 = (opciones) => {
    addDoc(collection(db,'Evaluaciones',localStorage.getItem("boleta"),'Conocimientos'),{opciones});
} 
//funcion para guardar las opciones de la seccion material didactico
const saveOptions3 = (opciones) =>{
    addDoc(collection(db,'Evaluaciones',localStorage.getItem("boleta"),'Material'),{opciones});
}
//funcion para guardar los comentarios de un profesor
const saveComents =(coments) =>{
    addDoc(collection(db,'Evaluaciones',localStorage.getItem("boleta"),'Comentarios'),{coments});
}
//Para el de desempeño
let opcionesSelect = new Array();
let noPregunta = new Array();
let bandera1 =false;
const formulario1 = document.getElementById('formulario1');
formulario1.addEventListener('submit', (e) =>{
    //alert("ID MATERIA VALE" + idmateria);
    bandera1 = false;
    opcionesSelect = [];//limpiamos el arreglo
    noPregunta = [];//limpiamos el arreglo
    cont = 0;//reseteamos el contador
    //Codigo para obtener la respuesta y el # de pregunta asociada a la respuesta
    const respuestas = document.getElementsByClassName('form-check-input1');
    cont = 0;
    for(var i = 0; i<arrayPreguntas1.length * 4; i++){
        if(respuestas[i].checked == true){
            //alert("Hay una respuesta seleccionada " + respuestas[i].value);
            opcionesSelect.push(respuestas[i].value);
            noPregunta.push(cont+1);
            cont+=1;
            if(i % 4 == 0){//La respuesta es primera opcion
                i += 4;
            }else if (i % 4 == 1){//La respuesta es segunda opcion
                i += 3; 
            }else if(i % 4 == 2){//La respuesta es tercera opcion
                i += 2;
            }else{//La respuesta es cuarta opcion
                i += 1;
            }
        }else if(i % 4 == 3){//No se contesto la pregunta
            //alert("Cambiamos bandera a true");
            bandera1 = true;//si la bandera termina en true entonces no se respondieron todas las preguntas
            cont+=1;
        }
    }
    e.preventDefault();
    //alert("Las preguntas son:" + noPregunta);
    const opcion = opcionesSelect;
    //Creamos el objeto con las opciones
    const docData = {
        ID: "Desempeño",
        Materia: idmateria,
        Opciones: opcionesSelect,
        Pregunta: noPregunta,
        Bandera: bandera1,
        Evaluado: false
    }
    console.log(opcion);
    console.log(localStorage.getItem('boleta'));
    if(idmateria == ""){
        alert("Por favor seleccione un profesor a evaluar");
    }else{
        saveOptions(docData);
        console.log('submitted form1');//Probamos el boton del formulario
        alert("Se han guardado las respuestas en la seccion Desempeño de la materia " + idmateria);
    }
});
//SECCION CONOCIMIENTOS
let bandera2 = false;
const formulario2 = document.getElementById('formulario2');
formulario2.addEventListener('submit', (e) =>{
    bandera2 = false;
    opcionesSelect = [];//limpiamos el arreglo
    noPregunta = [];//limpiamos el arreglo
    cont = 0;//reseteamos el contador
    //Codigo para obtener la respuesta y el # de pregunta asociada a la respuesta
    const respuestas2 = document.getElementsByClassName('form-check-input2');
    e.preventDefault();
    for(var i = 0; i<arrayPreguntas.length * 4; i++){
        if(respuestas2[i].checked == true){
            opcionesSelect.push(respuestas2[i].value);//almacenamos el valor de la respuesta
            noPregunta.push(cont+1);
            cont +=1;
            if( i % 4 == 0){
                i += 4;
            }else if(i % 4 == 1){
                i += 3;
            }else if(i % 4 == 2){
                i += 2;
            }else if(i % 4 == 3){
                i += 1;
            }
        }else if(i % 4 == 3){
            bandera2 = true;//alzamos bandera
            cont +=1;//actualizamos pregunta
        }
    } 
    const opcion2 = opcionesSelect;
    //Creamos el objeto 
    const docData2 ={
        ID: "Conocimientos",
        Materia: idmateria,
        Opciones: opcionesSelect,
        Pregunta: noPregunta,
        Bandera: bandera2,
        Evaluado: false
    }
    if(idmateria == ""){
        alert("Por favor seleccione un profesor a evaluar");
    }else{
        saveOptions2(docData2);
        console.log('submitted form2')
        alert("Se han guardado las respuestas en la seccion Conocimientos de la materia " + idmateria);
    }
});
//SECCION MATERIAL DIDACTICO
let bandera3 = false;
const formulario3 = document.getElementById('formulario3');
formulario3.addEventListener('submit',(e) =>{
    bandera3 = false;
    opcionesSelect = [];//limpiamos el arreglo
    noPregunta = [];//limpiamos el arreglo
    cont = 0;//reseteamos el contador
    //Codigo para obtener la respuesta y el # de pregunta asociada a la respuesta
    const respuestas3 = document.getElementsByClassName('form-check-input3');
    e.preventDefault();
    for(var i = 0; i<arrayPreguntas3.length * 4; i++){
        if(respuestas3[i].checked == true){
            opcionesSelect.push(respuestas3[i].value);//almacenamos el valor de la respuesta
            noPregunta.push(cont+1);
            cont +=1;
            if( i % 4 == 0){
                i += 4;
            }else if(i % 4 == 1){
                i += 3;
            }else if(i % 4 == 2){
                i += 2;
            }else if(i % 4 == 3){
                i += 1;
            }
        }else if(i % 4 == 3){
            bandera3 = true;//alzamos bandera
            cont +=1;//actualizamos pregunta
        }
    } 
    const docData3 = {
        ID: "Material",
        Materia: idmateria,
        Opciones: opcionesSelect,
        Pregunta: noPregunta,
        Bandera: bandera3,
        Evaluado: false
    }
    if(idmateria == ""){
        alert("Por favor seleccione un profesor a evaluar");
    }else{
        saveOptions3(docData3);
        console.log('submitted form3')
        alert("Se han guardado las respuestas en la seccion Material Didactico de la materia " + idmateria);
    }

});
//SECCION COMENTARIOS
const formulario4 = document.getElementById('formulario4');
let comentarios = new Array();
formulario4.addEventListener('submit',(e) =>{
    comentarios = [];//limpiamos el arreglo de comentarios
    e.preventDefault();
    const comentario = document.getElementById('comentario');
    comentarios = comentario.value;
    const docData4 = {
        ID: 'Comentarios',
        Materia: idmateria,
        Comentarios: comentarios
    }
    if(idmateria == ""){
        alert("Por favor seleccione un profesor a evaluar");
    }else{
        saveComents(docData4);
        console.log('submitted form4')
        alert("Se han guardado los comentarios");
    }
});
//BOTON FINALIZAR EVALUACION
//Funcion para validad los campos de desempeño
var objetoMateria = new Array();
export const validar = async () =>{
    objetoMateria = [];//limpiamos arreglo
    //Funcion para obtener la bandera de Desempeño
    const q = query(collection(db,"Evaluaciones",localStorage.getItem("boleta"),'Desempeño'));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
        const variable = doc.data();
        //objeto = Object.keys(doc.data());
        if(variable.opciones.Materia == idmateria){
            console.log(variable);
            objetoMateria.push(variable.opciones.Bandera);
            console.log(objetoMateria);

        }else{
            console.log("No hay materias que evaluar");
        }
    });
    //Funcion para obtener la bandera de Conocimientos
    const q1 = query(collection(db,"Evaluaciones",localStorage.getItem("boleta"),'Conocimientos'));
    const querySnapshot1 = await getDocs(q1);
    querySnapshot1.forEach((doc) =>{
        const variable1 = doc.data();
        if(variable1.opciones.Materia == idmateria){
            objetoMateria.push(variable1.opciones.Bandera);
            console.log(objetoMateria);
        }else{
            console.log("No hay materias que evaluar");
        }
    });
    //Funcion para obtener la bandera de Material Didactico
    const q2 = query(collection(db,"Evaluaciones",localStorage.getItem("boleta"),'Material'));
    const querySnapshot2 = await getDocs(q2);
    querySnapshot2.forEach((doc) =>{
        const variable2 = doc.data();
        if(variable2.opciones.Materia == idmateria){
            objetoMateria.push(variable2.opciones.Bandera);
            console.log(objetoMateria);
        }else{
            console.log("No hay materias que evaluar");
        }
    });
}
//funcion de continuar
export const getDatap = () => getDocs(collection(db,'Evaluaciones',localStorage.getItem("boleta"),'Desempeño'));
async function continuar(){
    await validar();
    for(const propiedad in objetoMateria){
        console.log(`${propiedad}: ${objetoMateria[propiedad]}`);
    }
    //Verificamos que todas las secciones hayan sido contestadas
    console.log("LAS BANDERAS SON:",objetoMateria);
    if(objetoMateria[0] == false && objetoMateria[1] == false && objetoMateria[2] == false){
        var respuesta = confirm("¿Esta seguro que desea enviar las respuestas? Posteriormente no se permiten cambios");
        if(respuesta == true){
            const IDMateria =  await getDatap();
            IDMateria.forEach(doc =>{
            if(doc.data().opciones.Materia == idmateria){
                console.log(doc.data());
                ordenID.push(doc.data().opciones.Materia);
                ordenID.push(doc.id);
                console.log("EL ORDEN DE LAS MATERIAS ES:",ordenID);
            }
        });
        //Aqui continuamos con la actualizacion de los campos
        actualizar();
    }

    }else{
        ////NO VALIDAMOS
        if(idmateria == ""){
            alert("Por favor seleccione un profesor a evaluar");
        }else{
        var respuesta = confirm("¿Esta seguro que desea enviar las respuestas? Posteriormente no se permiten cambios");
        if(respuesta == true){
            const IDMateria = await getDatap();
            IDMateria.forEach(doc =>{
            if(doc.data().opciones.Materia == idmateria){
                console.log(doc.data());
                ordenID.push(doc.data().opciones.Materia);
                ordenID.push(doc.id);
                console.log("EL ORDEN DE LAS MATERIAS ES:",ordenID);
                }
            });
            actualizar();

        }

        //alert("Por favor conteste todas las secciones del formulario");
        console.log("Faltan secciones por contestar");}
    }

}
//Funcion cuando se hace click
const finalButton = document.getElementById('final-button');
finalButton.addEventListener('click',(e) => {
    
    e.preventDefault();
    continuar();
});
//Funcion para actualizar boton a modificar
//funcion para actualizar datos

var ordenID = new Array();//almacenamos los id de las materias
export const updateDat = (id, newFields) => updateDoc(doc(db,'Evaluaciones',localStorage.getItem("boleta"),'Desempeño',id), newFields);
//aqui va el codigo
var arrayTermino = new Array();
 function actualizar(){
    if(idmateria == ordenID[0] )
    console.log("LOS ARRAYS SON:",arrayId);
    updateDat(ordenID[1],{
        Evaluado: true,
    });
    arrayTermino.push(true);
    const nodo = document.getElementById(idmateria);
    const padre = nodo.parentNode;
    nodo.parentNode.removeChild(nodo)
    const nodoN1 = document.getElementById(`${idmateria}1`);
    let html = "";
    let html1 = "";
     html = `
     <p id="${idmateria}">NINGUNA</p>
    `
    padre.innerHTML = html;
    html1 += `
         <p>EVALUADO</p>
         `
         nodoN1.innerHTML = html1;
        
    //FUNCION PARA QUITAR EL FORMULARIO
    var finish = 0;
    console.log("LONGITUD DE MATERIAS",arrayMaterias.length);
    console.log("MATERIAS EVALUADAS",arrayTermino.length);
    if(arrayTermino.length == arrayMaterias.length){
        console.log("Entramos al if");
        for(var i = 0; i<arrayTermino.length; i++){
            if(arrayTermino[i] == false){
                finish = 1;
            }
        }
        if(finish == 0){
            const quit = document.getElementById('table-f')
            const quitButton = document.getElementById('final-button');
            console.log("TENEMOS TODAS LAS MATERIAS EVALUADAS",quit);

            quit.parentNode.removeChild(quit);
            quitButton.parentNode.removeChild(quitButton);
        }
    }
    
}
//funcion para enlistar los datos que tenemos en la db de las preguntas y obtener el id generado de cada documento, se carga al inicio de la pagina
var arrayId = new Array();
var np = new Array();
var nopcion = new Array();
var materiaActual;
var radios;
// var preguntatemp;
// var respuestatemp;
export const getData = () => getDocs(collection(db,'Evaluaciones',localStorage.getItem("boleta"),'Desempeño'));
//Para la seccion de desempeño, obtenemos los id de los documentos
const datos = await getData();
datos.forEach(doc =>{
      console.log("Los documentos en desempeño son:",doc.data());
      materiaActual = doc.data().opciones.Materia;
      if(doc.data().Evaluado == true){
          //Quitamos boton y marcamos como evaluado, tambien actualizamos el estado
          const nodo = document.getElementById(doc.data().opciones.Materia);
          const padre = nodo.parentNode;
          const nodoN = document.getElementById(`${doc.data().opciones.Materia}1`);
          console.log("EL ESTADO A MODIFICAR ES",nodoN);
          let html = "";
          let html1 = "";
          html = `
          <p id="${idmateria}">NINGUNA</p>
         `
         padre.innerHTML = html;
         html1 += `
         <p>EVALUADO</p>
         `
         nodoN.innerHTML = html1;
        }
    //  }else{
    //      console.log("La materia es:",materiaActual);
    //      //Cargamos las respuesta en caso de que las haya 
    //      np = doc.data().opciones.Pregunta;
    //      nopcion = doc.data().opciones.Opciones;
    //      console.log(np);
    //      console.log(nopcion);
    //      if(doc.data().opciones.Bandera == false){//Hay respuestas
    //     //Obtenemos las respuestas y numero de preguntas asociadas
    //         for(var i = 0; i < np.length; i++){
    //             //Colocamos en el documento las respuestas
    //             radios = document.getElementsByName(`optionsRadios1-${i+1}`);
    //             //Ya tenemos los radios asociados a la pantalla desempeño
    //             if(np[i] == i+1){//Accedemos a la pregunta no i 
    //                 if(nopcion == "option1")
    //                 radios[0].checked = true;
    //                 else if(nopcion == "option2")
    //                 radios[1].checked = true;
    //                 else if(nopcion == "option3")
    //                 radios[2].checked = true;
    //                 else
    //                 radios[3].checked = true;
    //             }
    //         }
         
    //      }
    //  }
    //  console.log(doc.data().opciones.Opciones[0]);
     arrayId.push(doc.id);
     //FUNCION PARA QUITAR EL FORMULARIO
    //  var finish;
    //  console.log("LONGITUD DE MATERIAS",arrayMaterias.length);
    //  console.log("MATERIAS EVALUADAS",arrayTermino.length);
    //  if(arrayTermino.length == arrayMaterias.length){
    //      for(var i = 0; i<arrayTermino.length; i++){
    //          if(arrayTermino[i] == false){
    //              finish = 1;
    //          }
    //      }
    //      if(finish == 0){
    //          const quit = document.getElementById('table-f')
    //          console.log("TENEMOS TODAS LAS MATERIAS EVALUADAS",quit);
    //          quit.parentNode.removeChild(quit);
    //      }

    //  }
});
console.log(arrayId);

//Para la seccion CONOCIMIENTOS
// np = "";
// nopcion = "";
// materiaActual = "";
// radios = "";
// export const getData1 = () => getDocs(collection(db, 'Evaluaciones', localStorage.getItem("boleta"),'Conocimientos'));
// const datos1 = await getData1();
// datos1.forEach(doc => {
//     console.log("Los documentos en Conocimientos son:",doc.data());
//      materiaActual = doc.data().opciones.Materia;
//     console.log("La materia es:",materiaActual);
//     //Cargamos las respuesta en caso de que las haya 
//     np = doc.data().opciones.Pregunta;
//     nopcion = doc.data().opciones.Opciones;
//     console.log(np);
//     console.log(nopcion);
//     if(doc.data().opciones.Bandera == false || doc.data().opciones.Bandera == true){//Hay respuestas
//         //Obtenemos las respuestas y numero de preguntas asociadas
//         for(var i = 0; i < np.length; i++){
//             //Colocamos en el documento las respuestas
//             radios = document.getElementsByName(`optionsRadios2-${i+1}`);
//             //console.log("Los nuevos radios son",radios);
//             //Ya tenemos los radios asociados a la pantalla desempeño
//             if(np[i] == i+1){//Accedemos a la pregunta no i 
//                 if(nopcion == "option1")
//                 radios[0].checked = true;
//                 else if(nopcion == "option2")
//                 radios[1].checked = true;
//                 else if(nopcion == "option3")
//                 radios[2].checked = true;
//                 else
//                 radios[3].checked = true;
//             }
//         } 
//     }
//      console.log(doc.data().opciones.Opciones[0]);
//      arrayId.push(doc.id);

// });

//console.log(querySnapshot); Mostramos los querysnapshot con su formato largo
//funciones para los botones
//document.getElementsByClassName('btn btn-primary btn-lg btn-sm').onclick = actualizarProfesor(nombresP);
