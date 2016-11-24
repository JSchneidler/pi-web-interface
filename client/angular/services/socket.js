app.service('Socket', ['socketFactory', function(socketFactory) {
  return socketFactory();
}]);
