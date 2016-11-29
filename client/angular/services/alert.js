app.service('Alert', ['$rootScope', function($rootScope) {
  var api = {};

  $rootScope.alerts = [];
  
  api.add = function(type, message) {
    $rootScope.alerts.push({
      type: type,
      message: message
    });
  };
  
  return api;
}]);
