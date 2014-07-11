// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('kootoro', ['ionic', 'starter.controllers'])

.run(function($ionicPlatform) {
  
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if(window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });


  $ionicPlatform.registerBackButtonAction(function () {
    app.onBackKeyDown();
  }, 100);
})

.config(function($stateProvider, $urlRouterProvider, $httpProvider) {

  $stateProvider

    .state('app', {
      url: "/app",
      abstract: true,
      templateUrl: "templates/menu.html",
      controller: 'AppCtrl'
    })

    .state('app.search', {
      url: "/searchabcv",
      views: {
        'menuContent' :{
          templateUrl: "templates/search.html"
        }
      }
    })

    .state('app.browse', {
      url: "/browse",
      views: {
        'menuContent' :{
          templateUrl: "templates/browse.html"
        }
      }
    })
    .state('app.playlists', {
      url: "/playlists",
      views: {
        'menuContent' :{
          templateUrl: "templates/playlists.html",
          controller: 'PlaylistsCtrl'
        }
      }
    })

    .state('app.single', {
      url: "/playlists/:playlistId",
      views: {
        'menuContent' :{
          templateUrl: "templates/playlist.html",
          controller: 'PlaylistCtrl'
        }
      }
    })
    //*************** for Home page *******************************
    .state('app.home', {
      url: "/home",
      views: {
        'menuContent' :{
          templateUrl: "templates/home.html",
          controller: 'homeCtrl'
        }
      }
    })
    
    //*************** for lottery *******************************
    .state('app.lottery', {
      url: "/lottery",
      views: {
        'menuContent' :{
          templateUrl: "templates/lottery/main.html",
          controller: 'mainLotteryCtrl'
        }
      }
    })

    .state('app.add_ticket', {
      url: '/add_ticket',
      views: {
        'menuContent': {
          templateUrl: 'templates/lottery/tab-add_ticket.html',
          controller: 'addTicketCtrl'
        }
      }
    })

    .state('app.my_tickets', {
      url: '/my_tickets',
      views: {
        'menuContent': {
          templateUrl: 'templates/lottery/tab-my_tickets.html',
          controller: 'myTicketCtrl'
        }
      }
    })
    .state('app.history', {
      url: '/history',
      views: {
        'menuContent': {
          templateUrl: 'templates/lottery/tab-history.html',
          controller: 'historyTicketCtrl'
        }
      }
    })

    .state('app.setting', {
      url: '/setting',
      views: {
        'menuContent': {
          templateUrl: 'templates/lottery/tab-setting.html',
        }
      }
    })
    ;
  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/app/home');
});


