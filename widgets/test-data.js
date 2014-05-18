function TestCtrl($scope) {
  $scope.formInfo = {
  };
}

function CardCtrl($scope) {
  $scope.configButtons = [
    {icon: 'dropbox', tooltip: 'This is a test', click: function() {
      alert("I have clicked dropbox");
    }, template: null},
    {icon: 'cloud', tooltip: 'This is a test', click: function() {
      alert("I have clicked cloud");
    }, template: null},
    {icon: 'box', tooltip: 'This is a test', click: function() {
      alert("I have clicked box");
    }, template: null}
  ];
  $scope.trigger = function(msg) {
    alert("I have been triggered" + msg);
  }
}
