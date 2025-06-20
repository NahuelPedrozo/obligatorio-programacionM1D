/*
vARIABLES GLOBALES, CONSTANTES GLOBALES 
*/

/* 
Genero un sistema para poder manejar todos mis datos.
*/

const SISTEMA = new Sistema("Mi app");
//EJECUTAMOS LA PRECARGA ENSEGUIDA DE CREAR EL SISTEMA
SISTEMA.precargarDatos();
// DEJAMOS UN USUARIO PARA LOGUAR FACIL
document.querySelector("#txtLoginUsuario").value = SISTEMA.usuarios[0].mail;
document.querySelector("#txtLoginPassword").value = SISTEMA.usuarios[0].password;


/*
FUNCIONES PARA EL INICIO
*/
iniciarAplicacion();
/*


EVENTOS 
*/
document.querySelector("#btnLogin").addEventListener("click", Login);
document.querySelector("#btnlogout").addEventListener("click", logout);
document.querySelector("#btnRegistrarse").addEventListener("click", mostrarPaginaRegistro);
document.querySelector("#btnCancelarRegistro").addEventListener("click", volverAlLogin);
document.querySelector("#btnRegistro").addEventListener("click", registrarUsuario);
document.querySelector(`#btnVerPaseadoresDisponibles`).addEventListener (`click`, verPaseadoresDisponibles);

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
function registrarUsuario() {

    document.querySelector("#pErroresRegistro").innerHTML = "";

    let nombreIngresado = document.querySelector("#txtRegistroUsuarioNombre").value;
    let edadIngresado = Number(document.querySelector("#txtRegistroUsuarioEdad").value);
    let mailIngresado = document.querySelector("#txtRegistroUsuarioMail").value;
    let passIngresado = document.querySelector("#txtRegistroUsuarioPass").value;

    let nombrePerroIngresado = document.querySelector("#txtRegistroUsuarioPerro").value.trim();
    let tamanoPerroIngresado = document.querySelector("#slcRegistroUsuarioTamanho").value;

    let erroresAlAgregregarUsuario = SISTEMA.agregarUsuario(nombreIngresado, edadIngresado, mailIngresado, passIngresado, false, nombrePerroIngresado, tamanoPerroIngresado);
    /**si no hubo errores, registrar, si no mostrar mensaje  */
    if (erroresAlAgregregarUsuario.length === 0) {
        alert (`Usuario registrado.`);
        volverAlLogin();
    } else {
        document.querySelector("#pErroresRegistro").innerHTML = erroresAlAgregregarUsuario;
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
    document.querySelector(`#divVerPaseadores`).style.display = `none`;
    let botonesUsuario = document.querySelectorAll(".nav-usuario");
    let botonesPaseador = document.querySelectorAll(".nav-paseador");

    for(let i=0; i < botonesUsuario.length;i++){
        let item = botonesUsuario[i];
        item.style.display  ="none";
    }

    
    for(let i=0; i < botonesPaseador.length;i++){
        let item = botonesPaseador[i];
        item.style.display  ="none";
    }

}


/*
 Ocultatodo lo que no es visible al entrar en la pagina 
 */
function iniciarAplicacion() {
    document.querySelector("#divPaginaUsuario").style.display = "none";
    document.querySelector("#divPaginaPaseador").style.display = "none";
    document.querySelector("#divRegistro").style.display = "none";
    document.querySelector("#navPrincipal").style.display = "none";
    document.querySelector(`#divVerPaseadores`).style.display = `none`;
}


/**
 * TEST - github
 * Oculta los divs de login y muestra los correspondientes al usuario
 * @param {String} pNombre 
 */
function loginExitoso(pNombre) {
    document.querySelector("#txtLoginUsuario").value = "";
    document.querySelector("#divLogin").style.display = "none";
    document.querySelector("#navPrincipal").style.display = "block";

    if (SISTEMA.esPaseador(pNombre)) {

        document.querySelector("#divPaginaUsuario").style.display = "block";

    } else {
        document.querySelector("#divPaginaPaseador").style.display = "block";
    }
}

function mostrarPaginaRegistro() {
    document.querySelector("#divLogin").style.display = "none";
    document.querySelector("#divRegistro").style.display = "block";
}
//function para cerrar sesion
function volverAlLogin() {
    logout();
}
// Cambios probar.

function verPaseadoresDisponibles (){
  
    document.querySelector(`#divPaginaPaseador`).style.display = `none`;
     document.querySelector(`#divVerPaseadores`).style.display = `block`;
      cargarTablaPaseadores(); // Llena la tabla
}

function cargarTablaPaseadores(){
    let paseadores = SISTEMA.obtenerSoloPaseadores();
    let raws = "";
    for(let i = 0; i < paseadores.length; i++){
        let item = paseadores[i];
        raws += `<tr>
            <td>${item.nombre}</td>
            <td>${item.mail}</td>
            <td>${item.cupos}</td>
            <td><button data-paseador="${item.id}" class="btnContratar">Contratar</button></td>
        </tr>`;
    }
    document.querySelector("#tPaseadores").innerHTML = raws;
    // darEventoContratar(); // no lo hicimos aun
}