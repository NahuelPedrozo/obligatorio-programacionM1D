/*
vARIABLES GLOBALES, CONSTANTES GLOBALES 
*/

// Opcion A - Arrays Coordinados
let listaDeUsuarios = ["paseador", "pedro@pedro.pedro", "jose@pedro.pedro"];
let passwordsDeUsuarios = ["perros", "...1234...", "soyElJose"];

// Opcion B
let listaDePaseadores = new Array("paseador");

/*
FUNCIONES PARA EL INICIO
*/
iniciarAplicacion()


/*
EVENTOS 
*/
document.querySelector("#btnLogin").addEventListener("click", Login);
document.querySelector("#btnlogout").addEventListener("click", logout);

function Login(){
    //Limpia ERRORES
document.querySelector("#pErroresLogin").innerHTML = "";



    let usuarioIngresado = document.querySelector("#txtLoginUsuario").value;
    let passIngresado = document.querySelector("#txtLoginPassword").value;

    if (elUsuarioEsCorrecto(usuarioIngresado, passIngresado)){
        console.log("puede loguearse ")
        document.querySelector("#txtLoginUsuario").value = "";

        //ocultar un div
document.querySelector("#divLogin").style.display = "none"; 

//mostrar div
document.querySelector("#divPaginaUsuario").style.display = "block";
/*
Cuidado: Algunos van a verse bien con block y otros con flex
*/
loginExitoso(usuarioIngresado);
    }else{
        document.querySelector("#pErroresLogin").innerHTML = "Usuario o contraseña incorrectos";
    }
    document.querySelector("#txtLoginPassword").value = "";
}


function logout(){
    document.querySelector("#txtLoginPassword").value = "";
     document.querySelector("#txtLoginUsuario").value = "";
     document.querySelector("#pErroresLogin").innerHTML = "";
     document.querySelector("#divPaginaUsuario").style.display = "none";
     document.querySelector("#divLogin").style.display = "block";


}


function elUsuarioEsCorrecto (pUsuario, pPass){
// Bandera va a cambiar a TRUE cuando encuentre el usuario (si lo encuentra) 
let usuarioEncontrado = false; 

// indice para recorrer
let i = 0;
while(!usuarioEncontrado && i < listaDeUsuarios.length){
    if(listaDeUsuarios[i] === pUsuario){
        usuarioEncontrado = true;
    }else{
        i++;
    }

}
if(usuarioEncontrado){
    if(passwordsDeUsuarios[i] === pPass){
return true;
    }
}
return false;
}

function esPaseador(pNombre){
// bandera para saber paseador
let usuarioEsPaseador = false;

let i = 0;

while(!usuarioEsPaseador && i < listaDePaseadores.length){
    if(listaDePaseadores[i] === pNombre){
        usuarioEsPaseador = true;
    }
    i++;
}
return usuarioEsPaseador;
}

function iniciarAplicacion(){
    document.querySelector("#divPaginaUsuario").style.display = "none";
document.querySelector("#divPaginaPaseador").style.display = "none";
}

function loginExitoso(pNombre){
    if(esPaseador(pNombre)){

    document.querySelector("#divPaginaUsuario").style.display = "block";

}else{
document.querySelector("#divPaginaPaseador").style.display = "block";
}
}