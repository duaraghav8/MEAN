var express = require ('express');
var serveStatic = require ('serve-static');
var bodyParser = require ('body-parser');
var cookieParser = require ('cookie-parser');
var port = 3000;
var app = express ();

app.use (serveStatic (__dirname));
app.use (bodyParser.json ());
app.use (cookieParser ());
app.use (bodyParser.urlencoded ({
	extended : true
}));
app.use ('/api', function (req, res) {
	console.log (req.method);
	res.send ('Hello user!');
	if (req.body) {
		console.log (req.body);
	}
});
app.use ('/cookie', function (req, res) {
	if (req.cookies) {
		console.log (req.cookies);
	}
	else {
		res.cookie ('userName', 'Raghav Dua');
	}
	res.send ('Hello user!');
});

app.listen (port);
console.log ('Server up and running');