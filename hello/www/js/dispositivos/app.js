/**
 * Created by USUARIO on 04/04/2014.
 */
var app = function() {

    //Listado de Eventos
    this.EVENTO_LISTO = 'deviceready';
    this.EVENTO_BOTON_MENU = 'menubutton';

    this.inicializar = function(callback) {
        document.addEventListener(this.EVENTO_LISTO, callback, false);
    }

    this.escucharEventoMenu = function(callback){
        alert("Evento Menu");
        document.addEventListener(this.EVENTO_BOTON_MENU, callback, false);
        alert("Lsistening");
    }

};