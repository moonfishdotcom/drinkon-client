angular.module('drinkon').service('OrderStateSvc', function() {

  this.orderId = null;
  this.vendorId = null;
  this.productType = null;

  this.reset = function() {
    this.orderId = null;
    this.vendorId = null;
    this.productType = null;
  };
});