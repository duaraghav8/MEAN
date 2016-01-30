var express = require ('express'),
	serveStatic = require ('serve-static'),
	app = express (),
	port = 8080;

app.use ('/', serveStatic (__dirname));
app.get ('/user/:name', function (req, res) {
	console.log (req.params.name);
	res.json ({
		name : 'raghav',
		age : 20
	});
})
	.listen (port, function () {
		console.log ('uptime');
	});
