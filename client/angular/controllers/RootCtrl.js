app.run(['$rootScope', '$interval', '$http', 'Terminal', function($rootScope, $interval, $http, Terminal) {
	$rootScope.info = {};
  $rootScope.user = {
    username: 'Jordan'
  };

  var systemPolls = [getSystemInfo];

  poll(systemPolls);
	$interval(function() {
    poll(systemPolls);
  }, 2500);	

  $rootScope.executeTerminalCmd = Terminal.execute;

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
