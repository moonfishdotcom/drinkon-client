angular.module('drinkon')
  .config(function ($stateProvider) {

    $stateProvider
      .state('app.order', {
        abstract: true,
        url: '/order/:orderId',
        template: '<ion-nav-view></ion-nav-view>',
        resolve: {
          orderSvc: 'orderSvc',
          order: function (orderSvc, $stateParams) {
            return orderSvc.getOrder($stateParams.orderId)
              .then(function (results) {
                return results.data;
              });
          }
        }
      })
      .state('app.order.summary', {
        url: '',
        templateUrl: 'views/orders/order-summary.html',
        resolve: {
          vendorSvc: 'vendorSvc',
          vendor: function (vendorSvc, order) {
            return vendorSvc.getVendorWithId(order.vendor_id)
              .then(function(result) {
                console.log(result.data);
                return result.data;
              });
          }
        },
        controller: function ($scope, vendor, order, orderSvc) {
          $scope.vendor = vendor;
          $scope.order = order;
          $scope.updateOrderLine = function(orderLineId, qty) {
            orderSvc.updateOrderLine(order.id, orderLineId, qty)
              .then(function() {
                return orderSvc.getOrder(order.id);
              })
              .then(function(results) {
                $scope.order = results.data;
              });
          };
          $scope.deleteOrderLine = function(orderLineId) {
            orderSvc.deleteOrderLine(order.id, orderLineId)
              .then(function() {
                return orderSvc.getOrder(order.id);
              })
              .then(function(results) {
                $scope.order = results.data;
              });
          };
          $scope.getFormattedCreatedDate = function(createdDate) {
            return moment(createdDate).fromNow();
          };
        }
      })
      .state('app.order.edit', {
        abstract: true,
        url: '/edit',
        template: '<ion-nav-view></ion-nav-view>',
        resolve: {
          productSvc: 'productSvc',
          products: function (order, productSvc) {
            return productSvc.getProductsForVendorWithId(order.vendor_id)
              .then(function(result) {
                return result.data;
              });
          }
        }
      })
      .state('app.order.edit.type', {
        url: '/type',
        templateUrl: 'views/orders/order-product-type.html',
        controller: function ($scope, products) {
          console.log(products);
          $scope.products = products;
        }
      })
      .state('app.order.edit.product', {
        url: '/:typeId/product',
        templateUrl: 'views/orders/order-product-item.html',
        controller: function ($scope, products, $stateParams) {
          $scope.productType = _.find(products.productTypes, { id: parseInt($stateParams.typeId) });
        }
      })
      .state('app.order.edit.measure', {
        url: '/:typeId/product/:productId/measure',
        templateUrl: 'views/orders/order-product-measure.html',
        controller: function ($scope, products, $stateParams) {
          $scope.productType =  _.find(products.productTypes, { id: parseInt($stateParams.typeId) });
          $scope.product = _.find($scope.productType.products, { id: parseInt($stateParams.productId) });
        }
      })
      .state('app.order.edit.count', {
        url: '/:typeId/product/:productId/measure/:measureId',
        templateUrl: 'views/orders/order-product-count.html',
        controller: function ($scope, orderSvc, $state, $stateParams) {
          $scope.saveOrderLine = function(quantity) {
            orderSvc.addOrderLine($stateParams.orderId, $stateParams.productId, $stateParams.measureId, quantity)
              .then(function() {
                $state.go('app.order.summary', { orderId: $stateParams.orderId });
              });
          }
        }
      });
  });
