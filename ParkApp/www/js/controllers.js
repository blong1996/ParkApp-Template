angular.module('ParkApp.controllers', [ ])

	// With the new view caching in Ionic, Controllers are only called
	// when they are recreated or on app start, instead of every page change.
	// To listen for when this page is active (for example, to refresh data),
	// listen for the $ionicView.enter event:
	//
	//$scope.$on('$ionicView.enter', function(e) {
	//});
	 
.controller('ProfileOptionsCtrl', function() {})
	// profile-options controller
.controller('OptionsEditCtrl', function() {})
	// options-edit controller
.controller('OptionsLikedCtrl', function() {})
	// options-liked controller
.controller('OptionsLogoutCtrl', function($scope, $state) {
	// options-logout controller
	$scope.logout = function() {
		$state.go('login');
	}
})
	
.controller('OptionsPrivacyCtrl', function() {})
	// options-privacy controller
.controller('OptionsDeleteCtrl', function() {})
	// options-delete controller
.controller('OptionsResetCtrl', function() {})
	// options-reset controller
.controller('OptionsTermsCtrl', function() {})
	// options-terms controller
.controller('OptionsProblemsCtrl', function() {})
	// options-problems controller
.controller('HomeCtrl', function($scope) {})
	// home controller
.controller('NotificationsCtrl', function($scope) {})
	// notifications controller
.controller('CameraCtrl', function($scope, Camera) {
	// cmera controller
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
.controller("ExampleController", function($scope, $cordovaCamera, Camera) {
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
.controller('LoginCtrl', function ($scope, $ionicModal, $firebaseAuth, $ionicLoading, $rootScope, $state) {
	// login controller
	console.log('Login Controller Initialized');

	//var ref = new Firebase($scope.firebaseUrl);
	//var auth = $firebaseAuth(ref);

	/*$ionicModal.fromTemplateUrl('templates/signup.html', {
		scope: $scope
	}).then(function (modal) {
		$scope.modal = modal;
	});*/
	$scope.login = function() {
		$state.go('tab.home');
	}
	$scope.createUser = function (user) {
		console.log("Create User function is caled");
		if (user & user.email && user.password && user.displayname) {
			$ionicLoading.show({
				template: 'Signing Up...'
			});
			auth.$createUser({
				email: user.email,
				password: user.password
			}).then(function (userData) {
					alert("User created successfully!");
					ref.child("users").child(userData.uid).set({
						email: user.email,
						displayname: user.displayname
					});
					$ionicLoading.hide();
					$scope.modal.hide();
			}).catch(function (error) {
					alert("Error: "+ error);
					$ionicLoading.hide();
			});	
		} else 
			 alert("Please fill all details"); 
	}

	$scope.signIn = function (user) {

		if(user && user.email && user.pwdForLogin) {
			$ionicLoading.show({
					template: 'Signing in...'
			});
			auth.$authWithPassword({
					email: user.email,
					password: user.pwdForLogin
			}).then(function (authData) {
					console.log("Logged in as:" + authData.uid);
					ref.child("users").child(authData.uid).once('value', function (snapshot) {
						var val = snapshot.val();
						// To update AngularJS $scope either use $apply or $timeout
						$scope.$apply(function () {
							$rootScope.displayName = val;
						});
					});
					$ionicLoading.hide();
					$state.go('tab.home');
			}).catch(function (error) {
					alert("Authentication failed:" + error.message);
					$ionicLoading.hide();
			});
		} else
		 		alert("Please enter email and password both");
	}
})

.controller('ProfileCtrl', function($scope) {})
	// profile controller
.controller('MapCtrl', function($scope) {});
	// map controller

