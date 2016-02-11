module.exports = function (app, passport) {
	app.get ('/login', function (req, res) {
		res.render ('login');
	});

	app.post ('/login', passport.authenticate ('local-login', {
		successRedirect: '/profile',
		failureRedirect: '/login'
	}));

	app.get ('/signup', function (req, res) {
		res.render ('signup');
	});

	app.post ('/signup', passport.authenticate ('local-signup', {
		successRedirect: '/profile',
		failureRedirect: '/signup'
	}));

	app.get ('/profile', isLoggedIn, function (req, res) {
		console.log (req.user);

		res.render ('profile', {
			user: req.user.local.email
		});
	});

	app.get ('/logout', function (req, res) {
		req.logout ();
		res.redirect ('/login');
	});

	function isLoggedIn (req, res, next) {
		if (req.isAuthenticated ()) {
			return (next ());
		}
		else {
			res.redirect ('/login');
		}
	};

	return (app);
};