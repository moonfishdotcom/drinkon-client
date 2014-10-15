angular.module('drinkon').controller('appCtrl', function ($scope, $ionicModal, authSvc, localStorageService, $rootScope) {
  $ionicModal.fromTemplateUrl('views/auth/login-modal.html', {
    scope: $scope,
    animation: 'slide-in-up',
    focusFirstInput: true
  })
    .then(function (modal) {
      $scope.loginModal = modal;
    });

  $scope.getCurrentUser = function() {
    return authSvc.getCurrentUser();
  };

  $scope.$on('$destroy', function () {
    $scope.loginModal.remove();
  });
});
