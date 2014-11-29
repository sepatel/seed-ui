(function(angular) {
  angular.module("ngFixedHeaders", []).directive("fixedHeaders", ['$timeout', '$window', function($timeout, $window) {
    return {
      restrict: 'EA',
      replace: false,
      scope: {
        rows: '=watch'
      },
      transclude: true,
      template: '<div style="width: 100%;"><div class="fixedHeader" style="white-space: nowrap; z-index: 1; overflow: hidden; position: absolute;"></div><div ng-transclude></div></div>',
      link: function(scope, elem, attr, ctrl) {
        var table = elem.find("table").one();
        var thead = table.find("thead").one();
        var tr = thead.find("tr").one();

        var headerDiv = elem.find("div.fixedHeader").one();

        elem.parent().on('scroll', function(a, b, c, d) {
          console.info("Did I scroll?", headerDiv.scrollLeft(), $(this).scrollLeft(), a);
          headerDiv.scrollLeft($(this).scrollLeft());
          table.css('margin-top', -1 * $(this).scrollTop + "px");
        });

        function initialize() {
          $timeout(function() {
            thead.height(thead.outerHeight());

            headerDiv.empty();
            //headerDiv.width(thead.innerWidth());
            headerDiv.height(thead.innerHeight());
            headerDiv.css('background-color', tr.css('background-color'));
            headerDiv.css('top', table.offsetParent().position().top);
            table.css('margin-top', -1 * headerDiv.height() + "px");

            // wrap the the contents of th for ease of use
            tr.find("th").filter(":not(span.fixedHeaderWrapping)").each(function(index, th) {
              th = angular.element(th);
              if (th.find("span.fixedHeaderWrapping").length == 0) {
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

        if (attr.watch) { // don't watch if not set
          scope.$watch('rows', initialize, true);
        }
      }
    }
  }]);
}(angular));

