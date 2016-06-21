var mongoose = require ('mongoose'),
	Schema = mongoose.Schema,
	OID = Schema.Types.ObjectId;

var main = new Schema ({
	refs: [{type: String, ref: 'sub'}]
});
var sub = new Schema ({
	text: String
});

mongoose.model ('main',main,'main');
mongoose.model ('sub',sub,'sub');

mongoose.connect ('mongodb://localhost:27017/test');
mongoose.connection.once('open', function () {
	var main = mongoose.model ('main');
	var sub = mongoose.model ('sub');

//	console.log (main);
//	main.find(function (err, res) { console.log (err, JSON.stringify (res,null,2)); });

	main.find ().populate ('refs').exec (function (err, result) {
		console.log (err);
		console.log (JSON.stringify (result,null,2));
	});
});
