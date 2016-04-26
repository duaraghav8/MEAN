/*
	Pseudo-Classical Pattern to implement inheritence (Subclass-Superclass Pattern)
*/

var Car = function (loc) {
	this.loc = loc;
};

Car.prototype = {
	move: function () {
		this.loc++;
	},
	getMoves: function () {
		return (this.loc);
	}
};

var Van = function (loc) {
	Car.call (this, loc);
};

Van.prototype = Object.create (Car.prototype);
Van.prototype.constructor = Van;
Van.prototype.grab = function () { console.log ("grabbed a van-tastic"); };

var myCar = new Car (10);
var myVan = new Van (20);

for (var i = 0; i < 4; i++) { myVan.move (); }
console.log (myVan.getMoves ());
