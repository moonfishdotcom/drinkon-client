angular.module('drinkon').controller('HomeCtrl', function($scope, orders) {
  $scope.orders = orders;
  $scope.getCollectionTime = function(time) {
    return moment(time).format('HH:mm:ss');
  }
//  console.log(orders.length);
});

angular.module('drinkon').controller('LocationSearchCtrl', function($scope, locations) {
  $scope.locations = locations;
});