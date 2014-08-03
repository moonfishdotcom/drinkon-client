angular.module('drinkon').factory('VenueSvc', function() {

  var venues = [
    {
      id: 1,
      name: 'The Victoria Hotel',
      distance: 400,
      sells: {
        drink: true,
        food: true
      }
    },
    {
      id: 2,
      name: 'Town Hall Tavern',
      distance: 700,
      sells: {
        drink: true,
        food: false
      }
    },
    {
      id: 3,
      name: 'The Brewery Tap',
      distance: 50,
      sells: {
        drink: true,
        food: false
      }
    },
    {
      id: 4,
      name: 'North Bar',
      distance: 1000,
      sells: {
        drink: true,
        food: false
      }
    },
    {
      id: 5,
      name: 'Hales Bar',
      distance: 100,
      sells: {
        drink: true,
        food: false
      }
    },
    {
      id: 6,
      name: 'Old Bell Tavern',
      distance: 500,
      sells: {
        drink: true,
        food: true
      }
    },
    {
      id: 7,
      name: 'Banyan Bar',
      distance: 300,
      sells: {
        drink: true,
        food: false
      }
    },
    {
      id: 8,
      name: 'Ye Olde Starr Inne',
      distance: 200,
      sells: {
        drink: true,
        food: true
      }
    },
    {
      id: 9,
      name: 'The Black Swan',
      distance: 500,
      sells: {
        drink: true,
        food: false
      }
    },
    {
      id: 10,
      name: 'Bay Horse',
      distance: 1100,
      sells: {
        drink: true,
        food: false
      }
    },
    {
      id: 11,
      name: 'Bar Thr3',
      distance: 750,
      sells: {
        drink: true,
        food: false
      }
    },
    {
      id: 12,
      name: 'Muse Ale and Wine Bar',
      distance: 1500,
      sells: {
        drink: true,
        food: false
      }
    },
    {
      id: 13,
      name: 'The Royal Oak',
      distance: 1000,
      sells: {
        drink: true,
        food: true
      }
    },
    {
      id: 14,
      name: 'Swan and Talbot',
      distance: 800,
      sells: {
        drink: true,
        food: true
      }
    },
    {
      id: 15,
      name: 'The Cross Keys',
      distance: 100,
      sells: {
        drink: true,
        food: true
      },
      image: 'cross-keys-dunnington.jpg',
      description: 'The Cross Keys is a newly refurbished local pub in the heart of Dunnington.  We serve local ales and freshly cooked food.  Each Thursday we host a pub quiz stating at 9pm.',
      address: {
        line1: '3 Common Road',
        line3: '',
        location: 'Dunnington',
        postcode: 'YO19 5QW'
      },
      reviews: {
        average: 4.3,
        latest: {
          summary: 'Really liked this local pub - great food!',
          reviewer: 'jen432',
          reviewed: '2014/08/03 21:35:21'
        }
      }
    },
    {
      id: 16,
      name: 'The Greyhound',
      distance: 50,
      sells: {
        drink: true,
        food: false
      }
    },
    {
      id: 17,
      name: 'Dunnington Sports Club',
      distance: 350,
      sells: {
        drink: true,
        food: true
      }
    },
    {
      id: 18,
      name: 'The Windmill',
      distance: 1200,
      sells: {
        drink: true,
        food: true
      }
    }
  ];

  return {

    findById: function(_id) {
      return _.find(venues, function(item) { return item.id == _id });
    }
  };

});