angular.module('starter.controllers', [ ])

  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //
  //$scope.$on('$ionicView.enter', function(e) {
  //});
  

.controller('ProfileOptionsCtrl', function() {
})

.controller('HomeCtrl', function($scope) {})

.controller('NotificationsCtrl', function($scope) {})



.controller('CameraCtrl', function($scope, Camera) {

    $scope.getPhoto = function() {
    console.log('Getting camera');
    Camera.getPicture({
      quality: 75,
      targetWidth: 320,
      targetHeight: 320,
      saveToPhotoAlbum: false
    }).then(function(imageURI) {
      console.log(imageURI);
      $scope.lastPhoto = imageURI;
    }, function(err) {
      console.err(err);
    });
  };
})


.controller('ProfileCtrl', function($scope) {})



.controller('MapCtrl', function($scope) {});


