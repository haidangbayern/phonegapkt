var obj_interface = {
	is_redesign: false,
	data : {},
	//ok
	analyze_data : function(data)
	{
		//alert("nterface: analyze_data");
		console.log("Interface: analyze_data");
		this.is_redesign = true;
		
		app.bindDeviceInformation();

		lottery_draw_tickets.initialize();

		obj_loading.show();
		var data_after = {
			"count_normal_number" : 4,
			"normal_number_max" : 20,
			"normal_number_min" : 1,

        	"count_power_number" : 1,
        	"power_number_max" : 20,
        	"power_number_min" : 1,
        	
        	"time_lottery" : new Array(),

        	"price" : 10,
        	"is_show_datetime_on_mobile" : 0,
        	"count_lottery_date" : 2,
            "app_limit_buy_ticket" : 3,
        	"version" : 1,
			
		};

		for (var i=0; i<data.length; i++)
		{
			if (data[i]['name'] == 'count_normal_number')
			{
				data_after.count_normal_number = data[i]['value'];
			}
			else if (data[i]['name'] == 'normal_number_max')
			{
				data_after.normal_number_max = data[i]['value'];
			}
			else if (data[i]['name'] == 'normal_number_min')
			{
				data_after.normal_number_min = data[i]['value'];
			}
			else if (data[i]['name'] == 'count_power_number')
			{
				data_after.count_power_number = data[i]['value'];
			}
			else if (data[i]['name'] == 'power_number_max')
			{
				data_after.power_number_max = data[i]['value'];
			}
			else if (data[i]['name'] == 'power_number_min')
			{
				data_after.power_number_min = data[i]['value'];
			}
			else if (data[i]['name'] == 'time_lottery')
			{
				data_after.time_lottery.push(data[i]);
			}
			else if (data[i]['name'] == 'price')
			{
				data_after.price = data[i]['value'];
			}
			else if (data[i]['name'] == 'count_lottery_date')
			{
				data_after.count_lottery_date = data[i]['value'];	
			}
            else if (data[i]['name'] == 'app_limit_buy_ticket')
            {
                data_after.app_limit_buy_ticket = data[i]['value'];
            }
            else if (data[i]['name'] == 'is_show_datetime_on_mobile')
            {
            	data_after.is_show_datetime_on_mobile = Number(data[i]['value']);
            }
		}

		data_after.price = 0;

		obj_interface.data = data_after;
		
		obj_interface.initialize_interface();
	},
	initialize_controls: function(data)
	{
		$('#price').val(data.price);
		
		$("input[type=number]").numeric({ decimal: false, negative: false }, function() { alert("Positive integers only"); this.value = ""; this.focus(); });


		$("input[data-name=input_normal]").bind("keyup",function(e){
			console.log("keyup");
			var code = (e.keyCode ? e.keyCode : e.which);
          	if ( (code==13) || (code==10)){
	               
              $(this).blur();
              return false;
          	}

          	var val = $(this).val();
			if (val == "") return;
			
			var length = val.length;
			var max_length = obj_interface.data.normal_number_max.toString().length;
		
			if (length >= max_length)
			{
				//next to input
				if (Number(obj_interface.data.normal_number_min) <= Number(val)
					&& Number(val) <= Number(obj_interface.data.normal_number_max))
				{
					

					// check duplicated
					var choosen_flag = false;
					var ele_index = $("input[data-name=input_normal]").index(this);

					for (var index in obj_lottery.normal_number){
						if (obj_lottery.normal_number[index] == val && ele_index != index){
							

							choosen_flag = true;
							break;
						}
					}
					if (choosen_flag){	

						if (val != 0){

							alert("This number was chosen.");
						}
						$(this).val("");
						return false;
					}
					// end check duplicated
					
					lottery.input_normal_number();
					
					var no = Number($(this).attr('data-no'));
					no++;//3 -> 4
					if( no < $("input[data-name=input_normal]").length)	
					{
						//duplicated focus to fix on mobile
						$("input[data-name=input_normal][data-no='"+no+"']")[0].focus();
						$("input[data-name=input_normal][data-no='"+no+"']")[0].focus();
					}
					else
					{
						
						$("input[data-name=input_power]")[0].focus();
					}
					
				}
				else
				{
					//fail 
					$(this).val("");
					alert("Enter normal number from "+ obj_interface.data.normal_number_min + " to "+ obj_interface.data.normal_number_max+".");
				}
			}
			else
			{
				//do not thing
			}
			
		});

		$("input[data-name=input_power]").bind("keyup",function(e){
			console.log("input_power keyup");
			var code = (e.keyCode ? e.keyCode : e.which);
          	if ( (code==13) || (code==10)){
               
              $(this).blur();
              return false;
          	}

			var val = $(this).val();
			if (val == "") return;
				
			var length = val.length;
			var max_length = obj_interface.data.power_number_max.length;

			if (length >= max_length)
			{
				//next to input
				if (Number(obj_interface.data.power_number_min) <= Number(val)
					&& Number(val) <= Number(obj_interface.data.power_number_max))
				{
					//fixed changed power number value
					//$("#buy_btn")[0].focus();
					lottery.input_power_number();
				}
				else
				{
					//fail 
					$(this).val("");
					alert("Enter power number from "+ obj_interface.data.power_number_min + " to "+ obj_interface.data.power_number_max+".");
				}
			}
			else
			{
				//do not thing
			}
		});

	},

	initialize_interface: function(){

		if (!obj_interface.is_redesign)
		{
			return;
		}
		//alert("Interface: initialize_interface");

		console.log("Interface: initialize_interface");
		
		obj_interface.is_redesign = false;
		
		setTimeout(function(){
			app.bindDeviceInformation();
			lottery_draw_tickets.initialize();

			//then load html
			$('#div_choose_number').html("");
			obj_interface.load_choose_normal_number_area(obj_interface.data);
			obj_interface.load_choose_power_number_area(obj_interface.data);
			obj_interface.load_time_lottery_area(obj_interface.data);
			obj_interface.initialize_controls(obj_interface.data);

			obj_loading.hide();
		},200);
		
		//$($('*[data-name=input_normal]')[0]).focus();
		//alert("The end");
	},
	load_choose_normal_number_area: function(obj) 
	{
		var html = "";
		for(var i=0; i<obj.count_normal_number; i++)
		{
			html += "<label class='ball'>";
			html += "<input data-name='input_normal' data-no='"+ i +"' type='number' pattern='([0-9])' maxlength='2' onchange='javascript:lottery.input_normal_number();' />";
			html += "</label> ";
		}
		$('#div_choose_number').append(html);
	},
	load_choose_power_number_area : function(obj)
	{
		var html = "";
		for(var i=0; i<obj.count_power_number; i++)
		{
			html += "<label class='ball power-ball'>";
			html += "<input data-name='input_power' data-no='"+ i +"' type='number' pattern='([0-9])' maxlength='2' onchange='javascript:lottery.input_power_number();' />";
			html += "</label> ";
		}
		$('#div_choose_number').append(html);
	},
	load_time_lottery_area: function(obj)
	{
		if (obj.is_show_datetime_on_mobile == 1)
		{
			$('#choose_lottery_date_title').html(window.languages[window.current_language].choose_lottery_date);	
			var html = "";
			var time_lottery = obj.time_lottery;
			
			for (var iday = 1; iday <= Number(obj.count_lottery_date); iday++)
			{  
				//if (iday ==1 )
				//	html += "<div class='item text-center item-divider item-sub-heading'>"+window.languages[window.current_language].today+"</div>";
				//else if (iday == 2) 
				//	html += "<div class='item text-center item-divider item-sub-heading'>"+window.languages[window.current_language].tomorrow+"</div>";
				//else
				//	html += "<div class='item text-center item-divider item-sub-heading'>"+window.languages[window.current_language].day+ " "  + iday + "</div>"; 
				
				var is_flag_day = false;
				for (var i=0; i < time_lottery.length; i++) 
				{ 
					var time = time_lottery[i];

					var ti = time["value"].split(":");
					var hour = ti[0];
					var minutes = ti[1];

	                var datetime = new Date(time_server.year, Number(time_server.month) - 1, time_server.day, hour, minutes);
	                datetime.addDays(iday-1);

	                //var today = time_server.year + "/" + time_server.month + "/" + time_server.day + " " + time_server.;
					//var current_datetime = new Date(today + " " + time + ":00");
					//var current_datetime = new Date(today + " " + time + ":00");
					var current_datetime = new Date(time_server.year, Number(time_server.month - 1), time_server.day, time_server.hour, time_server.minutes);
					if (current_datetime > datetime)
						break;

					is_flag_day = true;
					var t = (datetime.getMonth() + 1) +  "/" + datetime.getDate() + "/" + datetime.getFullYear() + " " + (datetime.getHours() < 10 ? "0" + datetime.getHours() : datetime.getHours()) + ":"+ (datetime.getMinutes() < 10 ? "0" + datetime.getMinutes() : datetime.getMinutes());
					
					if(window.d == undefined)
						window.d = datetime;
					var text_datetime = "Buy " + (datetime.getHours() < 10 ? "0" + datetime.getHours() : datetime.getHours()) + ":"+ (datetime.getMinutes() < 10 ? "0" + datetime.getMinutes() : datetime.getMinutes()) + " - " + datetime.getMonthName() + " " + datetime.getDate() + ", " + datetime.getFullYear();
					//html += '<label class="item item-checkbox" onclick="javascript:obj_interface.selected_date(this)">';
					html += '<label class="item item-checkbox">';
					html += '<div class="checkbox checkbox-input-hidden disable-pointer-events">';
					html += '<input type="checkbox" ele-ref="time_'+time["id"]+'_'+iday+'" onchange="javascript:lottery.input_choose_date(this);" value="" />';
					html += '<input data-value="'+t+'" id="time_'+time["id"]+'_'+iday+'" data-name="input_time"';
	                html += 'name="spanlotto[time]['+time["id"]+'_'+iday+']" value="0"/> ';

					html += '<i id="ic_time_'+time["id"]+'_'+iday+'" class="radio-icon ion-ios7-circle-outline" style="font-size:20px"></i></div>';
					html += '<div ng-transclude="" class="item-content disable-pointer-events">';
				    html += '<span>'+ text_datetime +'</span></div></label>';
				}
				// if (!is_flag_day)
				// {
				// 	html += '<label class="item">';
				// 	html += window.languages[window.current_language].overtime;
				// 	html += '</label>';
				// }
			}
			$('#div_choose_time_lottery').html(html);
			$('#buy_btn').hide();
		}
		else
		{
			

			var html = "";
			var time_lottery = obj.time_lottery;
			var is_flag_exsits_datetime = false;
			var time_lottery_title =  "";
			for (var iday = 1; iday <= Number(obj.count_lottery_date) && !is_flag_exsits_datetime; iday++)
			{  
				for (var i=0; i < time_lottery.length && !is_flag_exsits_datetime; i++) 
				{ 
					var time = time_lottery[i];

					var ti = time["value"].split(":");
					var hour = ti[0];
					var minutes = ti[1];

	                var datetime = new Date(time_server.year, Number(time_server.month) - 1, time_server.day, hour, minutes);
	                datetime.addDays(iday-1);

	        		var current_datetime = new Date(time_server.year, Number(time_server.month - 1), time_server.day, time_server.hour, time_server.minutes);
					if (current_datetime > datetime)
						break;

					var t = (datetime.getMonth() + 1) +  "/" + datetime.getDate() + "/" + datetime.getFullYear() + " " + (datetime.getHours() < 10 ? "0" + datetime.getHours() : datetime.getHours()) + ":"+ (datetime.getMinutes() < 10 ? "0" + datetime.getMinutes() : datetime.getMinutes());
					
					if(window.d == undefined)
						window.d = datetime;
					var text_datetime = "Buy " + (datetime.getHours() < 10 ? "0" + datetime.getHours() : datetime.getHours()) + ":"+ (datetime.getMinutes() < 10 ? "0" + datetime.getMinutes() : datetime.getMinutes()) + " - " + datetime.getMonthName() + " " + datetime.getDate() + ", " + datetime.getFullYear();
					var time_lottery_title = (datetime.getHours() < 10 ? "0" + datetime.getHours() : datetime.getHours()) + ":"+ (datetime.getMinutes() < 10 ? "0" + datetime.getMinutes() : datetime.getMinutes()) + " - " + datetime.getMonthName() + " " + datetime.getDate() + ", " + datetime.getFullYear();
					//html += '<label class="item item-checkbox" onclick="javascript:obj_interface.selected_date(this)">';
					html += '<label class="item item-checkbox" style="display:none;">';
					html += '<div class="checkbox checkbox-input-hidden disable-pointer-events">';
					html += '<input type="checkbox" ele-ref="time_'+time["id"]+'_'+iday+'" onchange="javascript:lottery.input_choose_date(this);" value="on" />';
					html += '<input data-value="'+t+'" id="time_'+time["id"]+'_'+iday+'" data-name="input_time"';
	                html += 'name="spanlotto[time]['+time["id"]+'_'+iday+']" value="1"/> ';

					html += '<i id="ic_time_'+time["id"]+'_'+iday+'" class="radio-icon ion-checkmark-circled" style="font-size:20px"></i></div>';
					html += '<div ng-transclude="" class="item-content disable-pointer-events">';
				    html += '<span>'+ text_datetime +'</span></div></label>';

				    is_flag_exsits_datetime = true;
				}
			}
			$('#choose_lottery_date_title').html(window.languages[window.current_language].lottery_draw + ": " + time_lottery_title );	
			$('#div_choose_time_lottery').html(html);
			$('#buy_btn').show();
		}		
	},
	selected_date: function(ele)
	{
		var selected = $(ele).hasClass("item-selected");
		if (selected)
		{
			$(ele).removeClass("item-selected");
		}
		else
		{
			$(ele).addClass("item-selected");	
		}
	},
	effect_on_home_page: function()
	{
		$('.next-drawing .estimated-date').html('At ' + window.store_data.estimated.datetime);
		$('.estimated-toros.ng-binding').animate({
		  transform: 'scale(1,0)'
		},function(){
			$('.next-drawing .estimated-toros').html(window.store_data.estimated.jackpot);
			$('.estimated-toros.ng-binding').animate({
			  transform: 'scale(1,1)'
			});	
		});
		

		$('.last-drawing').animate({
		  	transform: 'scale(1,0)'
		},function(){
			$('.last-drawing .sub-heading').html(window.store_data.last_drawing.time_text);
			$('.last-drawing .ball-draw').html(window.store_data.last_drawing.balls);
			$('.last-drawing .badge-jackpot').html(window.store_data.last_drawing.jackpot);

			$('.last-drawing').animate({
			  transform: 'scale(1,1)'
			});	
		});



		
	},
};