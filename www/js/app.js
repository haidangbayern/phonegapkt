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
            cordova.plugins.Keyboard.hideKeyboardAccessoryBar(false); //hide done button
            cordova.plugins.Keyboard.disableScroll(window.keyboard_disableScroll);
        }
        if (window.StatusBar) {
            // org.apache.cordova.statusbar required
            //StatusBar.styleDefault();
            StatusBar.hide();
        }
    });
    $ionicPlatform.registerBackButtonAction(function() {
        console.log("Button back keydown")
        //app.onBackKeyDown();
    }, 100);
}).config(function($stateProvider, $urlRouterProvider, $httpProvider) {
    $stateProvider.state('app', {
        url: "/app",
        abstract: true,
        templateUrl: "templates/menu.html",
        controller: 'AppCtrl'
    }).state('home', {
        url: "/home",
        templateUrl: "templates/home.html",
        controller: 'homeCtrl'
    }).state('login', {
        url: "/login",
        templateUrl: "templates/login.html",
        controller: 'loginCtrl'
    }).state('register', {
        url: "/register",
        templateUrl: "templates/sign-up.html",
        controller: 'signUpCtrl'
    }).state('forgot_password', {
        url: "/forgot_password",
        templateUrl: "templates/forgot-password.html",
        controller: 'forgotPasswordCtrl'
    })
    //*************** for home page ******************************
    .state('app.home2', {
        url: "/home2",
        // templateUrl: "templates/home2.html",
        // controller: 'home2Ctrl'
        views: {
            'menuContent': {
                templateUrl: "templates/home2.html",
                controller: 'home2Ctrl'
            }
        }
    })
    //*************** for Forum ******************************
    .state('app.forum', {
        url: "/forum",
        // templateUrl: "templates/home2.html",
        // controller: 'home2Ctrl'
        views: {
            'menuContent': {
                templateUrl: "templates/forum.html",
                controller: 'forumCtrl'
            }
        }
    })
    //*************** for Profile ******************************
    .state('app.profile', {
        url: "/profile",
        views: {
            'menuContent': {
                templateUrl: "templates/profile.html",
                controller: 'profileCtrl'
            }
        }
    }).state('app.general', {
        url: "/general",
        views: {
            'menuContent': {
                templateUrl: "templates/profile/general.html",
                controller: 'profileGeneralCtrl'
            }
        }
    }).state('app.change_password', {
        url: "/change_password",
        views: {
            'menuContent': {
                templateUrl: "templates/profile/change_password.html",
                controller: 'profileChangePasswordCtrl'
            }
        }
    }).state('app.kootoro_account', {
        url: "/kootoro_account",
        views: {
            'menuContent': {
                templateUrl: "templates/profile/kootoro_account.html",
                controller: 'profileKootoroAccountCtrl'
            }
        }
    }).state('app.personal_detail', {
        url: "/personal_detail",
        views: {
            'menuContent': {
                templateUrl: "templates/profile/personal_detail.html",
                controller: 'profilePersonalDetailCtrl'
            }
        }
    }).state('app.personal_avatar', {
        url: "/avatar",
        views: {
            'menuContent': {
                templateUrl: "templates/profile/avatar.html",
                controller: 'profileAvatarCtrl'
            }
        }
    }).state('app.money_toro_history', {
        url: "/money_toro_history",
        views: {
            'menuContent': {
                templateUrl: "templates/profile/money_toro_history.html",
                controller: 'profileMoneyToroHistoryCtrl'
            }
        }
    }).state('app.exchange_items_history', {
        url: "/exchange_items_history",
        views: {
            'menuContent': {
                templateUrl: "templates/profile/exchange_items_history.html",
                controller: 'profileExchangeItemsHistoryCtrl'
            }
        }
    }).state('app.friend_setting', {
        url: "/friend_setting",
        views: {
            'menuContent': {
                templateUrl: "templates/profile/friend_setting.html",
                controller: 'profileFriendSettingCtrl'
            }
        }
    })
    //*************** for Friend ******************************
    .state('app.games', {
        url: "/games",
        views: {
            'menuContent': {
                templateUrl: "templates/games.html",
                controller: 'gamesCtrl'
            }
        }
    }).state('app.list_games', {
        url: "/games/list_games/:categoryId",
        views: {
            'menuContent': {
                templateUrl: "templates/games/list_games.html",
                controller: 'listGamesCtrl'
            }
        }
    }).state('app.game_detail', {
        url: "/games/detail/:gameId",
        views: {
            'menuContent': {
                templateUrl: "templates/games/detail.html",
                controller: 'detailGameCtrl'
            }
        }
    }).state('app.play_game', {
        url: "/games/play/:gameId",
        views: {
            'menuContent': {
                templateUrl: "templates/games/play.html",
                controller: 'playGameCtrl'
            }
        }
    })
    //*************** for Friend ******************************
    .state('app.friend', {
        url: "/friend",
        views: {
            'menuContent': {
                templateUrl: "templates/friend.html",
                controller: 'friendCtrl'
            }
        }
    })
    //*************** for buy toro ******************************
    .state('app.buy', {
        url: "/buy",
        views: {
            'menuContent': {
                templateUrl: "templates/buy.html",
                controller: 'buyCtrl'
            }
        }
    }).state('app.buy_more_toros', {
        url: "/buy_more_toros",
        views: {
            'menuContent': {
                templateUrl: "templates/buy/buy_more_toros.html",
                controller: 'buyMoreTorosCtrl'
            }
        }
    }).state('app.trade_in', {
        url: "/trade_in",
        views: {
            'menuContent': {
                templateUrl: "templates/buy/trade_in.html",
                controller: 'tradeInCtrl'
            }
        }
    }).state('app.trade_in_form', {
        url: "/trade_in/:programId",
        views: {
            'menuContent': {
                templateUrl: "templates/buy/trade_in_form.html",
                controller: 'tradeInFormCtrl'
            }
        }
    })
    //*************** for Item Exchange & checkout ******************************
    .state('app.product', {
        url: "/product",
        views: {
            'menuContent': {
                templateUrl: "templates/product/product_categories.html",
                controller: 'productCtrl'
            }
        }
    }).state('app.checkout', {
        url: "/checkout/:reference_url",
        views: {
            'menuContent': {
                templateUrl: "templates/checkout/checkout.html",
                controller: 'checkoutCtrl'
            }
        }
    }).state('app.product_category', {
        url: "/product_category/:productCategoryId",
        views: {
            'menuContent': {
                templateUrl: "templates/product/products_list.html",
                controller: 'productCategoryCtrl'
            }
        }
    }).state('app.product_detail', {
        url: "/product/:productId",
        views: {
            'menuContent': {
                templateUrl: "templates/product/product_detail.html",
                controller: 'productDetailCtrl'
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
    });
    // if none of the above states are matched, use this as the fallback
    $urlRouterProvider.otherwise('/home');
}).filter('makeRange', function() {
    return function(input) {
        var lowBound, highBound;
        switch (input.length) {
            case 1:
                lowBound = 0;
                highBound = parseInt(input[0]) - 1;
                break;
            case 2:
                lowBound = parseInt(input[0]);
                highBound = parseInt(input[1]);
                break;
            default:
                return input;
        }
        var result = [];
        for (var i = lowBound; i <= highBound; i++) result.push(i);
        return result;
    };
    //<div ng-repeat="n in [10] | makeRange">Do something 0..9: {{n}}</div>
    //<div ng-repeat="n in [20, 29] | makeRange">Do something 20..29: {{n}}</div>
}).filter('smileys', function(){
    return function(input)
    {
        return obj_smileys.convert_character_to_smileys(input);
    };
}).controller("KeyboardFix", function ($scope) {
    //$scope.inputValue = '';
    $scope.getKey = function(event, forInput) {
        if (document.getElementById(forInput) != null) {
            $scope.inputValue += String.fromCharCode(event.keyCode);
        }
        event.preventDefault();
    }
})
.directive('ngEnter', function() {
    return function(scope, element, attrs) {
        element.bind("keydown keypress", function(event) {
            if(event.which === 13) {
                scope.$apply(function(){
                    scope.$eval(attrs.ngEnter, {'event': event});
                });

                event.preventDefault();
            }
        });
    };
})
.controller("KeyboardFix", function ($scope) {
    $scope.inputValue = '';
    $scope.getKey = function(event, forInput) {
        if (document.getElementById(forInput) != null) {
            $scope.inputValue += String.fromCharCode(event.keyCode);
        }
        event.preventDefault();
    }
});

