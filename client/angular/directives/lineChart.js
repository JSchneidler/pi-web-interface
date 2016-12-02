app.directive('lineChart', [function() {
  return {
    scope: {
      data: '='
    },
    restrict: 'E',

    controller: ['$scope', function($scope) {
      console.log($scope.data);
    }],

    link: function(scope, elem, attrs) {
      var graph = d3.select('svg');
      console.log(graph);
    },

    templateUrl: '/angular/templates/line-chart.html'
  };
}]);
