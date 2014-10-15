angular.module('drinkon')
  .config(function($stateProvider) {

    $stateProvider
      .state('app.vendor', {
        abstract: true,
        url: '/vendor',
        resolve: {
          authSvc: 'authSvc',
          vendorSvc: 'vendorSvc'
        },
        template: '<ion-nav-view></ion-nav-view>'
      })
      .state('app.vendor.list', {
        url: '/list',
        resolve: {
          locationSvc: 'locationSvc',
          locations: ['locationSvc', function(locationSvc) {
            return locationSvc.getLocations();
          }],
          vendors: ['vendorSvc', function(vendorSvc) {
            return vendorSvc.getVendors();
          }]
        },
        templateUrl: 'views/vendor/vendor-list.html',
        controller: ['$scope', 'locations', 'vendors', function($scope, locations, vendors) {
          $scope.locations = locations;
          $scope.vendors = vendors;
        }]
      })





//      .state('app.vendor.locationSearch', {
//        url: '/locationSearch',
//        templateUrl: 'views/vendor/location-search.html',
//        resolve: {
//          locationSvc: 'locationSvc',
//          locations: function(locationSvc) {
//            return locationSvc.getLocations();
//          }
//        },
//        controller: function ($scope, locations) {
//          console.log(locations);
//          $scope.locations = locations;
//        }
//      })
//      .state('app.vendor.list', {
//        abstract: true,
//        url: '/list',
//        resolve: {
//        },
//        template: '<ion-nav-view></ion-nav-view>'
//      })
//      .state('app.vendor.list.byLocation', {
//        url: '/location/:locationId',
//        templateUrl: 'views/vendor/vendor-list-by-location.html',
//        resolve: {
//          location: function (locationSvc, $stateParams) {
//            return locationSvc.getLocationWithId($stateParams.locationId);
//          }
//        },
//        controller: function ($scope, location, $ionicNavBarDelegate) {
//          $scope.location = location;
//          $scope.goBack = function() {
//            $ionicNavBarDelegate.back();
//          }
//        }
//      })
      .state('app.vendor.details', {
        url: '/:vendorId',
        templateUrl: 'views/vendor/vendor-details.html',
        resolve: {
          vendor: function (vendorSvc, $stateParams) {
            return vendorSvc.getVendorWithId($stateParams.vendorId);
          }
        },
        controller: function ($scope, vendor, $state, $stateParams, orderSvc, authSvc) {
          $scope.vendor = vendor;
          $scope.newOrder = function() {
            orderSvc.newOrder($stateParams.vendorId, authSvc.getCurrentUser().id) // TODO: Need to implement user accounts
              .then(function(result) {
                $state.go('app.order.summary', { orderId: _.first(result.data).id });
              });
          };
        }
      });
  });
