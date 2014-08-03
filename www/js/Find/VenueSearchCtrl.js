angular.module('drinkon').controller('VenueSearchCtrl', function($scope, $stateParams, LocationSvc) {

  $scope.location = LocationSvc.findById($stateParams.location);

});