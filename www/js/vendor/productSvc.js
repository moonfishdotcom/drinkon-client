angular.module('drinkon').factory('productSvc', ['apiRoot', '$http', function(apiRoot, $http) {
  return {
    getProductsForVendorWithId: function(vendorId) {
      console.log(vendorId);
      return $http.get(apiRoot + '/vendor/' + vendorId + '/product');
    }
  };
}]);
