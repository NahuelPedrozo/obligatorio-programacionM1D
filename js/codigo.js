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
document.querySelector("#btnRegistrarse").addEventListener("click", motrarPaginaRegistro)
document.querySelector("btnCancelarRegistro").addEventListener("click", volverAlLogin)
document.querySelector("#btnRegistro").addEventListener("click", registrarUsuario)

function Login() {
    //Limpia ERRORES
    document.querySelector("#pErroresLogin").innerHTML = "";



    let usuarioIngresado = document.querySelector("#txtLoginUsuario").value;
    let passIngresado = document.querySelector("#txtLoginPassword").value;

    if (elUsuarioEsCorrecto(usuarioIngresado, passIngresado)) {
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
 * - el mail debe tener un punto despues del arroba
 * - edad >= 18
 * - password tiene que tener al menos 1 numero, 1 caracter especial y 8 de largo como minimo
 *
 */
function registrarUsuario (){

let nombreIngresado = document.querySelector("#txtRegistroUsuarioNombre").value;
let edadIngresado = Number(document.querySelector("#txtRegistroUsuarioEdad").value);
let mailIngresado = document.querySelector("#txtRegistroUsuarioMail").value;
let passIngresadoRegistro = document.querySelector("#txtRegisgtroUsuarioPass").value;


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


function elUsuarioEsCorrecto(pUsuario, pPass) {
    // Bandera va a cambiar a TRUE cuando encuentre el usuario (si lo encuentra) 
    let usuarioEncontrado = false;

    // indice para recorrer
    let i = 0;
    while (!usuarioEncontrado && i < listaDeUsuarios.length) {
        if (listaDeUsuarios[i] === pUsuario) {
            usuarioEncontrado = true;
        } else {
            i++;
        }

    }
    if (usuarioEncontrado) {
        if (passwordsDeUsuarios[i] === pPass) {
            return true;
        }
    }
    return false;
}
/**
 * comprueba si el usuario es artista
 * @param {String} pNombre 
 * @returns {Boolean} resultado
 */
function esPaseador(pNombre) {
    // bandera para saber paseador
    let usuarioEsPaseador = false;

    let i = 0;

    while (!usuarioEsPaseador && i < listaDePaseadores.length) {
        if (listaDePaseadores[i] === pNombre) {
            usuarioEsPaseador = true;
        }
        i++;
    }
    return usuarioEsPaseador;
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
 * Oculta los divs de login y muestra los correspondientes al usuario
 * @param {String} pNombre 
 */
function loginExitoso(pNombre) {
        document.querySelector("#txtLoginUsuario").value = "";
        document.querySelector("#divLogin").style.display = "none";

    if (esPaseador(pNombre)) {

        document.querySelector("#divPaginaUsuario").style.display = "block";

    } else {
        document.querySelector("#divPaginaPaseador").style.display = "block";
    }
}

function motrarPaginaRegistro (){
     document.querySelector("#login").style.display = "none";
      document.querySelector("#divRegistro").style.display = "block";
}

function volverAlLogin(){
    logout();
}