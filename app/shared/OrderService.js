angular.module('OrderService', [])

.factory('Order', OrderService);

function OrderService($stamplay, $q, $http) {
  return {
    create: create,
    charge: charge,
    history: history
  }

  function create(data) {
    var def = $q.defer();

    var order = new $stamplay.Cobject('order').Model;
    angular.forEach(data, function(value, key) {
      order.set(key, value);
    })

    order.save()
    .then(function() {
      def.resolve(order);
    })
    .catch(function(err) {
      console.error(err);
      def.reject(err);
    });

    return def.promise;
  }

  function charge(userID, price, cardData) {
    var def = $q.defer();

    Stripe.card.createToken(cardData, function(status, response) {
      var token = response.id;

      price = price * 100;
      var customer = new $stamplay.Stripe();

      customer.charge(userID, token, price, 'USD')
      .then(function() {
        def.resolve(customer);
      })
      .catch(function(err) {
        console.error(err);
        def.reject(err);
      })

    });
    return def.promise;
  }

  function history(userID) {
    var def = $q.defer();

    var orders = new $stamplay.Cobject('orders').Collection;
    orders.populate().fetch()
    .then(function() {
      def.resolve(orders);
    })
    .catch(function(err) {
      console.error(err);
      def.reject(err);
    });

    return def.promise;
  }

}
