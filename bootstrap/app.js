var logger = require('morgan');
var express = require('express');
var consign = require('consign');
var mosca = require('mosca');

var app = express();

app.use(logger('dev'));

consign()
	.include('models')
	.then('controllers')
	.then('routes')
	.into(app);

module.exports = app;

var port = process.env.PORT || 3000;

app.listen(port, function () {
    console.log('Servidor rodando em http://localhost:%s', port);
});

var pubsubsettings = {
	//using ascoltatore
	type: 'mongo',		
	url: 'mongodb://localhost:27017/mqtt',
	pubsubCollection: 'test',
	mongo: {}
};

var moscaSettings = {
	port: 1883,			//mosca (mqtt) port
	backend: pubsubsettings,	//pubsubsettings is the object we created above 
	persistence: {
	    factory: mosca.persistence.Mongo,
	    url: 'mongodb://localhost:27017/mqtt'
	  }
};

var server = new mosca.Server(moscaSettings);	//here we start mosca
server.on('ready', setup);	//on init it fires up setup()

// fired when the mqtt server is ready
function setup() {
	console.log('Mosca server is up and running')
}

// fired when a message is published
server.on('published', function(packet, client) {
	console.log('Published', packet);
	//console.log('Client', client);
});
// fired when a client connects
server.on('clientConnected', function(client) {
	console.log('Client Connected:', client.id);
});

// fired when a client disconnects
server.on('clientDisconnected', function(client) {
	console.log('Client Disconnected:', client.id);
});