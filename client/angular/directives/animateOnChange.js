app.directive('animateOnChange', ['$animate', '$timeout', function($animate, $timeout) {
  function playUpdateAnimation(element) {
    $(element).addClass('update-success');
    $timeout(function() {
      $(element).removeClass('update-success');
    }, 750);
  }

  return {
    restrict: 'A',
    link: function(scope, element, attrs) {
      scope.$watch(attrs.ngBind, function(n, o) {
        //if (n !== o) playUpdateAnimation(element);
        // For some reason all this does is prevent it from playing
        // the animation the first time its bound. It still only plays
        // the animation when there's an actual difference in the data.
        playUpdateAnimation(element);
      });
    }
  };
}]);
