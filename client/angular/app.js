var app = angular.module('app', [
	'ui.router',
  'btford.socket-io'
  'ngAnimate'
]);

app.config(['$stateProvider', '$urlRouterProvider', '$locationProvider', function($stateProvider, $urlRouterProvider, $locationProvider) {

	$locationProvider.html5Mode(true);

	$urlRouterProvider.otherwise('/');

	$stateProvider
		.state('dashboard', {
			url: '/',
			templateUrl: 'angular/views/dashboard.html'
		});

}]);
