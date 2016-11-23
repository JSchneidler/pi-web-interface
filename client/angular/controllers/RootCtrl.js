app.run(['$rootScope', '$interval', '$timeout', '$http', function($rootScope, $interval, $timeout, $http) {
	$rootScope.info = {};

  var systemPolls = [getSystemInfo];

  poll(systemPolls);
	$interval(function() {
    poll(systemPolls);
  }, 2500);	

  function poll(polls) {
    for(var i = 0; i < polls.length; i++) {
      polls[i].call();
    }
  }

  function getSystemInfo() {
    $http.get('/api/system').then(function(response) {
      if (response.data.error) return;
      $rootScope.info = response.data.data;
    });
  }
}]);
