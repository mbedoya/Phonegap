$(document).ready( function(){

    // ***** EVENTOS DE INTERFAZ *****

    // INICIO DE SESIÓN

    function endGetRecipe(){
        $.mobile.loading('hide');
        $("#div-recipe").css('display','block');

    }

    //Click al botón para iniciar sesión
    $("#button-get-recipes").on("click", function(){

        $.mobile.loading( 'show', {
            text: 'looking for recipes...',
            textVisible: true,
            theme: 'a',
            html: ""
        });

        setTimeout(endGetRecipe, 1000);
    });

});

//Definición de la clase controladora, la cual recibe eventos del dispositivo
var index_js = function(){

    var aplicacion;

    this.iniciar = function(){

        aplicacion = new app(this);
        aplicacion.inicializar(aplicacion.sender.onDispositivoListo);
    }

    //Método invocado cuando el dispositivo esté listo
    this.onDispositivoListo = function(e){

        //Iniciarlizar los eventos cuando el dispositivo esté listo
        //Evento Menú
        aplicacion.escucharEvento(aplicacion.EVENTO_BOTON_MENU, aplicacion.sender.onBotonMenuPresionado);
        //Evento Botón Atrás
        aplicacion.escucharEvento(aplicacion.EVENTO_BOTON_ATRAS, aplicacion.sender.onBotonAtrasPresionado);
    }

    //Método que se invoca cuando se presiona el botón Menú
    this.onBotonMenuPresionado = function (e) {
        if (navigator.notification) {
            navigator.notification.alert('Menú', null, 'Hello', 'OK');
        } else {
            alert('Botón Menú');
        }
    }

    //Método que se invoca cuando se presiona el botón atrás
    this.onBotonAtrasPresionado = function (e) {
        if (navigator.notification) {
            navigator.notification.alert('Atrás', null, 'Hello', 'OK');
        } else {
            alert('Botón Atrás');
        }
    }
}