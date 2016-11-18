app.run(['$rootScope', '$interval', '$timeout', '$http', function($rootScope, $interval, $timeout, $http) {
	$rootScope.info = {};

  var systemPolls = [getSystemInfo];

  $rootScope.$watch('info', function(n, o) {
    for (key in n) {
      var old_stat = o[key];
      var new_stat = n[key];
      if (new_stat == old_stat) continue; 

      var stat = $('#info-'+key);
      stat.addClass('update-success');
      $timeout(function() {
        stat.removeClass('update-success');
      }, 500);
    }
  });

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
