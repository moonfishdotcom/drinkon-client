angular.module('drinkon').controller('LocationSearchCtrl', function($scope, LocationSvc) {

  $scope.locations = LocationSvc.all();

});