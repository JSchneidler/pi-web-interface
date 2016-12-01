app.directive('flashOnChange', ['$animate', '$timeout', function($animate, $timeout) {
  function playUpdateAnimation(element) {
    var cssClass = 'update-success';
    if (element.is("div")) cssClass = 'update-success-div';

    element.addClass(cssClass);
    $timeout(function() {
      element.removeClass(cssClass);
    }, 750);
  }

  return {
    restrict: 'A',
    link: function(scope, element, attrs) {
      var model;
      if (attrs.ngModel) model = attrs.ngModel;
      else if (attrs.ngBind)  model = attrs.ngBind;
      else if (attrs.ngBindHtml) model = attrs.ngBindHtml;

      if (!model) return console.log('Incompatible binding with animate-on-change directive');

      scope.$watch(model, function(n, o) {
        //if (n !== o) playUpdateAnimation(element);
        // For some reason all this does is prevent it from playing
        // the animation the first time its bound. It still only plays
        // the animation when there's an actual difference in the data.
        if (!n) return;
        playUpdateAnimation(element);
      });
    }
  };
}]);
