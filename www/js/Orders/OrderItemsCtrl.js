angular.module('drinkon').controller('OrderItemsCtrl', function($scope, $stateParams, InventorySvc) {
  $scope.inventory = InventorySvc.findByVenueId($stateParams.venueId);
});