angular.module('drinkon').controller('loginCtrl', function ($scope, authSvc, $state) {

  $scope.message = "";
  $scope.user = {
    username: null,
    password: null
  };

  $scope.login = function() {
    authSvc.login($scope.user);
    $state.go('app.home');
  };

  $scope.cancel = function() {
    $scope.user.username = null;
    $scope.user.password = null;
    $scope.loginModal.hide();
  }

  $scope.$on('event:auth-loginRequired', function() {
    $scope.loginModal.show();
  });

  $scope.$on('event:auth-loginConfirmed', function() {
    $state.go($scope.nextState);
    $scope.user.username = null;
    $scope.user.password = null;
    $scope.loginModal.hide();
  });

  $scope.$on('event:auth-login-failed', function(e, status, info) {
    var error = "Login failed.";
    if (status == 401) {
      error = info;
    }
    $scope.message = error;
  });

  $scope.$on('event:auth-logout-complete', function() {
    console.log('event logout complete');
    $state.go('app.home', {}, {reload: true, inherit: false});
  });

});
