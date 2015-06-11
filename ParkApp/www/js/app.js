
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

		.state('tab.options-edit', {
			url: '/options/edit',
			views: {
				'tab-profile': {
					templateUrl: 'templates/options-edit.html',
					controller: 'OptionsEditCtrl'
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
					controller: 'ExampleController'
				}
			}
		});



	// if none of the above states are matched, use this as the fallback
	$urlRouterProvider.otherwise('/tab/home');

});

/*
 * SimplePubSub from https://github.com/mbenford/ngTagsInput/blob/master/src/util.js
 * */
'use strict';
var app = angular.module('slidebox', ['ionic', 'style'])
		.run(['$q', '$http', '$rootScope', '$location', '$window', '$timeout', 
					function($q, $http, $rootScope, $location, $window, $timeout){
			
					$rootScope.$on("$locationChangeStart", function(event, next, current){
							$rootScope.error = null;
							console.log("Route change!!!", $location.path());
							var path = $location.path();
							
							
							console.log("App Loaded!!!");
					});
			}
			]);
		
		app.config(function($stateProvider, $urlRouterProvider) {
			$stateProvider.state('index', {
				url : '/',
				templateUrl : 'index.html',
				controller : 'IndexCtrl'
			});
		
			$urlRouterProvider.otherwise("/");
		});
		
				app.controller("IndexCtrl", ['$rootScope', "$scope", "$stateParams", "$q", "$location", "$window", '$timeout', 
			function($rootScope, $scope, $stateParams, $q, $location, $window, $timeout){
			$scope.onSlideMove = function(data){
				alert("You have selected " + data.index + " tab");
			};  
				}
				]);

function SimplePubSub() {
		var events = {};
		return {
				on: function(names, handler) {
						names.split(' ').forEach(function(name) {
								if (!events[name]) {
										events[name] = [];
								}
								events[name].push(handler);
						});
						return this;
				},
				trigger: function(name, args) {
						angular.forEach(events[name], function(handler) {
								handler.call(null, args);
						});
						return this;
				}
		};
};

angular.module('tabSlideBox', [])
.directive('onFinishRender', function ($timeout) {
		return {
				restrict: 'A',
				link: function (scope, element, attr) {
						if (scope.$last === true) {
								$timeout(function () {
										scope.$emit('ngRepeatFinished');
								});
						}
				}
		}
})
.directive('tabSlideBox', [ '$timeout', '$window', '$ionicSlideBoxDelegate', '$ionicScrollDelegate',
	function($timeout, $window, $ionicSlideBoxDelegate, $ionicScrollDelegate) {
		'use strict';

		return {
			restrict : 'A, E, C',
			link : function(scope, element, attrs, ngModel) {
				
				var ta = element[0], $ta = element;
				$ta.addClass("tabbed-slidebox");
				if(attrs.tabsPosition === "bottom"){
					$ta.addClass("btm");
				}
				
				//Handle multiple slide/scroll boxes
				var handle = ta.querySelector('.slider').getAttribute('delegate-handle');
				
				var ionicSlideBoxDelegate = $ionicSlideBoxDelegate;
				if(handle){
					ionicSlideBoxDelegate = ionicSlideBoxDelegate.$getByHandle(handle);
				}
				
				var ionicScrollDelegate = $ionicScrollDelegate;
				if(handle){
					ionicScrollDelegate = ionicScrollDelegate.$getByHandle(handle);
				}
				
				function renderScrollableTabs(){
					var iconsDiv = angular.element(ta.querySelector(".tsb-icons")), icons = iconsDiv.find("a"), wrap = iconsDiv[0].querySelector(".tsb-ic-wrp"), totalTabs = icons.length;
					var scrollDiv = wrap.querySelector(".scroll");
					
					angular.forEach(icons, function(value, key){
							 var a = angular.element(value);
							 a.on('click', function(){
								 ionicSlideBoxDelegate.slide(key);
							 });

						if(a.attr('icon-off')) {
							a.attr("class", a.attr('icon-off'));
						}
					});
					
					var initialIndex = attrs.tab;
					//Initializing the middle tab
					if(typeof attrs.tab === 'undefined' || (totalTabs <= initialIndex) || initialIndex < 0){
						initialIndex = Math.floor(icons.length/2);
					}
					
					//If initial element is 0, set position of the tab to 0th tab 
					if(initialIndex == 0){
						setPosition(0);
					}
					
					$timeout(function() {
						ionicSlideBoxDelegate.slide(initialIndex);
					}, 0);
				}
				function setPosition(index){
					var iconsDiv = angular.element(ta.querySelector(".tsb-icons")), icons = iconsDiv.find("a"), wrap = iconsDiv[0].querySelector(".tsb-ic-wrp"), totalTabs = icons.length;
					var scrollDiv = wrap.querySelector(".scroll");
					
					var middle = iconsDiv[0].offsetWidth/2;
					var curEl = angular.element(icons[index]);
					var prvEl = angular.element(iconsDiv[0].querySelector(".active"));
					if(curEl && curEl.length){
					var curElWidth = curEl[0].offsetWidth, curElLeft = curEl[0].offsetLeft;

					if(prvEl.attr('icon-off')) {
						prvEl.attr("class", prvEl.attr('icon-off'));
					}else{
						prvEl.removeClass("active");
					}
					if(curEl.attr('icon-on')) {
						curEl.attr("class", curEl.attr('icon-on'));
					}
					curEl.addClass("active");
					
					var leftStr = (middle  - (curElLeft) -  curElWidth/2 + 5);
					//If tabs are not scrollable
					if(!scrollDiv){
						var leftStr = (middle  - (curElLeft) -  curElWidth/2 + 5) + "px";
						wrap.style.webkitTransform =  "translate3d("+leftStr+",0,0)" ;
					}else{
						//If scrollable tabs
						var wrapWidth = wrap.offsetWidth;
						var currentX = Math.abs(getX(scrollDiv.style.webkitTransform));
						var leftOffset = 100;
						var elementOffset = 40;
						//If tabs are reaching right end or left end
						if(((currentX + wrapWidth) < (curElLeft + curElWidth + elementOffset)) || (currentX > (curElLeft - leftOffset))){
							if(leftStr > 0){
								leftStr = 0;
							}
							//Use this scrollTo, so when scrolling tab manually will not flicker
							ionicScrollDelegate.scrollTo(Math.abs(leftStr), 0, true);
						}
					}
					}
				};
				function getX(matrix) {
					matrix = matrix.replace("translate3d(","");
					matrix = matrix.replace("translate(","");
					return (parseInt(matrix));
				}
				var events = scope.events;
				events.on('slideChange', function(data){
					setPosition(data.index);
				});
				events.on('ngRepeatFinished', function(ngRepeatFinishedEvent) {
					renderScrollableTabs();
				});
				
				renderScrollableTabs();
			},
			controller : function($scope, $attrs, $element) {
				$scope.events = new SimplePubSub();
				
				$scope.slideHasChanged = function(index){
					$scope.events.trigger("slideChange", {"index" : index});
					$timeout(function(){if($scope.onSlideMove) $scope.onSlideMove({"index" : eval(index)});},100);
				};
				
				$scope.$on('ngRepeatFinished', function(ngRepeatFinishedEvent) {
					$scope.events.trigger("ngRepeatFinished", {"event" : ngRepeatFinishedEvent});
				});
			}
		};

	} 
]);

