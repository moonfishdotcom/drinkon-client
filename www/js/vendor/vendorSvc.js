angular.module('drinkon').factory('vendorSvc', ['apiRoot', '$http', '$q', function(apiRoot, $http, $q) {
  return {
    getVendors: function() {
      var defer = $q.defer();

      $http.get(apiRoot + '/vendor')
        .then(function(result) {
          defer.resolve(result.data);
        }, function(err) {
          defer.reject(err);
        });

      return defer.promise;
    },

    getVendorWithId: function(vendorId) {
      var defer = $q.defer();

      $http.get(apiRoot + '/vendor/' + vendorId)
        .then(function(result) {
          defer.resolve(result.data);
        }, function(err) {
          defer.reject(err);
        });

      return defer.promise;
    }

  };
}]);
