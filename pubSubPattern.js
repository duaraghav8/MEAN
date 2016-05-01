var Publisher = function () {
	this.items = [];
	this.subscribers = [];
};

Publisher.prototype = {
	publish: function (content) {
		this.items.push (content);
		this.subscribers.forEach (function (sub) {
			sub.callback.call (sub.subscriberObject, content);
		});
	},
	subscribe: function (subscriberObject, callback) {
		this.subscribers.push ({
			subscriberObject: subscriberObject,
			callback: callback
		});
	}
};

var Subscriber = function () {
	this.items = [];
};

Subscriber.prototype = {
	consume: function (newContent) {
		console.log (this.items);
		this.items.push (newContent);
		console.log ('New content in market: ', newContent);
	}
};

var bloom = new Publisher ();
var harry = new Subscriber ();

bloom.subscribe (harry, harry.consume);

setTimeout (function () {
	bloom.publish ('fuck me in the eyes i like it');
}, 1000);
setTimeout (function () {
	bloom.publish ('mere jasbaaton ne mujhe chod diya');
}, 2000);