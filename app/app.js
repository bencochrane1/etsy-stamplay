angular

.module('etsy',
  [
    'ngStamplay',
    'ui.router',
    'ngAnimate',
    'app.routes',
    'app.authenticate',
    'app.checkout',
    'app.home',
    'app.shop',
    'app.product',
    'app.admin',
    'app.profile',
    'UserService',
    'OrderService',
    'ProductService',
    'ShopService',
    'ngFileUpload',
    'algoliasearch',
    'ui.bootstrap'
  ])

.controller('MainController', MainController);

function MainController($rootScope, User, algolia, $q, $state) {
  var main = this;
  var client = algolia.Client('YA8AZYCAZM', '87db532ef8435bfe054fe57512b655ad')
  var index = client.initIndex('products');

  main.searchProducts = searchProducts;
  main.searchPicked = searchPicked;

  $rootScope.currentUser = {};

  User.getCurrent().then(function(data) {
    if (data.get('_id')) {
      $rootScope.currentUser.id = data.get('_id');
      $rootScope.currentUser.name = data.get('displayName');
      $rootScope.currentUser.image = data.get('profileImg');
    } else {
      $rootScope.currentUser = {};
    }
  });

  function searchProducts(query) {
    var def = $q.defer();

    index.search(query, { hitsPerPage: 10 })
    .then(function(data) {
      def.resolve(data.hits);
    })
    .catch(function() {
      def.resolve([]);
    });

    return def.promise;
  }

  function searchPicked($item, $model, $label) {
    $state.go('product', { id: $item.id, name: $item.name });
  }

  function logout() {
    User.logout();
    $rootScope.currentUser = {};
  }
}
