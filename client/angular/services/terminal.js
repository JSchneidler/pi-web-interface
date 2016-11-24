app.service('Terminal', ['$rootScope', 'Socket', function($rootScope, Socket) {
  var api = {};

  api.execute = function(cmd) {
    Socket.emit('terminal', cmd, $rootScope.user);
  };

  $rootScope.$on('socket:terminal', function(event, data) {
    console.log(event);
    console.log(data);
  });

  return api;
}]);
