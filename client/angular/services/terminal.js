app.service('Terminal', ['$rootScope', 'Socket', function($rootScope, Socket) {
  var api = {};

  Socket.forward('terminal');

  $rootScope.$on('socket:terminal', function(event, data) {
    console.log(event);
    console.log(data);
  });

  api.execute = function(cmd) {
    Socket.emitWithUser('terminal', cmd);
  };

  return api;
}]);
