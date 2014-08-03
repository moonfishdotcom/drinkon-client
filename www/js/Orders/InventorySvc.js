angular.module('drinkon').factory('InventorySvc', function() {

  var inventories = [
    {
      id: 1,
      venue: {
        id: 15,
        name: 'The Cross Keys',
        location: 'Dunnington'
      },
      itemTypes: [
        {
          name: 'Food'
        },
        {
          name: 'Drink'
        }
      ]
    }
  ];


  return {

    findByVenueId: function(_id) {
      return _.find(inventories, function(item) { return item.venue.id == _id });
    }

  };

});