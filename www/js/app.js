// Code goes here

var app = angular.module('drinkon', ['ionic', 'ngResource'])

app.constant('apiRoot', 'http://localhost:8080');

app.config(function($stateProvider, $urlRouterProvider) {
  $urlRouterProvider.otherwise('/home')

  $stateProvider
    .state('app', {
      abstract: true,
      templateUrl: 'views/main.html'
    })
    .state('app.home', {
      url: '/home',
      views: {
        home: {
          templateUrl: 'views/home.html',
          controller: 'HomeCtrl',
          resolve: {
            orderResource: 'orderResource',
            orders: function (orderResource) {
              return orderResource.query({});
            }
          }
        }
      }
    })
    .state('app.find', {
      abstract: true,
      url: '/find',
      views: {
        find: {
          template: '<ion-nav-view></ion-nav-view>'
        }
      }
    })
    .state('app.find.locationsearch', {
      url: '',
      templateUrl: 'views/location-search.html',
      controller: 'LocationSearchCtrl',
      resolve: {
        locationResource: 'locationResource',
        locations: function (locationResource) {
          return locationResource.query();
        }
      }
    })
    .state('app.find.vendorsearch', {
      url: '/location/:locationId',
      templateUrl: 'views/vendor-search.html',
      resolve: {
        locationResource: 'locationResource',
        location: function (locationResource, $stateParams) {
          return locationResource.get({locationId: $stateParams.locationId});
        }
      },
      controller: 'VendorSearchCtrl'
    })
    .state('app.find.vendor', {
      url: '/vendor/:vendorId',
      templateUrl: 'views/vendor-details.html',
      resolve: {
        vendorResource: 'vendorResource',
        vendor: function (vendorResource, $stateParams) {
          return vendorResource.get({vendorId: $stateParams.vendorId});
        }
      },
      controller: 'VendorDetailsCtrl'
    })
    .state('app.order', {
      abstract: true,
      url: '/order',
      views: {
        orders: {
          template: '<ion-nav-view></ion-nav-view>'
        }
      }
    })
    .state('app.order.new', {
      url: '/',
      templateUrl: 'views/order-product-type.html',
      resolve: {
        vendorResource: 'vendorResource',
        productResource: 'productResource',
        vendor: function(vendorResource, OrderStateSvc) {
          return vendorResource.get({vendorId: OrderStateSvc.vendorId});
        },
        products: function(productResource, OrderStateSvc) {
          return productResource.get({vendorId: OrderStateSvc.vendorId});
        }
      },
      controller: 'OrderProductTypeCtrl'
    })
    .state('app.order.new.product', {
      url: '/product',
      templateUrl: 'views/order-product-item.html',
      controller: 'OrderProductItemCtrl'
    });
});

angular.module('drinkon').run(function ($rootScope, $state) {
  $rootScope.$on('$stateChangeError', function (event, toState, toParams, fromState, fromParams, error) {
    console.log('OW! - ' + error);
  });
});
