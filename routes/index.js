module.exports = function (app, server) {
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
}