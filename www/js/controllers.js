angular.module('starter.controllers', [])

.controller('AppCtrl', function($scope, $ionicModal, $ionicPopup, $timeout) {
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

  //about application
  $scope.app_about = function(){
    var t = "ABC Virtual Communications <br/>";
    t += "@ 2014 Copyright All Rights Reserved. Kootoro.com";

    var alertAboutPopup = $ionicPopup.alert({
      title: 'Version '+window.version_application,
      template: t
    });
    alertAboutPopup.then(function(res) {
       console.log('Thank you');
       $('body').removeClass("menu-open");
    });
  };

  // application exit
  $scope.app_exit = function(){
    console.log("Exit application");
    app.exit();
  };

  //an alert timer service
  $scope.showTimer = function() {
    var t = "<b><h3 id='popup_time_server'>"+ time_server.month + "/" + time_server.day + "/" + time_server.year + " " + time_server.hour + ":" + time_server.minutes + ":" + time_server.seconds + "</h3></b>";
    t += "<em> ( " + time_server.timeZone + " " + time_server.timeZoneName + " ) </em>";
   var alertPopup = $ionicPopup.alert({
     //title: '<i class="icon ion-ios7-clock-outline"></i> Server Time',
     template: t
   });
   alertPopup.then(function(res) {
     console.log('Thank you');
     $('body').removeClass("menu-open");
   });
  };

})

.controller('PlaylistsCtrl', function($scope) {
  $scope.playlists = [
    { title: 'Reggae', id: 1 },
    { title: 'Chill', id: 2 },
    { title: 'Dubstep', id: 3 },
    { title: 'Indie', id: 4 },
    { title: 'Rap', id: 5 },
  ];
})

.controller('PlaylistCtrl', function($scope, $stateParams) {
})

.controller('homeCtrl', function(){
  console.log("========================> application home page");
  // obj_loading.show();
  app_home_page.initialize();

})

.controller('mainLotteryCtrl', function($scope, $http, $log){
  stask_back_page.push({type:'url', action: 'window.location.href = "#/app/lottery"'});

  $log.info("Check");

  $('#slide-sponors').show();
  var slides = [];
  for(var i = 0; i < window.store_data.sponsors.length; i++)
  {
    slides.push({
      title : window.server_url + window.store_data.sponsors[i].image,
      index : i,
    }) ;
  }

  $scope.slides = slides;
  
 
  console.log("========================> lottery home page");

  $scope.last_drawing = {
    'time' : '',
    'balls' : '',
    'jackpot' : '',
  };
  if (window.store_data.last_drawing != undefined)
  {
    $scope.last_drawing = {
      'time' : window.store_data.last_drawing.time_text,
      'balls' : window.store_data.last_drawing.balls,
      'jackpot' : window.store_data.last_drawing.jackpot,
    };
    $('.last-drawing').show();
  }
  else
  {
    $('.last-drawing').hide(); 
  }
  //obj_loading.show();
  //lottery_home_page.initialize();

  $('body').removeClass('popup-open');
  $('body').removeClass('menu-open');
})

.controller('addTicketCtrl', function(){
  stask_back_page.push({type:'url', action: 'window.location.href = "#/app/add_ticket"'});

  console.log("========================> add ticket");
  obj_loading.show();
  obj_interface.is_redesign = true;

  if (typeof obj_interface.data.version == "undefined")
  {
    //alert("Socket: request_data");
    console.log("Socket: Request_data");
    lottery_socket.emit('request_data');  
  }
  else
  {
    console.log("obj_interface has data");
    obj_interface.initialize_interface();
  }
})



.controller('myTicketCtrl', function(){
  stask_back_page.push({type:'url', action: 'window.location.href = "#/app/my_tickets"'});
  console.log("========================> my ticket");
  $('#page').val("1"); 
})

.controller('historyTicketCtrl', function(){
  stask_back_page.push({type:'url', action: 'window.location.href = "#/app/history"'});
  console.log(stask_back_page);
  console.log("========================> history");
  $('#page').val("1");
  obj_loading.show();
  lottery.view_history();

})

.controller('lotteryMoreMenuCtrl', function($scope, $ionicActionSheet, $timeout){
 // Triggered on a button click, or some other target
 $scope.showMoreMenu = function() {
    //stask_back_page.push({type:'method', action: 'hideSheet()'});
   // Show the action sheet
    hideSheet = $ionicActionSheet.show({
     buttons: [
       { text: '<i class="icon ion-ios7-home"></i> Lottery' },
       { text: '<i class="icon ion-plus-circled"></i> Add Ticket' },
       { text: '<i class="icon ion-ios7-pricetag"></i> My Tickets' },
       { text: '<i class="icon ion-star"></i> History' },
       //{ text: '<i class="icon ion-gear-a"></i> Setting' }
     ],
     //destructiveText: 'Delete',
     //titleText: 'Modify your album',
     // cancelText: 'Cancel',
     // cancel : function() {
     //  console.log("cancel");
     // },

     buttonClicked: function(index,ele) {
        switch (index)
        {          
          case 0 : {
            window.location.href = "#/app/lottery";
            break;
          }
          case 1: {
            window.location.href = "#/app/add_ticket";
            break;
          }
          case 2: {
            window.location.href = "#/app/my_tickets";
            break;
          }
          case 3: {
            window.location.href = "#/app/history";
            break;
          }
          // case 4: {
          //   window.location.href = "#/app/setting";
          //   break;
          // }
        }
        return true;
     }
   });

 };
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