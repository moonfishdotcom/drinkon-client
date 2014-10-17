angular.module('drinkon')
  .config(function ($stateProvider) {

    $stateProvider
      .state('app.orders', {
        url: '/orders',
        templateUrl: 'views/orders/order-history.html',
        resolve: {
          orderSvc: 'orderSvc',
          orders: ['orderSvc', 'authSvc', function(orderSvc, authSvc) {
            var currentUser = authSvc.getCurrentUser();
            if (!currentUser) {
              return null;
            }
            else {
              return orderSvc.getOrdersForUser(authSvc.getCurrentUser().id);
            }
          }]
        },
        controller: ['$scope', 'orders', function($scope, orders) {
          $scope.orders = orders;
          $scope.orderStatuses = [
            'Pending',
            'Waiting',
            'Accepted',
            'Completed'
          ]
        }]
      })
      .state('app.order', {
        abstract: true,
        url: '/order/:orderId',
        template: '<ion-nav-view></ion-nav-view>',
        resolve: {
          orderSvc: 'orderSvc',
          order: ['orderSvc', '$stateParams', function (orderSvc, $stateParams) {
            return orderSvc.getOrder($stateParams.orderId)
              .then(function (results) {
                return results.data;
              });
          }]
        }
      })
      .state('app.order.summary', {
        url: '',
        templateUrl: 'views/orders/order-summary.html',
        resolve: {
          vendorSvc: 'vendorSvc',
          vendor: ['vendorSvc', 'order', function (vendorSvc, order) {
            return vendorSvc.getVendorWithId(order.vendor_id)
              .then(function(result) {
                console.log(result.data);
                return result.data;
              });
          }]
        },
        controller: ['$scope', 'vendor', 'order', 'orderSvc', '$ionicBackdrop', function ($scope, vendor, order, orderSvc, $ionicBackdrop) {
          $ionicBackdrop
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
          $scope.getCollectionTime = function(collectionTime) {
            var time = moment(collectionTime);
            return time.format('HH:mm') + ' on ' + time.format('dddd Do MMMM');
          };
        }]
      })
      .state('app.order.edit', {
        abstract: true,
        url: '/edit',
        template: '<ion-nav-view></ion-nav-view>',
        resolve: {
          productSvc: 'productSvc',
          products: ['order', 'productSvc', function (order, productSvc) {
            return productSvc.getProductsForVendorWithId(order.vendor_id)
              .then(function(result) {
                return result.data;
              });
          }]
        }
      })
      .state('app.order.edit.type', {
        url: '/type',
        templateUrl: 'views/orders/order-product-type.html',
        controller: ['$scope', 'products', function ($scope, products) {
          console.log(products);
          $scope.products = products;
        }]
      })
      .state('app.order.edit.product', {
        url: '/:typeId/product',
        templateUrl: 'views/orders/order-product-item.html',
        controller: ['$scope', 'products', '$stateParams', function ($scope, products, $stateParams) {
          $scope.productType = _.find(products.productTypes, { id: parseInt($stateParams.typeId) });
        }]
      })
      .state('app.order.edit.measure', {
        url: '/:typeId/product/:productId/measure',
        templateUrl: 'views/orders/order-product-measure.html',
        controller: ['$scope', 'products', '$stateParams', function ($scope, products, $stateParams) {
          $scope.productType =  _.find(products.productTypes, { id: parseInt($stateParams.typeId) });
          $scope.product = _.find($scope.productType.products, { id: parseInt($stateParams.productId) });
        }]
      })
      .state('app.order.edit.count', {
        url: '/:typeId/product/:productId/measure/:measureId',
        templateUrl: 'views/orders/order-product-count.html',
        controller: ['$scope', 'orderSvc', '$state', '$stateParams', function ($scope, orderSvc, $state, $stateParams) {
          $scope.saveOrderLine = function(quantity) {
            orderSvc.addOrderLine($stateParams.orderId, $stateParams.productId, $stateParams.measureId, quantity)
              .then(function() {
                $state.go('app.order.summary', { orderId: $stateParams.orderId });
              });
          }
        }]
      })
      .state('app.order.confirm', {
        abstract: true,
        url: '/confirm',
        template: '<ion-nav-view></ion-nav-view>'
      })
      .state('app.order.confirm.location', {
        url: '/location',
        templateUrl: 'views/orders/order-location.html',
        controller: ['$scope', 'order', 'orderSvc', '$ionicPopup', '$state', function($scope, order, orderSvc, $ionicPopup, $state) {
          $scope.collection = {
            date: null,
            time: null
          };
          $scope.order = order;

          $scope.collectionDates = [];
          for (var i = 0; i < 7; i++) {
            var date = moment().add(i, 'd');
            $scope.collectionDates.push({
              label: date.format('dddd Do MMMM'),
              value: date
            });
          }

          $scope.hours = _.range(11, 24, 1);
          $scope.mins = _.range(0, 60, 5);

          $scope.placeOrder = function() {
            var collectionTime = $scope.collection.date.value;
            collectionTime.hour($scope.collection.time.hour);
            collectionTime.minute($scope.collection.time.mins);
            collectionTime.second(0);
            collectionTime.millisecond(0);
            orderSvc.placeOrder(order.id, collectionTime)
              .then(function () {
                return $ionicPopup.alert({
                  title: 'Order Placed',
                  template: 'You will get a notification when the order is confirmed with the venue.'
                })
              })
              .then(function() {
                $state.go('app.order.summary', { orderId: order.id });
              });
          };
        }]
      })
    ;
  });
