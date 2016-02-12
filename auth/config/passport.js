var LocalStrategy = require ('passport-local').Strategy,
	FacebookStrategy = require ('passport-facebook').Strategy,
	User = require ('mongoose').model ('credentials'),
	configAuth = require ('./auth');

module.exports = function (passport) {
	passport.serializeUser (function (user, done) {
		done (null, user.id);
	});
	passport.deserializeUser (function (id, done) {
		User.findById (id, function (err, user) {
			done (err, user);
		});
	});

	passport.use ('local-signup', new LocalStrategy ({
		usernameField: 'email',
		passwordField: 'password',
		passReqToCallback: true
	},
	function (req, email, password, done) {
		process.nextTick (function () {
			User.findOne ({'local.email': email}, function (err, user) {
				if (err) {
					return (done (err));
				}
				if (user) {
					return (done (null, false));
				}
				else {
					var newUser = new User ();

					newUser.local.email = email;
					newUser.local.password = newUser.generateHash (password);
					newUser.save (function (err) {
						if (err) {
							throw (err);
						}
						else {
							return (done (null, newUser));
						}
					});
				}
			});
		});
	}));

	passport.use ('local-login', new LocalStrategy ({
		usernameField: 'email',
		passwordField: 'password',
		passReqToCallback: true
	},
	function (req, email, password, done) {
		User.findOne ({'local.email': email}, function (err, user) {
			if (err) {
				return (done (err));
			}
			if (!user) {
				return (done (null, false));
			}
			else {
				if (!user.validPassword (password)) {
					return (done (null, false));
				}
				else {
					return (done (null, user));
				}
			}
		});
	}));

	////////////////////////////////////////////////////////////////////////////////
	//FACEBOOK LOGIN
	////////////////////////////////////////////////////////////////////////////////
	passport.use (new FacebookStrategy ({
		clientID: configAuth.facebookAuth.clientID,
		clientSecret: configAuth.facebookAuth.clientSecret,
		callbackURL: configAuth.facebookAuth.callbackURL
	},
	function (token, refreshToken, profile, done) {
		console.log (profile);

		User.findOne ({'facebook.id': profile.id}, function (err, user) {
			if (err) {
				return (done (err));
			}
			if (user) {
				return (done (null, user));
			}
			else {
				var newUser = new User ();

				newUser.facebook.id = profile.id;
				newUser.facebook.name = profile.name.givenName + ' ' + profile.name.familyName;
				//newUser.facebook.email = profile.emails [0].value;
				newUser.facebook.email = 'duaraghav8@gmail.com';
				newUser.facebook.token = token;

				newUser.save (function (err) {
					if (err) {
						throw (err);
					}
					else {
						done (null, newUser);
					}
				});
			}
		});
	}));
};