'use strict'

const url = "https://saem-back.herokuapp.com/api/auth/signin";

<<<<<<< HEAD
fetch(url, {
    method: 'POST',
    headers: {
        'Contet-Type': 'application/json'
    },
    body: JSON.stringify({
        id: document.querySelector("#userName"),
        contrasena: document.querySelector("#password")
    })
})
.then((response) => {
    alert("Bienvenido a SAEM!");
})
=======
fetch(url)
    .then(response => response.json())
    .then(function (data){
        alert("Bienvenido a SAEM");
    })
    .catch(function (error){
        alert("No se puede acceder");
    })
>>>>>>> main
