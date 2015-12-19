angular.module('ProductService', [])

.factory('Product', ProductService);

  function ProductService($stamplay, $q, $http) {
    return {
      all: all,
      get: get,
      create: create,
      update: update,
      destroy: destroy,
      getComments: getComments,
      comment: comment,
      createPicture: createPicture,
      getCategories: getCategories
    };

    function all() {
      var def = $q.defer();

      var product = new Stamplay.Cobject('products').Collection;
      product.populate().fetch()
      .then(function() {
        def.resolve(product);
      })
      .catch(function(err) {
        console.error(err);
        def.reject(err);
      });

      return def.promise;
    }

    function get(id) {
      var def = $q.defer();

      var product = new Stamplay.Cobject('products').Model;
      product.fetch(id, { populate: true })
      .then(function() {
        def.resolve(product);
      })
      .catch(function(err) {
        console.error(err);
        def.reject(err);
      });

      return def.promise;
    }

    function create(data) {
      var def = $q.defer();

      var product = new Stamplay.Cobject('products').Model;
      product.set('name', data.name);

      angular.forEach(data, function(value, key) {
        product.set(key, value);
      });

      product.save()
      .then(function() {
        def.resolve(product);
      })
      .catch(function(err) {
        console.error(err);
        def.reject(err);
      });

      return def.promise;
    }

    function update(id, data) {
      var def = $q.defer();

      var product = new Stamplay.Cobject('products').Model;
      product.fetch(id)
      .then(function() {
        angular.forEach(data, function(value, key) {
          product.set(key, value);
        });
        return product.save();
      })
      .then(function() {
        def.resolve(product);
      })
      .catch(function(err) {
        console.error(err);
        def.reject(err);
      });

      return def.promise;
    }

    function destroy(id) {
      var def = $q.defer();

      var product = new Stamplay.Cobject('products').Model;
      product.fetch(id)
      .then(function() {
        return product.destroy();
      })
      .then(function() {
        def.resolve({ 'success' : true });
      })
      .catch(function(err) {
        console.error(err);
        def.reject(err);
      });

      return def.promise;
    }

    function getComments(id) {
      var def = $q.defer();

      var product = new Stamplay.Cobject('products').Model;
      product.fetch(id)
      .then(function() {
        def.resolve(product.getComments());
      })
      .catch(function(err) {
        console.error(err);
        def.reject(err);
      });

      return def.promise;
    }

    function comment(id, data) {
      var def = $q.defer();

      var product = new Stamplay.Cobject('products').Model;
      product.fetch(id)
      .then(function() {
        product.comment(data.text);
      })
      .then(function() {
        def.resolve(product);
      })
      .catch(function(err) {
        console.error(err);
        def.reject(err);
      });

      return def.promise;
    }

    function createPicture(files) {
      var def = $q.defer();

      var pictureIds = [];
      angular.forEach(files, function(file) {
        var fd = new FormData();
        fd.append('photo', file);

        $http({
          method: 'POST',
          url: 'https://etsy2.stamplayapp.com/api/cobject/v1/pictures',
          data: fd,
          headers: { 'Content-Type' : undefined },
          photo: file
        })
        .then(function(response) {
          pictureIds.push(response.data.id);
          def.resolve({ pictures: pictureIds });
        })
        .catch(function(err) {
            console.error(err);
            def.reject(err);
        });
      });

      return def.promise;
    }

    function getCategories() {
      var def = $q.defer();

      var products = new Stamplay.Cobject('categories').Collection;
      products.fetch()
      .then(function() {
        def.resolve(products);
      })
      .catch(function(err) {
        console.error(err);
        def.reject(err);
      });

      return def.promise;
    }
}
