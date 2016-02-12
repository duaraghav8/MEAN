var express = require ('express'),
	bodyParser = require ('body-parser'),
	session = require ('express-session'),
	cookieParser = require ('cookie-parser'),
	passport = require ('passport'),
	port = 8080,
	app = express ();

require ('./config/mongoose');
require ('./config/passport') (passport);

app
	.set ('views', __dirname + '/views')
	.set ('view engine', 'ejs')

	.use (bodyParser.urlencoded ({extended: true}))
	.use (cookieParser ())
	.use (session ({
		secret: 'ManFuckThatShit',
		resave: true,
		saveUninitialized: true
	}))
	.use (passport.initialize ())
	.use (passport.session ());

require ('./app/index.server.routes') (app, passport);

app.listen (port, function () {
	console.log ('Uptime');
});