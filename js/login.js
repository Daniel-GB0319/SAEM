'use strict'

const url = "https://saem-back.herokuapp.com/api/auth/signin";

fetch(url)
    .then(response => response.json())
    .then(function (data){
        alert("Bienvenido a SAEM");
    })
    .catch(function (error){
        alert("No se puede acceder");
    })