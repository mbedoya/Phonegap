var index_js = function(){

    var aplicacion;

    this.iniciar = function(){

        aplicacion = new app();
        aplicacion.inicializar(this.onDispositivoListo);
    }

    //Método invocado cuando el dispositivo esté listo
    this.onDispositivoListo = function(e){

        //Iniciarlizar los eventos cuando el dispositivo esté listo
        aplicacion.escucharEventoMenu(this.onBotonMenuPresionado);

        var id = aplicacion.EVENTO_LISTO;
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');
        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');
        console.log('Received Event: ' + e);
    }

    this.onBotonMenuPresionado = function (e) {

        if (navigator.notification) {
            navigator.notification.alert('Soy Eus', null, 'Hello', 'OK');
        } else {
            alert('Soy Eus');
        }
    }
}