app.run(['Socket', function(Socket) {
  // Forward global events
  Socket.forward('global.info');
  Socket.forward('global.time');
}]);
