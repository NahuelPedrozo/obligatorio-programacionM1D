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
            return true;
        } else {
            return false
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

        while ((!tieneMayuscula || !tieneMinuscula || !tieneNumero || !tieneCaracterEspecial) && i < pPass.length) {
            if (pPass.charCodeAt(i) >= 48 && pPass.charCodeAt(i) <= 57) {
                tieneNumero = true;
            } else if (
                pPass.charCodeAt(i) >= 33 && pPass.charCodeAt(i) <= 47 ||
                pPass.charCodeAt(i) >= 58 && pPass.charCodeAt(i) <= 64 ||
                pPass.charCodeAt(i) >= 94 && pPass.charCodeAt(i) <= 96 ||
                pPass.charCodeAt(i) >= 123
            ) {
                tieneCaracterEspecial = true;
            } else if (pPass.charCodeAt(i) >= 65 && pPass.charCodeAt(i) <= 90) {
                tieneMayuscula = true;
            }
            else if (pPass.charCodeAt(i) >= 97 && pPass.charCodeAt(i) <= 122) {
                tieneMinuscula = true;
            }
            i++

        }
        return (tieneNumero && tieneCaracterEspecial && pPass.length >= 8 && tieneMayuscula && tieneMinuscula);
    }



    agregarUsuario(pNombre, pEdad, pMail, pPassword, pEsPaseador, pNombrePerro, pTamanoPerro) {

        let errores = this.validarDatosDeUsuario(pNombre, pEdad, pMail, pPassword, pNombrePerro, pTamanoPerro, pEsPaseador);

        if (errores.length === 0) {
            let unUsuario = new Usuario(pNombre, pEdad, pMail, pPassword, pEsPaseador, pNombrePerro, pTamanoPerro);


            if (!unUsuario.esPaseador) {
                let perro = new Perro(pNombrePerro, pTamanoPerro, unUsuario);
                this.perros.push(perro);
            }


            this.usuarios.push(unUsuario);
        }
        return errores;



    }

    validarDatosDeUsuario(pNombre, pEdad, pMail, pPassword, pNombrePerro, pTamanoPerro, pEsPaseador) {
        let errores = "";

        if (this.existeUsuario(pMail)) {
            errores += "<br> El mail de usuario no está disponible";
        }

        if (pNombre.indexOf(" ") >= 0) {
            errores += "<br> El nombre de usuario no puede contener espacios";
        }

        if (pMail.indexOf("@") < 0 || (pMail.indexOf("@")
            !== pMail.lastIndexOf("@"))) {
            errores += "<br> El Mial solo puede contener un arroba";
        }
        if (pEdad < 18) {
            errores += "<br>Debes ser mayor de edad"
        }

        if (!this.esUnPasswordValido(pPassword)) {
            errores += "<br> El password tiene que tener al menos 1 numero, 1 caracter especial y 8 de largo como minimo."
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
        return paseadores
    }




    //Realizamos la contratacion 
    crearContratacion(perro, paseador) {
        let cupoNecesario = this.obtenerCupoSegunTamaño(perro.tamanho);
        let cuposRestantes = paseador.cupos - this.cuposYaOcupados(paseador);
        let tipoPermitido = this.tipoDePerrosPendientes(paseador);

        if (tipoPermitido !== null && tipoPermitido !== perro.tamanho) {
            return "No se puede contratar: ya hay perros de otro tamaño asignados.";
        }

        if (cupoNecesario > cuposRestantes) {
            return "No hay cupos suficientes.";
        }

        let nueva = new Contratacion(perro, paseador);
        this.contrataciones.push(nueva);
        this.rechazarContratacionesIncompatibles(paseador);
        return ""; // éxito
    }

    // obtenemos los cupos segun el tamaño
    obtenerCupoSegunTamaño(tam) {
        if (tam === "tamanhoC") return 1;
        if (tam === "tamanhoM") return 2;
        if (tam === "tamanhoG") return 4;
        return 0;
    }

    cuposYaOcupados(paseador) {
        let total = 0;
        for (let c of this.contrataciones) {
            if (c.paseador === paseador && c.estado === "pendiente") {
                total += this.obtenerCupoSegunTamaño(c.perro.tamanho);
            }
        }
        return total;
    }

    tipoDePerrosPendientes(paseador) {
        for (let c of this.contrataciones) {
            if (c.paseador === paseador && c.estado === "pendiente") {
                return c.perro.tamanho;
            }
        }
        return null;
    }

    rechazarContratacionesIncompatibles(paseador) {
        let cuposRestantes = paseador.cupos - this.cuposYaOcupados(paseador);
        let tipo = this.tipoDePerrosPendientes(paseador);

        for (let c of this.contrataciones) {
            if (c.paseador === paseador && c.estado === "pendiente") {
                if (c.perro.tamanho !== tipo || this.obtenerCupoSegunTamaño(c.perro.tamanho) > cuposRestantes) {
                    c.estado = "rechazada";
                }
            }
        }
    }





    /* 
    ESTE METODO PRECARGA LOS DATOS DE LA APLICACION.
    DENTRO DE LA CLASE NO USAMOS LA PALABRA FUNCTION.
    */

    precargarDatos() {
        let usuarioAgregadoLinea = 0;


        /** Precargo usuarios comunes (con perro y tamaño) */
        console.log(usuarioAgregadoLinea++, " ", this.agregarUsuario("Ana-López", 28, "ana@gmail.com", "Ana1234!", false, "Firulais", "tamanhoM"));
        console.log(usuarioAgregadoLinea++, " ", this.agregarUsuario("Carlos-Méndez", 35, "carlos@gmail.com", "Carl0s@2024", false, "Max", "tamanhoG"));
        console.log(usuarioAgregadoLinea++, " ", this.agregarUsuario("Lucía-Torres", 22, "lucia@gmail.com", "Lucia!789", false, "Luna", "tamanhoC"));
        console.log(usuarioAgregadoLinea++, " ", this.agregarUsuario("Dieg-Pérez", 30, "diego@gmail.com", "D!ego2025", false, "Rocky", "tamanhoG"));
        console.log(usuarioAgregadoLinea++, " ", this.agregarUsuario("Florencia-Ruiz", 26, "flor@gmail.com", "Flor#2023", false, "Nina", "tamanhoM"));
        console.log(usuarioAgregadoLinea++, " ", this.agregarUsuario("Jorge-Paz", 40, "jorgepaz@gmail.com", "Jorge!2024", false, "Toby", "tamanhoC"));
        console.log(usuarioAgregadoLinea++, " ", this.agregarUsuario("Marina-Lopez", 31, "marina@gmail.com", "Mari@1234", false, "Maya", "tamanhoM"));
        console.log(usuarioAgregadoLinea++, " ", this.agregarUsuario("Ricardo-Gomez", 45, "ricardo@gmail.com", "R!cardo2025", false, "Simba", "tamanhoG"));
        console.log(usuarioAgregadoLinea++, " ", this.agregarUsuario("Julieta-Ferro", 29, "julieta@gmail.com", "Juli#2024", false, "Lola", "tamanhoC"));
        console.log(usuarioAgregadoLinea++, " ", this.agregarUsuario("Santiago-Rey", 34, "santi@gmail.com", "Santi@456", false, "Thor", "tamanhoG"));
        console.log(usuarioAgregadoLinea++, " ", this.agregarUsuario("Micaela-Perez", 27, "mica@gmail.com", "Mica123!", false, "Milo", "tamanhoM"));
        console.log(usuarioAgregadoLinea++, " ", this.agregarUsuario("Federico-Ramirez", 38, "fede@gmail.com", "Fede@2023", false, "Zeus", "tamanhoC"));
        console.log(usuarioAgregadoLinea++, " ", this.agregarUsuario("Agustina-Sosa", 25, "agus@gmail.com", "Agus!987", false, "Daisy", "tamanhoM"));
        console.log(usuarioAgregadoLinea++, " ", this.agregarUsuario("Nicolas-Vega", 33, "nicolas@gmail.com", "Nico#321", false, "Balto", "tamanhoG"));
        console.log(usuarioAgregadoLinea++, " ", this.agregarUsuario("Valeria-Diaz", 30, "valeria@gmail.com", "Vale@111", false, "Chispa", "tamanhoC"));
        console.log(usuarioAgregadoLinea++, " ", this.agregarUsuario("Bruno-Silva", 36, "bruno@gmail.com", "Bru!2024", false, "Jazz", "tamanhoM"));
        console.log(usuarioAgregadoLinea++, " ", this.agregarUsuario("Camila-Herrera", 24, "camila@gmail.com", "Cami#789", false, "Tango", "tamanhoG"));
        console.log(usuarioAgregadoLinea++, " ", this.agregarUsuario("Gonzalo-Mora", 41, "gonza@gmail.com", "Gonza2025!", false, "Loki", "tamanhoC"));
        console.log(usuarioAgregadoLinea++, " ", this.agregarUsuario("Andrea-Castro", 37, "andrea@gmail.com", "Andre@555", false, "Coco", "tamanhoM"));
        console.log(usuarioAgregadoLinea++, " ", this.agregarUsuario("Martin-Acosta", 32, "martin@gmail.com", "Mart!n2024", false, "Osito", "tamanhoG"));

        /** Precargo paseadores (sin perro ni tamaño) */
        console.log(usuarioAgregadoLinea++, " ", this.agregarUsuario("Matías-Díaz", 29, "matiasp@gmail.com", "Mati2024!", true, null, null));
        console.log(usuarioAgregadoLinea++, " ", this.agregarUsuario("Sofía-Varela", 32, "sofiap@gmail.com", "Sofi@123", true, null, null));
        console.log(usuarioAgregadoLinea++, " ", this.agregarUsuario("Tomás-Suárez", 27, "tomasp@gmail.com", "Tom@2025", true, null, null));
        console.log(usuarioAgregadoLinea++, " ", this.agregarUsuario("Valentina-Costa", 24, "valenp@gmail.com", "Vale!456", true, null, null));
        console.log(usuarioAgregadoLinea++, " ", this.agregarUsuario("Joaquín-Morales", 31, "joaquinp@gmail.com", "Joaq#789", true, null, null));
    }
}

