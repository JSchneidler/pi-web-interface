app.directive('lineChart', [function() {
  return {
    scope: {
      data: '='
    },
    restrict: 'E',

    controller: ['$scope', function($scope) {
      console.log($scope.data);
    }],

    link: function($scope, elem, attrs) {
      var margins = { top: 20, right: 20, bottom: 30, left: 50 };
      var width = $('.d3-line-chart').width() - margins.left - margins.right;
      var height = width*3/4 - margins.top - margins.bottom;
      var step = 10;

      var domainScaleFn = d3.scaleLinear().domain([0, width/step]).rangeRound([0, width]);
      var rangeScaleFn = d3.scaleLinear().domain([0, 100]).rangeRound([height, 0]);

      var xAxis = d3.axisBottom(domainScaleFn).ticks(20, "s");

      var yAxis = d3.axisLeft(rangeScaleFn);

      var line = d3.line()
        .x(function(d, i) { return domainScaleFn(i); })
        .y(function(d) { return rangeScaleFn(d); });

      var graph = d3.select('.d3-line-chart').append('svg')
        .attr('width', width + margins.left + margins.right)
        .attr('height', height + margins.top + margins.bottom)
        .append('svg:g')
        .attr('transform', 'translate(' + margins.left + ',' + margins.bottom + ')');

      graph.append('svg:g')
        .attr('class', 'x-axis')
        .attr('transform', 'translate(0,' + height + ')')
        .call(xAxis);

      graph.append('svg:g')
        .attr('class', 'y-axis')
        //.attr('transform', 'translate(-5,0)')
        .call(yAxis);

      graph.append('svg:path').attr("class", "line").attr("d", line($scope.data));

      console.log(graph);
    },

    templateUrl: '/angular/templates/line-chart.html'
  };
}]);
