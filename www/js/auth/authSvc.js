angular.module('drinkon').factory('authSvc', function(apiRoot, $rootScope, $q, $http, $state, authService, localStorageService) {

  var storageKey = 'userData';

  function getUserDataToken() {
    return localStorageService.get(storageKey);
  }

  function setUserDataToken(value) {
    localStorageService.set(storageKey, value);
  }

  function clearAll() {
    localStorageService.clearAll();
  }

  return {
    login: function(user) {
      $http.post(apiRoot + '/login', { username: user.username, password: user.password }, { ignoreAuthModule: true })
        .success(function(data, status, headers, config) {
          setUserDataToken(data);
          $http.defaults.headers.common.Authorization = 'bearer ' + data.token;
          authService.loginConfirmed(data, function(config) {
            console.log(config);
            config.headers.Authorization = 'bearer ' + data.token;
            return config;
          });
        })
        .error(function (data, status) {
          $rootScope.$broadcast('event:auth-login-failed', status, data.msg);
        });
    },

    logout: function() {
      clearAll();
      delete $http.defaults.headers.common.Authorization;
      $rootScope.$broadcast('event:auth-logout-complete');
    },

    registerUser: function(user) {
      $http.post(apiRoot + '/register', { username: user.username, password: user.password, displayName: user.displayName}, { ignoreAuthModule: true })
        .success(function() {
          $http.post(apiRoot + '/login', { username: user.username, password: user.password }, { ignoreAuthModule: true })
            .success(function(data, status, headers, config) {
              setUserDataToken(data);
              $http.defaults.headers.common.Authorization = 'bearer ' + data.token;
              authService.loginConfirmed(data, function (config) {
                config.headers.Authorization = 'bearer ' + data.token;
                return config;
              });
            });
        })
        .error(function (data, status) {
          if (status === 409) {
            $rootScope.$broadcast('event:auth-register-failed', data.msg);
          }
        });
    },

    getCurrentUser: function() {
      var userData = getUserDataToken();
      if (!!userData) {
        return userData.user;
      }
    },

    initialise: function() {
      var userData = getUserDataToken();
      if (userData) {
        $rootScope.user = userData.user;
        $http.defaults.headers.common.Authorization = 'bearer ' + userData.token;
        $state.go('app.home');
      }
      else {
        clearAll();
        delete $http.defaults.headers.common.Authorization;
      }
    }

  };
});