angular.module('drinkon').factory('locationResource', function(apiRoot, $resource) {
  return $resource(apiRoot + '/location/:locationId', { locationId: '@locationId' });
});

angular.module('drinkon').factory('vendorResource', function(apiRoot, $resource) {
  return $resource(apiRoot + '/vendor/:vendorId', { vendorId: '@vendorId' });
});

angular.module('drinkon').factory('productResource', function(apiRoot, $resource) {
  return $resource(apiRoot + '/vendor/:vendorId/product', { vendorId: '@vendorId' });
});

angular.module('drinkon').factory('orderResource', function(apiRoot, $resource) {
  return $resource(apiRoot + '/order', {});
});