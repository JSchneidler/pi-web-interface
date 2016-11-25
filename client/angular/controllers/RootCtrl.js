app.run(['$rootScope', '$interval', '$http', 'Terminal', function($rootScope, $interval, $http, Terminal) {
	$rootScope.info = {};
  $rootScope.user = {
    username: 'Jordan'
  };

  $rootScope.executeTerminalCmd = Terminal.execute;

  $rootScope.$on('socket:global.info', handleInfoStream);

  $rootScope.$on('socket:global.time', handleInfoStream);

  function handleInfoStream(event, data) {
    if (!data.success) {
      return;
    }

    _.assign($rootScope.info, data.data);
  }
}]);
