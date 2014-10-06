var app = angular.module('drinkon', [
  'ionic',
  'ngResource']);

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
      templateUrl: 'views/home.html',
      resolve: {
        orderSvc: 'orderSvc',
        orders: function (orderSvc) {
          return orderSvc.getOrdersForUser(1)
            .then(function (results) {
              return results.data;
            });
        }
      },
      controller: function($scope, orders) {
        $scope.orders = orders;
      }
    });
});

angular.module('drinkon').run(function ($rootScope, $state) {
  $rootScope.$on('$stateChangeStart', function (event, toState, toParams, fromState, fromParams) {
    console.log(toState);
    console.log('Moving from state ' + fromState.name + ' to state ' + toState.name);
  });

  $rootScope.$on('$stateChangeError', function (event, toState, toParams, fromState, fromParams, error) {
    console.log('OW!');
    console.log(error);
    console.log(toParams);
  });
});
