angular.module('drinkon').service('OrderModel', function() {

  this.OrderLine = function(productId, measureId, quantity, unitPrice) {
    this.id =
    this.productId = productId;
    this.measureId = measureId;
    this.quantity = quantity;
    this.unitPrice = unitPrice;
  };

  this.orderId = null;
  this.vendorId = null;
  this.productTypeId = null;
  this.basket = [];

  this.reset = function() {
    this.orderId = null;
    this.vendorId = null;
    this.productTypeId = null;
    this.basket = [];
  };

  this.addOrderLine = function (productId, measureId, quantity, unitPrice) {
    var orderLine = new OrderLine(productId, measureId, quantity, unitPrice);
    this.basket.push(orderLine);
  };
});