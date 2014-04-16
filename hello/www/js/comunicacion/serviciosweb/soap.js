/**
 * Created by USUARIO on 10/04/2014.
 */

var soap = function() {

    this.invocarMetodo = function(url, metodo, mensajeXML, soapAction, callbackExito, callbackError) {

        parser = new DOMParser();
        documentoXML = parser.parseFromString(mensajeXML,"text/xml");

        $.soap({
            url:    url,
            appendMethodToUrl: false,
            //method: metodo,
            data: documentoXML,
            //SOAPAction: soapAction,
            envAttributes: {                                // additional attributes (like namespaces) for the Envelope:
                'xmlns:SOAP-ENV': 'http://schemas.xmlsoap.org/soap/envelope/',
                'xmlns:ns1': 'http://interfaceantares.antares.com.co/'
            },
            success: callbackExito,
            error: callbackError
        }).done(function(data, textStatus, jqXHR) {
            alert(textStatus);
            var xmlElement = $(data).text();
            //for (var i = 0; i < xmlElement.attributes.length; i++) {
            //    var attrib = xmlElement.attributes[i];
            //    if (attrib.specified) {
            //        alert(attrib.name + " = " + attrib.value);
            //    }
            //}
            alert(xmlElement);
            var xmlText = $(jqXHR).children().length;
            alert(xmlText);
        });
    }

};