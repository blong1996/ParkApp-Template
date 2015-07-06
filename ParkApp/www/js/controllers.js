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
	
		
		// Home Controller
parkAppControllers.controller('HomeCtrl', function($scope, AppPhotos) {
	$scope.photos = AppPhotos;
	  // Returns all photos in app	
})

	

		// Notifications Controller
parkAppControllers.controller('NotificationsCtrl', function($scope) {})
	
		
		// Camera Controller
parkAppControllers.controller('CameraCtrl', function($scope, Camera) {
	
		var pictureSource;   // picture source
		var destinationType; // sets the format of returned value
		// Wait for device API libraries to load
		//
		document.addEventListener("deviceready",onDeviceReady,false);
		// device APIs are available
		//
		function onDeviceReady() {
				pictureSource=navigator.camera.PictureSourceType;
				destinationType=navigator.camera.DestinationType;
		}
		// Called when a photo is successfully retrieved
		//
		 function onPhotoDataSuccess(imageData) {
			// Uncomment to view the base64-encoded image data
			// console.log(imageData);
			// Get image handle
			//
			var smallImage = document.getElementById('smallImage');
			// Unhide image elements
			//
			smallImage.style.display = 'block';
			// Show the captured photo
			// The inline CSS rules are used to resize the image
			//
			smallImage.src = "data:image/jpeg;base64," + imageData;
		}
		// Called when a photo is successfully retrieved
		$scope.onPhotoURISuccess = function(imageURI) {
			// Uncomment to view the image file URI
			// console.log(imageURI);
			// Get image handle
			var largeImage = document.getElementById('largeImage');
			// Unhide image elements
			//
			largeImage.style.display = 'block';
			// Show the captured photo
			// The inline CSS rules are used to resize the image
			//
			largeImage.src = imageURI;
		}
		// A button will call this function
		//
		$scope.capturePhoto = function() {
			// Take picture using device camera and retrieve image as base64-encoded string
			navigator.camera.getPicture(onPhotoDataSuccess, onFail, { quality: 50,
				destinationType: destinationType.DATA_URL });
		}
		// A button will call this function
		//
		$scope.capturePhotoEdit = function() {
			// Take picture using device camera, allow edit, and retrieve image as base64-encoded string
			navigator.camera.getPicture(onPhotoDataSuccess, onFail, { quality: 20, allowEdit: true,
				destinationType: destinationType.DATA_URL });
		}
		// A button will call this function
		//
		$scope.getPhoto = function(source) {
			// Retrieve image file location from specified source
			navigator.camera.getPicture(onPhotoURISuccess, onFail, { quality: 50,
				destinationType: destinationType.FILE_URI,
				sourceType: source });
		}
		// Called if something bad happens.
		//
		$scope.onFail = function(message) {
			alert('Failed because: ' + message);
		}
})
parkAppControllers.controller("ExampleController", function($scope, $cordovaCamera, Camera) {
 var pictureSource;   // picture source
    var destinationType; // sets the format of returned value

    // Wait for device API libraries to load
    //
    document.addEventListener("deviceready",onDeviceReady,false);

    // device APIs are available
    //
    function onDeviceReady() {
        pictureSource=navigator.camera.PictureSourceType;
        destinationType=navigator.camera.DestinationType;
    }

    // Called when a photo is successfully retrieved
    //
     function onPhotoDataSuccess(imageData) {
      // Uncomment to view the base64-encoded image data
      // console.log(imageData);

      // Get image handle
      //
      var smallImage = document.getElementById('smallImage');

      // Unhide image elements
      //
      smallImage.style.display = 'block';

      // Show the captured photo
      // The inline CSS rules are used to resize the image
      //
      smallImage.src = "data:image/jpeg;base64," + imageData;
    }

    // Called when a photo is successfully retrieved
    //
    $scope.onPhotoURISuccess = function(imageURI) {
      // Uncomment to view the image file URI
      // console.log(imageURI);

      // Get image handle
      //
      var largeImage = document.getElementById('largeImage');

      // Unhide image elements
      //
      largeImage.style.display = 'block';

      // Show the captured photo
      // The inline CSS rules are used to resize the image
      //
      largeImage.src = imageURI;
    }

    // A button will call this function
    //
    $scope.capturePhoto = function() {
      // Take picture using device camera and retrieve image as base64-encoded string
      navigator.camera.getPicture(onPhotoDataSuccess, onFail, { quality: 50,
        destinationType: destinationType.DATA_URL });
    }

    // A button will call this function
    //
    $scope.capturePhotoEdit = function() {
      // Take picture using device camera, allow edit, and retrieve image as base64-encoded string
      navigator.Camera.getPicture(onPhotoDataSuccess, onFail, { quality: 20, allowEdit: true,
        destinationType: destinationType.DATA_URL });
    }

    // A button will call this function
    //
    $scope.getPhoto = function(source) {
      // Retrieve image file location from specified source
      navigator.Camera.getPicture(onPhotoURISuccess, onFail, { quality: 50,
        destinationType: destinationType.FILE_URI,
        sourceType: source });
    }

    // Called if something bad happens.
    //
    $scope.onFail = function(message) {
      alert('Failed because: ' + message);
    }

    $scope.takePicture = function() {
        var options = { 
            quality : 75, 
            // destinationType : destinationType.DATA_URL, 
           // sourceType : Camera.PictureSourceType.CAMERA, 
            allowEdit : true,
           // encodingType: Camera.EncodingType.JPEG,
           
           // popoverOptions: CameraPopoverOptions,
            saveToPhotoAlbum: true

        };
 
        $cordovaCamera.getPicture(options).then(function(imageData) {
            $scope.imgURI = "data:image/jpeg;base64," + imageData;
        }, function(err) {
            // An error occured. Show a message to the user
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
parkAppControllers.controller('ProfileCtrl', function($scope, Auth) {

	var ref = new Firebase("http//nczooapp.firebaseio.com/");
	var authData = ref.getAuth();
  var User = new Firebase("http//nczooapp.firebaseio.com/Users/"+authData.uid);
  var userEmail
  var userPassword

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

})

		// Map Controller
parkAppControllers.controller('MapCtrl', function($scope) {});
	



