angular.module('drinkon').controller('VendorDetailsCtrl', function($scope, $stateParams, vendor, $state, OrderStateSvc, orderResource) {

  $scope.vendor = vendor;

  $scope.makeOrder = function() {
    orderResource.save();
    OrderStateSvc.reset();
    OrderStateSvc.vendorId = $scope.vendor.id;
    $state.go('app.order.new', {});
  }

});