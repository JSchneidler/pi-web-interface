app.directive('terminal', [function() {
  return {
    scope: {},
    restrict: 'E',
    controller: ['$scope', 'Terminal', function($scope, Terminal) {
      Terminal.Socket.forward('terminal.output', $scope);

      $scope.execute = function(cmd) {
          if (cmd == 'clear') return console.log('clearing');// TODO: Clear browser terminal
                  
          Terminal.execute(cmd);
      };

      $scope.$on('socket:terminal.output', function(event, data) {
        if (!data.success) return Alert.add('danger', 'Terminal Error', 'An error occurred while executing');

        console.log(data);
      });
    }],
    templateUrl: '/angular/templates/terminal.html'
  };
}]);
