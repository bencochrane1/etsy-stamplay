angular.module('UserService', [])

.factory('User', UserService);

function UserService($stamplay, $q) {

  return {
    getCurrent: getCurrent,
    signup: signup,
    login: login,
    logout: logout
  }

  function getCurrent() {
    var def = $q.defer();

    var user = $stamplay.User().Model;
    user.currentUser().then(function() {
      def.resolve(user);
    });

    return def.promise;
  }

  function signup(data) {
    var def = $q.defer();

    var user = $stamplay.User().Model;
    user.signup(data).then(function() {
      def.resolve(user);
    })

    return def.promise;
  }

  function login(data) {
    var def = $q.defer();

    var user = $stamplay.User().Model;
    user.login(data.email, data.password)
    .then(function() {
      def.resolve(user);
    })
    .catch(function() {
      def.reject({ 'error': 'Unable to login.' });
    });

    return def.promise;
  }

  function logout() {
    var user = $stamplay.User().Model;
    user.logout();
  }

}
