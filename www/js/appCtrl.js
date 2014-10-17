angular.module('drinkon').controller('appCtrl', ['$scope', '$ionicModal', 'authSvc', 'appHeader', '$ionicPopover', '$state',
  function ($scope, $ionicModal, authSvc, appHeader, $ionicPopover, $state) {

  // Login Modal
  $ionicModal.fromTemplateUrl('views/auth/login-modal.html', {
    scope: $scope,
    animation: 'slide-in-up',
    focusFirstInput: true
  })
    .then(function (modal) {
      $scope.loginModal = modal;
    });

  $ionicPopover.fromTemplateUrl('views/auth/popover.html', function(popover) {
    $scope.userPopover = popover;
  });

  $scope.appHeader = appHeader;

  $scope.$on('event:auth-closePopover', function() {
    $scope.userPopover.hide();
  })

  $scope.getCurrentUser = function() {
    return authSvc.getCurrentUser();
  };

  $scope.$on('$destroy', function () {
    $scope.loginModal.remove();
    $scope.userPopover.remove();
  });

}]);
