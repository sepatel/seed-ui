angular.module("ui.inigma", ["ui.inigma.card", "ui.inigma.flip", "ui.inigma.form", "ui.inigma.panel",
  "ui.inigma.picker", "ui.inigma.tags"]);

/*
angular.module("ui.table", []).directive("fixedHeaders", ['$timeout', '$window', function($timeout, $window) {
  return {
    restrict: 'EA',
    replace: false,
    scope: {
      rows: '=watch'
    },
    transclude: true,
    template: '<div><div class="fixedHeader" style="white-space: nowrap; position: absolute;"></div><div ng-transclude></div></div>',
    link: function(scope, elem, attr, ctrl) {
      function initialize() {
        $timeout(function() {
          var table = elem.find("table").one();
          var thead = table.find("thead").one();
          var tr = thead.find("tr").one();

          thead.height(thead.outerHeight());

          var headerDiv = elem.find("div.fixedHeader").one();
          headerDiv.empty();
          console.info("headerDiv is ", headerDiv);
          headerDiv.width(thead.innerWidth());
          headerDiv.height(thead.innerHeight());
          headerDiv.css('background-color', tr.css('background-color'));

          // wrap the the contents of th
          tr.find("th").filter(":not(span.fixedHeaderWrapping)").each(function(index, th) {
            th = angular.element(th);
            if (th.find("span.fixedHeaderWrapping").length == 0) {
              console.info("I feel a need to wrap", th);
              th.wrapInner('<span class="fixedHeaderWrapping">');
            }
          });

          tr.find("th").each(function(index, th) {
            th = angular.element(th);
            var wrapping = th.find("span.fixedHeaderWrapping").one();
            var span = wrapping.clone(true);
            span.width(th.outerWidth()).height(th.outerHeight()).css('display', 'inline-block').css('white-space', th.css('white-space'));
            angular.forEach(['top', 'bottom', 'left', 'right'], function(direction) {
              span.css('padding-' + direction, th.css('padding-' + direction));
              span.css('margin-' + direction, th.css('margin-' + direction));
              span.css('border-' + direction, th.css('border-' + direction));
            });
            headerDiv.append(span);
          });
        });
      }

      angular.element($window).bind('resize', initialize);

      scope.$watch('rows', initialize, true);
    }
  }
}]);
*/

angular.module("ui.inigma.form", []).directive("uiFormInput", [function() {
  var internalId = 1;
  return {
    restrict: 'EA',
    transclude: true,
    replace: false,
    scope: {
      label: '@',
      span: '@',
      type: '@',
      model: '='
    },
    controller: function($scope) {
      console.info("Scope is ", $scope);
      $scope.internalFormId = internalId++;
      $scope.labelSpan = $scope.span || 2;
      $scope.inputSpan = 12 - $scope.labelSpan;
    },
    /*
     link: function(scope, elem, attr) {
     scope.internalFormId = internalId++;
     console.info("Linking with form id of ", internalId, scope.internalFormId);
     scope.label = attr.label;
     scope.labelSpan = attr.span || 2;
     scope.inputSpan = 12 - scope.labelSpan;
     }, */
    template: '<div class="form-group"><label for="internalForm{{internalFormId}}" class="col-lg-{{labelSpan}} control-label">{{label}}</label><div class="col-lg-{{inputSpan}}"><input type="{{type}}" class="form-control" id="internalForm{{internalFormId}}" placeholder="{{label}}" ng-model="model"></div></div>'
  }
}]);

angular.module("ui.inigma.panel", []).directive("uiPanel", [function() {
  return {
    restrict: 'EA',
    transclude: true,
    replace: false,
    scope: {
      header: '@',
      footer: '@',
      type: '@'
    },
    template: '<div class="panel panel-{{type || \'default\'}}"><div class="panel-heading" ng-show="header"><h3 class="panel-title">{{header}}</h3></div><div class="panel-body" ng-transclude></div><div class="panel-footer" ng-show="footer">{{footer}}</div></div>'
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

angular.module("ui.inigma.picker", ["ui.bootstrap"]).directive("uiDatePicker", [function() {
  return {
    restrict: 'EA',
    replace: false,
    scope: {
      model: '=',
      placeholder: '@'
    },
    template: '<input type="text" x-ng-model="model" x-datepicker-popup x-datepicker-options="dateOptions" x-is-open="open" x-ng-click="popup($event)" placeholder="{{placeholder}}" x-show-button-bar="false">',
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
