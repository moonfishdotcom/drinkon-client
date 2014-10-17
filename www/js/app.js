var app = angular.module('drinkon', [
  'ionic',
  'http-auth-interceptor',
  'ngResource',
  'LocalStorageModule']);

app.constant('apiRoot', 'http://localhost:8080');

app.constant('appHeader', '<span class="title-text-pre">pre</span><span class="title-text-order">order</span><img src="img/logo.png" class="title_img" />');

app.config(function($stateProvider, $urlRouterProvider, localStorageServiceProvider) {

  $urlRouterProvider.otherwise('/');

  $stateProvider
    .state('app', {
      abstract: true,
      templateUrl: 'views/main.html'
    })
    .state('app.welcome', {
      url: '',
      templateUrl: 'views/auth/welcome.html',
      controller: function($scope, $rootScope, $state, authSvc) {

        authSvc.initialise();

        $scope.login = function() {
          $rootScope.$broadcast('event:auth-loginRequired');
        };

        $scope.register = function() {
          $state.go('app.register');
        }

        $scope.continue = function() {
          $state.go('app.home');
        };
      }
    })
    .state('app.register', {
      url: '/register',
      templateUrl: 'views/auth/register.html',
      controller: function($scope, $state, authSvc) {
        $scope.cancel = function() {
          $state.go('app.home');
        };

        $scope.register = function(user) {
          authSvc.registerUser(user);
        };

        $scope.$on('event:auth-register-failed', function(status, msg) {
          $scope.errorMessage = msg;
        });

        $scope.$on('event:auth-loginConfirmed', function() {
          $state.go('app.home');
        });
      }
    })
    .state('app.logout', {
      url: '/logout',
      controller: function(authSvc) {
        authSvc.logout();
      }
    })
    .state('app.home', {
      url: '/home',
      templateUrl: 'views/home.html',
      resolve: {
        authSvc: 'authSvc',
        notificationSvc: 'notificationSvc',
        notifications: ['notificationSvc', 'authSvc', function (notificationSvc, authSvc) {
          var currentUser = authSvc.getCurrentUser();
          if (!currentUser) {
            return null;
          }
          else {
            return notificationSvc.getNotificationsForUser(authSvc.getCurrentUser().id);
          }
        }]
      },
      controller: ['$rootScope', '$scope', 'notifications', 'authSvc', function($rootScope, $scope, notifications, authSvc) {
        $scope.notifications = _.map(notifications, function(rec) {
          rec.expiresDisplay = moment(rec.expires).fromNow();
          return rec;
        });
        console.log(notifications);
        $scope.getGreeting = function() {
          var currentUser = authSvc.getCurrentUser();
          return (!!currentUser ? currentUser.display_name : 'Guest User');
        };
      }]
    });

    localStorageServiceProvider
      .setPrefix('drinkon');
});

angular.module('drinkon').run(function ($rootScope, $state, $http, localStorageService) {

  $rootScope.$on('$stateChangeStart', function (event, toState, toParams, fromState, fromParams) {
    $rootScope.nextState = toState.name;
    console.log('Moving from state ' + fromState.name + ' to state ' + toState.name);
    console.log(toState);
  });

  $rootScope.$on('$stateChangeError', function (event, toState, toParams, fromState, fromParams, error) {
    console.log('OW!');
    console.log(error);
    console.log(toParams);
  });
});
