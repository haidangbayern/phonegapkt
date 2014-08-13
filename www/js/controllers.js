angular.module('starter.controllers', [])
.run(function(){

  if (typeof window.current_language == 'undefined'){
    window.current_language = 'en';
  }

})

.controller('AppCtrl', function($scope, $ionicModal, $ionicPopup, $timeout) {
    $scope.css_hide = "";
    if (typeof device != "undefined" && device.platform.toUpperCase() == "iOS".toUpperCase()){
        $scope.css_hide = "display:none";
    }


  $scope.lottery = window.languages[window.current_language].lottery;
  $scope.about = window.languages[window.current_language].about;
  $scope.exit = window.languages[window.current_language].exit;
  $scope.back = window.languages[window.current_language].back;
  
  $scope.close = window.languages[window.current_language].close;
  $scope.username = window.languages[window.current_language].username;
  $scope.password = window.languages[window.current_language].password;
  $scope.log_in = window.languages[window.current_language].log_in;
    
  $scope.help = window.languages[window.current_language].help;
  $scope.update_soon = window.languages[window.current_language].update_soon;

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

    
  // ************* Help
  $scope.helpData = {};

  // Create the login modal that we will use later
  $ionicModal.fromTemplateUrl('templates/help.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal_help = modal;
  });

  // Triggered in the login modal to close it
  $scope.closeHelp = function() {
    $scope.modal_help.hide();
  },

  // Open the login modal
  $scope.openHelp = function() {
    $scope.modal_help.show();
  };

  // ************* about application
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

  //************* an alert timer service
  $scope.showTimer = function() {
    var t = "<b><h3 id='popup_time_server'>"+ time_server.month + "/" + time_server.day + "/" + time_server.year + " " + time_server.hour + ":" + time_server.minutes + ":" + time_server.seconds + "</h3></b>";
    t += "<em>( " + time_server.timeZone + " " + time_server.timeZoneName + " )</em>";
   var alertPopup = $ionicPopup.alert({
     //title: '<i class="icon ion-ios7-clock-outline"></i> Server Time',
     template: t
   });
   alertPopup.then(function(res) {
     console.log('Thank you');
     $('body').removeClass("menu-open");
   });
  };


  // An alert dialog
  window.showAlert = function(title, message) {
    var alertPopup = $ionicPopup.alert({
      title: title,
      template: message,
    });
    alertPopup.then(function(res) {
      
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
  window.page_name = "app_home";

})

.controller('mainLotteryCtrl', function($scope, $http, $log){

 $scope.add_ticket = window.languages[window.current_language].add_ticket;
 $scope.my_tickets = window.languages[window.current_language].my_tickets;
 $scope.history = window.languages[window.current_language].history;
 $scope.estimated_jackpot = window.languages[window.current_language].estimated_jackpot;
 $scope.at      = window.languages[window.current_language].at;

  window.page_name = "app_lottery_main";
  stask_back_page.push({type:'url', action: 'window.location.href = "#/app/lottery"'});

  //*** Sponsor
  $log.info("Check");

  $('#slide-sponors').show();
  var slides = [];
  for(var i = 0; i < window.store_data.sponsors.length; i++)
  {
    slides.push({
      title : window.server_url + window.store_data.sponsors[i].image,
      index : i,
    url : window.store_data.sponsors[i].url,
    }) ;      
  }

  $scope.slides = slides;
  
 
  console.log("========================> lottery home page");

  //*** last_drawing
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

  //*** Estimated
  if (window.store_data.estimated != undefined)
  {
    $scope.estimated = {
      'datetime' : window.store_data.estimated.datetime,
      'jackpot' :  window.store_data.estimated.jackpot,
    };
    $('.next-drawing').show();
  }
  else
  {
    $('.next-drawing').hide();
  }
  //obj_loading.show();
  //lottery_home_page.initialize();

  $('body').removeClass('popup-open');
  $('body').removeClass('menu-open');
})

.controller('addTicketCtrl', function($scope){

  if (typeof obj_lottery != 'undefined'){
    obj_lottery.normal_number = {};
    obj_lottery.power_number = {};
  }
  $scope.enter_number_or      = window.languages[window.current_language].enter_number_or;
  $scope.quick_pick      = window.languages[window.current_language].quick_pick;
  //$scope.choose_lottery_date      = window.languages[window.current_language].choose_lottery_date;
  $scope.buy      = window.languages[window.current_language].buy;

  $scope.lottery = window.languages[window.current_language].lottery;
  $scope.add_ticket = window.languages[window.current_language].add_ticket;
  $scope.my_tickets = window.languages[window.current_language].my_tickets;
  $scope.more = window.languages[window.current_language].more;


  window.page_name = "app_lottery_add_ticket";
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



.controller('myTicketCtrl', function($scope){

  $scope.lottery = window.languages[window.current_language].lottery;
  $scope.add_ticket = window.languages[window.current_language].add_ticket;
  $scope.my_tickets = window.languages[window.current_language].my_tickets;
  $scope.more = window.languages[window.current_language].more;

  window.page_name = "app_lottery_my_ticket";
  stask_back_page.push({type:'url', action: 'window.location.href = "#/app/my_tickets"'});
  console.log("========================> my ticket");
  $('#page').val("1"); 
})

.controller('historyTicketCtrl', function($scope){

  $scope.lottery = window.languages[window.current_language].lottery;
  $scope.add_ticket = window.languages[window.current_language].add_ticket;
  $scope.history = window.languages[window.current_language].history;
  $scope.more = window.languages[window.current_language].more;

  window.page_name = "app_lottery_history_ticket";
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
       { text: '<i class="icon ion-ios7-home"></i> '+window.languages[window.current_language].lottery },
       { text: '<i class="icon ion-plus-circled"></i> '+window.languages[window.current_language].add_ticket},
       { text: '<i class="icon ion-ios7-pricetag"></i> '+window.languages[window.current_language].my_tickets },
       { text: '<i class="icon ion-star"></i> '+window.languages[window.current_language].history },
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