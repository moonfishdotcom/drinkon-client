angular.module('drinkon').factory('notificationSvc', ['apiRoot', '$http', '$q', function(apiRoot, $http, $q) {
  return {
    getNotificationsForUser: function (userId) {
      var defer = $q.defer();

      $http.get(apiRoot + '/notification')
        .then(function (result) {
          defer.resolve(result.data.notifications);
        }, function (err) {
          defer.reject(err);
        });

      return defer.promise;
    }
  };
}]);
