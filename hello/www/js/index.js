
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

        setTimeout(finalizarInicioSesion, 1500);

    });

    //Click al Menú
    $("#menu").on("click", function(){
         $("#pageone #enlaceMenu").click();
    });

    //Click al Enlace Mapa
    $("#enlaceMapa").on("click", function(){
        $.mobile.changePage("mapa.html", {transition: "none"});
    });

    //Click al Boton Traer Datos (SOAP)
    $("#pagedemo #botonTraerDatos").on("click", function(){

        var url = 'http://wsf.cdyne.com/WeatherWS/Weather.asmx/';
        var metodo = 'GetWeatherInformation';
        var mensaje =
            '<soap:Envelope > \
            <soap:Body> \
            <GetWeatherInformation  /> \
            </soap:Body> \
            </soap:Envelope>';
        var soapAction = 'http://ws.cdyne.com/WeatherWS/GetWeatherInformation';

        var servicioSoap = new soap();
        servicioSoap.invocarMetodo(url, metodo, mensaje, soapAction,
            function(msg) {
                alert('exito');
            },function (msg) {
                alert('error');
            }
        );
    });

    //Click al Boton Traer Datos (REST)
    $("#pagedemo #botonTraerDatosRest").on("click", function(){

        var url = 'http://www.mocky.io/v2/53470a1bee61445e0c9d6176';
        var servicioAjax = new ajax();
        servicioAjax.invocarMetodo(url, servicioAjax.TIPO_PETICION_POST, servicioAjax.TIPO_DATO_JSONP, {},
            function(msg) {
                alert(msg.name);
            },function (msg) {
                alert('error');
            }
        );

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