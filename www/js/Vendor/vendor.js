angular.module('drinkon')
  .config(function($stateProvider) {

    $stateProvider
      .state('app.find', {
        abstract: true,
        url: '/find',
        views: {
          find: {
            locationResource: 'locationResource',
            vendorResource: 'vendorResource',
            template: '<ion-nav-view></ion-nav-view>'
          }
        }
      })
      .state('app.find.locationsearch', {
        url: '',
        templateUrl: 'views/location-search.html',
        resolve: {
          locations: function (locationResource) {
            return locationResource.query();
          }
        },
        controller: function ($scope, locations) {
          $scope.locations = locations;
        }
      })
      .state('app.find.vendorsearch', {
        url: '/location/:locationId',
        templateUrl: 'views/vendor-search.html',
        resolve: {
          location: function (locationResource, $stateParams) {
            return locationResource.get({locationId: $stateParams.locationId});
          }
        },
        controller: function ($scope, location) {
          $scope.location = location;
        }
      })
      .state('app.find.vendor', {
        url: '/vendor/:vendorId',
        templateUrl: 'views/vendor-details.html',
        resolve: {
          vendor: function (vendorResource, $stateParams) {
            return vendorResource.get({vendorId: $stateParams.vendorId});
          }
        },
        controller: function ($scope, vendor, $state, $stateParams, orderSvc) {
          $scope.vendor = vendor;
          $scope.newOrder = function() {
            orderSvc.newOrder($stateParams.vendorId, 'Barry') // TODO: Need to implement user accounts
              .then(function(result) {
                $state.go('app.order.summary', { vendorId: $scope.vendor.id, orderId: _.first(result.data).id });
              });
          };
        }
      });
  });
