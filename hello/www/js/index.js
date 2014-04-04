var index_js = function(){

    var aplicacion;

    this.iniciar = function(){
        aplicacion = new app();
        aplicacion.inicializar(this.onDispositivoListo);

        alert('incializado');
    }

    this.onDispositivoListo = function(e){

        this.aplicacion.escucharEventoMenu(this.onBotonMenuPresionado);

        var id = app.EVENTO_LISTO;
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);
    }

    this.onBotonMenuPresionado = function (e) {
        if (navigator.notification) {
            navigator.notification.alert('Soy Eus', null, 'Hello', 'OK');
        } else {
            alert('Soy Eus');
        }
    }
}