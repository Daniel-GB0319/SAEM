import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-app.js";
import { getFirestore, collection, addDoc,query, where, getDocs, getDoc, doc } from "http://www.gstatic.com/firebasejs/9.6.10/firebase-firestore.js"

const firebaseConfig = {
  apiKey: "AIzaSyAtVKkqcKrHrbIdc4RcZCPxYhvVQgMOTO8",
  authDomain: "saem-4e6f0.firebaseapp.com",
  projectId: "saem-4e6f0",
  storageBucket: "saem-4e6f0.appspot.com",
  messagingSenderId: "617912161729",
  appId: "1:617912161729:web:c82b6c52476f75b6ae4b40"
};
export const app = initializeApp(firebaseConfig)
export const db = getFirestore();



export const kardex = async () =>
{
  const materias_cursadas = query(collection(db,"Alumnos"), where("boleta","==",2020630148));
  const querySnapshot = await getDocs(q);
  if (querySnapshot.exists())
  {
    var content = '';
    querySnapshot.forEach(function(data)
    {
      var val = data.val();
      content += '<tr>';
      content += '<td>' + val.boleta + '</td>';
      content += '<td>' + val.nombre + '</td>';
      content += '<td>' + val.apellidoPaterno + '</td>';
      content += '<td>' + val.apellidoMaterno + '</td>';
      content += '<td>' + val.numeroContacto + '</td>';
      content += '</tr>';
    });
    $('#wang').append(content);
  }
}



