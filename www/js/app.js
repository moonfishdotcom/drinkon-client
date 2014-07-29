// Code goes here

var app = angular.module('drinkon', ['ionic'])

app.config(function($stateProvider, $urlRouterProvider) {
  $urlRouterProvider.otherwise('/home')

  $stateProvider
    .state('app', {
      abstract: true,
      templateUrl: 'main.html'
    })
    .state('app.home', {
      url: '/home',
      views: {
        home: {
          templateUrl: 'home.html'
        }
      }
    })
    .state('app.find', {
      abstract: true,
      url: '/find',
      views: {
        find: {
          template: '<ion-nav-view></ion-nav-view>'
        }
      }
    })
    .state('app.find.location', {
      url: '',
      templateUrl: 'find-location.html',
      controller: 'FindLocationCtrl'
    })
    .state('app.find.venue', {
      url: '/location/:name',
      templateUrl: 'find-venue.html',
      controller: 'FindVenueCtrl'
    });



//  $stateProvider.state('app.todos', {
//    abstract: true,
//    url: '/home',
//    views: {
//      todos: {
//        template: '<ion-nav-view></ion-nav-view>'
//      }
//    }
//  })
//
//  $stateProvider.state('app.todos.index', {
//    url: '',
//    templateUrl: 'todos.html',
//    controller: 'TodosCtrl'
//  })
//
//  $stateProvider.state('app.todos.detail', {
//    url: '/:todo',
//    templateUrl: 'todo.html',
//    controller: 'TodoCtrl',
//    resolve: {
//      todo: function($stateParams, TodosService) {
//        return TodosService.getTodo($stateParams.todo)
//      }
//    }
//  })
//
//
//  $stateProvider.state('app.help', {
//    url: '/help',
//    views: {
//      help: {
//        templateUrl: 'help.html'
//      }
//    }
//  })
})

app.factory('TodosService', function() {
  var todos = [
    {title: "Take out the trash", done: true},
    {title: "Do laundry", done: false},
    {title: "Start cooking dinner", done: false}
  ]

  return {
    todos: todos,
    getTodo: function(index) {
      return todos[index]
    }
  }
})

app.controller('TodosCtrl', function($scope, TodosService) {
  $scope.todos = TodosService.todos
})

app.controller('TodoCtrl', function($scope, todo) {
  $scope.todo = todo
})


//      .state('venue', {
//        url: '/venue',
//        abstract: true,
//        templateUrl: 'templates/venue.html'
//      })
//      .state('venue.list', {
//        url: '/list',
//        views: {
//          'venue-list': {
//            templateUrl: 'templates/venue-list.html',
//            controller: 'VenueListCtrl'
//          }
//        }
//      })
//      .state('venue.details', {
//        url: '/details/:name',
//        views: {
//          'venue-list': {
//            templateUrl: 'templates/venue-details.html',
//            controller: 'VenueDetailsCtrl'
//          }
//        }
//      });
