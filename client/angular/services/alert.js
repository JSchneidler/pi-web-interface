app.service('Alert', ['$rootScope', function($rootScope) {
  var api = {};
  var id = 0;

  // Convert $rootScope.alerts to an array if it isn't one already
  if (!_.isArray($rootScope.alerts)) $rootScope.alerts = [];

  api.add = function(type, title, message) {
    id++;
    $rootScope.alerts.push({
      id: id,
      type: type,
      title: title,
      message: message
    });
  };

  api.remove = function(id) {
    var index = _.findIndex($rootScope.alerts, function(alert) {
      return id == alert.id;
    });

    $rootScope.alerts.splice(index, 1);
  };
  
  return api;
}]);
