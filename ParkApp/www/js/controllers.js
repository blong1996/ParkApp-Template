angular.module('starter.controllers', [ ])

.controller("CameraCtrl", function($scope, $cordovaCamera, Camera) {
 
    $scope.takePicture = function() {
        var options = { 
            quality : 75, 
            //destinationType : Camera.DestinationType.DATA_URL, 
           // sourceType : Camera.PictureSourceType.CAMERA, 
            allowEdit : true,
           // encodingType: Camera.EncodingType.JPEG,
            targetWidth: 300,
            targetHeight: 300,
           // popoverOptions: CameraPopoverOptions,
            saveToPhotoAlbum: false

        };
 
        $cordovaCamera.getPicture(options).then(function(imageData) {
            $scope.imgURI = "data:image/jpeg;base64," + imageData;
        }, function(err) {
            // An error occured. Show a message to the user
        });
    }
 
})

.controller('DashCtrl', function($scope) {})

.controller('ChatsCtrl', function($scope, Chats) {
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //
  //$scope.$on('$ionicView.enter', function(e) {
  //});
  
  $scope.chats = Chats.all();
  $scope.remove = function(chat) {s
    Chats.remove(chat);
  }
})

.controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
  $scope.chat = Chats.get($stateParams.chatId);
})

.controller('HomeCtrl', function($scope) {})

.controller('NotificationsCtrl', function($scope) {})

/*.controller('CameraCtrl', function($scope) {},
  function takePicture() {
  navigator.camera.getPicture(function(imageURI) {

    // imageURI is the URL of the image that we can use for
    // an <img> element or backgroundImage.

  }, function(err) {

    // Ruh-roh, something bad happened

  }, cameraOptions);
})*/

.controller('CameraCtrl', function($scope, Camera) {

  $scope.getPhoto = function() {
    Camera.getPicture().then(function(imageURI) {
      console.log(imageURI);
    }, function(err) {
      console.err(err);
    });
  };
})

.controller('ProfileCtrl', function($scope) {})

.controller('MapCtrl', function($scope) {})


.controller('AccountCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
  };
});
