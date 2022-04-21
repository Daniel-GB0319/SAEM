'use strict'

const url = "https://saem-back.herokuapp.com/api/auth/signin";

function login(){
    fetch(url, {
        method: 'POST',
        headers: {
            'Contet-Type': 'application/json'
        },
        body: JSON.stringify({
            id: (document.querySelector("#userName")).value,
            contrasena: (document.querySelector("#password")).value
        })
    })
    .then((response) => {
        alert("Bienvenido a SAEM!");
    })
        .catch((error) => {
            alert("algo no salió bien");
        })
}
