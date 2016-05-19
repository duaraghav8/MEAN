(function createPolyfill (global) {
	if (Array.prototype.ForEach) { return; }

	Array.prototype.ForEach = function (callback, thisArg) {
		if (typeof callback !== 'function') {
			throw new TypeError (callback + ' is not a function');
		}

		var thisArray = this;

		for (var i = 0; i < thisArray.length; i++) {
			callback.call (thisArg, thisArray [i], i, thisArray);
		}
	};

}) (this);
