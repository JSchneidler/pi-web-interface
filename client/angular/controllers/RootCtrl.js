app.run(['$rootScope', '$interval', '$http', function($rootScope, $interval, $http) {
	$rootScope.hostname = '';

	getHostname();
	$interval(getHostname, 2500);

	function getHostname() {
		$http.get('/api/system/hostname').then(function(response) {
			var hostname = response.data.data.hostname;
			if ($rootScope.hostname == hostname) return;
			$rootScope.hostname = response.data.data.hostname;
		});
	}
}]);
