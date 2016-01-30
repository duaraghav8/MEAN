var app = angular.module ('flapperNews', ['ui.router']);

app.config ([
	'$stateProvider',
	'$urlRouterProvider',
	function ($stateProvider, $urlRouterProvider) {
		$stateProvider.state ('home', {
			url: '/home',
			templateUrl: '/home.html',
			controller: 'MainCtrl'
		});

	$urlRouterProvider.otherwise ('home');
}]);

app.factory ('posts', function () {
	var object = {
		posts: []
	};
	return (object);
});

app.controller ('MainCtrl', ['$scope', 'posts', function ($scope, posts) {
	$scope.posts = posts.posts;
	$scope.heading = "Flapper News!"
	$scope.posts = [
		{
			title: 'Post 1',
			link: 'http://localhost:8080/',
			upvotes: 3
		},
		{
			title: 'Post 2',
			link: 'http://localhost:8080/',
			upvotes: 6
		},
		{
			title: 'Post 1',
			link: 'http://localhost:8080/',
			upvotes: 19
		}
	];

	$scope.addPost = function () {
		if ($scope.title === '' || !$scope.title) { return; }
		$scope.posts.push ({
			title: $scope.title,
			link: $scope.link,
			upvotes: 0
		});
	};

	$scope.upvote = function (post) {
		post.upvotes++;
	};
}]);
