angular.module('drinkon').factory('productSvc', function(apiRoot, $http) {
  return {
    getProductsForVendorWithId: function(vendorId) {
      console.log(vendorId);
      return $http.get(apiRoot + '/vendor/' + vendorId + '/product');
    }
  };
})