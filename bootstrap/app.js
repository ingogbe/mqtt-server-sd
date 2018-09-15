var logger = require('morgan');
var express = require('express');
var consign = require('consign');
var mosca = require('mosca');

var app = express();

app.use(logger('dev'));

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

consign()
	.include('models')
	.then('controllers')
	.then('routes')
	.into(app, server);

module.exports = app;

server.on('ready', function(){
	console.log('Mosca server is up and running')
});	//on init it fires up

