'use strict';

var parkApp = angular.module('parkApp', ['ionic','ngCordova',  'parkAppControllers', 'parkAppServices',  'firebase'])

parkApp.run(function($ionicPlatform, $rootScope) {
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

parkApp.constant('FIREBASE_URI', 'http//nczooapp.firebaseio.com/');



parkApp.config(function($stateProvider, $urlRouterProvider) {

	// Ionic uses AngularUI Router which uses the concept of states
	// Learn more here: https://github.com/angular-ui/ui-router
	// Set up the various states which the app can be in.
	// Each state's controller can be found in controllers.js
	$stateProvider
	// setup an abstract state for the tabs directive
		.state('login', {
			url: "/login",
			templateUrl:"templates/login.html",
			controller: 'LoginCtrl'
	})
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
					controller: 'ProfileCtrl'
				}
			}
		})
		.state('tab.options-edit', {
			url: '/profile/options/edit',
			views: {
				'tab-profile': {
					templateUrl: 'templates/options-edit.html',
					controller: 'ProfileCtrl'
				}
			}
		})
		.state('tab.options-password', {
			url: '/profile/options/password',
			views: {
				'tab-profile': {
					templateUrl: 'templates/options-password.html',
					controller: 'ProfileCtrl'
				}
			}
		})
		.state('tab.options-liked', {
			url: '/profile/options/liked',
			views: {
				'tab-profile': {
					templateUrl: 'templates/options-liked.html',
					controller: 'ProfileCtrl'
				}
			}
		})
		.state('tab.options-logout', {
			url: '/profile/options/logout',
			views: {
				'tab-profile': {
					templateUrl: 'templates/options-logout.html',
					controller: 'ProfileCtrl'
				}
			}
		})
		.state('tab.options-privacy', {
			url: '/profile/options/privacy',
			views: {
				'tab-profile': {
					templateUrl: 'templates/options-privacy.html',
					controller: 'ProfileCtrl'
				}
			}
		})
		.state('tab.options-problems', {
			url: '/profile/options/problems',
			views: {
				'tab-profile': {
					templateUrl: 'templates/options-problems.html',
					controller: 'ProfileCtrl'
				}
			}
		})
		.state('tab.options-reset', {
			url: '/profile/options/reset',
			views: {
				'tab-profile': {
					templateUrl: 'templates/options-reset.html',
					controller: 'ProfileCtrl'
				}
			}
		})
		.state('tab.options-terms', {
			url: '/profile/options/terms',
			views: {
				'tab-profile': {
					templateUrl: 'templates/options-terms.html',
					controller: 'ProfileCtrl'
				}
			}
		})
		.state('tab.options-delete', {
			url: '/profile/options/delete',
			views: {
				'tab-profile': {
					templateUrl: 'templates/options-delete.html',
					controller: 'ProfileCtrl'
				}
			}
		})
		.state('tab.comments', {
			url: '/templates/comments',
			views: {
				'tab-home': {
					templateUrl: 'templates/tab-comments.html', 
					controller: 'ProfileCtrl'
				}
			}
		}) 
		.state('tab.home', {
			url: '/home',
			views: {
				'tab-home': {
					templateUrl: 'templates/tab-home.html', 
					controller: 'ProfileCtrl'
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
		.state('tab.newpost', {
			url: '/newpost',
			views: {
				'tab-newpost': {
					templateUrl: 'templates/tab-newpost.html',
					controller: 'NewPostCtrl'
				}
			}
		})
		
		.state('tab.attractions-tag', {
			url: '/nepost/attractions-tag',
			views: {
				'tab-newpost': {
					templateUrl: 'templates/attractions-tag.html',
					controller: 'AttractionsCtrl'
				}
			}
		})

	// if none of the above states are matched, use this as the fallback
	$urlRouterProvider.otherwise('/login');

});



