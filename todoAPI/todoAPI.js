/*
	TODO API
	
	mongo must have database 'todo' with collection 'items'
	----------------------------------------
	use todo
	db.items.insert ({id : 1010, task : 'down with the big brother'})
	----------------------------------------
	
	usage:
	curl http://127.0.0.1:3000/api -X POST -H "content-type: application/json" -d "{\"id\":1982, \"task\":\"move it move it\", \"priority\":1}"
	curl http://127.0.0.1:3000/api/1010 -X GET
*/

var express = require ('express');
var bodyParser = require ('body-parser');
var mongoose = require ('mongoose');

var db;
var app = express ();
var port = 3000;
var itemSchema = mongoose.Schema ({id : 'number', task : 'string', priority : 'number'});
var itemModel = mongoose.model ('items', itemSchema);

mongoose.connect ('mongodb://127.0.0.1:27017/todo');
db = mongoose.connection;

db.on ('error', function (err) {
	if (err) {
		console.log (err);
	}
})
   .once ('open', function () {
	console.log ('Database connection successful');
});

app.use (bodyParser.json ())
   .use (bodyParser.urlencoded ({extended : true}))
   .post ('/api', function (req, res) {
		var newItem = new itemModel ({
			id : req.body.id,
			task : req.body.task,
			priority : req.body.priority
		});
		console.log ('New Item received: ', newItem);

		newItem.save (function (err, successObject) {
			if (err) {
				console.log ('Error pushing Data to MongoDB');
				res.send ('There was an error. request not processed');
			}
			else {
				console.log ('Successfully pushed data to MondoDB');
				res.json (successObject);
			}
		});
	})
    .get ('/api/:id', function (req, res) {
    	itemModel.findOne ({id : req.params ['id']})
    	         .exec (function (err, item) {
    	         	res.json (item);
    	         });
    })
    .listen (port);

console.log ('Server up and running');
