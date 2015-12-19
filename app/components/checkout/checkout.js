angular
    .module('app.checkout', [])
    .controller('CheckoutCtrl', CheckoutCtrl);

function CheckoutCtrl($stateParams, $rootScope, Product, Order) {
    var checkout = this;

    checkout.orderData = {};
    checkout.cardData = {
      number: 4242424242424242,
      cvc: 123
    };
    checkout.processPurchase = processPurchase;

    Product.get($stateParams.id)
    .then(function(data) {
      checkout.product = data.instance;
      checkout.orderData.product = [data.get('_id')];
      checkout.orderData.price = data.get('price');
    })
    .catch(function(err) {
      console.error(err);
    });

    function processPurchase() {
      checkout.successMessage = '';

      Order.charge($rootScope.currentUser.id, checkout.orderData.price, checkout.cardData)
      .then(function(data) {
        Order.create(checkout.orderData)
        .then(function(data) {
          checkout.successMessage = 'Thanks for your order! Your order number is #' + data.get('_id');
        })
        .catch(function(err) {
          console.error(err);
        });
      })
      .catch(function(err) {
        console.error(err);
      });
    }
}
