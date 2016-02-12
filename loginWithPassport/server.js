var express = require ('express'),
	bcrypt = require ('bcrypt'),
	passport = require ('passport'),
	cookieParser = require ('cookie-parser'),
	session = require ('express-session'),
	bodyParser = require ('body-parser'),
	mongoose = require ('mongoose'),
	Schema = mongoose.Schema,
	port = 8080,
	app = express ();

///////////////////////////////////////////////////////////////////////////
mongoose.connect ('mongodb://localhost:27017/users');
mongoose.connection.once ('open', function () {
	console.log ('Mongoose connected');
});

userSchema = new Schema ({
	local: {
		email: String,
		password: String
	}
});
userSchema.methods.generateHash = function (password) {
	return (bcrypt.hashSync (password, bcrypt.genSaltSync (8), null));
};
userSchema.methods.validPassword = function (password) {
	console.log (this.local.password, password);
	return (bcrypt.compareSync (password, this.local.password));
};
userModel = mongoose.model ('credentials', userSchema);
///////////////////////////////////////////////////////////////////////////

require ('./config/passport') (passport);

app
	.set ('views', __dirname + '/views')
	.set ('view engine', 'ejs')

	.use (bodyParser.urlencoded ({extended: true}))
	.use (cookieParser ())
	.use (session ({
		secret: 'FucksNotGiven',
		resave: true,
		saveUninitialized: true
	}))
	.use (passport.initialize ())
	.use (passport.session ());

	require ('./app/routes') (app, passport);

app.listen (port, function () {
		console.log ('Uptime');
	});