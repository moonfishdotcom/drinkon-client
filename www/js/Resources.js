angular.module('drinkon').factory('locationResource', function(apiRoot, $resource) {
  return $resource(apiRoot + '/location/:locationId', { locationId: '@locationId' });
});

angular.module('drinkon').factory('vendorResource', function(apiRoot, $resource) {
  return $resource(apiRoot + '/vendor/:vendorId', { vendorId: '@vendorId' });
});

angular.module('drinkon').factory('productResource', function(apiRoot, $resource) {
  return $resource(apiRoot + '/vendor/:vendorId/product', { vendorId: '@vendorId' });
});

angular.module('drinkon').factory('orderSvc', function(apiRoot, $http) {
  return {
    newOrder: function(vendorId, customerName) {
      return $http.post(apiRoot + '/order', {
        vendorId: vendorId,
        customerName: customerName
      });
    },

    getOrder: function(orderId) {
      return $http.get(apiRoot + '/order/' + orderId);
    },

    getOrdersForUser: function(userId) {
      return $http.get(apiRoot + '/order/user/' + userId);
    },

    addLineToOrder: function(orderId, productId, measureId, quantity) {
      return $http.post(apiRoot + '/order/' + orderId + '/line', {
        productId: productId,
        measureId: measureId,
        quantity: quantity
      });
    }
  }

});