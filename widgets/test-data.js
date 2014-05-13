function TestCtrl($scope) {
}

function DatePickerCtrl($scope) {
  $scope.opened = false;
  $scope.open = function($event) {
    $event.preventDefault();
    $event.stopPropagation();

    $scope.opened = true;
  };
}
