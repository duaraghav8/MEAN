var object = function () {
	this.value = null;
};
object.prototype = {
	setValue : function (value) {
		this.value = value;
	},
	equals : function (other) {
		if (other == null || this.constructor != other.constructor) { return (false); }
		return (this.value == other.value);
	},
	compareTo : function (other) {
		if (other == null || this.constructor != other.constructor) {
			throw new Error ('Incompatible types');
		}
		return (this.value - other.value);
	}
};
object.greet = function () { console.log ('Hello world'); };

object.greet ();
var a = new object ();
var b = new object ();

a.setValue (192);
b.setValue (197);

var array = [b, a];
console.log (array);
console.log (a.compareTo (b) < 0);
array.sort (function (a, b) {
	return (a.compareTo (b));
});
console.log (array);