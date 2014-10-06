angular.module('drinkon').factory('vendorSvc', function(apiRoot, $http) {
  return {
    getVendorWithId: function(vendorId) {
      return $http.get(apiRoot + '/vendor/' + vendorId);
    }
  };
})