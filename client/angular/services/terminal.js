app.service('Terminal', ['$rootScope', 'Socket', function($rootScope, Socket) {
  var api = {};

  api.Socket = Socket;

  api.execute = function(cmd) {
    Socket.emitWithUser('terminal.input', cmd);
  };

  return api;
}]);
