app.directive('alert', ['$rootScope', function($rootScope) {
  return {
    restrict: 'E',
    transclude: true,
    replace: true,
    link: function(scope, element, attrs, ctrl, transclude) {
      var message = transclude().html();
      console.log(message);

      scope.title = attrs.title ? attrs.title : 'Error';
      scope.type = attrs.type ? attrs.type : 'danger';
      scope.message = message ? message : 'An unknown error occurred';
    },
    templateUrl: '/angular/templates/alert.html'
  };
}]);
