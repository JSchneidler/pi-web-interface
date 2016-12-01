app.directive('terminal', [function() {
  return {
    scope: {},
    restrict: 'E',

    controller: ['$scope', '$sanitize', 'Terminal', 'Alert', function($scope, $sanitize, Terminal, Alert) {
      Terminal.Socket.forward('terminal.output', $scope);

      $scope.output = '';
      $scope.clear = true;

      $scope.$on('socket:terminal.output', function(event, data) {
        outputToConsole(data.data);
      });

      $scope.execute = function(cmd) {
        if (!cmd) return;
        
        // Check if clearing console or executing command
        if (cmd == 'clear') clearConsole();
        else {
          outputToConsole(cmd, true);
          Terminal.execute(cmd);
        }
        // Check if user wants to save input
        if ($scope.clear) $scope.cmd = '';
      };

      function clearConsole() {
        $scope.output = '';
      }

      function outputToConsole(data, input) {
        input = input ? input : false;

        data = input ? '<p class="text-danger">YOU: ' + data + '</p>\n' : '<p>' + data + '</p>';
        data = $sanitize(data);

        $scope.output += data;
      }
    }],

    link: function($scope, elem, attrs) {
      var input = elem.find('input');
      var output = elem.find('.terminal-output');
      
      var rows = attrs.rows ? attrs.rows : 5;
      output.css('max-height', rows + 'em');
      output.css('height', rows + 'em');

      // Also execute on enter key press
      input.keypress(function(event) {
        // Firefox doesn't use keyCode, uses which? Ffs Firefox..
        var key = event.keyCode ? event.keyCode : event.which;
        if (key == '13') $scope.execute($scope.cmd);
      });

      // Scroll textarea to bottom when updated
      $scope.$watch('output', function(n, o) {
        if (n == o) return;

        // TODO: Fix this, stops working after certain amount of lines
        output.scrollTop = output[0].scrollHeight;
     });
    },

    templateUrl: '/angular/templates/terminal.html'
  };
}]);
