class Usuario {
    /**
     * 
     * @param {String} pNombre 
     * @param {Number} pEdad 
     * @param {String} pMail 
     * @param {String} pPassword 
     */
    constructor (pNombre, pEdad, pMail, pPassword, pEsPaseador){
        this.nombre = pNombre;
        this.edad = pEdad;
        this.mail = pMail;
        this.password = pPassword;
        this.esPaseador = pEsPaseador;
    }
}