var Heap = require ('heap');

var object = (function (initial) {
	this.value = initial;
});
object.prototype = {
	setValue : function (v) {
		this.value = v;
	},
	getValue : function () { return (this.value); },
	equals : function (other) {
		if (other == null || this.constructor != other.constructor) { return (false); }
		return (this.value == other.value);
	},
	compareTo : function (other) {
		if (other == null || this.constructor != other.constructor) {
			return (new Error ('Incompatible Types'));
		}
		return (this.value - other.value);
	}
};

var array = [
	new object (8976),
	new object (-19),
	new object (17862),
	new object (-19)
];
var heap = new Heap (function (a, b) {
	return (a.compareTo (b));
});

array.forEach (function (item, pos, arr) {
	heap.push (item);
});

while (heap.nodes.length) {
	console.log (heap.pop ());
}

