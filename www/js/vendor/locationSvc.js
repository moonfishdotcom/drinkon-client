angular.module('drinkon').factory('locationSvc', function(apiRoot, $http) {
  return {
    getLocations: function() {
      return $http.get(apiRoot + '/location');
    },

    getLocationWithId: function(locationId) {
      return $http.get(apiRoot + '/location/' + locationId);
    }
  };
})