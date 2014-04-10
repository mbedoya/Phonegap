
$(document).ready( function(){

    // ***** EVENTOS DE INTERFAZ *****

    // INICIO DE SESIÓN

    function finalizarInicioSesion(){
        if (new Date().getSeconds() < 60){
            $.mobile.changePage("#pageone", {transition: "none"});
        }else{
            $.mobile.changePage("#pageerroriniciosesion", {transition: "slideup"});
        }
    }

    //Click al botón para iniciar sesión
    $("#botonIniciarSesion").on("click", function(){

        $.mobile.loading( 'show', {
            text: 'Estás iniciando sesión...',
            textVisible: true,
            theme: 'a',
            html: ""
        });

        setTimeout(finalizarInicioSesion, 3000);

    });

    //Click al Menú
    $("#menu").on("click", function(){
         $("#pageone #enlaceMenu").click();
    });

    //Click al Enlace Mapa
    $("#enlaceMapa").on("click", function(){
        $.mobile.changePage("mapa.html", {transition: "none"});
    });

    //Click al Boton Traer Datos
    $("#pagedemo #botonTraerDatos").on("click", function(){

        var url = 'http://wsf.cdyne.com/WeatherWS/Weather.asmx';
        var metodo = 'GetWeatherInformation';
        var mensaje =
            '<soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/"> \
            <soap:Body> \
            <GetWeatherInformation xmlns="http://ws.cdyne.com/WeatherWS/" /> \
            </soap:Body> \
            </soap:Envelope>';

        $.soap({
            url:    url,
            method: metodo,
            data: mensaje,
            success: function(msg) {
                alert('exito');
            },
            error: function (xhr, ajaxOptions, thrownError) {
                alert('error');
            }
        });
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
            navigator.notification.alert('Soy Eus', null, 'Hello', 'OK');
        } else {
            alert('Soy Eus');
        }
    }

    //Método que se invoca cuando se presiona el botón atrás
    this.onBotonAtrasPresionado = function (e) {
        if (navigator.notification) {
            navigator.notification.alert('Atrás', null, 'Hello', 'OK');
        } else {
            alert('Atrás Alert');
        }
    }
}