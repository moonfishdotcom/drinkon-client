angular.module('drinkon')

  .controller('AppCtrl', function($scope) {
    $scope.test = 'test';
  })

  .controller('FindLocationCtrl', function($scope) {

    $scope.locations = [
      'Leeds',
      'York',
      'Harrogate',
      'Ripon',
      'Wetherby',
      'Ilkley',
      'Otley',
      'Beverley'
    ];

  })

  .controller('FindVenueCtrl', function($scope, $stateParams) {

    $scope.location = $stateParams.name;

    $scope.venues = [
      {
        name: 'Cross Keys',
        distance: 400,
        sells: {
          food: true,
          drink: true
        },
        image: 'venue_1.jpg'
      },
      {
        name: 'The Greyhound',
        distance: 600,
        sells: {
          food: false,
          drink: true
        },
        image: 'venue_2.jpg'
      },
      {
        name: 'The Windmill',
        distance: 1400,
        sells: {
          food: true,
          drink: true
        },
        image: 'venue_3.jpg'
      },
      {
        name: 'Dunnington Sports Club',
        distance: 950,
        sells: {
          food: true,
          drink: true
        },
        image: 'venue_4.jpg'
      }
    ];


  });



//angular.module('drinkon.controllers', [])
//
//  .controller('VenueListCtrl', function($scope) {
//
//    $scope.venues = [
//      {
//        name: 'Cross Keys',
//        distance: 400,
//        sells: {
//          food: true,
//          drink: true
//        },
//        image: 'venue_1.jpg'
//      },
//      {
//        name: 'The Greyhound',
//        distance: 600,
//        sells: {
//          food: false,
//          drink: true
//        },
//        image: 'venue_2.jpg'
//      },
//      {
//        name: 'The Windmill',
//        distance: 1400,
//        sells: {
//          food: true,
//          drink: true
//        },
//        image: 'venue_3.jpg'
//      },
//      {
//        name: 'Dunnington Sports Club',
//        distance: 950,
//        sells: {
//          food: true,
//          drink: true
//        },
//        image: 'venue_4.jpg'
//      }
//    ];
//
//    $scope.hey = function(venue) {
//      alert('you want to go to the ' + venue.name + '?');
//    }
//
//  })
//
//  .controller('VenueDetailsCtrl', function($scope, $stateParams) {
//
//    $scope.name = $stateParams.name;
//    $scope.doSomething = function() {
//      alert('hey');
//    }
//
//  })
//;