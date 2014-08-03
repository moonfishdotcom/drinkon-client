// Code goes here

var app = angular.module('drinkon', ['ionic'])

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
          templateUrl: 'views/home.html'
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
      controller: 'LocationSearchCtrl'
    })
    .state('app.find.venuesearch', {
      url: '/location/:location',
      templateUrl: 'views/venue-search.html',
      controller: 'VenueSearchCtrl'
    })
    .state('app.find.venue', {
      url: '/venue/:venue',
      templateUrl: 'views/venue-details.html',
      controller: 'VenueDetailsCtrl'
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
    .state('app.order.history', {
      url: '',
      templateUrl: 'views/order-history.html',
      controller: 'OrderHistoryCtrl'
    })
    .state('app.order.new', {
      url: '/:venueId',
      templateUrl: 'views/order-items.html',
      controller: 'OrderItemsCtrl'
    });

});

