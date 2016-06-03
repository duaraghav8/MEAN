/*
  use aggregate () on model to make JOIN. This script fetches object, sees that it has an array of references (ids in this case, ref attribute need not necessarily be _id),
  fetches those docs as well yayyy!
*/

var mongoose = require ('mongoose'),
	Schema = mongoose.Schema;

var a = new Schema ({
	name: String,
	id: String
});

var c = new Schema ({
  task: String,
  role: String
});

var b = new Schema ({
	ids: [{type: String}],
  roles: Array,
  selfId: String
});

(function () {
  mongoose.connect ('mongodb://localhost:27017/test');
  mongoose.connection.once ('open', function () {
  	function fill () {
  		mongoose.model ('amodel', a, 'amodel');
  		mongoose.model ('bmodel', b, 'bmodel');
      mongoose.model ('cmodel', c, 'cmodel');

  		var aModel = mongoose.model ('amodel');
  		var bModel = mongoose.model ('bmodel');
      var cModel = mongoose.model ('cmodel');

  		new aModel ({name: 'test user', id: "124"}).save (function (err, r) {
		  	console.log (err, r);
	  	});
      new aModel ({name: 'dua', id: "122"}).save (function (err, r) {
        console.log (err, r);
      });
      new aModel ({name: 'raghav', id: "123"}).save (function (err, r) {
        console.log (err, r);
      });
      //-------------------------------------------------------------------

      new cModel ({task: 'dieee', role: '1'}).save (function (err, r) {});
      new cModel ({task: 'jump', role: '2'}).save (function (err, r) {});
      //-------------------------------------------------------------------

  		new bModel ({selfId: '1', ids: ["122", "123","124"], roles: ['1','2']}).save (function (err, r) {
		  	console.log (err, r);
	  	});
  	}

  //fill ();

  	function findData () {
  		mongoose.model ('amodel', a, 'amodel');
  		mongoose.model ('bmodel', b, 'bmodel');

  		var aModel = mongoose.model ('amodel');
  		var bModel = mongoose.model ('bmodel');

  		bModel.aggregate ([
		  	{$match: {selfId: "1"}},   //search criteria

        {'$unwind': '$ids'},

	  		{'$lookup': {
          from: 'amodel',
          localField: 'ids',
          foreignField: 'id',
          as: 'users'
        }},   //parameters

        {'$unwind': '$users'},

        {'$group': {
          "_id": "$_id",
          ids: {'$push': '$ids'},
          users: {'$push': '$users'}
        }}

        //{$project: {id: 1, _id: 0}}   //attributes to include in JOIN's resultant object(s)
  		]).exec (function (err, res) {
	  		console.log ('----------->', err, res [0]);
        console.log ('*****', res [0].users);
        //console.log (res.length);
	  	});
  	}

  findData ();
  });
}) ();
