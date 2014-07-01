angular.module('starter.controllers', [])

.controller('AppCtrl', function($scope, $ionicModal, $timeout) {
  // Form data for the login modal
  $scope.loginData = {};

  // Create the login modal that we will use later
  $ionicModal.fromTemplateUrl('templates/login.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });

  // Triggered in the login modal to close it
  $scope.closeLogin = function() {
    $scope.modal.hide();
  },

  // Open the login modal
  $scope.login = function() {
    $scope.modal.show();
  };

  // Perform the login action when the user submits the login form
  $scope.doLogin = function() {
    console.log('Doing login', $scope.loginData);

    // Simulate a login delay. Remove this and replace with your login
    // code if using a login system
    $timeout(function() {
      $scope.closeLogin();
    }, 1000);
  };
})

.controller('PlaylistsCtrl', function($scope) {
  $scope.playlists = [
    { title: 'Reggae', id: 1 },
    { title: 'Chill', id: 2 },
    { title: 'Dubstep', id: 3 },
    { title: 'Indie', id: 4 },
    { title: 'Rap', id: 5 },
    { title: 'Cowbell', id: 6 }
  ];
})

.controller('PlaylistCtrl', function($scope, $stateParams) {
})

.controller('addTicketCtrl', function(){
  obj_loading.show();
  obj_interface.is_redesign = true;
  if (!window.is_device)
  {
    console.log("obj_socket.initialize");
    obj_socket.initialize();
  }
  else
  {
    console.log("app.initialize");
    app.initialize();
  }
})

.controller('myTicketCtrl', function(){
  //obj_loading.show();
  //lottery.view_tickets();
})

.controller('historyTicketCtrl', function(){
  obj_loading.show();
  lottery.view_history();
})

function loadMyTicketCtrl($scope, $http) {
  $scope.loadMoreTicket = function() {
    if (Number($('#page').val()) != 0)
    {
      lottery.view_tickets($('#page').val());  
      window.scope = $scope;
    }
    else
    {
      $scope.$broadcast('scroll.infiniteScrollComplete');
    }
  };

  $scope.$on('stateChangeSuccess', function() {
    $scope.loadMoreTicket();
  });
}
