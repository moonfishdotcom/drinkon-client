angular.module('drinkon')
  .config(function ($stateProvider) {

    $stateProvider
      .state('app.order', {
        abstract: true,
        url: '/order/:orderId',
        views: {
          orders: {
            template: '<ion-nav-view></ion-nav-view>'
          }
        },
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
        templateUrl: 'views/order-summary.html',
        resolve: {
          vendorResource: 'vendorResource',
          vendor: function (order, vendorResource) {
            return vendorResource.get({vendorId: order.vendor_id});
          }
        },
        controller: function ($scope, order, vendor) {
          console.log(order);
          $scope.vendor = vendor;
          $scope.order = order;
        }
      })
      .state('app.order.edit', {
        abstract: true,
        url: '/edit',
        resolve: {
          productResource: 'productResource',
          products: function (order, productResource) {
            return productResource.get({vendorId: order.vendor_id});
          }
        }
      })
      .state('app.order.edit.type', {
        url: '/type',
        views: {
          'orders@app': {
            templateUrl: 'views/order-product-type.html',
            controller: function ($scope, products) {
              $scope.products = products;
            }
          }
        }
      })
      .state('app.order.edit.product', {
        url: '/:typeId/product',
        views: {
          'orders@app': {
            templateUrl: 'views/order-product-item.html',
            controller: function ($scope, products, $stateParams) {
              $scope.productType = _.find(products.productTypes, { id: parseInt($stateParams.typeId) });
            }
          }
        }
      })
      .state('app.order.edit.measure', {
        url: '/:typeId/product/:productId/measure',
        views: {
          'orders@app': {
            templateUrl: 'views/order-product-measure.html',
            controller: function ($scope, products, $stateParams) {
              $scope.productType =  _.find(products.productTypes, { id: parseInt($stateParams.typeId) });
              $scope.product = _.find($scope.productType.products, { id: parseInt($stateParams.productId) });
            }
          }
        }
      })
      .state('app.order.edit.count', {
        url: '/:typeId/product/:productId/measure/:measureId',
        views: {
          'orders@app': {
            templateUrl: 'views/order-product-count.html',
            controller: function ($scope, orderSvc, $state, $stateParams) {
              $scope.saveOrderLine = function(quantity) {
                orderSvc.addLineToOrder($stateParams.orderId, $stateParams.productId, $stateParams.measureId, quantity)
                  .then(function() {
                    $state.go('app.order.summary', { orderId: $stateParams.orderId });
                  });
              }
            }
          }
        }
      });
  });
