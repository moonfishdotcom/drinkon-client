angular.module('drinkon').controller('popoverCtrl', function($scope, $rootScope, $state, authSvc) {

  $scope.getCurrentUser = function() {
    return authSvc.getCurrentUser();
  }

  $scope.logout = function() {
    $rootScope.$broadcast('event:auth-closePopover');
    $state.go('app.logout');
  }

  $scope.register = function() {
    $rootScope.$broadcast('event:auth-closePopover');
    $state.go('app.register');
  }

  $scope.login = function() {
    $rootScope.$broadcast('event:auth-loginRequired');
    $rootScope.$broadcast('event:auth-closePopover');
  };

});
