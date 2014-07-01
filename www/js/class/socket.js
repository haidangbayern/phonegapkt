var obj_socket = {
    initialize : function(){
        if (typeof io == 'undefined'){
            // $('#lottery_modal .modal-body').html("Sorry! Server Out");
            // $('#lottery_modal').modal('show');
            // $('#lottery_modal').on('hidden.bs.modal', function (e) {
            //     var url = window.location.pathname;
            //     url = url.replace('/play','');
            //     window.location = url;
            //     return;
            // });
            alert("Sorry! Server Out");
            app.exit();
        }

        //socket realtime
        lottery_socket = io.connect("http://" + window.server_ip +":"+window.server_post+"/lottery");
        lottery_socket.on('lottery_time', function(data) {
            var data_post = {
                'lottery_time': data,
                'uuid' : $('device_uuid').val(),
            };
            var lottery_time = data;
            var span_lottery_time = $('#lottery_result').find('span[name=lottery_time]');
            if (span_lottery_time.length == 0 || (span_lottery_time.length != 0 && span_lottery_time.text() != lottery_time)) {
                $.ajax({
                    url: window.server_url+'/game/mobile_app_lottery/lottery_result?v=' + window.version,
                    data: data_post,
                    type: "POST",
                    contentType: "application/json",  
                    dataType: 'jsonp',  
                    crossDomain: true, 
                    success: function(data) {
                        //data = JSON.parse(data);
                        if (data.result) {
                            //showing result 
                            //$('#lottery_result').show();
                            $("#lottery_result").html(data.html);
                         
                            //Buying ticket
                            if (data.is_ticket_result) {
                                  //if (window.div_id != "")
    //                              {
    //                                $(window.div_id).slideUp(1000, function() {
    //                                    $('#lottery_result').slideDown();
    //                                });
    //                              }
                                $('#' + div_display).slideUp(1000, function() {
                                  $('#lottery_result').slideDown();
                                    div_display = "lottery_result";
                               });
                                lottery.update_balance();
                            } else { //Don't buy
                                $('#lottery_result').show();
                                setTimeout(function() {
                                    //reset divId
                                    if (div_display == 'lottery_result')    //Showing the previous of lottery
                                    {
                                        $('#lottery_buy').slideDown();
                                        div_display = "lottery_buy";    
                                    }
                                    else
                                    {
                                        $('#lottery_result').hide();
                                    }
                                }, 30000);
                            }
                        }
                    }
                });
            }
        });
        lottery_socket.on('lottery_data', function(data) {
            obj_interface.changing_loading("Loading data ...");
            window.analyze_data = data;
            reload_analyze_data();
        });
        lottery_socket.on('lottery_is_run_time', function(data) {
            $('#lottery_runtime').find('span[name=time]').text(data.time_down + "s");
            $('#lottery_runtime').show();
            //console.log("lottery_is_run_time");
        });
        lottery_socket.on('lottery_hidde_is_run_time', function(data) {
            $('#lottery_runtime').hide();
            //console.log("lottery_hidde_is_run_time");
        });
        lottery_socket.on('lottery_time_server', function(data) {
            obj_interface.initialize_interface();
            //console.log("socket lottey r_time_server");
            var html = "<i class=\"fa fa-clock-o\"></i> " + data.month + "-" + data.day + "-" + data.year + " " + data.hour + ":" + data.minutes + ":" + data.seconds;
            html += "<br/>";
            html += "<span class=note>(" + data.timeZone + ") " + data.timeZoneName + "</span>"; 
            $('div[l-ele=time_server] div').html(html);
            time_server = data;
            $('#span_normal_number').text(data.count_normal_number);
            $('#span_power_number').text(data.count_power_number);
            
        });
    },
};

function reload_analyze_data()
{
    if (typeof time_server != "undefined")
    {
        setTimeout(function(){                    
            obj_interface.analyze_data(window.analyze_data);   
        },300);    
    }
    else
    {
        setTimeout(function(){                    
            reload_analyze_data();
        },300); 
    }
}