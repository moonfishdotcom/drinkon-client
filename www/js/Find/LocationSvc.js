angular.module('drinkon').factory('LocationSvc', function() {

  var locations = [
    {
      id: 1,
      name: 'Leeds',
      venues: [
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
        }
      ]
    },
    {
      id: 2,
      name: 'Harrogate',
      venues: [
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
        }
      ]
    },
    {
      id: 3,
      name: 'York',
      venues: [
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
        }
      ]
    },
    {
      id: 4,
      name: 'Wetherby',
      venues: [
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
        }
      ]
    },
    {
      id: 5,
      name: 'Dunnington',
      venues: [
        {
          id: 15,
          name: 'The Cross Keys',
          distance: 100,
          sells: {
            drink: true,
            food: true
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
      ]
    }
  ];

  return {
      all: function() {
        return locations; //go to a REST api
      },

      findById: function(_id) {
        return _.find(locations, function(item) { return item.id == _id });
      }
  };

});