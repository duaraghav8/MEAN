var EventEmitter = require ('events').EventEmitter,
    util = require ('util');

var object = function () {
  this.local = 100;
};
util.inherits (object, EventEmitter);
object.prototype.callEvent = function () {
  this.emit ('fucked', 'we are fucked');
};

var x = new object ();
x.on ('fucked', function (message) {
  console.log ('Fuck. Message: ', message);
});

console.log ('Testing');
setTimeout (function () {
  x.callEvent ();
}, 1000);
