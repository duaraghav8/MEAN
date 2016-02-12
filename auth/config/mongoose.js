var mongoose = require ('mongoose'),
	bcrypt = require ('bcrypt'),
	Schema = mongoose.Schema;

mongoose.connect ('mongodb://localhost:27017/users');
mongoose.connection.once ('open', function () {
	console.log ('Mongoose connection up');
});

var UserSchema = new Schema ({
	local: {
		email: String,
		password: String
	},
	facebook: {
		id: String,
		token: String,
		email: String,
		name: String
	}
});
UserSchema.methods.generateHash = function (password) {
	return (bcrypt.hashSync (password, bcrypt.genSaltSync (8), null));
};
UserSchema.methods.validPassword = function (password) {
	return (bcrypt.compareSync (password, this.local.password));
};

var UserModel = mongoose.model ('credentials', UserSchema);