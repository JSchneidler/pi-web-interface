app.directive('lineChart', [function() {

  function fillAndPadArray(array, data, filler = 0) {
    array.fill(filler);
    for (var i = 0; i < data.length; i++) {
      array.push(data[i]);
      array.shift();
    }
    return array;
  }

  return {
    scope: {
      stats: '='
    },
    restrict: 'E',

    controller: ['$scope', function($scope) {
      console.log($scope.stats);
    }],

    link: function($scope, elem, attrs) {
      console.log(angular.copy($scope.stats));
      // Setup display sizes
      var margins = { top: 20, right: 20, bottom: 30, left: 50 };
      var width = $('.d3-line-chart').width();
      var height = width*3/4; - margins.bottom;

      // Define timespan for graph
      var limit = 60 * 1;
      var duration = 750;
      var now = new Date(Date.now() - duration);

      // Setup data for display. TODO: Support multiple measurements, create this from directive attributes
      var data = {
        name: 'cpu',
        value: 0,
        color: 'blue',
        data: fillAndPadArray(new Array(limit), $scope.stats.cpu)
      };
      console.log(data.data);

      // Scales
      var x = d3.time.scale().domain([now - (limit - 2), now - duration]).range([0, width]);
      var y = d3.scale.linear().domain([0, 100]).range([height, 0]);
      // Define line function
      var line = d3.svg.line()
        .interpolate('basis')
        .x(function(d, i) {
          return x(now - (limit - 1 - i) * duration);
        })
        .y(function(d) {
          return y(d);
        });
      // Create svg for graph
      var svg = d3.select('.d3-line-chart').append('svg')
        .attr('class', 'chart')
        .attr('width', width)
        .attr('height', height + 30);
      // Create x-axis
      var axis = svg.append('g')
        .attr('class', 'x-axis')
        .attr('transform', 'translate(0,' + height + ')')
        .call(x.axis = d3.svg.axis().scale(x).orient('bottom'));
      // Create group in svg for paths
      var paths = svg.append('g');
      // Initialize lines
      data.path = paths.append('path')
        .data([data.data])
        .attr('class', data.name + ' group')
        .style('stroke', data.color);
      /* TODO: Support multiple paths, read from attributes of directive
      $.each($scope.groups.stats, function(name, stat) {
        stat.path = paths.append('path')
          .data([stat.data])
          .attr('class', name + ' group')
          .style('stroke', stat.color);
      });
      */

      function tick() {
        now = new Date();

        // Add new values
        data.data.push(Math.random() * 100);
        data.path.attr('d', line);
        /* TODO: Support multiple paths
           TODO: Render new data
        $.each($scope.groups.stats, function(name, stat) {
          stat.data.push(20 + Math.random() * 100);
          stat.path.attr('d', line);
        });
        */

        // Shift domain
        x.domain([now - (limit - 2) * duration, now - duration]);

        // Slide x-axis left
        axis.transition()
          .duration(duration)
          .ease('linear')
          .call(x.axis);

        // Slide paths left
        paths.attr('transform', null)
          .transition()
          .duration(duration)
          .ease('linear')
          .attr('transform', 'translate(' + x(now - (limit - 1) * duration) + ')')
          .each('end', tick);

        // Remove oldest data point. TODO: Support multiple paths
        data.data.shift();
        /*
        $.each($scope.groups.stats, function(name, stat) {
          stat.data.shift();
        });
        */
      }

      tick();
    },

    templateUrl: '/angular/templates/line-chart.html'
  };
}]);
