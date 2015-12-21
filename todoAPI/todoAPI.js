/*
	TO DO API
	usage:
	curl http://127.0.0.1:3000/api -X GET
	curl http://127.0.0.1:3000/api/1 -X GET
	curl http://127.0.0.1:3000/api/1 -X PUT -H "content-type: application/json" -d "{\"name\" : \"raghav dua\"}"
*/

var express = require ('express');
var bodyParser = require ('body-parser');
var app = express ();
var router = express.Router ();
var port = 3000;
var items = {};

router.use (bodyParser.json ());
router.route ('/')
	.get (function (req, res) {
		console.log (req.originalUrl + ' called GET');
		res.send (items);
	})
	.delete (function (req, res) {
		items = {};
		console.log ('items cleared');
		res.send ('Items cleared');
	});
router.route ('/:itemID')
	.get (function (req, res) {
		console.log ('Get item ', req.params ["itemID"]);
		res.send (items [req.params ["itemID"]], '\n');
	})
	.put (function (req, res) {
		console.log ('update item ', req.params ["itemID"]);
		items [req.params ["itemID"]] = req.body;
		res.send (req.params ["itemID"], ' updated successfully\n');
	});
app.use ('/api', router);
app.listen (port);

console.log ('Server up and running');
