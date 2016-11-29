app.run(['$rootScope', 'Terminal', function($rootScope, Terminal) {
  $rootScope.alerts = [];
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
