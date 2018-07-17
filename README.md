# node-soap-jelly

Play around with node-soap library to be both server and client in one stop service.

# Curl testing
curl -X POST \
  'http://localhost:5435/wsdl?wsdl=' \
  -H 'Cache-Control: no-cache' \
  -H 'Content-Type: text/xml' \
  -d '<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/"
        xmlns:xsd="http://www.w3.org/2001/XMLSchema"
        xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance">
	<soapenv:Body>
		<MessageSplitterRequest xmlns="http://localhost:5435/wsdl">
				<message>id1:12:34:56:out42</message>
				<splitter>:</splitter>
		</MessageSplitterRequest>
	</soapenv:Body>
</soapenv:Envelope>'