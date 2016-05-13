var MyObject = function (params) {
  //make sure new MyObject () is returned, regardless of whether user calls new MyObject () or MyObject () (as a function)
  if (! (this instanceof MyObject) ) { return new MyObject (params); }
  
  this.params = params;
};

var x = new MyObject (100);
var y = MyObject (200);   //also creates a new object

//both have the same effect
