roadrunner.directive('map', function() {
  return {
    templateUrl: 'partials/widgets/map.html'
  };
});

roadrunner.directive('styledSelect', function($compile) {
  return {
    templateUrl: 'partials/widgets/styled_select.html',
    scope: {
      objects: '=',
      modelValue: '=',
      idValue: '='
    },
    link: function (scope, element, attrs) {
      scope.$parent.$watch(attrs.modelValue, function(value) {
        if(value) {
          updateSelectedOption(value);
        }
      });

      function updateSelectedOption(value) {
        var elem = element.find('select');
        elem.siblings('.data').html(value.name);
      }
    }
  }
});
