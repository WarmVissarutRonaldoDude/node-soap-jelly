const soap = require('soap');
const url = 'http://localhost:5435/wsdl?wsdl';

// Create client
const testCallClient = function () {
    soap.createClient(url, (err, client) => {
        if (err){
          console.log("ERROR : ", err)
          throw err;
        }
        /* 
        * Parameters of the service call: they need to be called as specified
        * in the WSDL file
        */
        const args = {
          message: "id1:12:34:56:out42",
          splitter: ":"
        };
        // call the service
        client.MessageSplitter(args, (err, res) => {
          if (err)
            throw err;
            // print the service returned result
          console.log(res); 
        });
      });   
}

module.exports = {
    testCallClient
}