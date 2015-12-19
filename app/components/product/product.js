angular
    .module('app.product', [])
    .controller('ProductCtrl', ProductCtrl);

function ProductCtrl(Product, $stateParams) {
    var product = this;
    product.createComment = createComment;

    Product.get($stateParams.id)
    .then(function(data) {
      product.listing = data.instance;
      product.pictures = data.get('pictures');
    })
    .catch(function(err) {
      console.error(err);
    });

    function createComment() {
      Product.comment($stateParams.id, product.commentData)
      .then(function(data) {
        product.commentData = {};
        product.listing.actions.comments = data.instance.actions.comments;
      });
    }


}
