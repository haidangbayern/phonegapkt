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

        	"count_lottery_date" : 2,

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
		}

		data_after.price = 0;

		obj_interface.data = data_after;
		
		obj_interface.initialize_interface();
	},
	initialize_controls: function(data)
	{
		$('#price').val(data.price);
		
		$("input[type=number]").numeric({ decimal: false, negative: false }, function() { alert("Positive integers only"); this.value = ""; this.focus(); });


		$("input[data-name=input_normal]").bind("keyup",function(){
			if ($(this).val() == "") return;
			if (typeof obj_lottery.normal_number[$(this).val()] != "undefined")
			{
				$(this).val("");
				alert("This number was chosen.");
			}
			else
			{
				var val = $(this).val();
				var length = $(this).val().length;
				var max_length = obj_interface.data.normal_number_max.toString().length;
				if (length == max_length)
				{
					//next to input
					if (Number(obj_interface.data.normal_number_min) <= Number(val)
						&& Number(val) <= Number(obj_interface.data.normal_number_max))
					{
						var no = Number($(this).attr('data-no'));
						no++;//3 -> 4
						if( no < $("input[data-name=input_normal]").length)	//4
						{
							$($('*[data-name=input_normal]')[no]).focus();		
						}
						else
						{
							$($('*[data-name=input_power]')[0]).focus();
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
			}
		});

		$("input[data-name=input_power]").bind("keyup",function(){
			if ($(this).val() == "") return;
			if (typeof obj_lottery.power_number[$(this).val()] != "undefined"){
				$(this).val("");
				alert("This number was chosen.");
			}
			else
			{
				var val = $(this).val();
				var length = $(this).val().length;
				var max_length = obj_interface.data.power_number_max.length;
				if (length == max_length)
				{
					//next to input
					if (Number(obj_interface.data.power_number_min) <= Number(val)
						&& Number(val) <= Number(obj_interface.data.power_number_max))
					{
						
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
		var html = "";
		var time_lottery = obj.time_lottery;
		
		for (var iday = 1; iday <= Number(obj.count_lottery_date); iday++)
		{  
			if (iday ==1 )
				html += "<div class='item text-center item-divider item-sub-heading'>Today</div>";
			else if (iday == 2) 
				html += "<div class='item text-center item-divider item-sub-heading'>Tomorrow</div>";
			else
				html += "<div class='item text-center item-divider item-sub-heading'>Day " + iday + "</div>"; 
			
			var is_flag_day = false;
			for (var i=0; i < time_lottery.length; i++) 
			{ 
				var time = time_lottery[i];

				var ti = time["value"].split(":");
				var hour = ti[0];
				var minutes = ti[1];

                var datetime = new Date(time_server.year, Number(time_server.month), time_server.day, hour, minutes);
                datetime.addDays(iday-1);

                //var today = time_server.year + "/" + time_server.month + "/" + time_server.day + " " + time_server.;
				//var current_datetime = new Date(today + " " + time + ":00");
				//var current_datetime = new Date(today + " " + time + ":00");
				var current_datetime = new Date(time_server.year, Number(time_server.month), time_server.day, time_server.hour, time_server.minutes);
				if (current_datetime > datetime)
					break;

				is_flag_day = true;
				var t = datetime.getMonth() +  "/" + datetime.getDate() + "/" + datetime.getFullYear() + " " + (datetime.getHours() < 10 ? "0" + datetime.getHours() : datetime.getHours()) + ":"+ (datetime.getMinutes() < 10 ? "0" + datetime.getMinutes() : datetime.getMinutes());

				html += '<label class="item item-checkbox" onclick="javascript:obj_interface.selected_date(this)">';
				html += '<div class="checkbox checkbox-input-hidden disable-pointer-events">';
				html += '<input type="checkbox" ele-ref="time_'+time["id"]+'_'+iday+'" onchange="javascript:lottery.input_choose_date(this);" value="" />';
				html += '<input data-value="'+t+'" id="time_'+time["id"]+'_'+iday+'" data-name="input_time"';
                html += 'name="spanlotto[time]['+time["id"]+'_'+iday+']" value="0"/> ';

				html += '<i id="ic_time_'+time["id"]+'_'+iday+'" class="radio-icon ion-ios7-circle-outline" style="font-size:20px"></i></div>';
				html += '<div ng-transclude="" class="item-content disable-pointer-events">';
			    html += '<span>'+ t +'</span></div></label>';
			}
			if (!is_flag_day)
			{
				html += '<label class="item">';
				html += 'Overtime';
				html += '</label>';

			}
		}
		$('#div_choose_time_lottery').html(html);
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
};