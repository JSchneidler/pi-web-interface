app.directive('animateOnChange', ['$animate', '$timeout', function($animate, $timeout) {
  function playUpdateAnimation(element) {
    $(element).addClass('update-success');
    $timeout(function() {
      $(element).removeClass('update-success');
    }, 2000);
  }

  return {
    restrict: 'A',
    link: function(scope, element, attrs) {
      scope.$watch(attrs.ngBind, function(n, o) {
        if (n !== o) playUpdateAnimation(element);
      });
    }
  };
}]);
