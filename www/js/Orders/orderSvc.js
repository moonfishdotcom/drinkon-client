angular.module('drinkon').factory('orderSvc', ['apiRoot', '$http', '$q', function(apiRoot, $http, $q) {
  return {
    newOrder: function(vendorId, customerId) {
      return $http.post(apiRoot + '/order', {
        vendorId: vendorId,
        customerId: customerId
      });
    },

    getOrder: function(orderId) {
      return $http.get(apiRoot + '/order/' + orderId);
    },

    getOrdersForUser: function(userId) {
      var defer = $q.defer();

      $http.get(apiRoot + '/order/user/' + userId)
        .then(function(result) {
          defer.resolve(result.data);
        }, function(err) {
          defer.reject(err);
        });

      return defer.promise;
    },

    addOrderLine: function(orderId, productId, measureId, quantity) {
      return $http.post(apiRoot + '/order/' + orderId + '/line', {
        productId: productId,
        measureId: measureId,
        quantity: quantity
      });
    },

    updateOrderLine: function(orderId, orderLineId, quantity) {
      return $http.put(apiRoot + '/order/' + orderId + '/line/' + orderLineId, {
        quantity: quantity
      });
    },

    deleteOrderLine: function(orderId, orderLineId) {
      return $http.delete(apiRoot + '/order/' + orderId + '/line/' + orderLineId);
    },

    placeOrder: function(orderId, collectionTime) {
      return $http.put(apiRoot + '/order/' + orderId, {
        collectionTime: collectionTime.toISOString().substring(0,19)
      });
    }
  }

}]);