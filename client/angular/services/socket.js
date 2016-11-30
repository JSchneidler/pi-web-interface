app.service('Socket', ['$rootScope', 'socketFactory', function($rootScope, socketFactory) {
  //localStorage.debug = 'socket.io-client:socket';

  var socketFactory = socketFactory();

  socketFactory.forward('global.info');
  socketFactory.forward('global.time');

  socketFactory.emitWithUser = function(event, data) {
    socketFactory.emit(event, data, $rootScope.user);
  };

  return socketFactory;
}]);
