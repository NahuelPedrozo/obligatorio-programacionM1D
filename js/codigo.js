/*
vARIABLES GLOBALES, CONSTANTES GLOBALES 
*/

/* 
Genero un sistema para poder manejar todos mis datos.
*/

const SISTEMA = new Sistema("Mi app");
//EJECUTAMOS LA PRECARGA ENSEGUIDA DE CREAR EL SISTEMA
SISTEMA.precargarDatos();




/*
FUNCIONES PARA EL INICIO
*/
iniciarAplicacion()


/*
EVENTOS 
*/
document.querySelector("#btnLogin").addEventListener("click", Login);
document.querySelector("#btnlogout").addEventListener("click", logout);
document.querySelector("#btnRegistrarse").addEventListener("click", mostrarPaginaRegistro);
document.querySelector("btnCancelarRegistro").addEventListener("click", volverAlLogin);
document.querySelector("#btnRegistro").addEventListener("click", registrarUsuario);

function Login() {
    //Limpia ERRORES
    document.querySelector("#pErroresLogin").innerHTML = "";



    let usuarioIngresado = document.querySelector("#txtLoginUsuario").value;
    let passIngresado = document.querySelector("#txtLoginPassword").value;

    if (SISTEMA.elUsuarioEsCorrecto(usuarioIngresado, passIngresado)) {
        loginExitoso(usuarioIngresado);
    } else {
        document.querySelector("#pErroresLogin").innerHTML = "Usuario o contraseña incorrectos";
    }
    document.querySelector("#txtLoginPassword").value = "";
}
/**
 * Registrar un usuario si:
 * - no deberia existir en sistema (case insensitive)
 * - no puede contener espacios
 * - el mail debe tener un solo arroba 
 * 
 * - edad >= 18
 * - password tiene que tener al menos 1 numero, 1 caracter especial y 8 de largo como minimo
 *
 */
function registrarUsuario (){

    document.querySelector("#pErroresRegistro").innerHTML = "";

let nombreIngresado = document.querySelector("#txtRegistroUsuarioNombre").value;
let edadIngresado = Number(document.querySelector("#txtRegistroUsuarioEdad").value);
let mailIngresado = document.querySelector("#txtRegistroUsuarioMail").value;
let passIngresadoRegistro = document.querySelector("#txtRegisgtroUsuarioPass").value;

let errores = "";

if(SISTEMA.existeUsuario(nombreIngresado)){
    errores += "<br> El nombre de usuario no está disponible";
}

if(nombreIngresado.indexOf(" " >= 0)){
    errores += "<br> El nombre de usuario no puede contener espacios";
}

if(mailIngresado.indexOf("@") < 0 || (mailIngresado.indexOf("@") 
    !== mailIngresado.lastIndexOf("@"))){
    errores += "<br> El Mial solo puede contener un arroba";
}
if(edadIngresado < 18){
errores += "<br>Debes ser mayor de edad"
}
if(!SISTEMA.esUnPasswordValido(passIngresado)){
    errores += "<br> El password tiene que tener al menos 1 numero, 1 caracter especial y 8 de largo como minimo."
}
/**si no hubo errores, registrar, si no mostrar mensaje  */
if(errores.lenght === 0){
    SISTEMA.agregarUsuario(nombreIngresado, edadIngresado, mailIngresado, passIngresado, false);
    volverAlLogin();
}else{
    document.querySelector("#pErroresRegistro").innerHTML = errores;
}
}


function logout() {
    document.querySelector("#txtLoginPassword").value = "";
    document.querySelector("#txtLoginUsuario").value = "";
    document.querySelector("#pErroresLogin").innerHTML = "";
    document.querySelector("#divPaginaUsuario").style.display = "none";
    document.querySelector("#divLogin").style.display = "block";
 document.querySelector("#divPaginaPaseador").style.display = "none";
 document.querySelector("#divRegistro").style.display = "none";

}


/**
 * Ocultatodo lo que no es visible al entrar en la pagina 
 */
function iniciarAplicacion() {
    document.querySelector("#divPaginaUsuario").style.display = "none";
    document.querySelector("#divPaginaPaseador").style.display = "none";
    document.querySelector("#divRegistro").style.display = "none";
}


/**
 * TEST - github
 * Oculta los divs de login y muestra los correspondientes al usuario
 * @param {String} pNombre 
 */
function loginExitoso(pNombre) {
        document.querySelector("#txtLoginUsuario").value = "";
        document.querySelector("#divLogin").style.display = "none";

    if (SISTEMA.esPaseador(pNombre)) {

        document.querySelector("#divPaginaUsuario").style.display = "block";

    } else {
        document.querySelector("#divPaginaPaseador").style.display = "block";
    }
}

function mostrarPaginaRegistro (){
     document.querySelector("#login").style.display = "none";
      document.querySelector("#divRegistro").style.display = "block";
}

function volverAlLogin(){
    logout();
}
