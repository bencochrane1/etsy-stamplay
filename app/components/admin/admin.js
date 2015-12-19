angular
    .module('app.admin', [])
    .controller('AdminCtrl', AdminCtrl);

function AdminCtrl(Product, Order) {
    var admin = this;

    admin.productData = {};
    admin.createProduct = createProduct;
    admin.uploadFiles = uploadFiles;

    Product.getCategories()
    .then(function(data) {
      admin.categories = data.instance;
    })
    .catch(function(err) {
      console.error(err);
    });

    function createProduct() {
      Product.create(admin.productData)
      .then(function(data) {
        admin.productData = {};
        admin.successMessage = 'Product created!';
        admin.newProductId = data.get('_id');
        admin.newProductName = data.get('name');
      });
    }

    function uploadFiles(files) {
      Product.createPicture(files)
      .then(function(data) {
        admin.productData.pictures = data.pictures;
      })
      .catch(function(err) {
        console.error(err);
      });
    }

    Order.history()
    .then(function(data) {
      admin.orders = data.instance;
    })
    .catch(function(err) {
      console.error(err);
    });
}
