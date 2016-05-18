/*
	Replace all instances of a substring in a string with a particular string
*/

function replaceAll (target, searchTerm, replacement) {
	return target.replace (/ /g, replacement);
};

/*
	API:

	var myString = 'Mother of the Dragons';
	myString = replaceAll (myString, ' ', '!');
*/

//alternatively

String.prototype.replaceAll = function (searchTerm, replacement) {
	var target = this;
	return target.replace (/ /g, replacement);
};

/*
	API:

	var myString = 'Mother of the Dragons';
	myString = myString.replaceAll (' ', '!');
*/
