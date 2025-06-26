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
document.querySelector("#txtLoginPassword").value =
  SISTEMA.usuarios[0].password;

/*
FUNCIONES PARA EL INICIO
*/

// Oculta todas las secciones al iniciar la aplicacion
iniciarAplicacion();
/*

// holaa
EVENTOS 
*/
document.querySelector("#btnLogin").addEventListener("click", Login);
document.querySelector("#btnlogout").addEventListener("click", logout);
document
  .querySelector("#btnRegistrarse")
  .addEventListener("click", mostrarPaginaRegistro);
document
  .querySelector("#btnCancelarRegistro")
  .addEventListener("click", volverAlLogin);
document
  .querySelector("#btnRegistro")
  .addEventListener("click", registrarUsuario);
document
  .querySelector(`#btnVerPaseadoresDisponibles`)
  .addEventListener(`click`, verPaseadoresDisponibles);
document
  .querySelector("#btnVerContratacionPendiente")
  .addEventListener("click", verContratacionesPendientes);
document
  .querySelector("#btnPaseadorPerrosAsignados")
  .addEventListener("click", paseadorVerPerrosAsignados);
document
  .querySelector(`#btnPaseadorContratacionesPendiente`)
  .addEventListener(`click`, paseadorVerContratacionesPendientes);
  document.querySelector(`#btnListadoPaseadores`).addEventListener(`click`, listadoDePaseadores);

function Login() {
  //Limpia ERRORES
  document.querySelector("#pErroresLogin").innerHTML = "";

  let usuarioIngresado = document.querySelector("#txtLoginUsuario").value;
  let passIngresado = document.querySelector("#txtLoginPassword").value;

  if (SISTEMA.elUsuarioEsCorrecto(usuarioIngresado, passIngresado)) {
    loginExitoso(usuarioIngresado);
  } else {
    document.querySelector("#pErroresLogin").innerHTML =
      "Usuario o contraseña incorrectos";
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

  let nombreIngresado = document.querySelector(
    "#txtRegistroUsuarioNombre"
  ).value;
  let edadIngresado = Number(
    document.querySelector("#txtRegistroUsuarioEdad").value
  );
  let mailIngresado = document.querySelector("#txtRegistroUsuarioMail").value;
  let passIngresado = document.querySelector("#txtRegistroUsuarioPass").value;

  let nombrePerroIngresado = document
    .querySelector("#txtRegistroUsuarioPerro")
    .value.trim();
  let tamanoPerroIngresado = document.querySelector(
    "#slcRegistroUsuarioTamanho"
  ).value;

  let erroresAlAgregregarUsuario = SISTEMA.agregarUsuario(
    nombreIngresado,
    edadIngresado,
    mailIngresado,
    passIngresado,
    false,
    nombrePerroIngresado,
    tamanoPerroIngresado
  );
  /**si no hubo errores, registrar, si no mostrar mensaje  */
  if (erroresAlAgregregarUsuario.length === 0) {
    alert(`Usuario registrado.`);
    volverAlLogin();
  } else {
    document.querySelector("#pErroresRegistro").innerHTML =
      erroresAlAgregregarUsuario;
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
  document.querySelector("#btnPaseadorContratacionesPendiente").style.display =
    "none";
  document.querySelector("#btnPaseadorPerrosAsignados").style.display = "none";
  document.querySelector(
    `#divVerContratacionesPendientes`
  ).style.display = `none`;
  document.querySelector("#divContratacionesPendientesPaseador").style.display =
    "none";
  document.querySelector(`#divPerrosAsignadosPaseador`).style.display = `none`;
  document.querySelector(`#divListadoDePaseadores`).style.display = `none`;
  // document.querySelector("#btnListadoPaseadores").style.display = "none";

  let botonesUsuario = document.querySelectorAll(".nav-usuario");
  let botonesPaseador = document.querySelectorAll(".nav-paseador");

  for (let i = 0; i < botonesUsuario.length; i++) {
    let item = botonesUsuario[i];
    item.style.display = "none";
  }

  for (let i = 0; i < botonesPaseador.length; i++) {
    let item = botonesPaseador[i];
    item.style.display = "none";
  }

  SISTEMA.usuarioLogueado = null; // Reseteamos el usuario logueado
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
  document.querySelector("#btnPaseadorContratacionesPendiente").style.display =
    "none";
  document.querySelector("#btnPaseadorPerrosAsignados").style.display = "none";
  document.querySelector(`#btnlogout`).style.display = `none`;
  document.querySelector(
    `#divVerContratacionesPendientes`
  ).style.display = `none`;
  document.querySelector("#divContratacionesPendientesPaseador").style.display =
    "none";
  document.querySelector(`#divPerrosAsignadosPaseador`).style.display = `none`;
   document.querySelector(`#divListadoDePaseadores`).style.display = `none`;
}


/**
 * TEST - github
 * Oculta los divs de login y muestra los correspondientes al usuario
 * @param {String} pNombre
 */

//Muestra la pantalla del usuario segun si es paseador o no
function loginExitoso(pNombre) {
  document.querySelector("#txtLoginUsuario").value = "";
  document.querySelector("#divLogin").style.display = "none";
  document.querySelector("#navPrincipal").style.display = "block";

  let botonesUsuarios = document.querySelectorAll(`.nav-usuario`);
  let botonesPaseadores = document.querySelectorAll(`.nav-paseador`);

  // Primero ocultar los botones

  for (let i = 0; i < botonesUsuarios.length; i++) {
    botonesUsuarios[i].style.display = `none`;
  }
  for (let i = 0; i < botonesPaseadores.length; i++) {
    botonesPaseadores[i].style.display = `none`;
  }

  // Ocultar todos por las dudas
  document.querySelector("#divPaginaUsuario").style.display = "none";
  document.querySelector("#divPaginaPaseador").style.display = "none";
  document.querySelector("#divRegistro").style.display = "none";
  document.querySelector(`#divVerPaseadores`).style.display = `none`;
  document.querySelector("#btnPaseadorContratacionesPendiente").style.display =
    "none";
  document.querySelector("#btnPaseadorPerrosAsignados").style.display = "none";

  if (SISTEMA.esPaseador(pNombre)) {
    document.querySelector("#divPaginaPaseador").style.display = "block";

    document.querySelector(
      "#btnPaseadorContratacionesPendiente"
    ).style.display = "block";
    document.querySelector("#btnPaseadorPerrosAsignados").style.display =
      "block";

    for (let i = 0; i < botonesPaseadores.length; i++) {
      botonesPaseadores[i].style.display = `block`;
    }
  } else {
    document.querySelector("#divPaginaUsuario").style.display = "block";

    for (let i = 0; i < botonesUsuarios.length; i++) {
      botonesUsuarios[i].style.display = `block`;
    }
  }
  document.querySelector(`#btnlogout`).style.display = `block`;
}

// Muestra la pantalla de registro
function mostrarPaginaRegistro() {
  document.querySelector("#divLogin").style.display = "none";
  document.querySelector("#divRegistro").style.display = "block";
}
//funcion para cerrar sesion
function volverAlLogin() {
  logout();
}
// Cambios probar.

// Muestra la tabla de paseadores disponibles
function verPaseadoresDisponibles() {
  document.querySelector("#divPaginaUsuario").style.display = "none";
  document.querySelector(`#divVerPaseadores`).style.display = `block`;
  document.querySelector(
    `#divVerContratacionesPendientes`
  ).style.display = `none`;
    document.querySelector(`#divListadoDePaseadores`).style.display = `none`;
  cargarTablaPaseadores(); // Llena la tabla
}

// Llenar la tabla con con los datos de los paseadores
function cargarTablaPaseadores() {
  let paseadores = SISTEMA.obtenerSoloPaseadores();

  let usuarioLogueadoEnSistema = SISTEMA.usuarioLogueado;
  let perroDelUsuario = SISTEMA.buscarPerroPorDuenho(
    usuarioLogueadoEnSistema.id
  );

  let cuposQueOcupaElPerro = SISTEMA.obtenerCupoSegunTamanho(
    perroDelUsuario.tamanho
  );

  let rows = "";
  for (let i = 0; i < paseadores.length; i++) {
    let item = paseadores[i];
    if (item.cupos >= cuposQueOcupaElPerro) {
      // Solo mostrar paseadores que tengan cupos suficientes
      rows += `<tr>
            <td>${item.nombre}</td>
            <td>${item.mail}</td>
            <td>${item.cupos}</td>
            <td><button data-paseador="${item.id}" class="btnContratar">Contratar</button></td>
        </tr>`;
    }
  }
  document.querySelector("#tPaseadores").innerHTML = rows;

  darEventoContratar();
}
//cambio sobre el login o crear una estadistica de los usuarios
// Asigna el evento "click" a todos los botones "Contratar".
function darEventoContratar() {
  let botonesContratarPaseador = document.querySelectorAll(`.btnContratar`);

  for (let i = 0; i < botonesContratarPaseador.length; i++) {
    let item = botonesContratarPaseador[i];
    item.addEventListener(`click`, contratarPaseador);
  }
}

let mailLogueado = document.querySelector("#txtLoginUsuario").value;
let usuarioLogueado = SISTEMA.buscarUnUsuarioPorMail(mailLogueado);

// Realiza la contratacion entre un paseador y el perro del usuario logueado
function contratarPaseador() {
  let idPaseador = Number(this.getAttribute("data-paseador"));
  let paseador = null;
  if (usuarioLogueado === null) {
    alert("No se pudo encontrar el usuario logueado.");
    return;
  }
  for (let i = 0; i < SISTEMA.usuarios.length; i++) {
    if (SISTEMA.usuarios[i].id === idPaseador) {
      paseador = SISTEMA.usuarios[i];
    }
  }

  // Validar si ya tiene una contratación pendiente
  for (let i = 0; i < SISTEMA.contrataciones.length; i++) {
    let item = SISTEMA.contrataciones[i];
    if (
      item.perro.duenho.id === usuarioLogueado.id &&
      item.estado === "pendiente"
    ) {
      alert(
        "Ya tiene una contratación pendiente. Debe cancelarla o esperar una respuesta."
      );
      return;
    }
  }

  // Buscar perro del usuario
  let perroDelUsuario = SISTEMA.buscarPerroPorDuenho(usuarioLogueado.id);

  // Validar que el cliente tiene perro
  if (perroDelUsuario === null) {
    alert("No se encontró un perro asociado al usuario.");
    return;
  }

  let resultado = SISTEMA.crearContratacion(perroDelUsuario, paseador);

  if (resultado === "") {
    alert("Contratación realizada con éxito.");
    cargarTablaPaseadores(); // para actualizar cupos visibles
  } else {
    alert("Error al contratar: " + resultado);
  }
}

// Tabla de todos los paseadores (pagina-usuario)

function listadoDePaseadores(){
document.querySelector(`#divListadoDePaseadores`).style.display = `block`;
document.querySelector(`#divVerPaseadores`).style.display = `none`;
document.querySelector(`#divVerContratacionesPendientes`).style.display = `none`;
document.querySelector(`#divPaginaUsuario`).style.display = `none`;
    let paseadores = SISTEMA.obtenerSoloPaseadores();
    
    let rows = "";
    for (let i = 0; i < paseadores.length; i++) {
        let item = paseadores[i];
          let perrosAsignados = SISTEMA.obtenerPerrosAsignadosDelPaseador(item).length;
        rows += `<tr>
                <td>${item.nombre}</td>
                <td>${perrosAsignados}</td>
            </tr>`;
    }
    document.querySelector("#tListadoPaseadores").innerHTML = rows;

}

function verContratacionesPendientes() {
  document.querySelector("#divPaginaUsuario").style.display = "none";
  document.querySelector(
    `#divVerContratacionesPendientes`
  ).style.display = `block`;
  document.querySelector(`#divVerPaseadores`).style.display = `none`;
  document.querySelector(`#divListadoDePaseadores`).style.display = `none`;

  let contrataciones = SISTEMA.obtenerContratacionesDelUsuario();
  let rows = "";
  for (let i = 0; i < contrataciones.length; i++) {
    let item = contrataciones[i];
    if (item.estado === `pendiente`) {
      // Solo mostrar paseadores que tengan cupos suficientes
      rows += `<tr>
            <td>${item.paseador.nombre}</td>
            <td>${item.perro.nombre}</td>
            <td>${item.estado}</td>
            <td><button data-contratacion-id="${item.id}" class="btnCancelarContrataciones">Cancelar</button></td>
        </tr>`;
    } else if (item.estado === `aceptado`) {
      rows += `<tr>
            <td>${item.paseador.nombre}</td>
            <td>${item.perro.nombre}</td>
            <td>${item.estado}</td>
        </tr>`;
    }
  }
  document.querySelector("#tContrataciones").innerHTML = rows;

  darEventoCancelarContrataciones();
}

function darEventoCancelarContrataciones() {
  let botonesCancelarContrataciones = document.querySelectorAll(
    `.btnCancelarContrataciones`
  );
  for (let i = 0; i < botonesCancelarContrataciones.length; i++) {
    let item = botonesCancelarContrataciones[i];
    item.addEventListener(`click`, cancelarContratacion);
  }
}

function cancelarContratacion() {
  let idContratacion = Number(this.getAttribute("data-contratacion-id"));
  let resultado = SISTEMA.cancelarContratacion(idContratacion);
  if (resultado) {
    alert(`La contratacion fue cancelada con exito.`);
  } else {
    alert(`No se pudo cancelar la contratacion.`);
  }

  if (SISTEMA.usuarioLogueado.esPaseador) {
    paseadorVerContratacionesPendientes();
  } else {
    verContratacionesPendientes();
  }
}

function paseadorVerContratacionesPendientes() {
  document.querySelector(`#divPaginaPaseador`).style.display = `none`;
  document.querySelector(`#divPerrosAsignadosPaseador`).style.display = `none`;
  document.querySelector("#divContratacionesPendientesPaseador").style.display =
    "block";

  let contrataciones = SISTEMA.obtenerContratacionesDelPaseador(
    SISTEMA.usuarioLogueado
  );
  let rows = "";
  for (let i = 0; i < contrataciones.length; i++) {
    let item = contrataciones[i];
    if (item.estado === `pendiente`) {
      // Solo mostrar paseadores que tengan cupos suficientes
      rows += `<tr>
            <td>${item.perro.duenho.nombre}</td>
            <td>${item.perro.nombre}</td>
            <td>${item.perro.tamanho}</td>
            <td>${item.estado}</td>
            
            <td><button data-contratacion-id="${item.id}" class="btnAceptarContratacion">Aceptar</button></td>
            <td><button data-contratacion-id="${item.id}" class="btnCancelarContrataciones">Cancelar</button></td>
            </tr>`;
    }
  }

  document.querySelector(`#tContratacionesPendientesPaseador`).innerHTML = rows;
  darEventoCancelarContrataciones();
  darEventoAceptarContrataciones();
}

function darEventoAceptarContrataciones() {
  let botonesAceptarContrataciones = document.querySelectorAll(
    `.btnAceptarContratacion`
  );
  for (let i = 0; i < botonesAceptarContrataciones.length; i++) {
    let item = botonesAceptarContrataciones[i];
    item.addEventListener(`click`, aceptarContratacion);
  }
}

function aceptarContratacion() {
  let idContratacion = Number(this.getAttribute("data-contratacion-id"));
  let resultado = SISTEMA.aceptarContrataciones(idContratacion);

  if (resultado) {
    paseadorVerContratacionesPendientes(); //Refresca la tabla
    alert(`La contratacion fue aceptada con exito.`);
  } else {
    alert(`No se pudo aceptar la contratacion.`);
  }
}

function paseadorVerPerrosAsignados() {
  document.querySelector(`#divPaginaPaseador`).style.display = `none`;
  document.querySelector("#divContratacionesPendientesPaseador").style.display =
    "none";
    document.querySelector(`#divListadoDePaseadores`).style.display = `none`;
  document.querySelector(`#divPerrosAsignadosPaseador`).style.display = `block`;

  let perrosAsignados = SISTEMA.obtenerPerrosAsignadosDelPaseador(
    SISTEMA.usuarioLogueado
  );
  let rows = "";
  let cuposOcupados = 0;
  for (let i = 0; i < perrosAsignados.length; i++) {
    let item = perrosAsignados[i];
    rows += `<tr>
                <td>${item.nombre}</td>
                <td>${item.tamanho}</td>
                <td>${item.duenho.nombre}</td>
            </tr>`;
    cuposOcupados += SISTEMA.obtenerCupoSegunTamanho(item.tamanho);
  }
  document.querySelector(`#tPerrosAsignadosPaseador`).innerHTML = rows;

  let divResumen = document.querySelector("#divResumenCuposPaseador");
  let cuposMaximos = SISTEMA.usuarioLogueado.cupos + cuposOcupados;
  let porcentaje = 0;
  if (cuposMaximos > 0) {
    porcentaje = (cuposOcupados / cuposMaximos) * 100;
  }

  if (perrosAsignados.length === 0) {
    divResumen.innerHTML = `<p>No hay perros asignados.</p>`;
  } else {
    divResumen.innerHTML = `<p>Cupos ocupados: ${cuposOcupados} de ${cuposMaximos} (${porcentaje.toFixed(
      2
    )}%)</p>`;
  }
}
