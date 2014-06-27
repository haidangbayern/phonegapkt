var mySound = "";
var path_music = "music";
var mySoundIntro = "";
var time_server = undefined;
var div_display = "lottery_introduce";
var obj_lottery = {
	"normal_number" : {},
    "power_number" : {},
};
$(function() {
	lottery.run();
    lottery_music.run();
    //lottery_animation.initialize();
	lottery_draw_tickets.initialize();
});

function spanlotto_run_5_selected(obj) {
	var is_5_selected = $('#lotto_run_select5number').find('input[sf-data=spanlotto_selected][value=1]');
	var is_selected = $(obj).find('input[sf-data=spanlotto_selected]').val();
	var current_number = $(obj).find('input[sf-data=spanlotto_number]').val();
	if (is_selected == '0') {
		if (is_5_selected.length == time_server.count_normal_number) return;
		//sort
        obj_lottery.normal_number[current_number] = true;
        
        //insert to hidden value
		//var five_number = $('#lottery_run').find("input[name='spanlotto[five_number]']").val();
        var five_number = "";
        for(var number in obj_lottery.normal_number )
        {
            if (obj_lottery.normal_number[number] == true)
            {
                if (number < 10) 
                    five_number += '0' + number + '|';
        		else
                    five_number += number + '|';        
            }
        }
		
        
		 

		$('#lottery_run').find("input[name='spanlotto[five_number]']").val(five_number);
		//select style
		$(obj).find('input[sf-data=spanlotto_selected]').val('1');
		$(obj).addClass('spanlotto_selected');
        $(obj).find('img[name=no_selected]').hide();
        $(obj).find('img[name=selected]').show();
		//$(obj).hide();
		//music
		lottery_music.click_normal_number();
		//animation
		//lottery_animation.buy_ball();
	} else {
	    //removing on object
        delete obj_lottery.normal_number[current_number];
		//removing to hidden value
		var five_number = $('#lottery_run').find("input[name='spanlotto[five_number]']").val();
		if (current_number < 10) current_number = '0' + current_number + '|';
		else
		current_number = current_number + '|';
		five_number = five_number.replace(current_number, '');
		$('#lottery_run').find("input[name='spanlotto[five_number]']").val(five_number);
		//no select style
		$(obj).find('input[sf-data=spanlotto_selected]').val('0');
		$(obj).removeClass('spanlotto_selected');
        $(obj).find('img[name=no_selected]').show();
        $(obj).find('img[name=selected]').hide();
	}
	notice_transaction_content();
}

function spanlotto_run_1_selected(obj) {
	var is_1_selected = $('#lotto_run_select1number').find('input[sf-data=spanlotto_selected][value=1]');
	var is_selected = $(obj).find('input[sf-data=spanlotto_selected]').val();
	var current_number = $(obj).find('input[sf-data=spanlotto_number]').val();
	if (is_selected == '0') {
		if (is_1_selected.length == time_server.count_power_number) return;
		
        //sort
        obj_lottery.power_number[current_number] = true;
        
        //insert to hidden value
		//var five_number = $('#lottery_run').find("input[name='spanlotto[one_number]']").val();
        var power_number = "";
        for(var number in obj_lottery.power_number )
        {
            if (obj_lottery.power_number[number] == true)
            {
                if (number < 10) 
                    power_number += '0' + number + '|';
        		else
                    power_number += number + '|';        
            }
        }
		
        
		$('#lottery_run').find("input[name='spanlotto[one_number]']").val(power_number);
		//select style
		$(obj).find('input[sf-data=spanlotto_selected]').val('1');
		$(obj).addClass('spanlotto_selected');
        $(obj).find('img[name=no_selected]').hide();
        $(obj).find('img[name=selected]').show();
		//music
		lottery_music.click_normal_number();
	} else {
        //removing on object
        delete obj_lottery.power_number[current_number];
		//removing hidden value
		var one_number = $('#lottery_run').find("input[name='spanlotto[one_number]']").val();
		if (current_number < 10) current_number = '0' + current_number + '|';
		else
		current_number = current_number + '|';
		one_number = one_number.replace(current_number, '');
		$('#lottery_run').find("input[name='spanlotto[one_number]']").val(one_number);
		//no select style
		$(obj).find('input[sf-data=spanlotto_selected]').val('0');
		$(obj).removeClass('spanlotto_selected');
        $(obj).find('img[name=no_selected]').show();
        $(obj).find('img[name=selected]').hide();
	}
	notice_transaction_content();
}

function lotto_run_buy_ticket(obj_ele_html) {
	lottery.buy_ticket(obj_ele_html);
}

function lotto_run_clear_ticket() {
	lottery.clear_select_ticket();
	notice_transaction_content();
}

function lotto_run_buy_another_ticket() {
    lottery.view_buy_ticket();
}

function lotto_run_buy_more_ticket() {
	lottery.view_buy_ticket();
}

function lotto_run_refesh_tickets(obj_ele_html, page) {
	lottery.view_tickets(obj_ele_html, page);
}

function btn_volumne_click() {
	var value = $('#btn_volumne').find('input[type=hidden][name=volumne]').val();
	$('#btn_volumne').find('img').hide();
	$('#btn_volumne').find('img[name=' + value + ']').show();
	if (value == 'mute') {
		lottery_music.mute();
		$('#btn_volumne').find('input[type=hidden][name=volumne]').val('unmute');
	} else {
		lottery_music.unmute();
		$('#btn_volumne').find('input[type=hidden][name=volumne]').val('mute');
	}
}

function lottery_skin_change(obj) {
	var skin = $(obj).val();
	$('section[sf-child=games]').attr('sf-skin', skin);
}

function number_random_change(obj) {
	notice_transaction_content();
}

function other_day_change(obj) {
	var name = $(obj).attr('name');
	name = name.replace('is_different', 'time');
	var spinner = $('input[name="' + name + '"]');
	if (spinner.val() == 0) spinner.val(1);
	notice_transaction_content();
}

function spinner_time_change(obj) {
	notice_transaction_content();
}

function notice_transaction_content() {
	$('#lottery_buy div.success').hide();
	$('#lottery_buy div.error').hide();
	var html = "";
	var number_series = "";
	//checking random number
	if ($('input[name="spanlotto[number_random]"]')[0].checked) {
		number_series += " - Auto random number. <br/>";
	} else {
		//getting 5 number
		var value = $('input[name="spanlotto[five_number]"]').val();
        
		if (value != '') {
		  value = value.split("|");
          number_series += "<p> - Number Toros : "
          for (var i =0 ; i < value.length - 1; i++)
          {
             number_series += "<img src='images/ball/png/"+ value[i] +".png' width=45px height=45px > ";  
          }
          number_series += "</p>";
		}
		//getting 1 number
		var value = $('input[name="spanlotto[one_number]"]').val();
        if (value != '') {
		  value = value.split("|");
          number_series += "<p> - Power Toros &nbsp;: "
          for (var i =0 ; i < value.length - 1; i++)
          {
             number_series += "<img src='images/ball/png/"+ value[i] +".png' width=45px height=45px > ";  
          }
          number_series += "</p>";
		}
	}
	//checking time
	var is_have_day_ticket = false;
	var total_number_tickets = 0;
	var today = time_server.year + "/" + time_server.month + "/" + time_server.day;
	$('input[sf-obj=lottery_time]').each(function(index, e) {
		var time = $(e).attr('data-time');
		var name = $(e).attr('name');
		var iday = $(e).attr('data-iday');

		name = name.replace('time', 'is_different');
		var number_ticket = $(e).val();
		var number_other_day = $('input[type=checkbox][name="' + name + '"]:checked');

		if (number_ticket != 0) {
			total_number_tickets += Number(number_ticket);
			is_have_day_ticket = true;
			var i_next_day = 0;
            
            i_next_day = iday - 1;
			
			if (number_other_day.length == 0) {
				html += " ------ Lottery time: " + time + " ----- <br/>";
				//var date = new Date(time_server.year, Number(time_server.month), time_server.day + i_next_day);
                var date = new Date(time_server.year, Number(time_server.month), time_server.day);
                date.addDays(i_next_day);
				html += "Date: " + date.getFullYear() + "/" + date.getMonth() + "/" + date.getDate() + " ( " + number_ticket + " ticket(s) ) <br/>";
				html += number_series;
				html += "<br/>";
			} else {
				html += " ------ Lottery time: " + time + " ----- <br/>";
				for (var i = 0; i < Number(number_ticket); i++) {
					//var date = new Date(time_server.year, Number(time_server.month), time_server.day + i_next_day + i);
                    var date = new Date(time_server.year, Number(time_server.month), time_server.day);
                    date.addDays(i_next_day + i);
                    window.test = date;
					html += "Date: " + date.getFullYear() + "/" + date.getMonth() + "/" + date.getDate() + " ( 1 ticket ) <br/>";
					html += number_series;
				}
				html += "<br/>";
			}
		}
	});
	if (!is_have_day_ticket) html += number_series;
	//add price
	if (total_number_tickets != 0) {
		html += "Total ticket: " + total_number_tickets + " tickets <br/>";
		html += "Total prices: " + (total_number_tickets * Number($('#price').val())) + " Toros <br/>";
        obj_lottery.total_toros_buy_ticket = total_number_tickets * Number($('#price').val());
	}
    else
    {
        obj_lottery.total_toros_buy_ticket = 0;
    }
	$('div.notice_transaction div[sf-data=content]').html(html);
}

function history_click(obj_ele_html, id) {
    if (obj_ele_html != null)
    {
        var btn = $(obj_ele_html)
        btn.button('loading')    
    }
    
    obj_snap.close();
    obj_loading.show();
    $('#' + div_display).hide();
        
	var data_post = {};
	if (id != undefined) data_post = {
		'id': id,
	};
	data_post.uuid = $('#device_uuid').val(),

	$.ajax({
		url: window.server_url+'/game/mobile_app_lottery/history',
		data: data_post,
		type: "POST",
		contentType: "application/json",  
		dataType: 'jsonp',  
		crossDomain: true,  
		error: function(e) {  
			console.log(e.message);  
		},  
		complete: function(data) {  
			console.log(data);  
		} , 
		success: function(data) {
            if (typeof btn != "undefined")
                btn.button('reset');
			//data = JSON.parse(data);
			obj_loading.hide();
			if (data.result) {
			      
				if (data.is_ticket_result) {
					$("#lottery_history").html(data.html);
				} else {
					$("#lottery_history").html(data.html);
				}
				//$('#' + div_display).slideUp(1000, function() {
					$('#lottery_history').slideDown();
                    div_display = "lottery_history";
				//});
			}
            else {
                if (typeof data.err != "undefined" )
                {
                    $('#lottery_buy div.error').html(data.err);
					$('#lottery_buy div.error').show();
					$('#lottery_buy div.success').hide();
					return;
                }
            }
		}
	});
}

function history_time_change(id) {
	history_click(null,id);
}


function resizeFancyBox(obj_ele_html){
    setTimeout(function(){
        var size_ticket = {
        'w' : 500,
        'h' : 550,
    };
    console.log("run");
    if ($('#fancybox-wrap').css('display') != 'none')
    {
        var new_height = Number(size_ticket.h) * Number($('#fancybox-outer').width()) / Number(size_ticket.w);
        $('#fancybox-wrap').height(new_height);
        console.log(new_height);  
    }    
    }, 500);
    
}
