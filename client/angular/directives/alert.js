app.directive('alert', [function() {
  return {
    scope: {},
    restrict: 'E',
    replace: true,
    controller: ['$scope', 'Alert', function($scope, Alert) {
      $scope.remove = function() {
        Alert.remove($scope.id);
      };
    }],
    link: function($scope, element, attrs) {
      $scope.id = attrs.id;
      $scope.title = attrs.title ? attrs.title : 'Error';
      $scope.type = attrs.type ? attrs.type : 'danger';
      $scope.message = attrs.message ? attrs.message : 'An unknown error occurred';
    },
    templateUrl: '/angular/templates/alert.html'
  };
}]);
