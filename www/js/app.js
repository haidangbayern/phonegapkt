// Ionic Starter App
// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('kootoro', ['ionic', 'starter.controllers']).run(function($ionicPlatform) {
    $ionicPlatform.ready(function() {
        // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
        // for form inputs)
        if (window.cordova && window.cordova.plugins.Keyboard) {
            cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
        }
        if (window.StatusBar) {
            // org.apache.cordova.statusbar required
            StatusBar.styleDefault();
        }
    });
    $ionicPlatform.registerBackButtonAction(function() {
        app.onBackKeyDown();
    }, 100);
}).config(function($stateProvider, $urlRouterProvider, $httpProvider) {
    $stateProvider.state('app', {
        url: "/app",
        abstract: true,
        templateUrl: "templates/menu.html",
        controller: 'AppCtrl'
    })
    .state('home', {
        url: "/home",
        templateUrl: "templates/home.html",
        controller: 'homeCtrl'
    })
    .state('login', {
        url: "/login",
        templateUrl: "templates/login.html",
        controller: 'loginCtrl'
    })
    .state('register', {
        url: "/register",
        templateUrl: "templates/sign-up.html",
        controller: 'signUpCtrl'
    })
    //*************** for Trade-In ******************************
    .state('app.trade_in', {
        url: "/trade_in",
        views: {
            'menuContent': {
                templateUrl: "templates/trade_in.html",
                controller: 'tradeInCtrl'
            }
        }
    }).state('app.single', {
        url: "/trade_in/:programId",
        views: {
            'menuContent': {
                templateUrl: "templates/trade_in_form.html",
                controller: 'tradeInFormCtrl'
            }
        }
    })
    //*************** for lottery *******************************
    .state('app.lottery', {
        url: "/lottery",
        views: {
            'menuContent': {
                templateUrl: "templates/lottery/main.html",
                controller: 'mainLotteryCtrl'
            }
        }
    }).state('app.add_ticket', {
        url: '/add_ticket',
        views: {
            'menuContent': {
                templateUrl: 'templates/lottery/tab-add_ticket.html',
                controller: 'addTicketCtrl'
            }
        }
    }).state('app.my_tickets', {
        url: '/my_tickets',
        views: {
            'menuContent': {
                templateUrl: 'templates/lottery/tab-my_tickets.html',
                controller: 'myTicketCtrl'
            }
        }
    }).state('app.history', {
        url: '/history',
        views: {
            'menuContent': {
                templateUrl: 'templates/lottery/tab-history.html',
                controller: 'historyTicketCtrl'
            }
        }
    }).state('app.setting', {
        url: '/setting',
        views: {
            'menuContent': {
                templateUrl: 'templates/lottery/tab-setting.html',
            }
        }
    });
    // if none of the above states are matched, use this as the fallback
    $urlRouterProvider.otherwise('/home');
});