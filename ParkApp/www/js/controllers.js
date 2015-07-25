'use strict';

var parkAppControllers = angular.module('parkAppControllers', [ ])

	// With the new view caching in Ionic, Controllers are only called
	// when they are recreated or on app start, instead of every page change.
	// To listen for when this page is active (for example, to refresh data),
	// listen for the $ionicView.enter event:
	//
	//$scope.$on('$ionicView.enter', function(e) {
	//});
	
		// Attractions Controller
parkAppControllers.controller('AttractionsCtrl', function() {})	

		// Notifications Controller
parkAppControllers.controller('NotificationsCtrl', function($scope) {})
		
		// Camera Controller
parkAppControllers.controller('NewPostCtrl', function($scope, $state, $cordovaCamera) {
	$scope.getPhoto = function(source) {
    // Retrieve image file location from specified source
    navigator.camera.getPicture(onPhotoURISuccess, onFail, { quality: 50,
      destinationType: destinationType.FILE_URI,
      sourceType: source });
  }


	$scope.takePhoto = function() {

    $cordovaCamera.getPicture({ 
    	quality : 75, 
      //destinationType : Camera.DestinationType.DATA_URL, 
      //sourceType : Camera.PictureSourceType.CAMERA, 
      allowEdit : true,
      //encodingType: Camera.EncodingType.JPEG,
      targetWidth: 375,
      targetHeight: 350,
      //popoverOptions: CameraPopoverOptions,
      saveToPhotoAlbum: false
    }).then(function(imageData) {
      console.log(imageData);
      $scope.imgURI = imageData;
     // alert(imageData)
    }, function(err) {
       alert("An error occurred: " + err)
    });
  }
})
		// Login Controller
parkAppControllers.controller('LoginCtrl', ['$scope',  '$firebaseAuth', '$location', '$state', 'Auth', 
	function ($scope, $firebaseAuth, $location, $state, Auth) {
	
	$scope.loginWithFacebook = function() {
		Auth.$authWithOAuthRedirect("facebook").then(function(authData) {
      // User successfully logged in
    }).catch(function(error) {
      if (error.code === "TRANSPORT_UNAVAILABLE") {
        Auth.$authWithOAuthPopup("facebook").then(function(authData) {
          // User successfully logged in. We can log to the console
          // since we’re using a popup here
          console.log(authData);
        });
      } else {
        // Another error occurred
        console.log(error);
      }
    });
	}

		// hard login 
	 $scope.login = function() {
		Auth.$authWithPassword({
		  email: "zcafarelli@gmail.com",
		  password: "1234"
		}).then(function(authData) {
		  console.log("Logged in as:", authData.uid);
		  $state.go('tab.home');
		}).catch(function(error) {
		  console.error("Authentication failed:", error);
		});
	} 

		// real login code for firebase
		// login Firebase user
	/*$scope.login = function() {
		Auth.$authWithPassword({
		  email: $scope.email,
		  password: $scope.password
		}).then(function(authData) {
		  console.log("Logged in as:", authData.uid);
		  $state.go('tab.home');
		}).catch(function(error) {
		  console.error("Authentication failed:", error);
		});
	}*/
			


	$scope.register = function() {
    /*Auth.$createUser({
      email: $scope.email,
      password: $scope.password
    }).then(function(userData) {
      console.log("User created with uid: " + userData.uid);

      $state.go('tab.home');
    }).catch(function(error) {
      console.log(error);
    }); */	
  };
  		// registers new Firebase user
}])


		// Profile Controller
parkAppControllers.controller('ProfileCtrl', function($scope, $state, $stateParams, Auth, AppPhotos, AppUsers) {

	var ref = new Firebase("http//nczooapp.firebaseio.com/");
	var authData = ref.getAuth();
  var userEmail;
  var userPassword;
  var User = new Firebase("http//nczooapp.firebaseio.com/Users/"+authData.uid);
	$scope.appPhotos = AppPhotos.all();
	  // Returns all photos in app
	
  $scope.user = User;
	User.child("Username").on("value", function(snapshot) {
		$scope.username = snapshot.val();
		$scope.userPhotos = AppPhotos.getUserPhotos(snapshot.val());

	});
	User.child("FullName").on("value", function(snapshot) {
		$scope.fullName = snapshot.val();
	});
	User.child("ProfilePic").on("value", function(snapshot) {
		$scope.profilePic = snapshot.val();
	});

	$scope.totalLikes = function() {
		var photos = AppPhotos.all();
		var likes = 0;
		for (var x = 0; x < photos.length; x++) {
			if (photos[x].uid = authData.uid) {
				if(photos[x].Likes != null) {
					for (var y = 0; y < photos[x].Likes.length; y++) {
						if (photos[x].Likes[y].uid != authData.uid) {
							likes++;
						}
					}
				}
			}
		}
		return likes;
	}

	$scope.photo = AppPhotos.get($stateParams.photoID);

	$scope.isLiked = function(photo) {
		if(photo.Likes != null) {
			for(var x = 0; x < photo.Likes.length; x++) {
				if (photo.Likes[x].uid == authData.uid) {
					return true;
					break;
				}
			}
			return false;
		}
			return false;
	}


	$scope.likePic = function(photo) {
		var photoID = photo.ID;
		var photoRef = new Firebase("http//nczooapp.firebaseio.com/AppPictures/"+photoID);
		var isLiked = false;
		$scope.buttonSource = "/img/notclicked.png";
		if(photo.Likes != null) {
			// if the photo has likes
			for(var x = 0; x < photo.Likes.length; x++) {
				if (photo.Likes[x].uid == authData.uid) {
					// photo is liked by current user 
					isLiked = true;
					var photoUser = photo.uid
					var likeID = photo.Likes[x].ID;
					var likeRef = new Firebase("http//nczooapp.firebaseio.com/AppPictures/"+photoID+"/Likes/"+likeID);
					var photoUserRef = new Firebase("http//nczooapp.firebaseio.com/Users/"+photoUser);
					likeRef.remove();
						//removes like
					break;
				}
			}
			if (!isLiked) {
				//the photo has likes but is unliked by current user 
				var numLikes = photo.Likes.length
				var newID = photo.Likes[numLikes-1].ID + 1
				var photoLikesRef = photoRef.child("Likes");
				var newIDRef = photoLikesRef.child(newID);
				newIDRef.set({
						Date: "July 23, 2015",
						ID: newID,
						Username: "zach_attack",
						uid: authData.uid
				});
					//adds like
			}
		} else {
			 // else (the photo has no likes)
			 var photoLikesRef = photoRef.child("Likes");
				photoLikesRef.set({
			 		0: {
			 			Date: "July 23, 2015",
			 			ID: 0,
			 			Username: "zach_attack",
						uid: authData.uid
			 		}
			 });
				//adds like
		}
		//$state.go($state.current, {}, {reload: true});
	}

  User.child("PhoneNumber").on("value", function(snapshot) {
  	$scope.number = snapshot.val();
  });	
  User.child("Email").on("value", function(snapshot) {
  	$scope.email = snapshot.val();
  	userEmail = snapshot.val();
  });
  User.child("Password").on("value", function(snapshot) {
  	userPassword = snapshot.val();
  }); 


  $scope.profileEditSave = function() {
  	ref.changeEmail({
		  oldEmail : userEmail,
		  newEmail : $scope.newEmail,
		  password : userPassword
			}, function(error) {
			  if (error === null) {
			    console.log("Email changed successfully");
			  } else {
			    console.log("Error changing email:", error);
			  }
		});
  };

  $scope.save = function() {
  };

  $scope.changePassword = function () {
  	ref.changePassword({
		  email       : userEmail,
		  oldPassword : userPassword,
		  newPassword : $scope.password
		}, function(error) {
		  if (error === null) {
		    console.log("Password changed successfully");
		  } else {
		    console.log("Error changing password:", error);
		  }
		});
  };

	$scope.logout = function() {
		$state.go('login');
	};

	

})

		// Map Controller
parkAppControllers.controller('MapCtrl', function($scope) {});
	



