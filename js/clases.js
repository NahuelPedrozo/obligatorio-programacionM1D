/*
Vamos a usar esta variable para el id auto incremental de usuario
*/

let ultimoIdUsuario = 0;
class Usuario {
    /**
     * 
     * @param {String} pNombre 
     * @param {Number} pEdad 
     * @param {String} pMail 
     * @param {String} pPassword 
     * @param {Boolean} pEsPaseador
     */
    constructor (pNombre, pEdad, pMail, pPassword, pEsPaseador){
        this.id = ultimoIdUsuario++;
        this.nombre = pNombre;
        this.edad = pEdad;
        this.mail = pMail;
        this.password = pPassword;
        this.esPaseador = pEsPaseador;
        this.cupos = 10;

    }
}




class Perro{
    constructor(nombre, tamanho, duenho){
        this.nombre = nombre;
        this.tamanho = tamanho;
        this.duenho = duenho;
    }
}


// HOLAA
class Paseo{
    constructor(perro, paseador, estado){
        this.estado = estado;
        this.perro = perro;
        this.paseador = paseador;
    }
}


