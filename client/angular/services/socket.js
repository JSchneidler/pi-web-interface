app.service('Socket', ['$rootScope', 'socketFactory', function($rootScope, socketFactory) {
  var socketFactory = socketFactory();

  socketFactory.forward('global.info');
  socketFactory.forward('global.time');

  socketFactory.emitWithUser = function(event, data) {
    socketFactory.emit(event, data, $rootScope.user);
  };

  return socketFactory;
}]);
