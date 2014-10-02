angular.module('starter.controllers', []).run(function() {
    if (typeof window.current_language == 'undefined') {
        window.current_language = 'en';
    }
}).controller('AppCtrl', function($scope, $ionicModal, $ionicPopup, $timeout) {
    $scope.css_hide = "";
    if (typeof device != "undefined" && device.platform.toUpperCase() == "iOS".toUpperCase()) {
        $scope.css_hide = "display:none";
    }
    $scope.lottery = window.languages[window.current_language].lottery;
    $scope.about = window.languages[window.current_language].about;
    $scope.exit = window.languages[window.current_language].exit;
    $scope.back = window.languages[window.current_language].back;
    $scope.login_title = window.languages[window.current_language].login_title;
    $scope.close = window.languages[window.current_language].close;
    $scope.username = window.languages[window.current_language].username;
    $scope.password = window.languages[window.current_language].password;
    $scope.log_in = window.languages[window.current_language].log_in;
    $scope.logout = window.languages[window.current_language].logout;
    $scope.help = window.languages[window.current_language].help;
    $scope.update_soon = window.languages[window.current_language].update_soon;
    $scope.trade_in_menu = window.languages[window.current_language].trade_in_menu;
    $scope.month = window.languages[window.current_language].month;
    $scope.languages = window.languages[window.current_language];

    $scope.user = user;

    $scope.refesh_balance = function()
    {
        var data = {
            'user_id' : user.id,
        };
        $.ajax({
            url: window.server_url + '/login/application_get_balance?v=' + window.version,
            type: "POST",
            data: data,
            dataType: 'json',
            crossDomain: true,
            success: function(data) {
                $scope.user.balance = data.balance;
            }
        });
    }
    $scope.redirect_url = function(url){
        window.location.href = url;
    }

    $scope.user_logout = function() {
        user.logout();
        window.location.href = "#/login";
    }

    // ************* Help
    $scope.helpData = {};
    // Create the login modal that we will use later
    $ionicModal.fromTemplateUrl('templates/help.html', {
        scope: $scope
    }).then(function(modal) {
        $scope.modal_help = modal;
    });
    $scope.closeHelp = function() {
        $scope.modal_help.hide();
    },
    $scope.openHelp = function() {
        $scope.modal_help.show();
    };

    // ************* about application
    $scope.app_about = function() {
        var str_copyright = "ABC Virtual Communications <br/>";
        str_copyright += "@ 2014 Copyright All Rights Reserved. Kootoro.com";
        var alertAboutPopup = $ionicPopup.alert({
            title: 'Version ' + window.version_application,
            template: str_copyright
        });
        alertAboutPopup.then(function(res) {
            $('body').removeClass("menu-open");
        });
    };
    //************* application exit
    $scope.app_exit = function() {
        app.exit();
    };
    //************* an alert timer service
    $scope.showTimer = function() {
        var t = "<b><h3 id='popup_time_server'>" + time_server.month + "/" + time_server.day + "/" + time_server.year + " " + time_server.hour + ":" + time_server.minutes + ":" + time_server.seconds + "</h3></b>";
        t += "<em>( " + time_server.timeZone + " " + time_server.timeZoneName + " )</em>";
        var alertPopup = $ionicPopup.alert({
            template: t
        });
        alertPopup.then(function(res) {
            console.log('Thank you');
            $('body').removeClass("menu-open");
        });
    };
    //********************** Alert dialog
    window.showAlert = function(title, message, callback) {
        var alertPopup = $ionicPopup.alert({
            title: title,
            template: message,
        });
        alertPopup.then(function(res) {
            eval(callback);
        });
    };
    //********************** open broswer
    $scope.exturl = function(url) {
        window.open(encodeURI(url), '_system', 'location=no');
    };
}).controller('tradeInCtrl', function($scope, $timeout) {
    if (programs.data) {
        $scope.programs = programs.data;
    } else {
        obj_loading.show();
        $.ajax({
            url: window.server_url + '/pay/application_get_programs?v=' + window.version,
            type: "POST",
            dataType: 'json',
            crossDomain: true,
            success: function(data) {
                programs.setData(data);
                $scope.programs = programs.data;
                $timeout(function() {
                    obj_loading.hide();
                }, 1000);
            }
        });
    }
}).controller('tradeInFormCtrl', function($scope, $stateParams, $ionicSlideBoxDelegate, $timeout) {
    $scope.program = programs.getProgramById($stateParams.programId);
    programs.setCurrentProgramById($stateParams.programId);
    $scope.user = user;
    $scope.next_step_fill_credit_card = function() {
        $ionicSlideBoxDelegate.next();
    }
    $scope.slideHasChanged = function(index) {
        if (index == 1) {
            var data = $('#trade_in_form').serializeArray();
            var option = [];
            for (var i = data.length - 1; i >= 0; i--) {
                field = data[i];
                option[field.name] = field.value;
            }
            programs.setDataRequired(option);
            var validate_required = programs.validateDataRequired();
            if (!validate_required.result) {
                window.showAlert(window.languages[window.current_language].warning, validate_required.message, "window.validate_trade_in_form = false;");
                $timeout(function() {
                    $ionicSlideBoxDelegate.previous();
                }, 500);
            } else {
                obj_loading.show();
                var data = {
                    'program_id': programs.data_required.program_id,
                    'how_many': programs.data_required.how_many,
                    'months': programs.data_required.month,
                };
                $.ajax({
                    url: window.server_url + '/pay/application_trade_in_cal?v=' + window.version,
                    data: data,
                    type: "POST",
                    dataType: 'json',
                    crossDomain: true,
                    success: function(data) {
                        obj_loading.hide();
                        $timeout(function() {
                            data.points_value = Number(data.points_value);
                            $scope.cal = data;
                        }, 200);
                    }
                });
            }
        }
    }
    $scope.trade_in_check_out = function() {
        obj_loading.show();
        programs.beforeTradeInCheckut();
        var data = programs.data_required;
        $.ajax({
            url: window.server_url + '/pay/application_trade_in_checkout?v=' + window.version,
            data: data,
            type: "POST",
            dataType: 'json',
            crossDomain: true,
            success: function(data) {
                obj_loading.hide();
                if (data.success == false) {
                    if (data.commonResponse.errorDescription) {
                        window.showAlert(window.languages[window.current_language].warning, data.commonResponse.errorDescription);
                    }
                } else {
                    if (data.content) {
                        var content_rs = $(data.content);
                        content_rs.find('div').remove();
                        content_rs.find('em').text(user.full_name + "!");
                        programs.afterTradeInCheckout();
                        window.showAlert(window.languages[window.current_language].success, content_rs.html(), "history.back();");
                    }
                }
            }
        });
    }
}).controller('homeCtrl', function($scope) {
    console.log("========================> application home page");
    // obj_loading.show();
    //app_home_page.initialize();
    $scope.version_application = window.version_application;
    window.page_name = "app_home";
}).controller('mainLotteryCtrl', function($scope, $http, $log) {
    $scope.add_ticket = window.languages[window.current_language].add_ticket;
    $scope.my_tickets = window.languages[window.current_language].my_tickets;
    $scope.history = window.languages[window.current_language].history;
    $scope.estimated_jackpot = window.languages[window.current_language].estimated_jackpot;
    $scope.at = window.languages[window.current_language].at;
    window.page_name = "app_lottery_main";
    stask_back_page.push({
        type: 'url',
        action: 'window.location.href = "#/app/lottery"'
    });
    //*** Sponsor
    $log.info("Check");
    $('#slide-sponors').show();
    var slides = [];
    for (var i = 0; i < window.store_data.sponsors.length; i++) {
        slides.push({
            title: window.server_url + window.store_data.sponsors[i].image,
            index: i,
            url: window.store_data.sponsors[i].url,
            onclick_url: "exturl('" + window.store_data.sponsors[i].url + "')",
        });
    }
    $scope.slides = slides;
    console.log("========================> lottery home page");
    //*** last_drawing
    $scope.last_drawing = {
        'time': '',
        'balls': '',
        'jackpot': '',
    };
    if (window.store_data.last_drawing != undefined) {
        $scope.last_drawing = {
            'time': window.store_data.last_drawing.time_text,
            'balls': window.store_data.last_drawing.balls,
            'jackpot': window.store_data.last_drawing.jackpot,
        };
        $('.last-drawing').show();
    } else {
        $('.last-drawing').hide();
    }
    //*** Estimated
    if (window.store_data.estimated != undefined) {
        $scope.estimated = {
            'datetime': window.store_data.estimated.datetime,
            'jackpot': window.store_data.estimated.jackpot + "s",
        };
        $('.next-drawing').show();
    } else {
        $('.next-drawing').hide();
    }
    //obj_loading.show();
    //lottery_home_page.initialize();
    $('body').removeClass('popup-open');
    $('body').removeClass('menu-open');
    if (!user.is_login()) window.location.href="#/login";
}).controller('addTicketCtrl', function($scope) {
    if (typeof obj_lottery != 'undefined') {
        obj_lottery.normal_number = {};
        obj_lottery.power_number = {};
    }
    $scope.enter_number_or = window.languages[window.current_language].enter_number_or;
    $scope.quick_pick = window.languages[window.current_language].quick_pick;
    //$scope.choose_lottery_date      = window.languages[window.current_language].choose_lottery_date;
    $scope.buy = window.languages[window.current_language].buy;
    $scope.lottery = window.languages[window.current_language].lottery;
    $scope.add_ticket = window.languages[window.current_language].add_ticket;
    $scope.my_tickets = window.languages[window.current_language].my_tickets;
    $scope.more = window.languages[window.current_language].more;
    window.page_name = "app_lottery_add_ticket";
    stask_back_page.push({
        type: 'url',
        action: 'window.location.href = "#/app/add_ticket"'
    });
    console.log("========================> add ticket");
    obj_loading.show();
    obj_interface.is_redesign = true;
    if (typeof obj_interface.data.version == "undefined") {
        //alert("Socket: request_data");
        console.log("Socket: Request_data");
        lottery_socket.emit('request_data');
    } else {
        console.log("obj_interface has data");
        obj_interface.initialize_interface();
    }
}).controller('myTicketCtrl', function($scope) {
    $scope.lottery = window.languages[window.current_language].lottery;
    $scope.add_ticket = window.languages[window.current_language].add_ticket;
    $scope.my_tickets = window.languages[window.current_language].my_tickets;
    $scope.more = window.languages[window.current_language].more;
    window.page_name = "app_lottery_my_ticket";
    stask_back_page.push({
        type: 'url',
        action: 'window.location.href = "#/app/my_tickets"'
    });
    console.log("========================> my ticket");
    $('#page').val("1");
}).controller('historyTicketCtrl', function($scope) {
    $scope.lottery = window.languages[window.current_language].lottery;
    $scope.add_ticket = window.languages[window.current_language].add_ticket;
    $scope.history = window.languages[window.current_language].history;
    $scope.more = window.languages[window.current_language].more;
    window.page_name = "app_lottery_history_ticket";
    stask_back_page.push({
        type: 'url',
        action: 'window.location.href = "#/app/history"'
    });
    console.log(stask_back_page);
    console.log("========================> history");
    $('#page').val("1");
    obj_loading.show();
    lottery.view_history();
}).controller('lotteryMoreMenuCtrl', function($scope, $ionicActionSheet, $timeout) {
    // Triggered on a button click, or some other target
    $scope.showMoreMenu = function() {
        //stask_back_page.push({type:'method', action: 'hideSheet()'});
        // Show the action sheet
        hideSheet = $ionicActionSheet.show({
            buttons: [{
                    text: '<i class="icon ion-ios7-home"></i> ' + window.languages[window.current_language].lottery
                }, {
                    text: '<i class="icon ion-plus-circled"></i> ' + window.languages[window.current_language].add_ticket
                }, {
                    text: '<i class="icon ion-ios7-pricetag"></i> ' + window.languages[window.current_language].my_tickets
                }, {
                    text: '<i class="icon ion-star"></i> ' + window.languages[window.current_language].history
                },
                //{ text: '<i class="icon ion-gear-a"></i> Setting' }
            ],
            buttonClicked: function(index, ele) {
                switch (index) {
                    case 0:
                        {
                            window.location.href = "#/app/lottery";
                            break;
                        }
                    case 1:
                        {
                            window.location.href = "#/app/add_ticket";
                            break;
                        }
                    case 2:
                        {
                            window.location.href = "#/app/my_tickets";
                            break;
                        }
                    case 3:
                        {
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
.controller('profileCtrl', function($scope)
{
    $scope.languages = window.languages[window.current_language];
})
.controller('profileGeneralCtrl', function($scope, $timeout,  $ionicPopup)
{
    $scope.languages = window.languages[window.current_language];
    $scope.user = user;    
})
.controller('profileMoneyToroHistoryCtrl', function($scope, $timeout,  $ionicPopup)
{
    $scope.languages = window.languages[window.current_language];
    
    $scope.data = {
        page: 1,
        user_id: user.id,
        records : {},
        pPaging : new Array(),
    };
    
   

    $scope.fn_paging = function(page_number)
    {
        $scope.data = {
            page: page_number,
            user_id: user.id,
            records : {},
            pPaging : new Array(),
        };
        obj_loading.show();
        $.ajax({
                url: window.server_url + '/account/application_money_point_history?v=' + window.version,
                type: "POST",
                data: $scope.data,
                dataType: 'json',
                crossDomain: true,
                success: function(data) {
                    $scope.data.records = data.record;
                    $scope.data.pPaging = new Array();
                    for (var i = Number(data.pPaging.first); i <= Number(data.pPaging.last) ; i++) {
                        $scope.data.pPaging.push({page_number : i});
                    };
                    //$scope.ipage.page_number = data.pPaging.page;
                    $timeout(function() {
                        obj_loading.hide();
                    }, 1000);
                }
            });
    }

    $scope.fn_paging(1);
})
.controller('profileAvatarCtrl', function($scope, $timeout,  $ionicPopup)
{
    $scope.languages = window.languages[window.current_language];
    $scope.user = user;    
    $scope.get_avatar_camera = function()
    {
        obj_avatar.takePictureFromCamera();
    }
    $scope.get_avatar_gallery = function()
    {
        obj_avatar.takePictureFromGallery();
    }
    $scope.fullScreenAvatar = function()
    {
            var backdrop = $('div.backdrop');
        backdrop.addClass('visible');
        backdrop.addClass('active');
        backdrop.addClass('backdrop_loading');
        backdrop.addClass('center-middle');
         var avatar = user.avatar;
        avatar = avatar.replace("thumbs/","");
        var t = "";
        t += '<div width="100%" class="text-center">';
        t += '<img src="'+avatar+'" style="width:100%;" />';
        t += '<button class="button button-small button-positive" onClick="close_fullScreenAvatar()">Close</button>';
        t += '</div>';
        backdrop.html(t)  
    }

    window.close_fullScreenAvatar = $scope.close_fullScreenAvatar = function()
    {
        var backdrop = $('div.backdrop');
        backdrop.removeClass('visible');
        backdrop.removeClass('active');
        backdrop.removeClass('backdrop_loading');
        backdrop.removeClass('center-middle');
        backdrop.html("");
    }
})
.controller('profileChangePasswordCtrl', function($scope, $timeout,  $ionicPopup)
{
    $scope.languages = window.languages[window.current_language];
    $scope.user = user; 
    $scope.password_match = function(user_data){
        $scope.dontMatch_password = user_data.new_password !== user_data.confirm_new_password;
    };   
    $scope.is_update_password = function(user_data)
    {
        if (user_data != undefined && user_data.current_password && user_data.new_password && user_data.confirm_new_password) 
        {
            if (user_data.new_password == user_data.confirm_new_password)
            {
                return false;
            }
            return true;
        }
        return true;
    }
    $scope.submit_update_password = function()
    {
        obj_loading.show();
        var data = $('#form_update_password').serializeArray();
        data.push({name:"user_id",value : user.id});
        $.ajax({
            url: window.server_url + '/account/application_update_password?v=' + window.version,
            data: data,
            type: "POST",
            dataType: 'json',
            crossDomain: true,
            success: function(data) {
                obj_loading.hide();
                if (data.result == false) {
                    if (data.message)
                    {
                        window.showAlert(window.languages[window.current_language].warning, data.message);

                    }
                } else {
                    if (data.message)
                    {
                        window.showAlert(window.languages[window.current_language].success, data.message);
                        $('#current_password').val("");
                        $('#new_password').val("");
                        $('#confirm_new_password').val("");
                    }
                }
            }
        });
    }
})
.controller('profileKootoroAccountCtrl', function($scope, $timeout,  $ionicPopup)
{
    $scope.languages = window.languages[window.current_language];
    $scope.user_data = {};
    $scope.user_data.first_name = user.first_name; 
    $scope.user_data.last_name = user.last_name; 
    $scope.user_data.zip_code = user.zip_code; 
    $scope.is_update_profile = function(user_data)
    {
        if (user_data != undefined && user_data.first_name && user_data.last_name && user_data.zip_code) 
        {
            return false;
        }
        return true;
    }
    $scope.submit_update_profile = function()
    {
        obj_loading.show();
        var data = $('#form_kootoro_account').serializeArray();
        data.push({name:"user_id",value : user.id});
        data.push({name:"weddingday",value : user.weddingday});
        data.push({name:"birthday",value : user.birthday});
        $.ajax({
            url: window.server_url + '/account/application_update_kootoro_account?v=' + window.version,
            data: data,
            type: "POST",
            dataType: 'json',
            crossDomain: true,
            success: function(data) {
                obj_loading.hide();
                if (data.result == false) {
                    if (data.message)
                    {
                        window.showAlert(window.languages[window.current_language].warning, data.message);
                    }
                } else {
                    if (data.message)
                    {
                        window.showAlert(window.languages[window.current_language].success, data.message);
                        user.set_name($scope.user_data.first_name,$scope.user_data.last_name);
                        user.zip_code = $scope.user_data.zip_code;
                    }
                }
            }
        });
    }
})
.controller('profilePersonalDetailCtrl', function($scope, $timeout,  $ionicPopup)
{
    $scope.languages = window.languages[window.current_language];
    $scope.user_data = {};
    $scope.user_data.weddingday = user.weddingday; 
    $scope.user_data.birthday = user.birthday;     
    $scope.is_update_personal = function(user_data)
    {
        if (user_data != undefined) 
        {
            if (user_data.weddingday || user_data.birthday)
                return false;
            return true;
        }
        return true;
    }
    $scope.submit_update_personal = function()
    {
        obj_loading.show();
        var data = $('#form_personal').serializeArray();
        data.push({name:"user_id",value : user.id});
        data.push({name:"first_name",value : user.first_name});
        data.push({name:"last_name",value : user.last_name});
        data.push({name:"zip_code",value : user.zip_code});

        $.ajax({
            url: window.server_url + '/account/application_update_kootoro_account?v=' + window.version,
            data: data,
            type: "POST",
            dataType: 'json',
            crossDomain: true,
            success: function(data) {
                obj_loading.hide();
                if (data.result == false) {
                    if (data.message)
                    {
                        window.showAlert(window.languages[window.current_language].warning, data.message);
                    }
                } else {
                    if (data.message)
                    {
                        window.showAlert(window.languages[window.current_language].success, data.message);
                        user.weddingday = $scope.user_data.weddingday;
                        user.birthday = $scope.user_data.birthday;
                    }
                }
            }
        });
    }
})
.controller('loginCtrl', function($scope, $timeout,  $ionicPopup, $ionicSlideBoxDelegate) {
    $('body').removeClass("menu-open").removeClass("popup-open");
    obj_loading.show();
    $timeout(function() {
        obj_loading.hide();
    }, 500);
    $scope.languages = window.languages[window.current_language];
    //********************** Alert dialog
    window.showAlert = function(title, message, callback) {
        var alertPopup = $ionicPopup.alert({
            title: title,
            template: message,
        });
        alertPopup.then(function(res) {
            eval(callback);
        });
    };
    $scope.isUnchanged = function(user_data) {
        if (user_data != undefined && user_data.email && user_data.password) return false;
        return true;
    }
    $scope.submit_login_account = function(user_data) {
        user.validate_user(user_data.email, user_data.password);
    }
    $scope.redirect_url = function(url){
        $('ion-content').empty();
        window.location.href = url;
    }

})
.controller('signUpCtrl', function($scope, $timeout, $ionicPopup,$ionicSlideBoxDelegate) {
    obj_loading.show();
    $timeout(function() {
        obj_loading.hide();
    }, 500);
    $('body').removeClass("menu-open").removeClass("popup-open");
    $scope.languages = window.languages[window.current_language];
    //********************** Alert dialog
    window.showAlert = function(title, message, callback) {
        var alertPopup = $ionicPopup.alert({
            title: title,
            template: message,
        });
        alertPopup.then(function(res) {
            eval(callback);
        });
    };
    $scope.redirect_url = function(url){
        $('ion-content').empty();
        window.location.href = url;
    }
    $scope.password_match = function(user_data){
        $scope.dontMatch_password = user_data.password !== user_data.confirmpassword;
    };
    $scope.next_step_name = function() {
        $ionicSlideBoxDelegate.next();
    }
    $scope.next_step_personal = function() {
        $ionicSlideBoxDelegate.next();
    }
    $scope.isStep1Unchanged = function(user_data) {
        if (user_data != undefined && user_data.email && user_data.password && user_data.confirmpassword) 
        {
            if (user_data.password == user_data.confirmpassword)
            {
                return false;
            }
            return true;
        }
        return true;
    }
    $scope.isStep2Unchanged = function(user_data) {
        if (user_data != undefined && user_data.firstname && user_data.lastname && user_data.nickname && user_data.zip_code) return false;
        return true;
    }
    $scope.isStep3Unchanged = function(user_data) {
        // if (user_data != undefined && user_data.email && user_data.password && user_data.confirm_password)        
        //     return false;
        return false;
    }
    $scope.slideHasChanged = function(index) {
        var data = $('#form_new_account').serializeArray();
        var option = [];
        for (var i = data.length - 1; i >= 0; i--) {
            field = data[i];
            option[field.name] = field.value;
        }
        if (index == 1) {
            var rs = $scope.isStep1Unchanged(option);
            if (rs) {
                $timeout(function() {
                    $ionicSlideBoxDelegate.previous();
                }, 200);
            }
        } else if (index == 2) {
            var rs = $scope.isStep2Unchanged(option);
            if (rs) {
                $timeout(function() {
                    $ionicSlideBoxDelegate.previous();
                }, 200);
            }
        }
    }
    $scope.submit_register_new_account = function() {
        obj_loading.show();
        var data = $('#form_new_account').serializeArray();
        $.ajax({
            url: window.server_url + '/login/application_create_new_player?v=' + window.version,
            data: data,
            type: "POST",
            dataType: 'json',
            crossDomain: true,
            success: function(data) {
                obj_loading.hide();
                if (data.success == false) {
                    if (data.commonResponse.errorDescription) {
                        window.showAlert(window.languages[window.current_language].warning, data.commonResponse.errorDescription);
                    }
                    else if (data.message)
                    {
                        window.showAlert(window.languages[window.current_language].warning, data.message);
                    }
                } else {
                    if (data.content) {
                        var content_rs = $("<div>" + data.content + "</div>");
                        window.content_rs = content_rs;
                        window.content_rs.find('span.cartsubheading').html("<h4>Registration has been submitted!</h4>");
                        content_rs.find('table').remove();
                        content_rs.find('div:last').remove();
                        window.showAlert(window.languages[window.current_language].success, content_rs.html(), "window.location.href='#/login';");
                    }
                }
            }
        });
    }
})

function loadMyTicketCtrl($scope, $http) {
    $scope.loadMoreTicket = function() {
        if (Number($('#page').val()) != 0) {
            lottery.view_tickets($('#page').val());
            window.scope = $scope;
        } else {
            $scope.$broadcast('scroll.infiniteScrollComplete');
        }
    };
    $scope.$on('stateChangeSuccess', function() {
        $scope.loadMoreTicket();
    });
}