angular

.module('app.routes', [])

.config(AppRoutes);

function AppRoutes($stateProvider, $urlRouterProvider) {

  $urlRouterProvider.otherwise('/');

  // create our routes, set the view, pull in the controller
  $stateProvider

    // home page
    .state('home', {
        url         : '/',
        templateUrl : '/app/components/home/home.html',
        controller  : 'HomeCtrl as home'
    })

    // shop page
    .state('shop', {
        url         : '/shop/{name}',
        templateUrl : '/app/components/shop/shop.html',
        controller  : 'ShopCtrl as shop'
    })

    // product page (a child of shop)
    .state('product', {
        url         : '/listing/{id}/{name}',
        templateUrl : '/app/components/product/product.html',
        controller  : 'ProductCtrl as product'
    })

    // login/signup page
    .state('authenticate', {
        url         : '/authenticate',
        templateUrl : '/app/components/authenticate/authenticate.html',
        controller  : 'AuthenticateCtrl as authenticate'
    })

    // profile page
    .state('profile', {
        url         : '/profile/{user_name}',
        templateUrl : '/app/components/profile/profile.html',
        controller  : 'ProfileCtrl as profile'
    })

    // checkout page
    .state('checkout', {
        url         : '/checkout/{id}',
        templateUrl : '/app/components/checkout/checkout.html',
        controller  : 'CheckoutCtrl as checkout'
    })

    // checkout page
    .state('admin', {
        url         : '/admin',
        templateUrl : '/app/components/admin/admin.html',
        controller  : 'AdminCtrl as admin'
    });
}
