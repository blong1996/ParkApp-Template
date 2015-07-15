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
parkAppControllers.controller('ProfileCtrl', function($scope, Auth, AppPhotos) {

	var ref = new Firebase("http//nczooapp.firebaseio.com/");
	var authData = ref.getAuth();
  var User = new Firebase("http//nczooapp.firebaseio.com/Users/"+authData.uid);
  var userEmail;
  var userPassword;
  var userPhotos;
  $scope.user = User;
	User.child("Username").on("value", function(snapshot) {
		$scope.username = snapshot.val();
	});
	User.child("FullName").on("value", function(snapshot) {
		$scope.fullName = snapshot.val();
	});
	User.child("ProfilePic").on("value", function(snapshot) {
		$scope.profilePic = snapshot.val();
	});
	User.child("Pictures").on("value", function(snapshot) {
		$scope.pictures = snapshot.val();
		userPhotos = snapshot.val();
	});
	User.child("TotalLikes").on("value", function(snapshot) {
		$scope.likes = snapshot.val();
	});
  User.child("LikedPictures").on("value", function(snapshot) {
  	$scope.likedPics = snapshot.val();
  });
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

	$scope.appPhotos = AppPhotos;
	  // Returns all photos in app
	$scope.userLike = function(photoID) {
		var p;
		User.child("LikedPictures").on("value", function(snapshot) {
			var pics = snapshot.val()

			for(var x = 0; x < pics.length; x++) {
				
			}
			pics.child(photoID).on("value", function(snap) {
				p = snapshot.val();
					return p.isLiked;
			})
		});
	};

})

		// Map Controller
parkAppControllers.controller('MapCtrl', function($scope) {});
	



