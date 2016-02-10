var express = require ('express'),
	async = require ('async'),
	serveStatic = require ('serve-static'),
	cookieParser = require ('cookie-parser'),
	bodyParser = require ('body-parser'),
	session = require ('express-session'),
	mongoose = require ('mongoose'),
	Schema = mongoose.Schema,
	userSchema, userModel,
	port = 8080,
	app = express ();

userSchema = new Schema ({
	username: {
		type: String,
		required: true
	},
	password: {
		type: String,
		required: true
	}
});
userModel = mongoose.model ('users', userSchema);

mongoose.connect ('mongodb://localhost:27017/test');
mongoose.connection.once ('open', function () {
	console.log ('Mongo connected');
});

app
	.use (bodyParser.json ())
	.use (bodyParser.urlencoded ({extended : true}))
	.use (cookieParser ())
	.use (session ({secret: ['Chudail']}))

	.get ('/', serveStatic (__dirname))
	.post ('/login', function (req, res) {
		userModel.findOne (req.body, function (err, response) {
			if (err) {
				res.send ('Database error');
			}
			else if (response) {
				console.log (response + ' logged in');
				req.session.name = response.username;
				res.send (req.session.name);
			}
		});
	})
	.get ('/logout', function (req, res) {
		if (req.session.name) {
			delete req.session.name;
		}
		res.send ('Done');
	})
	.get ('/home', function (req, res) {
		if (req.session.name) {
			res.send ('You made it!');
		}
		else {
			res.send ('Please log the fuck in');
		}
	})
	.listen (port, function () {
		console.log ('Uptime');
	});
