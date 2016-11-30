app.service('Socket', ['$rootScope', 'socketFactory', function($rootScope, socketFactory) {
  //localStorage.debug = 'socket.io-client:socket';
  localStorage.debug = null;

  var socketFactory = socketFactory();

  socketFactory.emitWithUser = function(event, data) {
    socketFactory.emit(event, data, $rootScope.user);
  };

  return socketFactory;
}]);
