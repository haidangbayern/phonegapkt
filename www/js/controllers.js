angular.module('starter.controllers', []).run(function() {
    if (typeof window.current_language == 'undefined') {
        window.current_language = 'en';
    }
})
/** =================== Prex App For Menu ======================= **/
.controller('AppCtrl', function($scope, $ionicModal, $ionicPopup, $timeout, $ionicScrollDelegate, $ionicSlideBoxDelegate ) {
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

    

    // ************* Modal Chat
    $scope.chatData = {};
    $ionicModal.fromTemplateUrl('templates/friend/modal_chat.html', {
            scope: $scope
        }).then(function(modal) {
            $scope.modal_chat = modal;
        });
    $scope.closeModalChat = function() {
        window.user_chat = undefined;
        $scope.modal_chat.hide();
    },
    window.open_modal_chat = $scope.openModalChat = function(friend_id) {
        $scope.friend_id = friend_id;
        $scope.data_chat = {
            'friend_id': $scope.friend_id,
            'user_id': user.id,
            'chat': null,
        };
        window.$ionicScrollDelegate = $ionicScrollDelegate;
        $scope.send = function() {
            obj_socket.send_chat(user.id, user.nickname, user.avatar, $scope.data_chat.chat, $scope.friend_id);
            $.ajax({
                url: window.server_url + '/friend/application_send_message?v=' + window.version,
                data: $scope.data_chat,
                type: "POST",
                dataType: 'json',
                crossDomain: true,
                success: function(data) {
                    if (data.result) {
                        var r = {
                            'avatar': null,
                            'user_id': user.id,
                            'message': $scope.data_chat.chat,
                        };
                        $scope.user_chat.messages.push(r);
                        $scope.data_chat.chat = null;
                        $timeout(function() {
                            $ionicScrollDelegate.scrollBottom();
                        }, 200);
                    }
                }
            });
        }
        obj_loading.show();
        var data = {
            'user_id': user.id,
            'friend_id': $scope.friend_id,
        };
        $.ajax({
            url: window.server_url + '/friend/application_get_message?v=' + window.version,
            data: data,
            type: "POST",
            dataType: 'json',
            crossDomain: true,
            success: function(data) {
                var r = data;
                r.friend.image = window.server_url + r.friend.image;
                var show_avatar = null;
                for (var i = r.messages.length - 1; i >= 0; i--) {
                    var m = r.messages[i];
                    r.messages[i].avatar = null;
                    if (show_avatar == null || show_avatar != m.user_id) {
                        show_avatar = m.user_id;
                        if (m.user_id != user.id) r.messages[i].avatar = r.friend.image;
                    }
                };
                window.user_chat = r;
                $scope.user_chat = window.user_chat;
                $timeout(function() {
                    $ionicScrollDelegate.scrollBottom();
                    obj_loading.hide();
                }, 200);
            }
        });
        $scope.modal_chat.show();
    };
    
    //*************** End Model Chat


    // ************* profile of user
    $scope.profileUser = {
        modalProfileActiveIndex : 0,
    };
    $scope.profileUser.modalProfileSetActive = function(active_index)
    {
        $scope.profileUser.modalProfileActiveIndex = active_index;
        $ionicSlideBoxDelegate.$getByHandle('modalProfile').slide(active_index);
    }
    $scope.profileUser.modalProfileSlideChanged = function(active_index)
    {
        $scope.profileUser.modalProfileActiveIndex = active_index;
    }
    $ionicModal.fromTemplateUrl('templates/friend/modal_profile_user.html', {
        scope: $scope
    }).then(function(modal) {
        $scope.modal_profile = modal;
    });
    $scope.closeModalProfileUser = function() {
        $scope.modal_profile.hide();
    };
    $scope.openModalProfileUser = function(friend_id) {
        $scope.profileUser.modalProfileActiveIndex = 0;
        obj_loading.show();
        var data = {
            'user_id': user.id,
            'friend_id': friend_id,
        };
        $.ajax({
                url: window.server_url + '/friend/application_popover_user_profile?v=' + window.version,
                data: {
                    'user_id' : user.id, 
                    'friend_id' : friend_id,
                    'is_full' : true,
                },
                type: "POST",
                dataType: 'json',
                crossDomain: true,
                success: function(data) {
                    if (data.result == false)
                    {
                        $scope.showToast(data.message);
                    }
                    else
                    {
                        $scope.current_friend = data.data;
                        $ionicScrollDelegate.scrollTop();
                    }
                    $timeout(function() {
                        obj_loading.hide();
                    }, 200);
                }
        });
        $scope.modal_profile.show();
    };
    $scope.openModalProfileUserAgain= function(friend_id){
        $scope.closeModalProfileUser();
        $timeout(function() {
            $scope.openModalProfileUser(friend_id);
        }, 500);
    }
    $scope.block_my_friend = function(friend_id)
    {
        $scope.temp_value = friend_id;
        $.ajax({
            url: window.server_url + '/friend/application_block_my_friend?v=' + window.version,
            data: {
                'user_id' : user.id, 
                'friend_id' : friend_id,
            },
            type: "POST",
            dataType: 'json',
            crossDomain: true,
            success: function(data) {
                if (data.result)
                {
                    if (data.message)
                        $scope.showToast(data.message);
                    $scope.current_friend.is_user_block_friend = true;
                    $timeout(function(){
                        if (window.list_request != undefined)
                        {
                            console.log("list_request");
                            for (var i = 0; i < window.list_request.length; i++) {
                                if (window.list_request[i].message.id == $scope.temp_value)
                                {
                                    window.list_request.splice(i,1);
                                    break;
                                }
                            };    
                        }
                        if (window.list_blocked != undefined)
                        {
                            console.log("list_blocked");
                            for (var i = 0; i < window.list_blocked.length; i++) {
                                if (window.list_blocked[i].id == $scope.temp_value)
                                {
                                    window.list_blocked.splice(i,1);
                                    break;
                                }
                            };   
                        }
                        if (window.list_search != undefined)
                        { 
                            console.log("list_search");
                            for (var i = 0; i < window.list_search.length; i++) {
                                if (window.list_search[i].id == $scope.temp_value)
                                {
                                    window.list_search.splice(i,1);
                                    break;
                                }
                            }; 
                        }
                        if (window.list_friends != undefined)
                        {
                            console.log("list_friends");
                            for (var i = 0; i < window.list_friends.length; i++) {
                                if (window.list_friends[i].user.id == $scope.temp_value)
                                {
                                    window.list_friends.splice(i,1);
                                    break;
                                }
                            }; 
                        }
                    }, 2000);
                    
                }
                $timeout(function() {
                    
                }, 200);
            }
        });
    }
    //*************** End Mprofile of user

    $scope.refesh_balance = function() {
        var data = {
            'user_id': user.id,
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
    $scope.redirect_url = function(url) {
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
            $('body').removeClass("menu-open");
        });
    };
    //********************** Alert dialog
    window.showAlert = $scope.showAlert = function(title, message, callback) {
        var alertPopup = $ionicPopup.alert({
            title: title,
            template: message,
        });
        alertPopup.then(function(res) {
            if (callback != undefined) eval(callback);
            obj_keyboard.waitForClose();
        });
    };
    //********************** Toast
    window.showToast = $scope.showToast = function(message, duration, position) {
        if (window.plugins != undefined && window.plugins.toast != undefined )
        {
            if (typeof duration == "undefined")
                duration = "long";
            if (typeof position == "undefined")
                position = "bottom";
            window.plugins.toast.show(message, duration, position);
        }
        else
        {
            $scope.showAlert($scope.languages.warning, "Toast didn't exsits");
        }
    }
    
        
    //********************** open broswer
    $scope.exturl = function(url) {
        window.open(encodeURI(url), '_system', 'location=no');
    };
})
/** =================== Buy Toros ======================= **/
.controller('buyCtrl', function($scope) {
    //set languages
    $scope.languages = window.languages[window.current_language];
    $scope.is_use_payment = window.is_use_payment;
}).controller('buyMoreTorosCtrl', function($scope, $timeout, $ionicSlideBoxDelegate) {
    $scope.user_chooce_option = function(radio_option, money, toros) {
        $scope.radio_option = radio_option;
        if (money && toros) {
            $scope.data_required.toros = Number(toros);
            $scope.data_required.money = Number(money);
        }
    }
    $scope.manual_buy = function(toros) {
        var point = toros != '' ? parseFloat(toros) : 0;
        var idx = 0;
        var point_level = 0;
        var money_amount_level = 0;
        if (typeof $scope.kootoro_exchange[idx] != 'undefined') {
            while (point >= $scope.kootoro_exchange[idx]['point']) {
                idx++;
                if (typeof $scope.kootoro_exchange[idx] == 'undefined') break;
            }
            if (idx != 0) idx--;
            var point_level = $scope.kootoro_exchange[idx]['point'];
            var money_amount_level = $scope.kootoro_exchange[idx]['money_amount'];
        }
        if (point_level != 0) {
            var coint = (point * money_amount_level) / point_level;
        } else {
            var coint = 0;
        }
        $scope.data_required.toros = Number(toros);
        $scope.data_required.money = coint.toFixed(2);
    }
    $scope.isDisableStep1 = function() {
        if (Number($scope.data_required.toros) <= 0 || Number($scope.data_required.money) <= 0) return true;
        return false;
    }
    $scope.next_step_cc = function() {
        obj_keyboard.waitForClose();
        $ionicSlideBoxDelegate.next();
    }
    $scope.slideHasChanged = function(index) {
        obj_keyboard.waitForClose();
        if (index == 1) {
            var rs = $scope.isDisableStep1();
            if (rs) {
                $timeout(function() {
                    $ionicSlideBoxDelegate.previous();
                }, 200);
            }
        }
    }
    $scope.pay = function() {
        $scope.payment.beforePayCheckut();
        obj_loading.show();
        var data_post = {
            "device": JSON.stringify(device),
            "payment": $scope.payment.data_required,
            "user_id": user.id,
            "required": $scope.data_required,
        }
        $.ajax({
            url: window.server_url + '/pay/application_pay_buy_toros?v=' + window.version,
            data: data_post,
            type: "POST",
            dataType: 'json',
            crossDomain: true,
            success: function(data) {
                obj_keyboard.waitForClose();
                obj_loading.hide();
                var r = data;
                if (r.result != undefined && r.result == false) {
                    $scope.payment.afterPayCheckoutFail();
                    if (r.message) window.showAlert($scope.languages.warning, r.message);
                } else {
                    $scope.payment.afterPayCheckoutSucc();
                    if (r.balance) user.balance = r.balance;
                    if (r.payment) user.payment.setData(r.payment);
                    window.showAlert($scope.languages.success, r.message, "window.location.href='#/app/buy';");
                }
            }
        });
    }
    $scope.languages = window.languages[window.current_language];
    $scope.payment = obj_payment;
    $scope.payment.__construct();
    $scope.radio_option = true;
    $scope.data_required = {
        toros: null,
        money: 0,
    };
    if (kootoro_exchange.data) {
        $scope.kootoro_exchange = kootoro_exchange.data;
    } else {
        obj_loading.show();
        $.ajax({
            url: window.server_url + '/pay/application_get_exchange?v=' + window.version,
            data: null,
            type: "POST",
            dataType: 'json',
            crossDomain: true,
            success: function(data) {
                obj_loading.hide();
                kootoro_exchange.setData(data);
                $timeout(function() {
                    $scope.kootoro_exchange = kootoro_exchange.data;
                }, 100);
            }
        });
    }
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
}).controller('tradeInFormCtrl', function($scope, $stateParams, $ionicSlideBoxDelegate, $timeout, $ionicScrollDelegate) {
    $scope.program = programs.getProgramById($stateParams.programId);
    programs.setCurrentProgramById($stateParams.programId);
    $scope.user = user;
    $scope.payment = obj_payment;
    $scope.payment.__construct();
    $scope.data_required = {
        member_id: null,
        security_code: null,
        id: programs.current_program.id,
        month: -1,
        how_many: programs.current_program.min_bonus,
        user_id: user.id,
        fee: programs.current_program.fee,
    };
    $scope.next_step = function() {
        $ionicSlideBoxDelegate.next();
    }
    $scope.is_disable_1 = function() {
        if ($scope.data_required.how_many < programs.current_program.min_bonus || !$scope.data_required.member_id) return true;
        return false;
    }
    $scope.calculator = function() {
        obj_loading.show();
        var data = {
            'program_id': $scope.data_required.id,
            'how_many': $scope.data_required.how_many,
            'months': $scope.data_required.month,
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
    $scope.slideHasChanged = function(index) {
        if (index == 1) {
            if ($scope.is_disable_1()) {
                $timeout(function() {
                    $ionicSlideBoxDelegate.previous();
                }, 200);
            } else {
                $scope.calculator();
            }
        }
        $ionicScrollDelegate.scrollTop();
    }
    $scope.trade_in_check_out = function() {
        obj_loading.show();
        $scope.payment.beforePayCheckut();
        //programs.beforeTradeInCheckut();
        var data = $scope.data_required;
        data.device = JSON.stringify(device);
        if ($scope.data_required.fee != 0) data.payment = $scope.payment.data_required;
        console.log(data);
        $.ajax({
            url: window.server_url + '/pay/application_trade_in_checkout?v=' + window.version,
            data: data,
            type: "POST",
            dataType: 'json',
            crossDomain: true,
            success: function(data) {
                obj_loading.hide();
                if (data.success == false) {
                    $scope.payment.afterPayCheckoutFail();
                    if (data.commonResponse.errorDescription) {
                        window.showAlert(window.languages[window.current_language].warning, data.commonResponse.errorDescription);
                    }
                } else {
                    $scope.payment.afterPayCheckoutSucc();
                    if (data.content) {
                        var content_rs = $(data.content);
                        content_rs.find('div').remove();
                        content_rs.find('em').text(user.full_name + "!");
                        //programs.afterTradeInCheckout();
                        window.showAlert(window.languages[window.current_language].success, content_rs.html(), "history.back();");
                    }
                }
            }
        });
    }
})
/** =================== Home Page ======================= **/
.controller('homeCtrl', function($scope) {
    $.getScript("http://" + window.server_ip + ":" + window.server_post + "/socket.io/socket.io.js", function(response, status) {
        clearTimeout(is_time_check_server);
        if (status != "success") {
            if (typeof device != "undefined" && device.platform.toUpperCase() == "iOS".toUpperCase()) {} else {
                navigator.app.exitApp();
            }
            return;
        }
        window.is_connect_server = true;
        /**** For database ****/
        obj_db.openDatabase();
        /**** For Socket ****/
        lottery_socket = io.connect("http://" + window.server_ip + ":" + window.server_post + "/lottery");
        if (!window.is_device) {
            console.log("obj_socket.initialize");
            obj_socket.initialize();
        } else {
            console.log("app.initialize");
            app.initialize();
        }
        /**** For App Home Page ****/
        //obj_interface.is_redesign = true;
        //if (typeof obj_interface.data.version == "undefined") {
        lottery_socket.emit('request_data');
        //} else {
        //obj_interface.initialize_interface();
        //}
        console.log("Index: Server Is Ready");
        app_home_page.change_app_status("Server Is Ready");
        app_home_page.call_server_get_data(true);
    });
    is_time_check_server = setTimeout(function() {
        if (typeof io == 'undefined') {
            $('#animated_loading span').html("Cannot Connect Server");
            window.is_connect_server = false;
            alert("Sorry! Server Out.");
            console.log("Index: Server out");
            if (typeof device != "undefined" && device.platform.toUpperCase() == "iOS".toUpperCase()) {} else {
                navigator.app.exitApp();
            }
        }
    }, 10000);
    $scope.version_application = window.version_application;
    window.page_name = "app_home";
}).controller('loginCtrl', function($scope, $timeout, $ionicPopup, $ionicSlideBoxDelegate) {
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
            if (callback != undefined) eval(callback);
            obj_keyboard.waitForClose();
        });
    };
    $scope.isUnchanged = function(user_data) {
        if (user_data != undefined && user_data.email && user_data.password) return false;
        return true;
    }
    $scope.submit_login_account = function(user_data) {
        obj_keyboard.waitForClose();
        user.validate_user(user_data.email, user_data.password);
    }
    $scope.redirect_url = function(url) {
        $('ion-content').empty();
        window.location.href = url;
    }
    if (window.is_dev) {
        $scope.user_data = {
            email: 'tranhanhuy@gmail.com',
            password: 'p@ssw0rd',
        };
    }
}).controller('signUpCtrl', function($scope, $timeout, $ionicPopup, $ionicSlideBoxDelegate, $ionicScrollDelegate) {
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
            if (callback != undefined) eval(callback);
            obj_keyboard.waitForClose();
        });
    };
    $scope.redirect_url = function(url) {
        $('ion-content').empty();
        window.location.href = url;
    }
    $scope.password_match = function(user_data) {
        $scope.dontMatch_password = user_data.password !== user_data.confirmpassword;
    };
    $scope.next_step_name = function() {
        obj_keyboard.waitForClose();
        $ionicSlideBoxDelegate.next();
    }
    $scope.next_step_personal = function() {
        obj_keyboard.waitForClose();
        $ionicSlideBoxDelegate.next();
    }
    $scope.isStep1Unchanged = function(user_data) {
        if (user_data != undefined && user_data.email && user_data.password && user_data.confirmpassword) {
            if (user_data.password == user_data.confirmpassword) {
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
        obj_keyboard.waitForClose();
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
        $ionicScrollDelegate.scrollTop();
    }
    $scope.submit_register_new_account = function() {
        obj_keyboard.waitForClose();
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
                    } else if (data.message) {
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
}).controller('forgotPasswordCtrl', function($scope, $timeout, $ionicPopup) {
    obj_loading.show();
    $timeout(function() {
        obj_loading.hide();
    }, 500);
    $('body').removeClass("menu-open").removeClass("popup-open");
    //********************** Alert dialog
    window.showAlert = function(title, message, callback) {
        var alertPopup = $ionicPopup.alert({
            title: title,
            template: message,
        });
        alertPopup.then(function(res) {
            if (callback != undefined) eval(callback);
            obj_keyboard.waitForClose();
        });
    };
    $scope.redirect_url = function(url) {
        $('ion-content').empty();
        window.location.href = url;
    }
    $scope.languages = window.languages[window.current_language];
    $scope.email = "";
    $scope.submit_forgot_password = function(email) {
        console.log(email);
        obj_loading.show();
        var data = {
            'email': email,
        };
        $.ajax({
            url: window.server_url + '/login/application_proccess_forgot_password?v=' + window.version,
            data: data,
            type: "POST",
            dataType: 'json',
            crossDomain: true,
            success: function(data) {
                obj_loading.hide();
                var r = data;
                if (r.result == false) {
                    if (r.message != undefined) window.showAlert($scope.languages.warning, r.message);
                    obj_keyboard.waitForClose();
                } else {
                    if (r.message != undefined) window.showAlert($scope.languages.success, r.message);
                    obj_keyboard.waitForClose();
                }
            }
        });
    }
})
/** =================== Lottery ======================= **/
.controller('mainLotteryCtrl', function($scope, $http, $log) {
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
    if (!user.is_login()) window.location.href = "#/login";
}).controller('addTicketCtrl', function($scope, $ionicActionSheet, $timeout) {
    window.page_name = "app_lottery_add_ticket";
    lottery_draw_tickets_v2.reset();
    $scope.languages = window.languages[window.current_language];
    $scope.data = obj_interface.data;
    $scope.__init_tickets = function() {
        window.new_ticket = $scope.new_ticket = false;
        $scope.drawing_time = obj_interface.next_time_draw();
        window.tickets = $scope.tickets = {};
        $scope.tickets.count = 1;
        $scope.tickets.ticket = new Array();
        $scope.tickets.user_id = user.id;
        $scope.tickets.drawing_time = $scope.drawing_time.value;
        //creating ticket
        for (var i = 0; i < $scope.tickets.count; i++) {
            var ticket = {
                normal_ball: new Array(),
                power_ball: new Array(),
                error: "",
                drawing_time: $scope.drawing_time.value,
            };
            //creating normal ball
            var normal_ball = new Array();
            for (var i_normal = 0; i_normal < $scope.data.count_normal_number; i_normal++) {
                normal_ball.push("");
            }
            ticket.normal_ball = normal_ball;
            //creating power ball
            var power_ball = new Array();
            for (var i_power = 0; i_power < $scope.data.count_power_number; i_power++) {
                power_ball.push("");
            }
            ticket.power_ball = power_ball;
            $scope.tickets.ticket.push(ticket);
        };
    }
    $scope.__init_tickets();
    $scope.validate_normal_ball = function(ticket_row, i_normal_ball) {
        $scope.current_ticket_row = ticket_row;
        var new_ball = $scope.tickets.ticket[ticket_row].normal_ball[i_normal_ball];
        var error = "";
        if (new_ball) {
            if (!($scope.data.normal_number_min <= new_ball && new_ball <= $scope.data.normal_number_max)) //validate 2
                error = "Enter normal number from " + $scope.data.normal_number_min + " to " + $scope.data.normal_number_max + ".";
        }
        for (var i_normal = 0; i_normal < $scope.data.count_normal_number - 1 && error == ""; i_normal++) {
            var new_ball = $scope.tickets.ticket[ticket_row].normal_ball[i_normal];
            if (!new_ball) continue;
            else {
                if (!($scope.data.normal_number_min <= new_ball && new_ball <= $scope.data.normal_number_max)) //validate 2
                    error = "Enter normal number from " + $scope.data.normal_number_min + " to " + $scope.data.normal_number_max + ".";
            }
            for (var j_normal = i_normal + 1; j_normal < $scope.data.count_normal_number && error == ""; j_normal++) {
                var old_ball = $scope.tickets.ticket[ticket_row].normal_ball[j_normal];
                if (old_ball) {
                    if (new_ball == old_ball) //validate 1
                        error = "Number " + new_ball + " was chosen.";
                }
            }
        }
        $scope.tickets.ticket[ticket_row].error = error;
    }
    $scope.validate_power_ball = function(ticket_row, i_power_number) {
        $scope.current_ticket_row = ticket_row;
        var new_ball = $scope.tickets.ticket[ticket_row].power_ball[i_power_number];
        var error = "";
        if (new_ball) {
            if (!($scope.data.power_number_min <= new_ball && new_ball <= $scope.data.power_number_max)) //validate 2
                error = "Enter power number from " + $scope.data.power_number_min + " to " + $scope.data.power_number_max + ".";
        }
        for (var i_normal = 0; i_normal < $scope.data.count_power_number - 1 && error == ""; i_normal++) {
            var new_ball = $scope.tickets.ticket[ticket_row].power_ball[i_normal];
            if (!new_ball) continue;
            else {
                if (!($scope.data.power_number_min <= new_ball && new_ball <= $scope.data.power_number_max)) //validate 2
                    error = "Enter power number from " + $scope.data.power_number_min + " to " + $scope.data.power_number_max + ".";
            }
            for (var j_normal = i_normal + 1; j_normal < $scope.data.count_power_number && error == ""; j_normal++) {
                var old_ball = $scope.tickets.ticket[ticket_row].power_ball[j_normal];
                if (old_ball) {
                    if (new_ball == old_ball) //validate 1
                        error = "Number " + new_ball + " was chosen.";
                }
            }
        }
        $scope.tickets.ticket[ticket_row].error = error;
    }
    $scope.is_disable_buy = function() {
        for (var i = 0; i < $scope.tickets.count; i++) {
            if ($scope.tickets.ticket[i].error) return true;
            for (var i_normal = 0; i_normal < $scope.data.count_normal_number; i_normal++) {
                if (!$scope.tickets.ticket[i].normal_ball[i_normal]) return true;
            }
            for (var i_power = 0; i_power < $scope.data.count_power_number; i_power++) {
                if (!$scope.tickets.ticket[i].power_ball[i_power]) return true;
            }
        }
        return false;
    }
    $scope.ticketContextMenu = function(ticket_row) {
        $scope.current_ticket_row = ticket_row;
        var contentMenu = $ionicActionSheet.show({
            buttons: [{
                text: $scope.languages.quick_pick
            }, {
                text: $scope.languages.clear
            }, {
                text: $scope.languages.delete
            }, {
                text: $scope.languages.cancel
            }, ],
            buttonClicked: function(index) {
                switch (index) {
                    case 0:
                        {
                            $scope.quick_pick($scope.current_ticket_row);
                            break;
                        }
                    case 1:
                        {
                            $scope.clear($scope.current_ticket_row);
                            break;
                        }
                    case 2:
                        {
                            $scope.delete($scope.current_ticket_row);
                            break;
                        }
                    case 3:
                        {
                            contentMenu();
                            break;
                        }
                }
                return true;
            },
        });
    }
    $scope.quick_pick_all = function() {
        for (var i = 0; i < $scope.tickets.count; i++) {
            $scope.quick_pick(i);
        }
    }
    $scope.quick_pick = function(ticket_row) {
        var random_normal = core.random_many_number($scope.data.normal_number_min, $scope.data.normal_number_max, $scope.data.count_normal_number, true, true);
        for (var i_normal = 0; i_normal < $scope.data.count_normal_number; i_normal++) $scope.tickets.ticket[ticket_row].normal_ball[i_normal] = Number(random_normal[i_normal]);
        var random_power = core.random_many_number($scope.data.power_number_min, $scope.data.power_number_max, $scope.data.count_power_number, true, true);
        for (var i_power = 0; i_power < $scope.data.count_power_number; i_power++) $scope.tickets.ticket[ticket_row].power_ball[i_power] = Number(random_power[i_power]);
    }
    $scope.add_more_ticket = function(count_ticket) {
        var l = $scope.tickets.count - $scope.tickets.ticket.length;
        //8 10
        if (l < 0) {
            //remove
            $scope.tickets.ticket.splice($scope.tickets.count, Math.abs(l));
        } else if (l > 0) {
            //plus
            for (var i = $scope.tickets.ticket.length; i < $scope.tickets.count; i++) {
                var ticket = {
                    normal_ball: new Array(),
                    power_ball: new Array(),
                    error: "",
                    drawing_time: $scope.drawing_time.value,
                };
                //creating normal ball
                var random_normal = core.random_many_number($scope.data.normal_number_min, $scope.data.normal_number_max, $scope.data.count_normal_number, true, true);
                for (var i_normal = 0; i_normal < $scope.data.count_normal_number; i_normal++) ticket.normal_ball.push(Number(random_normal[i_normal]));
                //creating power ball
                var random_power = core.random_many_number($scope.data.power_number_min, $scope.data.power_number_max, $scope.data.count_power_number, true, true);
                for (var i_power = 0; i_power < $scope.data.count_power_number; i_power++) ticket.power_ball.push(Number(random_power[i_power]));
                $scope.tickets.ticket.push(ticket);
            };
        }
    }
    $scope.clear_all = function() {
        for (var i = 0; i < $scope.tickets.count; i++) {
            $scope.clear(i);
        }
    }
    $scope.clear = function(ticket_row) {
        for (var i_normal = 0; i_normal < $scope.data.count_normal_number; i_normal++) $scope.tickets.ticket[ticket_row].normal_ball[i_normal] = "";
        for (var i_power = 0; i_power < $scope.data.count_power_number; i_power++) $scope.tickets.ticket[ticket_row].power_ball[i_power] = "";
    }
    $scope.delete = function(ticket_row) {
        $scope.tickets.count--;
        $scope.tickets.ticket.splice(ticket_row, 1);
    }
    $scope.buy = function() {
        obj_loading.show();
        var data_post = {
            "device": JSON.stringify(device),
            "tickets": $scope.tickets.ticket,
            "user_id": user.id,
        }
        $.ajax({
            url: window.server_url + '/game/mobile_app_lottery/application_buy_ticket?v=' + window.version,
            data: data_post,
            type: "POST",
            dataType: 'json',
            crossDomain: true,
            success: function(data) {
                var r = data;
                if (r.result != undefined && r.result == false) {
                    obj_loading.hide();
                    if (r.error) window.showAlert('Warning', r.error);
                } else {
                    window.new_ticket = $scope.new_ticket = true;
                    for (var i = 0; i < $scope.tickets.ticket.length; i++) {
                        $scope.tickets.ticket[i].purchase_time = r.purchase_time;
                    }
                    if (r.balance) user.balance = r.balance;
                    //obj_interface.html_user_left(user);
                    lottery_socket.emit("buy_ticket");
                    $timeout(function() {
                        obj_loading.hide();
                    }, 1000);
                }
            }
        });
    }
    $scope.buy_more = function() {
        //reset value
        $scope.__init_tickets();
    }
    $scope.draw_ticket = function(ticket_row) {
        lottery_draw_tickets_v2.initialize();
        lottery_draw_tickets_v2.draw_ticket($scope.tickets.ticket[ticket_row]);
        lottery_draw_tickets_v2.full_screen();
    }
}).controller('myTicketCtrl', function($scope, $timeout) {
    $scope.languages = window.languages[window.current_language];
    $scope.page = 1;
    $scope.tickets = {};
    $scope.tickets.total = 0;
    $scope.tickets.ticket = new Array();
    window.page_name = "app_lottery_my_ticket";
    lottery_draw_tickets_v2.reset();
    $scope.draw_ticket = function(ticket_row) {
        lottery_draw_tickets_v2.initialize();
        lottery_draw_tickets_v2.draw_ticket($scope.tickets.ticket[ticket_row]);
        lottery_draw_tickets_v2.full_screen();
    }
    $scope.loadMoreTicket = function() {
        if ($scope.page != 0) {
            obj_loading.show();
            var data = {};
            data.uuid = device.uuid,
            data.user_id = user.id;
            data.page = $scope.page;
            $.ajax({
                url: window.server_url + '/game/mobile_app_lottery/application_my_ticket?v=' + window.version,
                data: data,
                type: "POST",
                dataType: 'json',
                crossDomain: true,
                success: function(data) {
                    $scope.$broadcast('scroll.infiniteScrollComplete');
                    for (var i = 0; i < data.tickets.length; i++) {
                        var data_t = data.tickets[i];
                        var s_n = data_t.selected_number.split("|");
                        for (var j = 0; j < s_n.length; j++) {
                            if (s_n[j] && s_n[j].toString().length < 2) s_n[j] = "0" + s_n[j];
                        };
                        s_n.splice(s_n.length - 1, 1);
                        var p_n = data_t.power_number.split("|");
                        for (var j = 0; j < p_n.length; j++) {
                            if (p_n[j] && p_n[j].toString().length < 2) p_n[j] = "0" + p_n[j];
                        };
                        p_n.splice(p_n.length - 1, 1);


                        var dt = data_t.time_lottery.split(/ /g);
                        var d = dt[0].split(/-/g);
                        var t = dt[1].split(/:/g);
                        var datetime = new Date(d[0], Number(d[1]) - 1, d[2], t[0], t[1]);
                        var full_drawing_time = datetime.getMonthName() + " " + datetime.getDate() + ", " + datetime.getFullYear();
                        full_drawing_time += " " + dt[1];

                        var dt = data_t.created_at.split(/ /g);
                        var d = dt[0].split(/-/g);
                        var t = dt[1].split(/:/g);
                        var datetime = new Date(d[0], Number(d[1]) - 1, d[2], t[0], t[1]);
                        var full_purchase_time = datetime.getMonthName() + " " + datetime.getDate() + ", " + datetime.getFullYear();
                        full_purchase_time += " " + dt[1];

                        var ticket = {
                            normal_ball: s_n,
                            power_ball: p_n,
                            drawing_time: full_drawing_time,
                            purchase_time : full_purchase_time,
                        };
                        $scope.tickets.ticket.push(ticket);
                    };
                    $scope.tickets.total = data.pPaging.total;
                    if (data.pPaging.page == data.pPaging.end) {
                        $scope.page = 0;
                        $('ion-infinite-scroll').remove();
                    } else {
                        $scope.page = Number(data.pPaging.page) + 1;
                    }
                    $timeout(function() {
                        obj_loading.hide();
                    }, 200);
                }
            });
        } else {
            $scope.$broadcast('scroll.infiniteScrollComplete');
        }
    };
    $scope.$on('stateChangeSuccess', function() {
        $scope.loadMoreTicket();
    });
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
/** =================== Profile ======================= **/
.controller('profileCtrl', function($scope) {
    $scope.languages = window.languages[window.current_language];
}).controller('profileGeneralCtrl', function($scope, $timeout, $ionicPopup) {
    $scope.languages = window.languages[window.current_language];
    $scope.user = user;
}).controller('profileMoneyToroHistoryCtrl', function($scope, $timeout, $ionicPopup) {
    $scope.languages = window.languages[window.current_language];
    $scope.data = {
        page: 1,
        user_id: user.id,
        records: {},
        pPaging_number: new Array(),
        pPaging: {},
    };
    $scope.fn_paging = function(page_number) {
        $scope.data = {
            page: page_number,
            user_id: user.id,
            records: {},
            pPaging_number: new Array(),
            pPaging: {},
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
                $scope.data.pPaging = data.pPaging;
                $scope.data.pPaging_number = new Array();
                for (var i = Number(data.pPaging.first); i <= Number(data.pPaging.last); i++) {
                    $scope.data.pPaging_number.push({
                        page_number: i
                    });
                };
                //$scope.ipage.page_number = data.pPaging.page;
                $timeout(function() {
                    obj_loading.hide();
                }, 1000);
            }
        });
    }
    $scope.fn_paging(1);
}).controller('profileAvatarCtrl', function($scope, $timeout, $ionicPopup) {
    $scope.languages = window.languages[window.current_language];
    $scope.user = user;
    $scope.get_avatar_camera = function() {
        obj_avatar.takePictureFromCamera();
    }
    $scope.get_avatar_gallery = function() {
        obj_avatar.takePictureFromGallery();
    }
    $scope.fullScreenAvatar = function() {
        var backdrop = $('div.backdrop');
        backdrop.addClass('visible');
        backdrop.addClass('active');
        backdrop.addClass('backdrop_loading');
        backdrop.addClass('center-middle');
        var avatar = user.avatar;
        avatar = avatar.replace("thumbs/", "");
        var t = "";
        t += '<div width="100%" class="text-center">';
        t += '<img src="' + avatar + '" style="width:100%;" />';
        t += '<button class="button button-small button-positive" onClick="close_fullScreenAvatar()">Close</button>';
        t += '</div>';
        backdrop.html(t)
    }
    window.close_fullScreenAvatar = $scope.close_fullScreenAvatar = function() {
        var backdrop = $('div.backdrop');
        backdrop.removeClass('visible');
        backdrop.removeClass('active');
        backdrop.removeClass('backdrop_loading');
        backdrop.removeClass('center-middle');
        backdrop.html("");
    }
}).controller('profileChangePasswordCtrl', function($scope, $timeout, $ionicPopup) {
    $scope.languages = window.languages[window.current_language];
    $scope.user = user;
    $scope.password_match = function(user_data) {
        $scope.dontMatch_password = user_data.new_password !== user_data.confirm_new_password;
    };
    $scope.is_update_password = function(user_data) {
        if (user_data != undefined && user_data.current_password && user_data.new_password && user_data.confirm_new_password) {
            if (user_data.new_password == user_data.confirm_new_password) {
                return false;
            }
            return true;
        }
        return true;
    }
    $scope.submit_update_password = function() {
        obj_keyboard.waitForClose();
        obj_loading.show();
        var data = $('#form_update_password').serializeArray();
        data.push({
            name: "user_id",
            value: user.id
        });
        $.ajax({
            url: window.server_url + '/account/application_update_password?v=' + window.version,
            data: data,
            type: "POST",
            dataType: 'json',
            crossDomain: true,
            success: function(data) {
                obj_loading.hide();
                if (data.result == false) {
                    if (data.message) {
                        window.showAlert(window.languages[window.current_language].warning, data.message);
                    }
                } else {
                    if (data.message) {
                        window.showAlert(window.languages[window.current_language].success, data.message);
                        $('#current_password').val("");
                        $('#new_password').val("");
                        $('#confirm_new_password').val("");
                    }
                }
            }
        });
    }
}).controller('profileKootoroAccountCtrl', function($scope, $timeout, $ionicPopup) {
    $scope.languages = window.languages[window.current_language];
    $scope.user_data = {};
    $scope.user_data.first_name = user.first_name;
    $scope.user_data.last_name = user.last_name;
    $scope.user_data.zip_code = user.zip_code;
    $scope.is_update_profile = function(user_data) {
        if (user_data != undefined && user_data.first_name && user_data.last_name && user_data.zip_code) {
            return false;
        }
        return true;
    }
    $scope.submit_update_profile = function() {
        obj_keyboard.waitForClose();
        obj_loading.show();
        var data = $('#form_kootoro_account').serializeArray();
        data.push({
            name: "user_id",
            value: user.id
        });
        data.push({
            name: "weddingday",
            value: user.weddingday
        });
        data.push({
            name: "birthday",
            value: user.birthday
        });
        $.ajax({
            url: window.server_url + '/account/application_update_kootoro_account?v=' + window.version,
            data: data,
            type: "POST",
            dataType: 'json',
            crossDomain: true,
            success: function(data) {
                obj_loading.hide();
                if (data.result == false) {
                    if (data.message) {
                        window.showAlert(window.languages[window.current_language].warning, data.message);
                    }
                } else {
                    if (data.message) {
                        window.showAlert(window.languages[window.current_language].success, data.message);
                        user.set_name($scope.user_data.first_name, $scope.user_data.last_name);
                        user.zip_code = $scope.user_data.zip_code;
                    }
                }
            }
        });
    }
}).controller('profilePersonalDetailCtrl', function($scope, $timeout, $ionicPopup) {
    $scope.languages = window.languages[window.current_language];
    $scope.user_data = {};
    $scope.user_data.weddingday = user.weddingday;
    $scope.user_data.birthday = user.birthday;
    // $scope.is_update_personal = function(user_data)
    // {
    //     if (user_data != undefined) 
    //     {
    //         if (user_data.weddingday || user_data.birthday)
    //             return false;
    //         return true;
    //     }
    //     return true;
    // }
    $scope.submit_update_personal = function() {
        obj_keyboard.waitForClose();
        obj_loading.show();
        var data = $('#form_personal').serializeArray();
        data.push({
            name: "user_id",
            value: user.id
        });
        data.push({
            name: "first_name",
            value: user.first_name
        });
        data.push({
            name: "last_name",
            value: user.last_name
        });
        data.push({
            name: "zip_code",
            value: user.zip_code
        });
        $.ajax({
            url: window.server_url + '/account/application_update_kootoro_account?v=' + window.version,
            data: data,
            type: "POST",
            dataType: 'json',
            crossDomain: true,
            success: function(data) {
                obj_loading.hide();
                if (data.result == false) {
                    if (data.message) {
                        window.showAlert(window.languages[window.current_language].warning, data.message);
                    }
                } else {
                    if (data.message) {
                        window.showAlert(window.languages[window.current_language].success, data.message);
                        user.weddingday = $scope.user_data.weddingday;
                        user.birthday = $scope.user_data.birthday;
                    }
                }
            }
        });
    }
}).controller('profileFriendSettingCtrl', function($scope, $timeout, $ionicPopup) {
    $scope.languages = window.languages[window.current_language];
    $scope.user_data = {};
    $scope.user_data.is_block_request_friend = user.is_block_request_friend;
    $scope.submit_update_friend = function() {
        obj_keyboard.waitForClose();
        obj_loading.show();
        var data = {
            'user_id': user.id,
            'is_block_request_friend': $scope.user_data.is_block_request_friend,
        };
        $.ajax({
            url: window.server_url + '/account/application_update_friend_setting?v=' + window.version,
            data: data,
            type: "POST",
            dataType: 'json',
            crossDomain: true,
            success: function(data) {
                obj_keyboard.waitForClose();
                obj_loading.hide();
                if (data.result == false) {
                    if (data.message) {
                        window.showAlert(window.languages[window.current_language].warning, data.message);
                    }
                } else {
                    if (data.message) {
                        window.showAlert(window.languages[window.current_language].success, data.message);
                        user.is_block_request_friend = $scope.user_data.is_block_request_friend;
                    }
                }
            }
        });
    }
})
/** =================== Friend ======================= **/
.controller('friendCtrl', function($scope, $timeout,$ionicPopup, $ionicSlideBoxDelegate,$ionicScrollDelegate, $ionicActionSheet, $ionicPopover) {
    $scope.slideChanged = function(active_index)
    {
        if ($scope.active_index != active_index)
        {
            $scope.setActiveSlide(active_index);
        }
    }
    $scope.setActiveSlide=function(active_index){
        $scope.active_index =  active_index;
        $ionicSlideBoxDelegate.$getByHandle('mainSlide').slide(active_index);
        window.list_chat = undefined;
        window.list_friends = undefined;
        switch(active_index)
        {
            case 0: 
            {
                $scope.__init_request_make_friend();
                break;
            }
            case 1:
            {
                $scope.__init_list_chat();
                break;
            }
            case 2:
            {
                $scope.__init_list_friends();
                break;
            }
            case 3:
            {
                $scope.__init_list_friends_blocked();
                break;
            }
        }
    }

    $scope.__init_request_make_friend =function(){
        $.ajax({
            url: window.server_url + '/friend/application_get_request_make_friends?v=' + window.version,
            data: {'user_id' : user.id, },
            type: "POST",
            dataType: 'json',
            crossDomain: true,
            success: function(data) {
                for (var i = 0; i < data.friends.length; i++) {
                    data.friends[i].user.image = window.server_url + data.friends[i].user.image;
                };
                window.list_request = $scope.list_request = data.friends;
            }
        });
    }

    $scope.__init_list_chat = function() {
        $.ajax({
            url: window.server_url + '/friend/application_get_list_message?v=' + window.version,
            data: {'user_id' : user.id, },
            type: "POST",
            dataType: 'json',
            crossDomain: true,
            success: function(data) {
                var r = data;
                var friend_ids = Array();
                for (var i = 0; i < r.friends.length; i++) {
                    r.friends[i].user.image = window.server_url + r.friends[i].user.image;
                    r.friends[i].user.online_or_offline = "offline";
                    friend_ids.push(r.friends[i].player_friend_id);
                };
                $scope.list_chat = window.list_chat = r;
                obj_socket.get_friend_online(user.id, friend_ids);
                $timeout(function() {
                    $ionicScrollDelegate.scrollTop();
                }, 200);
            }
        });
    }

    $scope.__init_list_friends = function()
    {
        
        $.ajax({
            url: window.server_url + '/friend/application_get_my_friend?v=' + window.version,
            data: {'user_id' : user.id, },
            type: "POST",
            dataType: 'json',
            crossDomain: true,
            success: function(data) {
                for (var i = 0; i < data.friends.length; i++) {
                    data.friends[i].user.image = window.server_url + data.friends[i].user.image;
                };
                $scope.list_friends = window.list_friends = data.friends;
                $timeout(function() { 
                    $ionicScrollDelegate.scrollTop();
                }, 200);
            }
        });
    }
    
    $scope.__init_list_friends_blocked = function()
    {

        $.ajax({
            url: window.server_url + '/friend/application_get_friend_blocked?v=' + window.version,
            data: {'user_id' : user.id, },
            type: "POST",
            dataType: 'json',
            crossDomain: true,
            success: function(data) {
                for (var i = 0; i < data.friends_blocked.length; i++) {
                    data.friends_blocked[i].user.image = window.server_url + data.friends_blocked[i].user.image;
                };
                window.list_blocked = $scope.list_blocked = data.friends_blocked;
                $timeout(function() {
                    
                }, 200);
            }
        });
    }

    $scope.accept_make_friend = function(message_id)
    {
        $scope.temp_value = message_id;
        $.ajax({
            url: window.server_url + '/friend/application_accept_request_friend?v=' + window.version,
            data: {
                'user_id' : user.id, 
                'message_id' : message_id,
            },
            type: "POST",
            dataType: 'json',
            crossDomain: true,
            success: function(data) {
                if (data.result)
                {
                    if (data.message)
                        $scope.showToast(data.message);
                    $timeout(function(){
                        for (var i = 0; i < $scope.list_request.length; i++) {
                            if ($scope.list_request[i].message.id == $scope.temp_value)
                            {
                                $scope.list_request.splice(i,1);
                                break;
                            }
                        };    
                    }, 3000);
                    
                }
                else
                {
                    if (data.message)
                    {
                        $scope.showAlert($scope.languages.warning, data.message);
                    }
                }
                $timeout(function() {
                    
                }, 200);
            }
        });
    }

    $scope.unblock_my_friend = function(friend_record_id)
    {
        $scope.temp_value = friend_record_id;
        $.ajax({
            url: window.server_url + '/friend/application_unblock_my_friend?v=' + window.version,
            data: {
                'user_id' : user.id, 
                'record_id' : friend_record_id,
            },
            type: "POST",
            dataType: 'json',
            crossDomain: true,
            success: function(data) {
                if (data.result)
                {
                    if (data.message)
                        $scope.showToast(data.message);
                    $timeout(function(){
                        for (var i = 0; i < $scope.list_blocked.length; i++) {
                            if ($scope.list_blocked[i].id == $scope.temp_value)
                            {
                                $scope.list_blocked.splice(i,1);
                                break;
                            }
                        };    
                    }, 2000);
                    
                }
                else
                {
                    if (data.message)
                    {
                        $scope.showAlert($scope.languages.warning, data.message);
                    }
                }
                $timeout(function() {
                    
                }, 200);
            }
        });
    }

    $scope.unfriend_my_friend = function(friend_record_id, friend_name)
    {
        //********************** A confirm dialog
        window.confirmPopup = $ionicPopup.confirm({
            title: $scope.languages.confirm,
            template: $scope.languages.do_you_want_to_unfriend + "\""+ friend_name+"\"",
        });

        confirmPopup.then(function(res) {
            if(res) {
                console.log("Sure");
                console.log(friend_record_id);
                $scope.temp_value = friend_record_id;
                $.ajax({
                    url: window.server_url + '/friend/application_unfriend_my_friend?v=' + window.version,
                    data: {
                        'user_id' : user.id, 
                        'record_id' : friend_record_id,
                    },
                    type: "POST",
                    dataType: 'json',
                    crossDomain: true,
                    success: function(data) {
                        if (data.result)
                        {
                            if (data.message)
                                $scope.showToast(data.message);
                            $timeout(function(){
                                for (var i = 0; i < $scope.list_blocked.length; i++) {
                                    if ($scope.list_blocked[i].id == $scope.temp_value)
                                    {
                                        $scope.list_blocked.splice(i,1);
                                        break;
                                    }
                                };    
                            }, 2000);
                            
                        }
                        else
                        {
                            if (data.message)
                            {
                                $scope.showAlert($scope.languages.warning, data.message);
                            }
                        }
                        $timeout(function() {
                            
                        }, 200);
                    }
                });
            } else {
               console.log('You are not sure');
            }
        });
        confirmPopup.show();
    }

    $scope.request_make_friend = function(friend_id){
        $scope.temp_value = friend_id;
        $.ajax({
            url: window.server_url + '/friend/application_add_friend?v=' + window.version,
            data: {
                'user_id' : user.id, 
                'friend_id' : friend_id,
            },
            type: "POST",
            dataType: 'json',
            crossDomain: true,
            success: function(data) {
                if (data.result)
                {
                    if (data.message)
                        $scope.showToast(data.message);
                    $timeout(function(){
                        for (var i = 0; i < $scope.list_search.length; i++) {
                            if ($scope.list_search[i].id == $scope.temp_value)
                            {
                                $scope.list_search.splice(i,1);
                                break;
                            }
                        };    
                    }, 2000);
                    
                }
                else
                {
                    if (data.message)
                    {
                        $scope.showAlert($scope.languages.warning, data.message);
                    }
                }
                $timeout(function() {
                    
                }, 200);
            }
        });
    }
    
    $scope.__init_search = function()
    {
        $scope.data_search = null;
        $scope.keyword_search = null;
        $scope.page_search = 0;
        $scope.list_search = new Array();
        $timeout(function() {}, 200);
    }

    $scope.search_friend = function(keyword_search)
    {
        if (keyword_search == "")
        {
            $scope.page_search = 0;
            $scope.keyword_search = "";
            return;
        }
        $scope.page_search = 1;
        $scope.keyword_search = keyword_search;
        
        $timeout(function() {
            if ($scope.keyword_search != $scope.data_search)
            {
                $scope.data_search = $scope.keyword_search;
                if ($scope.data_search == "")
                {
                    $scope.list_search = new Array();
                    $timeout(function() { }, 200);
                    return;
                }
                $scope.paging_search_friend();
            }
        }, 1000);       
    }

    $scope.paging_search_friend = function()
    {
        if (typeof $scope.page_search == "undefined" || $scope.page_search == 0)
        {
            //$scope.$broadcast('scroll.infiniteScrollComplete');
            return;
        }
        $.ajax({
            url: window.server_url + '/friend/application_search_friend?v=' + window.version,
            data: {
                'user_id' : user.id, 
                'keyword' : $scope.data_search,
                'page'  : $scope.page_search,
            },
            type: "POST",
            dataType: 'json',
            crossDomain: true,
            success: function(data) {
                if ($scope.page_search == 1)
                    window.list_search = $scope.list_search = data.friends;
                else
                {
                    window.list_search = $scope.list_search = $scope.list_search.concat(data.friends);
                }
                $scope.$broadcast('scroll.infiniteScrollComplete');
                if (data.pPaging.page == data.pPaging.end) {
                    $scope.page_search = 0;                            
                    $('ion-infinite-scroll').hide();
                } else {
                    $scope.page_search = Number(data.pPaging.page) + 1;
                    $('ion-infinite-scroll').removeAttr('style');
                }
                console.log(data.pPaging.page, data.pPaging.end);
                $timeout(function() {}, 200);
            }
        });
    }


    //**---------------- Popover Profile of user
    $ionicPopover.fromTemplateUrl('templates/friend/popoverProfile.html', {
        scope: $scope,
    }).then(function(popover) {
        $scope.popoverProfile = popover;
    });
    $scope.openPopoverProfile = function($event, friend_id) {
        if ($scope.current_friend == null || $scope.current_friend.personal.id != friend_id)
        {
            $scope.current_friend = null;
            $.ajax({
                url: window.server_url + '/friend/application_popover_user_profile?v=' + window.version,
                data: {
                    'user_id' : user.id, 
                    'friend_id' : friend_id,
                    'is_full' : false,
                },
                type: "POST",
                dataType: 'json',
                crossDomain: true,
                success: function(data) {
                    if (data.result == false)
                    {
                        $scope.showToast(data.message);
                    }
                    else
                    {
                        $scope.current_friend = data.data;
                        $scope.popoverProfile.show($event);
                    }
                    $timeout(function() {}, 200);
                }
            });    
        }
        else
        {
            $scope.popoverProfile.show($event);
            $timeout(function() {}, 200);
        }
        
    };
    $scope.closePopoverProfile = function() {
        $scope.popoverProfile.hide();
    };
    $scope.$on('$destroy', function() { 
        console.log("destroy");
        $scope.popoverProfile.remove(); 
    });
    $scope.$on('popover.hidden', function() {
        console.log("hidden");
        $scope.popoverProfileSetActive(0);
     });
    $scope.$on('popover.removed', function() {
        console.log("removed");
     });
    $scope.popoverActiveIndex = 0;
    $scope.popoverProfileSetActive = function(active_index)
    {
        $scope.popoverActiveIndex = active_index;
        $ionicSlideBoxDelegate.$getByHandle('popoverProfile').slide(active_index);
    }
    $scope.popoverProfileSlideChanged = function(active_index)
    {
        $scope.popoverActiveIndex = active_index;
    }
    



    $scope.template_url_request_make_friend = "templates/friend/making_friends.html";
    $scope.template_url_list_chat = "templates/friend/list_chat.html";
    $scope.template_url_list_friends = "templates/friend/list_friends.html";
    $scope.template_url_list_friends_blocked = "templates/friend/block.html";
    $scope.template_url_search = "templates/friend/search.html";

    $scope.languages = window.languages[window.current_language];
    $scope.slideChanged(0);
    $scope.__init_list_chat();
    $scope.__init_list_friends();
    $scope.__init_list_friends_blocked();
    $timeout(function() {
        $('ion-scroll[name=sub-content]').css('height',$('#main-content').height()-$('#header-tabs').height());
    }, 100);
    window.$timeout = $timeout;
})
/** =================== Games ======================= **/
.controller('gamesCtrl', function($scope, $timeout,$ionicSlideBoxDelegate,$ionicScrollDelegate) {
    $scope.slideChanged = function(active_index)
    {
        if ($scope.active_index != active_index)
        {
            $scope.setActiveSlide(active_index);
        }
    }
    $scope.setActiveSlide=function(active_index){
        $scope.active_index =  active_index;
        $ionicSlideBoxDelegate.slide(active_index);
        switch(active_index)
        {
            case 0: 
            {
                $scope.__init_categories();
                break;
            }
            case 1:
            {
                $scope.__init_categories();
                break;
            }
            case 2:
            {
                $scope.__init_categories();
                break;
            }
        }
    }

    $scope.__init_categories = function()
    {
        $.ajax({
            url: window.server_url + '/game/mobile_app_lottery/application_get_game_categories?v=' + window.version,
            data: {'user_id' : user.id, },
            type: "POST",
            dataType: 'json',
            crossDomain: true,
            success: function(data) {
                $scope.list_categories = data.categories;
                $timeout(function() {
                    
                }, 200);
            }
        });
    }

    $scope.template_url_categories = "templates/games/categories.html";
    $scope.template_url_playing_games = "templates/games/playing_games.html";
    $scope.template_url_favorite_games = "templates/games/favorite_games.html";

    $scope.languages = window.languages[window.current_language];
    $scope.slideChanged(0);
    $timeout(function() {
        $('ion-scroll[name=sub-content]').css('height',$('#main-content').height()-$('#header-tabs').height());
    }, 100);
    
    window.$timeout = $timeout;
})
.controller('listGamesCtrl', function($scope, $timeout,$stateParams,$ionicScrollDelegate) {
    $scope.categoryId = $stateParams.categoryId;
    $scope.__init_list_games = function(categoryId)
    {
        $.ajax({
            url: window.server_url + '/game/mobile_app_lottery/application_get_list_games?v=' + window.version,
            data: {
                'user_id' : user.id, 
                'category_id' : categoryId,
            },
            type: "POST",
            dataType: 'json',
            crossDomain: true,
            success: function(data) {
                for (var i = 0; i < data.games.length; i++) {
                    data.games[i].image = window.server_url + data.games[i].image;
                };
                $scope.category = data.category;
                $scope.list_games = data.games;
                $timeout(function() {
                    
                }, 200);
            }
        });
    }

    $scope.__init_list_games($scope.categoryId);
})
.controller('playGameCtrl', function($scope, $timeout,$stateParams,$ionicScrollDelegate, $sce) {
    $scope.gameId = $stateParams.gameId;
    $scope.__init_games = function(gameId)
    {
        $.ajax({
            url: window.server_url + '/game/mobile_app_lottery/application_get_param_game?v=' + window.version,
            data: {
                'user_id' : user.id, 
                'game_id' : gameId,
            },
            type: "POST",
            dataType: 'json',
            crossDomain: true,
            success: function(data) {
                $scope.game = data;
                $scope.game.params.value = $sce.trustAsResourceUrl($scope.game.params.value);

                $timeout(function() {
                    
                }, 200);
            }
        });
    }
    $scope.__init_games($scope.gameId);
})
