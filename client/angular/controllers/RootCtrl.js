app.run(['$rootScope', function($rootScope) {
  $rootScope.alerts = [];
	$rootScope.info = {};
  $rootScope.user = {
    username: 'Jordan'
  };

  $rootScope.$on('socket:global.info', handleInfoStream);
  $rootScope.$on('socket:global.time', handleInfoStream);

  function handleInfoStream(event, data) {
    if (!data.success) return;

    _.assign($rootScope.info, data.data);
  }
}]);
