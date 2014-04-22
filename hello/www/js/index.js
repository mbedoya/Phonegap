
/** CONFIGURACIONES GLOBALES ***/

//All Loaded Pages
var pages = [];
var nombreUsuario = '';
var config = {
    Servicios: { Antares: 'http://190.90.184.13:9081/AntaresWebServices/InterfaceAntaresServiceService'  }
};

var migasPan = {};
migasPan['paginaHome'] = 'INICIO';
migasPan['paginaInformes'] = 'INFORMES';
migasPan['paginaConsultasGerenteZona'] = 'CONSULTAS DE GERENTE DE ZONA';
migasPan['paginaInscripcionesGerenteZona'] = 'INSCRIPCIONES DETALLADAS DE GERENTE DE ZONA';

$(document).ready( function(){

    // ***** EVENTOS DE INTERFAZ *****

    $('div[data-role=page]').bind('pagecreate', function(event){
        //Adicionar los Headers a todas las páginas
        var contexto = {nombre_pagina: migasPan[($(event.target).attr("id"))]};
        var plantillaHeader = Handlebars.compile($("#header-template").html());
        var htmlHeader = plantillaHeader(contexto);
        $(event.target).children("div[data-role=content]").prepend(htmlHeader);
    });

    $("#paginaConsultasGerenteZona").bind("pageinit", function(event){
        $( "#graficoSugerido" ).progressbar({
            value: 37
        });

        $( "#graficoConsultas" ).progressbar({
            value: 95
        });

        $( "#graficoProyectado" ).progressbar({
            value: 120
        });

        $( "#graficoCreditos" ).progressbar({
            value: 20
        });

        $( "#graficoContado" ).progressbar({
            value: 5
        });
    });

    // INICIO DE SESIÓN

    //Click al botón para iniciar sesión
    $("#botonIniciarSesion").on("click", function(){

        $.mobile.loading( 'show', {
            text: 'Estás iniciando sesión...',
            textVisible: true,
            theme: 'b',
            html: ""
        });

        var usuario = $("#inputUsuario").val();
        var clave = $("#inputClave").val();

        var url = config.Servicios.Antares;
        var metodo = 'validacionAntares';
        var mensaje =
            '<SOAP-ENV:Envelope > \
            <SOAP-ENV:Body> \
            <ns1:validacionAntares > \
            <arg0> \
            <usuario>{1}</usuario> \
            <password>{2}</password> \
            </arg0> \
            <ns1:validacionAntares > \
            </SOAP-ENV:Body> \
            </SOAP-ENV:Envelope>';
        var soapAction = 'validacionAntares';

        mensaje = mensaje.replace("{1}", usuario);
        mensaje = mensaje.replace("{2}", clave);

        var servicioSoap = new soap();
        servicioSoap.invocarMetodo(url, metodo, mensaje, soapAction,
            function(msg) {
                $.mobile.loading('hide');
            },function (msg) {
                $.mobile.loading('hide');
                alert('Error iniciando sesión');
            },function(data, textStatus, jqXHR) {
                var razonRechazo = data.getElementsByTagName("razonRechazo");
                //Usuario válido?
                if(razonRechazo != null && razonRechazo.length == 0){
                    nombreUsuario = data.getElementsByTagName("nombreCompleto")[0].textContent;
                    $("#nombreUsaurio").html("<b>" + nombreUsuario + "</b>");
                    $.mobile.changePage("#paginaHome", {transition: "none"});
                }else{
                    $.mobile.changePage("#paginaErrorInicioSesion", {transition: "slideup"});
                }
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
        //aplicacion.escucharEvento(aplicacion.EVENTO_BOTON_MENU, aplicacion.sender.onBotonMenuPresionado);
        //Evento Botón Atrás
        //aplicacion.escucharEvento(aplicacion.EVENTO_BOTON_ATRAS, aplicacion.sender.onBotonAtrasPresionado);
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