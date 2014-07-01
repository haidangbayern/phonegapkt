var mySound = "";
var path_music = "music";
if (typeof Media != "undefined" ){
	//path_music = window.server_url + "/libgames/abcv/lottery/music";
	path_music = "file:///android_asset/www/music";
}
var mySoundIntro = "";
var time_server = undefined;
var div_display = "lottery_introduce";
var obj_lottery = {
	"normal_number" : {},
    "power_number" : {},
};
$(function() {
	//lottery_music.run();
	//lottery.run();
    //lottery_animation.initialize();
	//lottery_draw_tickets.initialize();
});


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


function notice_transaction_content() {
	$('#div_notice_transaction div.success').hide();
	$('#div_notice_transaction div.error').hide();
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
	html += number_series;

	//checking time
	var total_number_tickets = 0;
	for (var i= 0;i < $('input[data-name=input_time][value!="0"]').length; i++)
	{
		var t = $('input[data-name=input_time][value!="0"]')[i];
		var ele = $(t);
		var data_value = ele.attr('data-value');
		total_number_tickets += Number(ele.val());
		html += data_value + " " + ele.val() + " ticket(s)<br/>";
	}

	//add price
	if (total_number_tickets != 0) {
		if (Number($('#price').val()) != 0)
		{
			html += "Total ticket: " + total_number_tickets + " tickets <br/>";
			html += "Total prices: " + (total_number_tickets * Number($('#price').val())) + " Toros <br/>";
	        obj_lottery.total_toros_buy_ticket = total_number_tickets * Number($('#price').val());	
		}
		else
		{
			html += "Total ticket: " + total_number_tickets + " tickets <br/>";
			obj_lottery.total_toros_buy_ticket = 0;
		}
	}
    else
    {
        obj_lottery.total_toros_buy_ticket = 0;
    }
	$('#div_notice_transaction div[sf-data=content]').html(html);
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
