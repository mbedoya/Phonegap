/**
 * Created by USUARIO on 10/04/2014.
 */

var soap = function() {

    this.invocarMetodo = function(url, metodo, mensajeXML, soapAction, callbackExito, callbackError) {

        parser = new DOMParser();
        documentoXML = parser.parseFromString(mensajeXML,"text/xml");

        $.soap({
            url:    url,
            method: metodo,
            data: documentoXML,
            SOAPAction: soapAction,
            envAttributes: {                                // additional attributes (like namespaces) for the Envelope:
                'xmlns:xsi': 'http://www.w3.org/2001/XMLSchema-instance',
                'xmlns:xsd': 'http://www.w3.org/2001/XMLSchema'
            },
            success: callbackExito,
            error: callbackError
        });
    }

};