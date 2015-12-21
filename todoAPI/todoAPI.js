/*
	TO DO API
	usage:
	curl http://127.0.0.1:3000/api -X GET
	curl http://127.0.0.1:3000/api/1 -X GET
*/

var express = require ('express');
var bodyParser = require ('body-parser');
var router = express.Router ();
var port = 3000;
var app = express ();

var items = {
	1 : {
		'task' : 'Learn MEAN',
		'deadline' : 'January'
	},
	2 : {
		'task' : 'GSOC',
		'deadline' : 'January'
	}
};

router.use (bodyParser.json ());
router.use (bodyParser.urlencoded ({
	extended : true
}));

router.route ('/api')
	.get (function (req, res) {
		res.send (items);
	});
router.route ('/api/:itemID')
	.get (function (req, res) {
		res.send (items [req.params ['itemID']]);
	});

app.use ('/', router);
app.listen (port);
console.log ('Server up and running');
