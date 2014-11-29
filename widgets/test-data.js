function TestCtrl($scope) {
  $scope.formInfo = {
  };

  $scope.randomLength = "This".split('');
  //$scope.randomLength = "This is a really long length of string with random stuff".split('');
  console.info("This", $scope.randomLength);

  $scope.addRandom = function() {
    $scope.randomLength.push("Sauce");
  }
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
