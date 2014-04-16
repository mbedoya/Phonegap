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
            alert("done");

            var xmlText = $(data).find("soapenv\\:Body").find("dlwmin\\:validacionAntaresResponse").find("return").find("usuario").text();
            alert(xmlText).first().html();
            //alert(data);
            alert(textStatus);

            xmlText = $(jqXHR).children();
            alert(xmlText);
        });
    }

};