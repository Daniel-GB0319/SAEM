'use strict'

const url = "https://saem-back.herokuapp.com/api/auth/signin";

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