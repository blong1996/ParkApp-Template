'use strict';

var parkAppServices = angular.module('parkAppServices', ['firebase'])

parkAppServices.factory("Auth", function($firebaseAuth) {
  var userRef = new Firebase("http//nczooapp.firebaseio.com/users");
  return $firebaseAuth(userRef)
})

parkAppServices.factory('Camera', ['$q', function($q) {

  return {
    getPicture: function(options) {
      var q = $q.defer();

      navigator.camera.getPicture(function(result) {
        // Do any magic you need
        q.resolve(result);
      }, function(err) {
        q.reject(err);
      }, options);

      return q.promise;
    }
  }
}]);
