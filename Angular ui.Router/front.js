var app = angular.module ('flapperNews', ['ui.router']);

app.config (['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
	$stateProvider
		.state ('home', {
			url: '/home',
			templateUrl: '/home.html',
			controller: 'MainCtrl'
		})
		.state ('posts', {
			url: '/posts/{id}',
			templateUrl: '/posts.html',
			controller: 'PostsCtrl'
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
	$scope.heading = "Flapper News!"
	posts.posts = [
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
	$scope.posts = posts.posts;

	$scope.addPost = function () {
		if ($scope.title === '' || !$scope.title) { return; }
		$scope.posts.push ({
			title: $scope.title,
			link: $scope.link,
			upvotes: 0,
			comments: [
				{author: 'Sola saal ki', body: 'Amazing. I orgased so hard blew mah mothefuckin brains out', upvotes: 0},
				{author: 'Chumma', body: 'Choot chaat le bhosdike', upvotes: 5},
				{author: 'Chatura', body: 'Mera stan man lele', upvotes: 69}
			]
		});
	};

	$scope.upvote = function (post) {
		post.upvotes++;
	};
}]);

app.controller ('PostsCtrl', ['$scope', '$stateParams', 'posts', function ($scope, $stateParams, posts) {
	$scope.post = posts.posts [$stateParams.id];
}]);
