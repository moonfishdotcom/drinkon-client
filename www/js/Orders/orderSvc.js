angular.module('drinkon').factory('orderSvc', function(apiRoot, $http) {
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
      return $http.get(apiRoot + '/order/user/' + userId);
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
    }
  }

});