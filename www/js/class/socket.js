var obj_socket = {
    initialize : function(){
        if (typeof io == 'undefined'){
            alert("IO Sorry! Server Out");
            app.exit();
        }

        //socket realtime
        if (lottery_socket == undefined)
            lottery_socket = io.connect("http://" + window.server_ip +":"+window.server_post+"/lottery");

        lottery_socket.on('lottery_time', function(data) {
            var data_post = {
                'lottery_time': data,
                'uuid' : $('#device_uuid').val(),
            };
            var lottery_time = data;
            var span_lottery_time = $('#lottery_result').find('span[name=lottery_time]');
            if (span_lottery_time.length == 0 || (span_lottery_time.length != 0 && span_lottery_time.text() != lottery_time)) {
                $.ajax({
                    url: window.server_url+'/game/mobile_app_lottery/lottery_result?v=' + window.version,
                    data: data_post,
                    type: "GET",
                    contentType: "application/json",  
                    dataType: 'jsonp',  
                    crossDomain: true, 
                    success: function(data) {
                        //data = JSON.parse(data);
                        if ($('div.lottery_alert').length != 0)
                            $('div.lottery_alert').remove();

                        if (data.result) {
                            //showing result 

                            if (data.is_ticket_result) {
                                
                                $('ion-view ion-content .scroll').prepend(data.html);

                            } else { //Don't buy
                                $('ion-view ion-content .scroll').prepend(data.html);
                            }
                        }
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
            if(backdrop.hasClass('active'))
            {
                $('#countdown').html(data.time_down);
            }
            else
            {
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

            

            // $('ion-view ion-content').append(t);
            // $('#lottery_runtime').find('span[name=time]').text(data.time_down + "s");
            // $('#lottery_runtime').show();
            //console.log("lottery_is_run_time");
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
    },
};

function reload_analyze_data()
{
    if (typeof time_server != "undefined")
    {
        
    }
    else
    {
        setTimeout(function(){                    
            reload_analyze_data();
        },300); 
    }
}