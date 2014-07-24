// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('drinkon', ['ionic'])

.controller('VenueListCtrl', function($scope) {

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

  $scope.hey = function(venue) {
    alert('you want to go to the ' + venue.name + '?');
  }
});