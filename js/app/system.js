(function(angular) {
  var VERSION_POLLING_FREQUENCY = 1000 * 60 * 15; // 15 minute checks for new release

  var module = angular.module('app.system', ['ssNotify', 'ssStorage']);

  module.service('System', function($rootScope, $http, $log, $window, NotifyService, Storage) {
    var release = +Storage.get('version') || 0;
    var forcedRefresh = Storage.get('forceRefresh') || false;
    if (forcedRefresh) {
      NotifyService.info("Application Update", "Updates have been made to the application", 0);
      Storage.remove('forceRefresh');
    }
    $rootScope.release = release;

    var me = {
      version: release,
      versionCheck: function() {
        $http.get("/version", {params: {t: +new Date()}}).then(function(response) {
          var newVersion = +response.data.release || 0;
          if (newVersion > release) {
            var prevVersion = release;
            $rootScope.release = release = newVersion;
            $rootScope.$broadcast('versionUpgrade', { oldVersion: prevVersion, newVersion: newVersion });

            angular.forEach(+response.data.erase || [], function(key) {
              Storage.remove(key);
            });
            Storage.save('version', release);
            Storage.save('forceRefresh', true);
            $window.location.reload();
          }
        });
      }
    };
    return me;
  });

  module.run(function($interval, System) {
    System.versionCheck(); // check immediately
    $interval(System.versionCheck, VERSION_POLLING_FREQUENCY);
  });
}(angular));
