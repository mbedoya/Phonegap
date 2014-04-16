/**
 * Created by USUARIO on 10/04/2014.
 */

var soap = function() {

    // Changes XML to JSON
    this.xmlToJson = function (xml) {
        // Create the return object
        var obj = {};

        if (xml.nodeType == 1) { // element
            // do attributes
            if (xml.attributes.length > 0) {
                obj["@attributes"] = {};
                for (var j = 0; j < xml.attributes.length; j++) {
                    var attribute = xml.attributes.item(j);
                    obj["@attributes"][attribute.nodeName] = attribute.nodeValue;
                }
            }
        } else if (xml.nodeType == 3) { // text
            obj = xml.nodeValue;
        }

        // do children
        if (xml.hasChildNodes()) {
            for(var i = 0; i < xml.childNodes.length; i++) {
                var item = xml.childNodes.item(i);
                var nodeName = item.nodeName;
                if (typeof(obj[nodeName]) == "undefined") {
                    obj[nodeName] = xmlToJson(item);
                } else {
                    if (typeof(obj[nodeName].push) == "undefined") {
                        var old = obj[nodeName];
                        obj[nodeName] = [];
                        obj[nodeName].push(old);
                    }
                    obj[nodeName].push(xmlToJson(item));
                }
            }
        }
        return obj;
    }

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
            alert(this.xmlToJson(jqXHR));
            var xmlText = $(jqXHR).contents();
            alert(xmlText);

        });
    }

};