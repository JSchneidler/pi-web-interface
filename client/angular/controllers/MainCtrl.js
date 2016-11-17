app.controller('MainCtrl', ['$scope', '$interval', '$http', function($scope, $interval, $http) {
	$scope.hostname = { hostname: "No Hostname" };

	getHostname();
	$interval(getHostname, 2500, true);

	function getHostname() {
		$scope.hostname.hostname = "Connecting...";
		$http.get('/api/system/hostname').then(function(response) {
			console.log(response.data.data);
			$scope.hostname.hostname = response.data.data.hostname;
			console.log($scope.hostname);
		});
	}
}]);
