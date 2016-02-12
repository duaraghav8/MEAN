var app = require ('express') (),
	server = require ('http').Server (app),
	serveStatic = require ('serve-static'),
	socketIO = require ('socket.io'),
	port = 8080,
	ioObject = socketIO.listen (server);

ioObject.on ('connection', function (socket) {
	console.log ('New connection');

	socket.on ('disconnect', function () {
		console.log ('Disconnected');
	});

	socket.on ('chat', function (msg) {
		console.log (msg);
		ioObject.emit ('chat', msg);
		//socket.emit ('chat', msg);
	});
});

app.use ('/', serveStatic (__dirname + '/public'));
server.listen (port, function () {
	console.log ('Uptime');
});