/* 
Una clase en JavaScript es la "receta" para poder construir un objeto
*/

class Sistema {

    /* 
    El constructor le dice a JavaScript como se tiene que ver un objeto.
    */
    constructor (pNombreAplicacion){
        this.usuarios = [];
        this.nombreAplicacion = pNombreAplicacion;
    }


/**
 * Comprueba que el usuario existe y si existe comprueba que coincida el password.
 * 
 * @param {string} pUsuario 
 * @param {*string} pPass 
 * @returns {Boolean}
 */

 elUsuarioEsCorrecto(pUsuario, pPass) {
    // Bandera va a cambiar a TRUE cuando encuentre el usuario (si lo encuentra) 
    let usuarioEncontrado = false;

    // indice para recorrer
    let i = 0;
    while (!usuarioEncontrado && i < this.usuarios.length) {
        if (this.usuarios[i] === pUsuario) {
            usuarioEncontrado = true;
        } else {
            i++;
        }

    }
    if (usuarioEncontrado) {
        if (this.passwords[i] === pPass) {
            return true;
        }
    }
    return false;
}



/**
 * comprueba si el usuario es paseador
 * @param {String} pNombre 
 * @returns {Boolean} resultado
 */
 esPaseador(pNombre) {
    // bandera para saber paseador
    let usuarioEsPaseador = false;

    let i = 0;

    while (!usuarioEsPaseador && i < this.listaDePaseadores.length) {
        if (this.listaDePaseadores[i] === pNombre) {
            usuarioEsPaseador = true;
        }
        i++;
    }
    return usuarioEsPaseador;
}


/**
 * 
 * @param {String} pUsuario 
 * @returns {boolean} retorna true si el usuario existe 
 */
 existeUsuario(pUsuario){
    // bandera para saber paseador
    let existe = false;

    let i = 0;

    while (!existe && i < this.usuarios.length) {
        if (this.usuarios[i].toUpperCase() === pUsuario.toUpperCase()) {
            existe = true;
        }
        i++;
    }
    return existe;
}



 esUnPasswordValido (pPass){
let tieneNumero = false;
let tieneCaracterEspecial = false;

let tieneMayuscula = false;
let tieneMinuscula = false;

let i = 0;

while((!tieneMayuscula || !tieneMinuscula ||!tieneNumero || !tieneCaracterEspecial ) && i < pPass.length){
    if(pPass.charAt(i) >= 48 && pPass.charCodeAt(i) <= 57){
        tieneNumero = true;
    }else if(
        pPass.charCodeAt(i) >= 33 && pPass.charCodeAt(i) <= 47 ||
        pPass.charCodeAt(i) >= 58 && pPass.charCodeAt(i) <= 64 ||
        pPass.charCodeAt(i) >= 94 && pPass.charCodeAt(i) <= 96 ||
        pPass.charCodeAt(i) >= 123
){
    tieneCaracterEspecial = true;
} else if(pPass.charAt(i) >= 65 && pPass.charCodeAt(i) <= 90){
    tieneMayuscula = true;
} 
else if(pPass.charAt(i) >= 97 && pPass.charCodeAt(i) <= 122){
    tieneMinuscula = true;
}
i++

}
return (tieneNumero && tieneCaracterEspecial && pPass.length >= 8 && tieneMayuscula && tieneMinuscula);
}



agregarUsuario(pNombre, pEdad, pMail, pPassword, pEsPaseador){
    let unUsuario = new Usuario(pNombre, pEdad, pMail, pPassword, pEsPaseador);
    this.usuarios.push(unUsuario);
    
}









    /* 
    ESTE METODO PRECARGA LOS DATOS DE LA APLICACION.
    DENTRO DE LA CLASE NO USAMOS LA PALABRA FUNCTION.

    */

    precargarDatos (){

    }
}