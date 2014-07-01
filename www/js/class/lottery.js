var lottery = {
	run: function() {
		
	},

	// OK
	buy_ticket: function(obj_ele_html) {
		obj_loading.show();
	   
        //check validate limit buy
        var total_tickets = 0;
        for (var i= 0;i < $('input[data-name=input_time][value!="0"]').length; i++)
        {
            total_tickets += Number($('input[data-name=input_time][value!="0"]')[i].value);   
        }
        if (time_server.limit_buy_ticket != '' && time_server.limit_buy_ticket < total_tickets)
        {
            //btn.button('reset');
            $('#lottery_buy div.error').html("The number of purchased tickets exceeds the numbers that system allows");
            $('#lottery_buy div.error').show();
            return;
        }
        
       
		//calling ajax insert to database
		$.ajax({
			url: window.server_url+'/game/mobile_app_lottery/buy_ticket?v=' + window.version,
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
				obj_loading.hide();
				console.log(data);
                //btn.button('reset');
				//var r = JSON.parse(data);
				var r = data;
				if (r.result != undefined && r.result == false) {
					$('#div_notice_transaction div.error').html(r.err);
					$('#div_notice_transaction div.error').show();
					$('#div_notice_transaction div.success').hide(); 
					return;
				} else {
					$('#lottery_tickets').html(r.html);

					$('#form_lottery_run').animate({
					  transform: 'translateX(-'+$(window).width()+'px)',
					},function(){
						$('#lottery_tickets').animate({
					  		transform: 'translateX(0px)',
						});
					});
				}
				//reset
				//lotto_run_clear_ticket();
			}
		});
	},

	// OK
	view_tickets: function(page) {
        var data = {};
        if (typeof page != "undefined")
            data = {
                'page' : page,
            };
        console.log("page " + page);
        data.uuid = $('#device_uuid').val(),

		$.ajax({
			url: window.server_url+'/game/mobile_app_lottery/lottery_view_tickets?v=' + window.version,
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
				window.scope.$broadcast('scroll.infiniteScrollComplete');                
				//append data
				if ($('#my_tickets div.list').length != 0)
				{
					$('#my_tickets div.list').append(data.html);	
				}
				else
				{
					$('#my_tickets').append(data.html);		
				}
				
				if (data.pPaging.page == data.pPaging.end)
				{
					$('#page').val(0);
				}
				else
				{
					$('#page').val(Number(data.pPaging.page)+1);
				}
			}
		});
	},
	
	view_history : function(id) {
		obj_loading.show();
		var data_post = {};
		if (id != undefined) data_post = {
			'id': id,
		};
		data_post.uuid = $('#device_uuid').val(),

		$.ajax({
			url: window.server_url+'/game/mobile_app_lottery/history?v=' + window.version,
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
				if (data.result) {
					if (data.is_ticket_result) {
						$("#history").html(data.html);
					} else {
						$("#history").html(data.html);
					}
					//$('#' + div_display).slideUp(1000, function() {
						//$('#lottery_history').slideDown();
	                    //div_display = "lottery_history";
					//});
				}
	            else {
	                
	            }
	            obj_loading.hide();		            
			}
		});
	},

	//Mised function
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

	// OK 
	choose_random_number: function()
	{
		
		if($('#check_random_number:checked').length != 0)
		{
			$('#check_random_number').val("on");
			$('#div_choose_number').hide();
		}
		else
		{
			$('#check_random_number').val("");
			$('#div_choose_number').show();	
		}
	},

	// Missed check validate
	input_normal_number: function()
	{
		obj_lottery.normal_number = {};
		$('input[data-name=input_normal][value!=""]').each(function(index,ele){
			obj_lottery.normal_number[ele.value] = true;
		});
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
	    console.log(five_number);
	},

	// Missed check validate
	input_power_number: function()
	{
		obj_lottery.power_number = {};
		$('input[data-name=input_power][value!=""]').each(function(index,ele){
			obj_lottery.power_number[ele.value] = true;
		});
		var one_number = "";
	        for(var number in obj_lottery.power_number )
	        {
	            if (obj_lottery.power_number[number] == true)
	            {
	                if (number < 10) 
	                    one_number += '0' + number + '|';
	        		else
	                    one_number += number + '|';        
	            }
	        }
	    $('#lottery_run').find("input[name='spanlotto[one_number]']").val(one_number);
	    console.log(one_number);
	},

	// OK
	input_choose_date: function(ele)
	{
		var id = $(ele).attr('ele-ref');
		id = "#" + id;
		if ($(ele).val() == "on")
		{
			$(ele).val("");
			$(id).val("0");
		}
		else
		{
			$(ele).val("on");
			$(id).val("1");
		}
	},

	// OK
	next_to_choose_date: function()
	{
		if ($('#check_random_number').val() != "on")
		{
			//checking condition
			var error = "";
			if ($('input[data-name=input_normal][value!=""]').length != obj_interface.data.count_normal_number)
			{
				error = "Please enter "+ obj_interface.data.count_normal_number +" normal number";
			}
			if ($('input[data-name=input_power][value!=""]').length != obj_interface.data.count_power_number)
			{
				if (error!="")
					error += "\n";
				error += "Please enter "+ obj_interface.data.count_power_number +" power number";
			}
			if (error != "")
			{
				alert(error);
				return;
			}
		}
		$('div[step=choose_number]').hide();
		$('div[step=choose_date]').show();	
	},

	// OK
	back_to_choose_number: function()
	{
		$('div[step=choose_number]').show();
		$('div[step=choose_date]').hide();
	},

	// OK
	next_to_summary: function()
	{
		if ($('input[data-name=input_time][value!="0"]').length == 0)
		{
			alert("Please choose lottery date");
			return;
		}
		notice_transaction_content();

		$('div[step=choose_date]').hide();
		$('div[step=summary]').show();
	},

	// OK
	back_to_choose_date: function()
	{
		$('div[step=choose_date]').show();
		$('div[step=summary]').hide();
	},

};