angular
    .module('app.home', [])
    .controller('HomeCtrl', HomeCtrl);

function HomeCtrl(Product) {
  var home = this;

  Product.all()
  .then(function(data) {
    home.products = data.instance;
  });
}
