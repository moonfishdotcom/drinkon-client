angular.module('drinkon').controller('OrderProductTypeCtrl', function($scope, vendor, products, OrderStateSvc, $state) {
  $scope.vendor = vendor;
  $scope.products = products;

  $scope.selectProductType = function(productType) {
    OrderStateSvc.productType = productType.name;
    console.log(OrderStateSvc.productType);
    $state.go('.product', {});
  };
});

angular.module('drinkon').controller('OrderProductItemCtrl', function($scope, vendor, products, OrderStateSvc, $state) {
  console.log('yo');
  $scope.productType = _.find(products.productTypes, { name: OrderStateSvc.productType });
});