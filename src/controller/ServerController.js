const soap = require('soap');
const path = require('path');
const express = require('express');
const fs = require('fs');

module.exports = class ServerController {
    constructor(opts = {}) {
        // Just ordinary constructor
        this.server = null;
        this.soapServer = null;
        this.port = process.env.PORT || '5435';
        
        // TOOD generate init service by method
        this.service = {};

        // TODO generate init wsdl by method
        this.wsdl = {};

        this.app = opts.app || null;
    }

    async setWsdl(partner, action, opts = { }) {
        let success = false;
        try {
            this.wsdl = await this.getWsdl(partner, action, opts);
            success = true;
        } catch (err) {
            success = false;
            // TODO log error
        }
        return success;
    }

    // TODO
    async getWsdl(partner, action, opts = { }) {
        return new Promise((resolve,reject) => {
            const wsdlPath = opts && opts.customPath ? opts.customPath :
            `${path.resolve(__dirname)}/wsdl/${partner}/${action}.wsdl`;
            fs.readFile(wsdlPath, 'utf8', (err, data) => {
                if (err) {
                    // TODO Log error
                    return reject(err);
                }
                // this.wsdl = data;
                return resolve(data);
            });
        });
    }

    createListener(app) {
        // the splitter function, used by the service
        function splitter_function(args) {
            console.log('splitter_function');
            var splitter = args.splitter;
            var splitted_msg = args.message.split(splitter);
            var result = [];
            for(var i=0; i<splitted_msg.length; i++){
            result.push(splitted_msg[i]);
            }
            return {
                result: result
                }
        }

        // the service
        const serviceObject = {
            MessageSplitterService: {
                MessageSplitterServiceSoapPort: {
                    MessageSplitter: splitter_function
                },
                MessageSplitterServiceSoap12Port: {
                    MessageSplitter: splitter_function
                }
            }
        };
        app.listen(this.port, () => {
            console.log(`Listening on port : ${this.port}`);
            // Mock WSDL
            const xml = fs.readFileSync(`${path.join(path.resolve(__dirname), '../../')}/wsdl/default/default.wsdl`, 'utf8');
            this.soapServer = soap.listen(app, '/wsdl', serviceObject, xml);
        });
    }

    createServer() {
        if (!this.app) {
            this.app = express();

            this.app.get('/', (req, res) => {
                res.send('HELLO SOAP WORLD');
            })

            this.createListener(this.app);
        }

        return this.app;
    }
};