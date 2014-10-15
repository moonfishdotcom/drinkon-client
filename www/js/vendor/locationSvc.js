angular.module('drinkon').factory('locationSvc', ['apiRoot', '$q', '$http', function(apiRoot, $q, $http) {
  return {
    getLocations: function() {
      var defer = $q.defer();

      $http.get(apiRoot + '/location')
        .then(function(result) {
          defer.resolve(result.data);
        }, function(err) {
          defer.reject(err);
        });

      return defer.promise;
    },

    getLocationWithId: function(locationId) {
      var defer = $q.defer();

      $http.get(apiRoot + '/location/' + locationId)
        .then(function(result) {
          defer.resolve(result.data);
        }, function(err) {
          defer.reject(err);
        });

      return defer.promise;
    }
  };
}]);
