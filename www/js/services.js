'use strict';

var parkAppServices = angular.module('parkAppServices', ['firebase'])

parkAppServices.factory("Auth", function($firebaseAuth) {
  var userRef = new Firebase("http//nczooapp.firebaseio.com/users");
  return $firebaseAuth(userRef)
})

parkAppServices.factory("AppUsers", function($firebaseArray) {
  var AppUsers = new Firebase("http//nczooapp.firebaseio.com/Users");
  var users = $firebaseArray(AppUsers)
  return {
    all: function() {
      return users;
    },
    delete: function() {
      //Firebase delete info goes here
    },
    get: function(userID) {
      for (var i = 0; i < users.length; i++) {
        if (users[i].ID === (userID)) {
          return users[i];
        }
      }
      return null;
    }
  };
})

parkAppServices.factory("AppPhotos", function($firebaseArray) {
  var Photos = new Firebase("http//nczooapp.firebaseio.com/AppPictures");
  var photos = $firebaseArray(Photos)
  return {
    all: function(){
      return photos;
    },
    delete: function(photo) {
      //Firebase delete info goes here
    },
    getUserPhotos: function(username) {
      var userPhotos = [];
      for (var i = 0; i < photos.length; i++) {
        if(photos[i].Username == username) {
          userPhotos[userPhotos.length] = photos[i];
          
        }
        
      }
      return userPhotos;
    },
    get: function(photoID) {
      for (var i = 0; i < photos.length; i++) {
        if (photos[i].ID === parseInt(photoID)) {
          return photos[i];
        }
      }
      return null;
    }
  };  
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
