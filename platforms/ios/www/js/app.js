
angular.module('starter', ['ionic','ngCordova',  'starter.controllers', 'starter.services'])



.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleLightContent();
    }
  });
})

.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider

  // setup an abstract state for the tabs directive
    .state('tab', {
    url: "/tab",
    abstract: true,
    templateUrl: "templates/tabs.html"
  })

  // Each tab has its own nav history stack:

    .state('tab.profile-options', {
      url: '/profile/options',
      views: {
        'tab-profile': {
          templateUrl: 'templates/profile-options.html',
          controller: 'ProfileOptionsCtrl'
        }
      }
    })

    .state('tab.home', {
      url: '/home',
      views: {
        'tab-home': {
          templateUrl: 'templates/tab-home.html', 
          controller: 'HomeCtrl'
        }
      }
    }) 

    .state('tab.notifications', {
      url: '/notifications',
      views: {
        'tab-notifications': {
          templateUrl: 'templates/tab-notifications.html', 
          controller: 'NotificationsCtrl'
        }
      }
    }) 

    .state('tab.profile', {
      url: '/profile',
      views: {
        'tab-profile': {
          templateUrl: 'templates/tab-profile.html', 
          controller: 'ProfileCtrl'
        }
      }
    }) 

    .state('tab.map', {
      url: '/map',
      views: {
        'tab-map': {
          templateUrl: 'templates/tab-map.html', 
          controller: 'MapCtrl'
        }
      }
    }) 
    .state('tab.camera', {
      url: '/camera',
      views: {
        'tab-camera': {
          templateUrl: 'templates/tab-camera.html',
          controller: 'CameraCtrl'
        }
      }
    });



  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/tab/home');

});
