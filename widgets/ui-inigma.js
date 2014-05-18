angular.module("ui.inigma", ["ui.inigma.card", "ui.inigma.flip", "ui.inigma.panel", "ui.inigma.picker", "ui.inigma.tags"]);

angular.module("ui.inigma.panel", []).directive("uiPanel", [function() {
  return {
    restrict: 'EA',
    transclude: true,
    replace: false,
    scope: {
      header: '@',
      type: '@'
    },
    template: '<div class="panel panel-{{type || \'default\'}}"><div class="panel-heading"><h3 class="panel-title">{{header}}</h3></div><div class="panel-body" ng-transclude></div></div>'
  };
}]).directive("uiCallout", [function() {
  return {
    restrict: 'EA',
    transclude: true,
    replace: false,
    scope: {
      header: '@',
      type: '@'
    },
    template: '<div class="callout callout-{{type || \'default\'}}"><h4 class="text-{{type || \'default\'}}">{{header}}</h4><div class="callout-body" ng-transclude></div></div>'

  }
}]);

angular.module("ui.inigma.flip", []).directive("flippable", [function() {
  return {
    restrict: 'A',
    transclude: true,
    replace: false,
    template: '<div class="flippable"><div class="flipper" ng-class="{active: active}" ng-click="flip()"><div ng-transclude></div><div class="clearfix">&nbsp;</div></div></div>',
    controller: function($scope) {
      $scope.flip = function() {
        $scope.active = !$scope.active;
      }
    }
  }
}]);

angular.module("ui.inigma.card", ["ui.inigma.panel", "ngAnimate"]).directive("uiCard", [function() {

}]).directive("uiCardTest", [function() {
  function CardConfigurationCtrl($scope) {
  }

  return {
    restrict: 'EA',
    transclude: true,
    replace: false,
    scope: {
      header: '@',
      type: '@',
      buttons: '='
    },
    controller: CardConfigurationCtrl,
    template: '<div class="panel panel-{{type || \'primary\'}}"><div class="panel-heading"><h3 class="panel-title">{{header}}<i class="fa fa-bars pull-right" ng-show="buttons" ng-click="showConfigs = !showConfigs"></i></h3></div><div class="panel-body animatein" ng-transclude ng-hide="showConfigs"></div><div class="panel-body animatein" ng-show="showConfigs"><div class="pull-left hpadding" ng-repeat="button in buttons"><i class="fa fa-{{button.icon}} fa-5x" tooltip-html-unsafe="{{button.tooltip}}" ng-click="button.click()"></i></div></div></div>'
  }
}]);

angular.module("ui.inigma.picker", []).directive("uiDatePicker", [function() {
  return {
    restrict: 'EA',
    replace: false,
    scope: {
      model: '=',
      placeholder: '@'
    },
    template: '<input type="date" x-ng-model="model" x-datepicker-popup x-datepicker-options="dateOptions" x-is-open="open" x-ng-click="popup($event)" placeholder="{{placeholder}}" x-show-button-bar="false">',
    controller: function($scope) {
      $scope.open = false;
      $scope.dateOptions = {
        formatYear: 'yyyy-MM-dd',
        showWeeks: false,
        showButtonBar: false
      };
      $scope.popup = function($event) {
        $event.preventDefault();
        $event.stopPropagation();

        $scope.open = true;
      };
    }
  }
}]);

angular.module("ui.inigma.tags", []).directive("uiTags", [function() {
  return {
    restrict: 'EA',
    replace: true,
    transclude: true,
    scope: {
      model: '='
    },
    template: '',
    controller: function($scope) {

    }
  }
}]);
