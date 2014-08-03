angular.module('drinkon').controller('VenueDetailsCtrl', function($scope, $stateParams, VenueSvc) {

  $scope.venue = VenueSvc.findById($stateParams.venue);

});