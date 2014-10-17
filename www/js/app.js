var app = angular.module('drinkon', [
  'ionic',
  'http-auth-interceptor',
  'ngResource',
  'LocalStorageModule']);

//app.constant('apiRoot', 'http://192.168.43.207:8080');
app.constant('apiRoot', 'http://127.0.0.1:8080');

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

function initPushwoosh()
{
  var pushNotification = window.plugins.pushNotification;

  //set push notifications handler
  document.addEventListener('push-notification', function(event) {
    var title = event.notification.title;
    var userData = event.notification.userdata;

    if(typeof(userData) != "undefined") {
      console.warn('user data: ' + JSON.stringify(userData));
    }

    alert(title);
  });

  //initialize Pushwoosh with projectid: "GOOGLE_PROJECT_ID", appid : "PUSHWOOSH_APP_ID". This will trigger all pending push notifications on start.
  pushNotification.onDeviceReady({ projectid: "805949622129", appid : "90B6A-26274" });

  //register for pushes
  pushNotification.registerDevice(
    function(status) {
      var pushToken = status;
      console.warn('push token: ' + pushToken);
    },
    function(status) {
      console.warn(JSON.stringify(['failed to register ', status]));
    }
  );
}

function init() {
  document.addEventListener("deviceready", initPushwoosh, true);
}

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
