angular.module("ui.inigma", ["ui.inigma.panel"]);

angular.module("ui.inigma.panel", []).directive("uiPanel", [function() {
  return {
    restrict: 'EA',
    transclude: true,
    replace: false,
    scope: {
      title: '@',
      type: '@'
    },
    template: '<div class="panel panel-{{type || \'primary\'}}"><div class="panel-heading"><h3 class="panel-title">{{title}}</h3></div><div class="panel-body" ng-transclude></div></div>'
  };
}]);
