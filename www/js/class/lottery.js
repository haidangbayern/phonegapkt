var lottery = {
	run: function() {
		// setTimeout(function() {
		//   $('#lottery_introduce').animate({
		// 		transform: 'scale(0,0)'
		// 	}, function() {
		// 	     $('#lottery_tools').show();
		// 		$('#lottery_introduce').hide();
		// 		$('#lottery_buy').show();
  //               div_display = "lottery_buy";
		// 	});
		// }, 5000);
	},
	buy_ticket: function(obj_ele_html) {
	    var btn = $(obj_ele_html)
        btn.button('loading');
        
        //check validate limit buy
        var total_tickets = 0;
        for (var i= 0;i < $('*[sf-data=spinner][value!=0]').length; i++)
        {
            total_tickets += Number($('*[sf-data=spinner][value!=0]')[i].value);   
        }
        if (time_server.limit_buy_ticket != '' && time_server.limit_buy_ticket < total_tickets)
        {
            btn.button('reset');
            $('#lottery_buy div.error').html("The number of purchased tickets exceeds the numbers that system allows");
            $('#lottery_buy div.error').show();
            return;
        }
        
       
		//calling ajax insert to database
		$.ajax({
			url: window.server_url+'/game/mobile_app_lottery/buy_ticket',
			data: $('#form_lottery_run').serialize(),
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
				console.log(data);
                btn.button('reset');
				//var r = JSON.parse(data);
				var r = data;
				if (r.result != undefined && r.result == false) {
					$('#lottery_buy div.error').html(r.err);
					$('#lottery_buy div.error').show();
					$('#lottery_buy div.success').hide(); 
					return;
				} else {
					$('#lottery_buy div.success').html("Thank You!");
					$('#lottery_buy div.success').show();
					$('#lottery_buy div.error').hide();
					$('div.notice_transaction div[sf-data=content]').html('');
					$('#lottery_tickets').html(r.html);
                    $('#' + div_display).slideUp(1000, function() {
    					$('#lottery_tickets').slideDown();
                        div_display = "lottery_tickets";
				    });
                    
                    lottery.update_balance();
                    
				}
				//reset
				lotto_run_clear_ticket();
			}
		});
	},
	view_tickets: function(obj_ele_html, page) {
        var btn = $(obj_ele_html)
        btn.button('loading')

        obj_snap.close();
        obj_loading.show();
        $('#' + div_display).hide();
        
        var data = {};
        if (typeof page != "undefined")
            data = {
                'page' : page,
            };
        data.uuid = $('#device_uuid').val(),

		$.ajax({
			url: window.server_url+'/game/mobile_app_lottery/lottery_view_tickets',
			data: data,
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
                btn.button('reset');
				//append data
				$('#lottery_tickets').html(data.html);
				//effect
				obj_loading.hide();
				$('#lottery_tickets').slideDown();
                div_display = "lottery_tickets";

    //             $('#' + div_display).slideUp(1000, function() {
				// 	$('#lottery_tickets').slideDown();
    //                 div_display = "lottery_tickets";
				// });
			}
		});
	},
	view_buy_ticket: function() {		
        obj_snap.close();
        if (div_display == "lottery_buy")
            return;
        $('#' + div_display).slideUp(1000, function() {
		  $('#lottery_buy').slideDown();
            div_display = "lottery_buy";
    	});
	},
	clear_select_ticket: function() {
		$('#form_lottery_run').find("input[name='spanlotto[five_number]']").val('');
		$('#form_lottery_run').find("input[name='spanlotto[one_number]']").val('');
		
        $('#form_lottery_run').find('div[name=step1]').find('div.spanlotto').removeClass('spanlotto_selected');
        $('#form_lottery_run img[name=selected]').hide();
        $('#form_lottery_run img[name=no_selected]').show();
        
		$('#form_lottery_run').find('div[name=step1]').find('input[sf-data=spanlotto_selected]').val('0');
        if ($('#form_lottery_run').find('input[name="spanlotto[number_random]"]:checked').length != 0)
            $('#form_lottery_run').find('input[name="spanlotto[number_random]"]:checked')[0].checked = false;
		$('input[sf-obj=lottery_time]').each(function(index, e) {
			var time = $(e).attr('data-time');
			var name = $(e).attr('name');
			name = name.replace('time', 'is_different');
			var number_ticket = $(e).val();
            $(e).val('0');
			//var number_other_day = $('input[type=checkbox][name="' + name + '"]:checked');
             $('input[type=checkbox][name="' + name + '"]')[0].checked = false
			//if (number_ticket != 0) {}
		});
	},
	update_balance : function ()
	{
		return;
		//update balance
                    $.ajax({
        			     url: window.server_url+'/account/refresh_header_current_balance',
        			     data: null,
        			     type: "POST",
                         success: function(data){
                         	var old_balance = $('div[l-ele=user] span[name=balance]').text();
                            var new_balance = data;

                            $('div[l-ele=user] span[name=balance]').text(data);  
                            user.balance = data;

                            old_balance = Number(old_balance.toString().replace(',',''));
                            new_balance = Number(new_balance.toString().replace(',',''));
							var balance_plus = new_balance - old_balance;
							//400 
							// 500
							// -100
                            if (balance_plus > 0)
                            {
                            	balance_plus = "+" + balance_plus;
                            }
                            $("div[l-ele=user] span[name=effect_balance]").css('top','40px');
							$("div[l-ele=user] span[name=effect_balance]").text(balance_plus);
							$("div[l-ele=user] span[name=effect_balance]").show();
                            $("div[l-ele=user] span[name=effect_balance]").animate(
                            	{ top:"15px" }, "slow", function(){
                            		$("div[l-ele=user] span[name=effect_balance]").hide();
                            	});
                         }
                    });
	},
};