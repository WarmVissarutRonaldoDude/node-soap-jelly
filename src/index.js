/**
 * Main app
*/

require('dotenv').load();

const ServerController = require('./controller/ServerController');

const serverController = new ServerController();

serverController.createServer();

const { testCallClient } = require('./client');
testCallClient();