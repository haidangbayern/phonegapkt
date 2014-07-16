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
        	obj_loading.hide();
            //btn.button('reset');
            //$('#lottery_buy div.error').html("The number of purchased tickets exceeds the numbers that system allows");
            //$('#lottery_buy div.error').show();
            alert("The number of purchased tickets exceeds the numbers that system allows");
            return;
        }
        
		console.log("begin buy ticket");

       	app.bindDeviceInformation();
		//calling ajax insert to database
		$.ajax({
			url: window.server_url+'/game/mobile_app_lottery/buy_ticket?v=' + window.version,
			data: $('#form_lottery_run').serialize(),
			//type: "POST",
         	contentType: "application/json",  
         	dataType: 'jsonp',  
         	crossDomain: true,  
         	error: function(e) {  
         		console.log("buy_ticket: error");
	        },  
	         complete: function(data) { 
	         	console.log("buy_ticket: complate");
	        } , 
			success: function(data) {
				console.log("buy_ticket: success");
				obj_loading.hide();
                var r = data;
				if (r.result != undefined && r.result == false) {
					alert(r.err);
				} else {
					$('#buy_ticket div.scroll').css('transform','translate3d(0px, 0px, 0px) scale(1)');
					var html ='<div class="text-center padding">';
			        html +=  '<button onclick="javascript:lottery.re_buy_ticket()" class="button button-positive">';
			        html +=  '<i class="icon ion-ios7-pricetag"></i>';
					html +=  ' Buy More';
					html +=  '</button>';
			        html +=  '</div>';
			        r.html += html;
                    $('#lottery_tickets').show();
					$('#lottery_tickets').html(r.html);

					$('#form_lottery_run').animate({
					  transform: 'translateX(-'+$(window).width()+'px)',
					},function(){
						$('#form_lottery_run').hide();
						$('#form_lottery_run').css('transform','translate('+ (Number($(window).width()) + 50) + 'px, 0px)');
						//$('#form_lottery_run').hide();
						$('#buy_ticket div.scroll').css('transform','translate3d(0px, 0px, 0px) scale(1)');
						$('#lottery_tickets').animate({
					  		transform: 'translateX(0px)',
						});
					});

					//create build information
					//app_home_page.call_server_get_data();

					lottery_socket.emit("buy_ticket");
				}
			}
		});
		console.log("end call buy ticket");
	},

	re_buy_ticket: function() {

		$('#buy_ticket div.scroll').css('transform','translate3d(0px, 0px, 0px) scale(1)');
		//window.location.href = "#/app/add_ticket";	
		obj_interface.is_redesign = true;
		obj_interface.initialize_interface();

		$('#lottery_tickets').html("");

		$('#lottery_tickets').animate({
            transform: 'translateX(-'+$(window).width()+'px)',
        },function(){
        	$('#lottery_tickets').hide();
            $('#lottery_tickets').css('transform','translate('+ (Number($(window).width()) + 50) + 'px, 0px)');
        });
    
    	$('#form_lottery_run').show();
        $('#form_lottery_run').animate({
            transform: 'translateX(0px)',
        },function(){

           
        });
	},
	// OK
	view_tickets: function(page) {
		obj_loading.show();
		
		console.log("Bind Device Information");
		app.bindDeviceInformation();

		console.log("Draw tickets initialize");
		lottery_draw_tickets.initialize();

        var data = {};
        if (typeof page != "undefined")
            data = {
                'page' : page,
            };

        data.uuid = $('#device_uuid').val(),

		$.ajax({
			url: window.server_url+'/game/mobile_app_lottery/lottery_view_tickets?v=' + window.version,
			data: data,
			type: "POST",
			contentType: "application/json",  
			dataType: 'jsonp',  
			crossDomain: true,  
			error: function(e) {  
				console.log("view_tickets : error");
				console.log(e.message);  
			},  
			complete: function(data) {  
				console.log("view_tickets: complete");  
			} , 
			success: function(data) {
				console.log("view_tickets : success");
				
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
					$('ion-infinite-scroll').remove();
				}
				else
				{
					$('#page').val(Number(data.pPaging.page)+1);
				}
			}
		});
	},
	
	//ok
	view_history : function(id) {

		obj_loading.show();
		console.log("Bind Device Information");
		app.bindDeviceInformation();
		
		console.log("Draw tickets initialize");
		lottery_draw_tickets.initialize();

		obj_loading.show();
		var data_post = {};
		if (id != undefined) data_post = {
			'id': id,
		};
		data_post.uuid = $('#device_uuid').val();
		//data_post.page = $('#page').val();

		$.ajax({
			url: window.server_url+'/game/mobile_app_lottery/history?v=' + window.version,
			data: data_post,
			type: "POST",
			contentType: "application/json",  
			dataType: 'jsonp',  
			crossDomain: true,  
			error: function(e) {  
				console.log("view_history: error");
			},  
			complete: function(data) {  
				console.log("view_history: complete");
			} , 
			success: function(data) {
				console.log("view_history: success");
				if (data.result) {
					$('#history').html(data.html);
					// id = "history";
					// if ($('#page').val() != 1)
					// {
					// 	id = "history_result";
					// }
					// if (data.is_ticket_result) {
						//$('#page').val(data.page);
					// 	$("#" + id).append(data.html);
					// } else {
					// 	//$('#page').val(0);	
					// 	$("#" + id).append(data.html);
					// }
				}
	            else {
	                if (data.error)
	                {
	                	alert(data.error);
	                	$('#page').val(0);
	                }
	                else
	                {
	                	if (data.is_ticket_result == false)
	                	{
	                		$('#page').val(0);		
	                	}
	                }
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
		var random_normal = core.random_many_number(
				obj_interface.data.normal_number_min,
				obj_interface.data.normal_number_max, 
				obj_interface.data.count_normal_number, 
				true, true);
		//console.log(random_normal);
		$('input[data-name=input_normal]').each(function(index,ele){
			ele.value = random_normal[index];
		});
		var random_power = core.random_many_number(
				obj_interface.data.power_number_min,
				obj_interface.data.power_number_max, 
				obj_interface.data.count_power_number,
				true, true);
		//console.log(random_power);
		$('input[data-name=input_power]').each(function(index,ele){
			ele.value = random_power[index];
		});

		this.input_normal_number();
		this.input_power_number();
		// if($('#check_random_number:checked').length != 0)
		// {
		// 	$('#check_random_number').val("on");
		// 	$('#div_choose_number').hide();
		// }
		// else
		// {
		// 	$('#check_random_number').val("");
		// 	$('#div_choose_number').show();	
		// }

	},

	input_normal_number: function()
	{
		obj_lottery.normal_number = {};
		$('input[data-name=input_normal][value!=""]').each(function(index,ele){
			obj_lottery.normal_number[Number(ele.value)] = true;
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
	    $('#buy_ticket').find("input[name='spanlotto[five_number]']").val(five_number);
	    //console.log(five_number);
	},

	input_power_number: function()
	{
		obj_lottery.power_number = {};
		$('input[data-name=input_power][value!=""]').each(function(index,ele){
			obj_lottery.power_number[Number(ele.value)] = true;
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
	    $('#buy_ticket').find("input[name='spanlotto[one_number]']").val(one_number);
	    //console.log(one_number);
	},

	// OK
	input_choose_date: function(ele)
	{
		var id = $(ele).attr('ele-ref');
		if ($(ele).val() == "on")
		{
			$(ele).val("");
			$("#" + id).val("0");
			$("#ic_" + id).removeClass("ion-checkmark-circled");
			$("#ic_" + id).addClass("ion-ios7-circle-outline");
		}
		else
		{
			$(ele).val("on");
			$("#" + id).val("1");
			$("#ic_" + id).addClass("ion-checkmark-circled");
			$("#ic_" + id).removeClass("ion-ios7-circle-outline");
		}
		
	},

	notice_transaction_content : function() {
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
			var html_total = "";
			if (Number($('#price').val()) != 0)
			{
				html_total += "Total ticket: " + total_number_tickets + " tickets <br/>";
				html_total += "Total prices: " + (total_number_tickets * Number($('#price').val())) + " Toros <br/>";
		        obj_lottery.total_toros_buy_ticket = total_number_tickets * Number($('#price').val());	
			}
			else
			{
				html_total += "Total ticket: " + total_number_tickets + " tickets <br/>";
				obj_lottery.total_toros_buy_ticket = 0;
				$('#div_total_ticket').html(html_total);
			}
		}
	    else
	    {
	        obj_lottery.total_toros_buy_ticket = 0;
	        $('#div_total_ticket').html("");
	    }

		$('#div_notice_transaction div[sf-data=content]').html(html);
	},

	// // OK
	// next_to_choose_date: function()
	// {
	// 	if ($('#check_random_number').val() != "on")
	// 	{
	// 		//checking condition
	// 		var error = "";
	// 		if ($('input[data-name=input_normal][value!=""]').length != obj_interface.data.count_normal_number)
	// 		{
	// 			error = "Please enter "+ obj_interface.data.count_normal_number +" normal number";
	// 		}
	// 		if ($('input[data-name=input_power][value!=""]').length != obj_interface.data.count_power_number)
	// 		{
	// 			if (error!="")
	// 				error += "\n";
	// 			error += "Please enter "+ obj_interface.data.count_power_number +" power number";
	// 		}
	// 		if (error != "")
	// 		{
	// 			alert(error);
	// 			return;
	// 		}
	// 	}
	// 	$('div[step=choose_number]').hide();
	// 	$('div[step=choose_date]').show();	
	// },

	// // OK
	// back_to_choose_number: function()
	// {
	// 	$('div[step=choose_number]').show();
	// 	$('div[step=choose_date]').hide();
	// },

	// // OK
	// next_to_summary: function()
	// {
	// 	if ($('input[data-name=input_time][value!="0"]').length == 0)
	// 	{
	// 		alert("Please choose lottery date");
	// 		return;
	// 	}
	// 	//notice_transaction_content();

	// 	$('div[step=choose_date]').hide();
	// 	$('div[step=summary]').show();
	// },

	// // OK
	// back_to_choose_date: function()
	// {
	// 	$('div[step=choose_date]').show();
	// 	$('div[step=summary]').hide();
	// },

};