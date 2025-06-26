/* 
Una clase en JavaScript es la "receta" para poder construir un objeto
*/

class Sistema {
  /* 
    El constructor le dice a JavaScript como se tiene que ver un objeto.
    */
  constructor(pNombreAplicacion) {
    this.contrataciones = [];
    this.usuarios = [];
    this.perros = [];
    this.nombreAplicacion = pNombreAplicacion;
    this.usuarioLogueado = null; // Variable para almacenar el usuario logueado
  }

  /**
   * Comprueba que el usuario existe y si existe comprueba que coincida el password.
   *
   * @param {string} pMail
   * @param {*string} pPass
   * @returns {Boolean}
   */

  elUsuarioEsCorrecto(pMail, pPass) {
    let unUsuario = this.buscarUnUsuarioPorMail(pMail);

    if (unUsuario !== null && unUsuario.password === pPass) {
      this.usuarioLogueado = unUsuario; // Guardamos el usuario logueados
      return true;
    } else {
      return false;
    }
  }

  /**
   * comprueba si el usuario es paseador
   * @param {String} pMail
   * @returns {Boolean} resultado
   */
  esPaseador(pMail) {
    let usuario = this.buscarUnUsuarioPorMail(pMail);

    if (usuario !== null) {
      return usuario.esPaseador;
    } else {
      return false;
    }
  }
  /**
   * retorna Null si el usuario no existe
   * @param {string} pMail
   * @returns
   */
  buscarUnUsuarioPorMail(pMail) {
    /**Vamos a usar una variable que empieza en null y si en algun momento encuentra el valor
     * que estoy buscando, va a rellenar ese valor.
     */
    let usuarioEncontrado = null;

    let i = 0;

    while (usuarioEncontrado === null && i < this.usuarios.length) {
      if (this.usuarios[i].mail.toUpperCase() === pMail.toUpperCase()) {
        usuarioEncontrado = this.usuarios[i];
      }
      i++;
    }
    return usuarioEncontrado;
  }

  /**
   *
   * @param {String} pMail
   * @returns {boolean} retorna true si el usuario existe
   */
  existeUsuario(pMail) {
    let unUsuario = this.buscarUnUsuarioPorMail(pMail);
    if (unUsuario === null) {
      return false;
    } else {
      return true;
    }
  }

  esUnPasswordValido(pPass) {
    let tieneNumero = false;
    let tieneCaracterEspecial = false;

    let tieneMayuscula = false;
    let tieneMinuscula = false;

    let i = 0;

    while (
      (!tieneMayuscula ||
        !tieneMinuscula ||
        !tieneNumero ||
        !tieneCaracterEspecial) &&
      i < pPass.length
    ) {
      if (pPass.charCodeAt(i) >= 48 && pPass.charCodeAt(i) <= 57) {
        tieneNumero = true;
      } else if (
        (pPass.charCodeAt(i) >= 33 && pPass.charCodeAt(i) <= 47) ||
        (pPass.charCodeAt(i) >= 58 && pPass.charCodeAt(i) <= 64) ||
        (pPass.charCodeAt(i) >= 94 && pPass.charCodeAt(i) <= 96) ||
        pPass.charCodeAt(i) >= 123
      ) {
        tieneCaracterEspecial = true;
      } else if (pPass.charCodeAt(i) >= 65 && pPass.charCodeAt(i) <= 90) {
        tieneMayuscula = true;
      } else if (pPass.charCodeAt(i) >= 97 && pPass.charCodeAt(i) <= 122) {
        tieneMinuscula = true;
      }
      i++;
    }
    return (
      tieneNumero &&
      tieneCaracterEspecial &&
      pPass.length >= 5 &&
      tieneMayuscula &&
      tieneMinuscula
    );
  }

  agregarUsuario(
    pNombre,
    pEdad,
    pMail,
    pPassword,
    pEsPaseador,
    pNombrePerro,
    pTamanoPerro
  ) {
    let errores = this.validarDatosDeUsuario(
      pNombre,
      pEdad,
      pMail,
      pPassword,
      pNombrePerro,
      pTamanoPerro,
      pEsPaseador
    );

    if (errores.length === 0) {
      let unUsuario = new Usuario(
        pNombre,
        pEdad,
        pMail,
        pPassword,
        pEsPaseador,
        pNombrePerro,
        pTamanoPerro
      );

      if (!unUsuario.esPaseador) {
        let perro = new Perro(pNombrePerro, pTamanoPerro, unUsuario);
        this.perros.push(perro);
      }

      this.usuarios.push(unUsuario);
    }
    return errores;
  }

  validarDatosDeUsuario(
    pNombre,
    pEdad,
    pMail,
    pPassword,
    pNombrePerro,
    pTamanoPerro,
    pEsPaseador
  ) {
    let errores = "";

    if (this.existeUsuario(pMail)) {
      errores += "<br> El mail de usuario no está disponible";
    }

    if (pNombre.indexOf(" ") >= 0) {
      errores += "<br> El nombre de usuario no puede contener espacios";
    }

    if (
      pMail.indexOf("@") < 0 ||
      pMail.indexOf("@") !== pMail.lastIndexOf("@")
    ) {
      errores += "<br> El mail solo puede contener un arroba";
    }
    if (pEdad < 18) {
      errores += "<br>Debes ser mayor de edad";
    }

    if (!this.esUnPasswordValido(pPassword)) {
      errores +=
        "<br> El password tiene que tener al menos 1 numero, 1 caracter especial y 5 de largo como minimo.";
    }

    if (!pEsPaseador) {
      if (pNombrePerro === "") {
        errores += "<br>Debe ingresar el nombre del perro.";
      }
      if (pTamanoPerro === "") {
        errores += "<br>Debe seleccionar un tamaño de perro.";
      }
    }

    return errores;
  }
  //**Obtenemos solo los paseadores para los datos de la tabla  */
  obtenerSoloPaseadores() {
    let paseadores = [];
    for (let i = 0; i < this.usuarios.length; i++) {
      let item = this.usuarios[i];
      if (item.esPaseador) {
        paseadores.push(item);
      }
    }
    return paseadores;
  }

  // filtrar contrataciones del usuario logueado

  obtenerContratacionesDelUsuario() {
    let contratacionesDelUsuario = [];

    for (let i = 0; i < this.contrataciones.length; i++) {
      if (this.contrataciones[i].perro.duenho.id === this.usuarioLogueado.id) {
        contratacionesDelUsuario.push(this.contrataciones[i]);
      }
    }
    return contratacionesDelUsuario;
  }

  buscarPerroPorDuenho(idDuenho) {
    let perroDelUsuario = null;
    for (let i = 0; i < this.perros.length; i++) {
      if (this.perros[i].duenho.id === idDuenho) {
        perroDelUsuario = this.perros[i];
      }
    }
    return perroDelUsuario;
  }

  //Realizamos la contratacion
  crearContratacion(perro, paseador) {
    let cupoNecesario = this.obtenerCupoSegunTamanho(perro.tamanho);
    let cuposRestantes = paseador.cupos;
    let tipoPermitido = this.tipoDePerrosPendientes(paseador);

    if (cupoNecesario > cuposRestantes) {
      return "No hay cupos suficientes.";
    }
    /* 
        let tamanhos = obtenerTamanhos(paseador) 

        if (!validarTamanhoPerro(perro.tamanho, tamanhos)){
            return `No se puede contratar un perro grande con un perro chico o viceversa.`
        } */

    let nueva = new Contratacion(perro, paseador);
    this.contrataciones.push(nueva);
    //    this.rechazarContratacionesIncompatibles(nueva, paseador);
    return ""; // éxito
  }

  actualizarCuposPaseador(tamanho, paseador) {
    paseador.cupos = paseador.cupos - this.obtenerCupoSegunTamanho(tamanho);
  }

  obtenerTamanhos(paseador) {
    let tamanhos = [];
    for (let i = 0; i < this.contrataciones.length; i++) {
      if (
        this.contrataciones[i].paseador === paseador &&
        this.contrataciones[i].estado === "aceptado"
      ) {
        let tamanhoAgregar = this.contrataciones[i].perro.tamanho;
        // Reemplazo de includes por verificación manual
        let yaExiste = false;
        for (let i = 0; i < tamanhos.length; i++) {
          if (tamanhos[i] === tamanhoAgregar) {
            yaExiste = true;
            break;
          }
        }
        if (!yaExiste) {
          tamanhos.push(tamanhoAgregar);
        }
      }
    }
    return tamanhos;
  }

  // obtenemos los cupos segun el tamaño
  obtenerCupoSegunTamanho(tam) {
    if (tam === "tamanhoC") return 1;
    if (tam === "tamanhoM") return 2;
    if (tam === "tamanhoG") return 4;
    return 0;
  }

  tipoDePerrosPendientes(paseador) {
    for (let i = 0; i < this.contrataciones.length; i++) {
      if (
        this.contrataciones[i].paseador === paseador &&
        this.contrataciones[i].estado === "pendiente"
      ) {
        return this.contrataciones[i].perro.tamanho;
      }
    }
    return null;
  }

  validarTamanhoPerro(tamanho, tamanhos) {
    if (tamanho === `tamanhoC`) {
      for (let i = 0; i < tamanhos.length; i++) {
        if (tamanhos[i] === `tamanhoG`) {
          return false;
        }
      }
    }
    if (tamanho === `tamanhoG`) {
      for (let i = 0; i < tamanhos.length; i++) {
        if (tamanhos[i] === `tamanhoC`) {
          return false;
        }
      }
    }

    return true;
  }

  rechazarContratacionesIncompatibles(contratacionActual, paseador) {
    let cuposRestantes = paseador.cupos;
    let tipo = this.tipoDePerrosPendientes(paseador);

    for (let i = 0; i < this.contrataciones.length; i++) {
      if (this.contrataciones[i].id !== contratacionActual.id) {
        if (
          this.contrataciones[i].paseador.id === paseador.id &&
          this.contrataciones[i].estado === "pendiente"
        ) {
          if (
            this.obtenerCupoSegunTamanho(this.contrataciones[i].perro.tamanho) >
            cuposRestantes
          ) {
            this.contrataciones[i].estado = "rechazada";
            this.contrataciones[i].motivo =
              "Rechazada por incompatibilidad de cupos";
          }
          if (
            !this.validarTamanhoPerro(
              this.contrataciones[i].perro.tamanho,
              this.obtenerTamanhos(paseador)
            )
          ) {
            this.contrataciones[i].estado = "rechazada";
            this.contrataciones[i].motivo =
              "Rechazada por incompatibilidad de tamaño";
          }
        }
      }
    }
  }

  cancelarContratacion(idContratacion) {
    let contratacion = this.buscarContratacionPorId(idContratacion);
    if (contratacion !== null && contratacion.estado === `pendiente`) {
      contratacion.estado = "cancelada";
      return true;
    }

    return false; // Si no se encuentra la contratación, retorna false
  }

  aceptarContrataciones(idContratacion) {
    let contratacion = this.buscarContratacionPorId(idContratacion);
    if (contratacion !== null && contratacion.estado === `pendiente`) {
      contratacion.estado = `aceptado`;
      // Restamos los cupos del paseador
      this.actualizarCuposPaseador(
        contratacion.perro.tamanho,
        contratacion.paseador
      );
      this.rechazarContratacionesIncompatibles(
        contratacion,
        contratacion.paseador
      );
      // Retornamos true para indicar que la contratación fue aceptada
      return true;
    }
    return false; // Si no se encuentra la contratación o no está pendiente, retorna false
  }

  buscarContratacionPorId(idContratacion) {
    let contratacionEncontrada = null;

    let i = 0;
    while (contratacionEncontrada === null && i < this.contrataciones.length) {
      if (this.contrataciones[i].id === idContratacion) {
        contratacionEncontrada = this.contrataciones[i];
      }
      i++;
    }
    return contratacionEncontrada;
  }

  obtenerContratacionesDelPaseador(paseador) {
    let contratacionesDelPaseador = [];
    for (let i = 0; i < this.contrataciones.length; i++) {
      if (this.contrataciones[i].paseador.id === paseador.id) {
        contratacionesDelPaseador.push(this.contrataciones[i]);
      }
    }
    return contratacionesDelPaseador;
  }

  obtenerPerrosAsignadosDelPaseador(paseador) {
    let perrosAsignados = [];
    for (let i = 0; i < this.contrataciones.length; i++) {
      if (
        this.contrataciones[i].paseador.id === paseador.id &&
        this.contrataciones[i].estado === `aceptado`
      ) {
        perrosAsignados.push(this.contrataciones[i].perro);
      }
    }
    return perrosAsignados;
  }

  /* 
    ESTE METODO PRECARGA LOS DATOS DE LA APLICACION.
    DENTRO DE LA CLASE NO USAMOS LA PALABRA FUNCTION.
    */

  precargarDatos() {
    let usuarioAgregadoLinea = 0;

    /** Precargo usuarios comunes (con perro y tamaño) */
    console.log(
      usuarioAgregadoLinea++,
      " ",
      this.agregarUsuario(
        "Ana-López",
        28,
        "ana@gmail.com",
        "Ana1234!",
        false,
        "Firulais",
        "tamanhoM"
      )
    );
    let perroMedianoFirulais = this.buscarPerroPorDuenho(
      this.usuarios[this.usuarios.length - 1].id
    );
    console.log(
      usuarioAgregadoLinea++,
      " ",
      this.agregarUsuario(
        "Carlos-Méndez",
        35,
        "carlos@gmail.com",
        "Carl0s@2024",
        false,
        "Max",
        "tamanhoG"
      )
    );
    let perroGrandeMax = this.buscarPerroPorDuenho(
      this.usuarios[this.usuarios.length - 1].id
    );
    console.log(
      usuarioAgregadoLinea++,
      " ",
      this.agregarUsuario(
        "Lucía-Torres",
        22,
        "lucia@gmail.com",
        "Lucia!789",
        false,
        "Luna",
        "tamanhoC"
      )
    );
    let perroChicoLuna = this.buscarPerroPorDuenho(
      this.usuarios[this.usuarios.length - 1].id
    );
    console.log(
      usuarioAgregadoLinea++,
      " ",
      this.agregarUsuario(
        "Dieg-Pérez",
        30,
        "diego@gmail.com",
        "D!ego2025",
        false,
        "Rocky",
        "tamanhoG"
      )
    );
    let perroGrandeRocky = this.buscarPerroPorDuenho(
      this.usuarios[this.usuarios.length - 1].id
    );
    console.log(
      usuarioAgregadoLinea++,
      " ",
      this.agregarUsuario(
        "Florencia-Ruiz",
        26,
        "flor@gmail.com",
        "Flor#2023",
        false,
        "Nina",
        "tamanhoM"
      )
    );
    let perroMedianoNina = this.buscarPerroPorDuenho(
      this.usuarios[this.usuarios.length - 1].id
    );
    console.log(
      usuarioAgregadoLinea++,
      " ",
      this.agregarUsuario(
        "Jorge-Paz",
        40,
        "jorgepaz@gmail.com",
        "Jorge!2024",
        false,
        "Toby",
        "tamanhoC"
      )
    );
    let perroChicoToby = this.buscarPerroPorDuenho(
      this.usuarios[this.usuarios.length - 1].id
    );
    console.log(
      usuarioAgregadoLinea++,
      " ",
      this.agregarUsuario(
        "Marina-Lopez",
        31,
        "marina@gmail.com",
        "Mari@1234",
        false,
        "Maya",
        "tamanhoM"
      )
    );
    let perroMedianoMaya = this.buscarPerroPorDuenho(
      this.usuarios[this.usuarios.length - 1].id
    );
    console.log(
      usuarioAgregadoLinea++,
      " ",
      this.agregarUsuario(
        "Ricardo-Gomez",
        45,
        "ricardo@gmail.com",
        "R!cardo2025",
        false,
        "Simba",
        "tamanhoG"
      )
    );
    let perroGrandeSimba = this.buscarPerroPorDuenho(
      this.usuarios[this.usuarios.length - 1].id
    );
    console.log(
      usuarioAgregadoLinea++,
      " ",
      this.agregarUsuario(
        "Julieta-Ferro",
        29,
        "julieta@gmail.com",
        "Juli#2024",
        false,
        "Lola",
        "tamanhoC"
      )
    );
    let perroChicoLola = this.buscarPerroPorDuenho(
      this.usuarios[this.usuarios.length - 1].id
    );
    console.log(
      usuarioAgregadoLinea++,
      " ",
      this.agregarUsuario(
        "Santiago-Rey",
        34,
        "santi@gmail.com",
        "Santi@456",
        false,
        "Thor",
        "tamanhoG"
      )
    );
    let perroGrandeThor = this.buscarPerroPorDuenho(
      this.usuarios[this.usuarios.length - 1].id
    );
    console.log(
      usuarioAgregadoLinea++,
      " ",
      this.agregarUsuario(
        "Micaela-Perez",
        27,
        "mica@gmail.com",
        "Mica123!",
        false,
        "Milo",
        "tamanhoM"
      )
    );
    let perroMedianoMilo = this.buscarPerroPorDuenho(
      this.usuarios[this.usuarios.length - 1].id
    );
    console.log(
      usuarioAgregadoLinea++,
      " ",
      this.agregarUsuario(
        "Federico-Ramirez",
        38,
        "fede@gmail.com",
        "Fede@2023",
        false,
        "Zeus",
        "tamanhoC"
      )
    );
    let perroChicoZeus = this.buscarPerroPorDuenho(
      this.usuarios[this.usuarios.length - 1].id
    );
    console.log(
      usuarioAgregadoLinea++,
      " ",
      this.agregarUsuario(
        "Agustina-Sosa",
        25,
        "agus@gmail.com",
        "Agus!987",
        false,
        "Daisy",
        "tamanhoM"
      )
    );
    let perroMedianoDaisy = this.buscarPerroPorDuenho(
      this.usuarios[this.usuarios.length - 1].id
    );
    console.log(
      usuarioAgregadoLinea++,
      " ",
      this.agregarUsuario(
        "Nicolas-Vega",
        33,
        "nicolas@gmail.com",
        "Nico#321",
        false,
        "Balto",
        "tamanhoG"
      )
    );
    let perroGrandeBalto = this.buscarPerroPorDuenho(
      this.usuarios[this.usuarios.length - 1].id
    );
    console.log(
      usuarioAgregadoLinea++,
      " ",
      this.agregarUsuario(
        "Valeria-Diaz",
        30,
        "valeria@gmail.com",
        "Vale@111",
        false,
        "Chispa",
        "tamanhoC"
      )
    );
    let perroChicoChispa = this.buscarPerroPorDuenho(
      this.usuarios[this.usuarios.length - 1].id
    );
    console.log(
      usuarioAgregadoLinea++,
      " ",
      this.agregarUsuario(
        "Bruno-Silva",
        36,
        "bruno@gmail.com",
        "Bru!2024",
        false,
        "Jazz",
        "tamanhoM"
      )
    );
    let perroMedianoJazz = this.buscarPerroPorDuenho(
      this.usuarios[this.usuarios.length - 1].id
    );
    console.log(
      usuarioAgregadoLinea++,
      " ",
      this.agregarUsuario(
        "Camila-Herrera",
        24,
        "camila@gmail.com",
        "Cami#789",
        false,
        "Tango",
        "tamanhoG"
      )
    );
    let perroGrandeTango = this.buscarPerroPorDuenho(
      this.usuarios[this.usuarios.length - 1].id
    );
    console.log(
      usuarioAgregadoLinea++,
      " ",
      this.agregarUsuario(
        "Gonzalo-Mora",
        41,
        "gonza@gmail.com",
        "Gonza2025!",
        false,
        "Loki",
        "tamanhoC"
      )
    );
    let perroChico = this.buscarPerroPorDuenho(
      this.usuarios[this.usuarios.length - 1].id
    );
    console.log(
      usuarioAgregadoLinea++,
      " ",
      this.agregarUsuario(
        "Andrea-Castro",
        37,
        "andrea@gmail.com",
        "Andre@555",
        false,
        "Coco",
        "tamanhoM"
      )
    );
    let perroMedianoCoco = this.buscarPerroPorDuenho(
      this.usuarios[this.usuarios.length - 1].id
    );
    console.log(
      usuarioAgregadoLinea++,
      " ",
      this.agregarUsuario(
        "Martin-Acosta",
        32,
        "martin@gmail.com",
        "Mart!n2024",
        false,
        "Osito",
        "tamanhoG"
      )
    );

    let perroGrandeOsito = this.buscarPerroPorDuenho(
      this.usuarios[this.usuarios.length - 1].id
    );

    /** Precargo paseadores (sin perro ni tamaño) */
    console.log(
      usuarioAgregadoLinea++,
      " ",
      this.agregarUsuario(
        "Mathias-Perez",
        29,
        "matiasp@gmail.com",
        "Mati2024!",
        true,
        null,
        null
      )
    );

    let matias = this.usuarios[this.usuarios.length - 1];
    matias.cupos = 8;

    this.crearContratacion(perroGrandeBalto, matias);
    this.crearContratacion(perroGrandeMax, matias);
    this.crearContratacion(perroGrandeOsito, matias);

    this.crearContratacion(perroMedianoCoco, matias);

    this.crearContratacion(perroMedianoJazz, matias);

    this.crearContratacion(perroMedianoNina, matias);

    this.crearContratacion(perroChico, matias);
    this.crearContratacion(perroChicoChispa, matias);
    this.crearContratacion(perroChicoLuna, matias);
    this.crearContratacion(perroGrandeSimba, matias);
    console.log(
      usuarioAgregadoLinea++,
      " ",
      this.agregarUsuario(
        "Sofia-Garcia",
        32,
        "sofiap@gmail.com",
        "Sofi@123",
        true,
        null,
        null
      )
    );

    /*  this.usuarios[this.usuarios.length - 1].cupos = 5; */

    console.log(
      usuarioAgregadoLinea++,
      " ",
      this.agregarUsuario(
        "Tomas-Perez",
        27,
        "tomasp@gmail.com",
        "Tom@2025",
        true,
        null,
        null
      )
    );

    /*   this.usuarios[this.usuarios.length - 1].cupos = 3; */

    console.log(
      usuarioAgregadoLinea++,
      " ",
      this.agregarUsuario(
        "Valentina-Costa",
        24,
        "valenp@gmail.com",
        "Vale!456",
        true,
        null,
        null
      )
    );
    console.log(
      usuarioAgregadoLinea++,
      " ",
      this.agregarUsuario(
        "Joaquín-Morales",
        31,
        "joaquinp@gmail.com",
        "Joaq#789",
        true,
        null,
        null
      )
    );
    /*  this.usuarios[this.usuarios.length - 1].cupos = 100; */
  }
}
