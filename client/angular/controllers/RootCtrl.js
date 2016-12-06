app.run(['$rootScope', function($rootScope) {
  $rootScope.alerts = [];
	$rootScope.info = {
    cpu: [2, 5, 10, 37, 67, 42, 54, 45, 64, 23, 8, 10, 4, 2, 10, 4, 24, 25, 64, 45, 74, 28, 85, 42, 99, 37, 37, 83, 57, 27, 74, 23, 57]
  };
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
