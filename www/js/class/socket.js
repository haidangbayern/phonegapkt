var obj_socket = {
    initialize: function() {
        if (typeof io == 'undefined') {
            alert("IO Sorry! Server Out");
            app.exit();
        }
        //socket realtime
        if (lottery_socket == undefined) lottery_socket = io.connect("http://" + window.server_ip + ":" + window.server_post + "/lottery");
        lottery_socket.on('lottery_time', function(data) {
            var data_post = {
                'lottery_time': data,
                'user_id' : user.id,
            };
            if (window.is_use_uuid)
                data_post.uuid = device.uuid;

            var lottery_time = data;
            var span_lottery_time = $('#lottery_result').find('span[name=lottery_time]');
            if (span_lottery_time.length == 0 || (span_lottery_time.length != 0 && span_lottery_time.text() != lottery_time)) {
                $.ajax({
                    url: window.server_url + '/game/mobile_app_lottery/lottery_result?v=' + window.version,
                    data: data_post,
                    type: "GET",
                    contentType: "application/json",
                    dataType: 'jsonp',
                    crossDomain: true,
                    success: function(data) {
                        //data = JSON.parse(data);
                        if ($('div.lottery_alert').length != 0) $('div.lottery_alert').remove();
                        if (data.result) {
                            //showing result 
                            if (data.is_ticket_result) {
                                if (navigator != undefined) {
                                    navigator.notification.beep(2);
                                    navigator.notification.vibrate(2500);
                                }
                                $('ion-view ion-content .scroll').prepend(data.html);
                            } else { //Don't buy
                                $('ion-view ion-content .scroll').prepend(data.html);
                            }
                        }
                        app_home_page.call_server_get_data();
                    }
                });
            }
        });
        lottery_socket.on('lottery_data', function(data) {
            //alert("Socket: recived data");
            console.log("Socket: recived data");
            obj_interface.analyze_data(data);
        });
        lottery_socket.on('lottery_is_run_time', function(data) {
            var backdrop = $('div.backdrop');
            if (backdrop.hasClass('active')) {
                $('#countdown').html(data.time_down);
            } else {
                backdrop.addClass('visible');
                backdrop.addClass('active');
                $('body').addClass('menu-open');
                $('body').addClass('popup-open');
                var t = "<div class='run_time_down popup popup-showing active'>";
                t += '<div class="popup-head" style="padding-bottom:0;"><h3>Countdown Timer</h3></div>';
                t += '<div class="popup-body" style="padding:0;">';
                t += '<h1 id="countdown" class="text-center">';
                t += data.time_down;
                t += '</h1>';
                t += "</div></div>";
                backdrop.after(t)
            }
        });
        lottery_socket.on('lottery_hidde_is_run_time', function(data) {
            //$('#lottery_runtime').hide();
            $('div.run_time_down').remove();
            $('div.backdrop').removeClass('visible').removeClass('active');
            $('body').removeClass('menu-open').removeClass('popup-open');
            //console.log("lottery_hidde_is_run_time");
        });
        lottery_socket.on('lottery_time_server', function(data) {
            time_server = data;
            $('#popup_time_server').text(time_server.month + "/" + time_server.day + "/" + time_server.year + " " + time_server.hour + ":" + time_server.minutes + ":" + time_server.seconds);
        });
        lottery_socket.on('ajax_home', function(data) {
            app_home_page.call_server_get_data();
        });
    },
    chat_socket: function() {
        user_socket = io.connect("http://" + window.server_ip + ":" + window.server_post + "/member_online");
        
        user_socket.on('update_chat', function(data) {

            var ele_list_chat  = $('#ele_list_chat');
            var chat_full = $('#chat_full');
            //updating chat full
            if (chat_full.length != 0 && window.user_chat != undefined)
            {
                if (window.user_chat.friend.id == data.from_user_id)
                {
                    var last_index_of = window.user_chat.messages.length-1;
                    var last_message = window.user_chat.messages[last_index_of];
                    var avatar = avatar = window.user_chat.friend.image;
                    if (last_message.user_id == data.from_user_id)
                    {
                        window.user_chat.messages[last_index_of].avatar = null;
                    }
                    var r = {
                        'avatar' : avatar,
                        'user_id' : data.from_user_id,
                        'message' : data.message,
                    };
                    window.user_chat.messages.push(r);
                    setTimeout(function(){
                        window.$ionicScrollDelegate.scrollBottom();
                    },200);
                }
                else
                {
                    var op = {
                        'user_name' : data.from_user_name,
                        'avatar' : data.avatar,
                        'user_id' : data.from_user_id,
                        'message' : data.message,
                    };
                    obj_chat.notice_popup_set_data(op);
                    obj_chat.notice_popup_show();
                }
            }
            else
                {
                    if (ele_list_chat.length == 0 || window.list_chat == undefined)
                    {
                        window.user_chat = undefined;
                        var op = {
                            'user_name' : data.from_user_name,
                            'avatar' : data.avatar,
                            'user_id' : data.from_user_id,
                            'message' : data.message,
                        };
                        obj_chat.notice_popup_set_data(op);
                        obj_chat.notice_popup_show();    
                    }
                    else if (ele_list_chat.length != 0)
                    {
                        obj_chat.notice_popup_reset();
                    }
                    
                }

            //updating list
            if (ele_list_chat.length != 0 && window.list_chat != undefined)
            {
                for (var i = 0; i < window.list_chat.friends.length; i++) {
                    if (window.list_chat.friends[i].player_friend_id == data.from_user_id)
                    {
                        window.list_chat.friends[i].message.message = data.message;  
                        break;
                    }
                };                
            }
            else
            {
                window.list_chat = undefined;
            }
            if (window.$timeout != undefined)
            {
                window.$timeout(function(){
                    console.log("-test-");
                },200);    
            }
            
        });

        user_socket.on('hey friend, i was online', function(data){
            var friend_id = data.user_id;
            var ele_list_chat  = $('#ele_list_chat');
            if (ele_list_chat.length != 0)
            {
                for (var i = 0; i < window.list_chat.friends.length; i++) {
                    if (window.list_chat.friends[i].player_friend_id == friend_id)
                    {
                        console.log(i);
                        window.list_chat.friends[i].user.online_or_offline = "online";  
                        $('#ele_list_chat i[name=f_on_off_'+window.list_chat.friends[i].user.id+']').removeClass('ic-offline');
                        $('#ele_list_chat i[name=f_on_off_'+window.list_chat.friends[i].user.id+']').addClass('ic-online');
                        break;  
                    }
                };                
            }
            else
            {
                window.list_chat = undefined;
            }
        });
        user_socket.on('hey friend, i was offline', function(data){
            var friend_id = data.user_id;
            var ele_list_chat  = $('#ele_list_chat');
            if (ele_list_chat.length != 0 && window.list_chat != undefined)
            {
                for (var i = 0; i < window.list_chat.friends.length; i++) {
                    if (window.list_chat.friends[i].player_friend_id == friend_id)
                    {
                        console.log(i);
                        window.list_chat.friends[i].user.online_or_offline = "offline";
                        $('#ele_list_chat i[name=f_on_off_'+window.list_chat.friends[i].user.id+']').removeClass('ic-online');
                        $('#ele_list_chat i[name=f_on_off_'+window.list_chat.friends[i].user.id+']').addClass('ic-offline');
                        break;  
                    }
                };                
            }
            else
            {
                window.list_chat = undefined;
            }
        });
        user_socket.on('update friend online', function(data){
            var friend_ids = data.friend_ids_online;
            var ele_list_chat  = $('#ele_list_chat');
            if (ele_list_chat.length != 0 && window.list_chat != undefined)
            {
                for (var i = 0; i < window.list_chat.friends.length; i++) {
                    var index = friend_ids.indexOf(window.list_chat.friends[i].player_friend_id)
                    if (index != -1)
                    {
                        window.list_chat.friends[i].user.online_or_offline = "online";  
                    }
                };                
            }
            else
            {
                window.list_chat = undefined;
            }
        });

        user_socket.emit('i am online', {user_id: user.id});
       
    },
    send_chat: function(user_id, user_name, avatar,message, send_to_user_id)
    {
        var data = {
            "user_id" : user_id,
            "user_name" : user_name,
            "message" : message,
            "avatar" : avatar,
            "send_to_user_id" : send_to_user_id,
        };
        user_socket.emit('send chat', data);
    },
    get_friend_online : function(user_id, list_my_friends)
    {
        var data = {
            "user_id" : user_id,
            "friend_ids" : list_my_friends,
        };
        user_socket.emit('i get my friend online', data);  
    }
};