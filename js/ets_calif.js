import {db} from './firebase.js';
import { getFirestore, collection, addDoc,query, where, getDocs, getDoc, doc } from "http://www.gstatic.com/firebasejs/9.6.10/firebase-firestore.js"

const yeet = document.getElementById('yang');

window.onload = async () => {
  const calif_ets = query(collection(db,"ets"), where("boleta","==","2020630148"));
  const querySnapshot = await getDocs(calif_ets);
  var calif_ets1 = "";
  var querySnapshot1 = "";
  var row = "";
  var val1 = "";
  querySnapshot.forEach((doc) => 
  {
    val1 = doc.data();
    // console.log(val1.materias.length);
    
  });
  for(let i = 0; i < val1.materias.length; i++)
    {
      row = val1.materias[i];
    //   console.log(row);
      const calif_ets1 = query(collection(db,"Materias"), where("ID","==",row));
      const querySnapshot1 = await getDocs(calif_ets1);
      var val2 = "";
      querySnapshot1.forEach((doc) => 
      {
        val2 = doc.data();
        // console.log(doc.id, " => ", doc.data());
      });
      var content = '';
      querySnapshot.forEach((doc) => 
      {
        // console.log(doc.id, " => ", doc.data());
        var val = doc.data();
        content += '<tr class="table-primary">';
        content += '<th scope="row">' + val2.grupo + '</th>';
        content += '<td>' + val2.nombre + '</td>';
        content += '<td>' + val.calificaciones[i]+ '</td>';
        content += '</tr>';
      });
      $('#wang').append(content);
    }
}

async function callbase(row)
{
  const calif_ets1 = query(collection(db,"Materias"), where("ID","==",row));
  const querySnapshot1 = await getDocs(calif_ets1);
  return querySnapshot1;
}