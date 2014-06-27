var obj_interface = {
	data : {},
	analyze_data : function(data)
	{
		var data_after = {
			"count_normal_number" : 4,
			"normal_number_max" : 20,

        	"count_power_number" : 1,
        	"power_number_max" : 20,
        	
        	"time_lottery" : new Array(),

        	"price" : 10,

        	"count_lottery_date" : 2,
			
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
			else if (data[i]['name'] == 'count_power_number')
			{
				data_after.count_power_number = data[i]['value'];
			}
			else if (data[i]['name'] == 'power_number_max')
			{
				data_after.power_number_max = data[i]['value'];
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

		this.data = data_after;
		
		this.initialize_interface();
	},
	initialize_controls: function()
	{
		$("input[sf-data=spinner]").spinner({
			min: 0,
			max: 10,
			spin: function(event, ul) {
				if (ul.value == 0) {
					var name = $(event.target).attr('name');
					name = name.replace('time', 'is_different');
					var number_other_day = $('input[type=checkbox][name="' + name + '"]:checked');
					if (number_other_day.length != 0) {
						setTimeout(function() {
							$(event.target).val("1");
						}, 100);
					}
				}
				setTimeout(function() {
					notice_transaction_content();
				}, 300);
			},
		});
		$("input[sf-data=spinner]").spinner("value", 0);
	    
	    $("input[sf-data=spinner]").numeric({ decimal: false, negative: false }, function() { alert("Positive integers only"); this.value = ""; this.focus(); });
	},
	changing_loading: function(text)
	{
		var parentElement = document.getElementById("deviceready_status");
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');
		//$('#lottery_introduce *[l-ele=text]').html(text);
		$('#deviceready_status p.received').html(text);
	},
	hide_introduction: function()
	{
		$('body').css('background-image','url(images/skin3/bg.png)');
		$('#lottery_introduce').animate({
			transform: 'scale(0,0)'
		}, function() {
			$('#lottery_tools').show();
			$('#lottery_introduce').hide();
			$('#lottery_buy').show();
            div_display = "lottery_buy";
		});
	},
	initialize_interface: function(){
		obj_interface.changing_loading("Loading game ...");
		setTimeout(function(){
			//then load html
			obj_interface.load_choose_normal_number_area(obj_interface.data);
			obj_interface.load_choose_power_number_area(obj_interface.data);
			obj_interface.load_time_lottery_area(obj_interface.data);
			obj_interface.load_notice_transaction(obj_interface.data);
			obj_interface.initialize_controls();
			setTimeout(function(){
				obj_interface.changing_loading("Starting game ...");
				obj_interface.hide_introduction();
				$('.snap-drawers').show();
				$('#page-content').show();
				$('#slide-nav').show();
				$('#aside_menu').show();
			}, 500);
		},500);
		
	},
	load_choose_normal_number_area: function(obj) 
	{
		//Normal 
		$('#span_normal_number').val(obj.count_normal_number);
		var html = "";
		for(var i=0; i<6; i++)
		{
			for(j=(i*10)+1; j<=(i*10)+10; j++)
			{
				if (j <= obj.normal_number_max)
				{
					var img_ball_png = 'images/ball/png/';
					if (j < 10)
						img_ball_png += "0" + j +".png";
					else
						img_ball_png += j + ".png";
                                            
					img_ball_gif = 'images/ball/gif/';

					if (j < 10)
						img_ball_gif += "0" + j + ".gif";
					else
						img_ball_gif += j + ".gif";
                                            
					html += "<div class='spanlotto' onclick='javascript:spanlotto_run_5_selected(this)'>";
					html += "<img name=no_selected src='" + img_ball_png + "' />";
					html += "<img name=selected style='display:none;' src='" + img_ball_gif +"' />";
					html += "<input type='hidden' sf-data='spanlotto_selected' value='0' />";
					html += "<input type='hidden' sf-data='spanlotto_number' value='"+ j +"' />";
					html += "</div>";
				}
			}
		}
		html += '<div style="clear:both;"></div>';
        $('#div_normal_number').html(html);
	},
	load_choose_power_number_area : function(obj)
	{
		$('#span_power_number').val(obj.count_power_number);
		var html = "";
		for(var i=0; i<6; i++)
		{
			for(j=(i*10)+1; j<=(i*10)+10; j++)
			{
				if (j <= obj.power_number_max)
				{
					var img_ball_png = 'images/ball/png/';
					if (j < 10)
						img_ball_png += "0" + j +".png";
					else
						img_ball_png += j + ".png";
                                            
					img_ball_gif = 'images/ball/gif/';

					if (j < 10)
						img_ball_gif += "0" + j + ".gif";
					else
						img_ball_gif += j + ".gif";
                                            
					html += "<div class='spanlotto' onclick='javascript:spanlotto_run_1_selected(this)'>";
					html += "<img name=no_selected src='" + img_ball_png + "' />";
					html += "<img name=selected style='display:none;' src='" + img_ball_gif +"' />";
					html += "<input type='hidden' sf-data='spanlotto_selected' value='0' />";
					html += "<input type='hidden' sf-data='spanlotto_number' value='"+ j +"' />";
					html += "</div>";
				}
			}
		}
		html += '<div style="clear:both;"></div>';
        $('#div_power_number').html(html);
	},
	load_time_lottery_area: function(obj)
	{
		var html = "";
		var time_lottery = obj.time_lottery;
		
		for (var iday = 1; iday <= Number(obj.count_lottery_date); iday++)
		{  
			html += '<div class="col-md-6 col-sm-6" style="margin-bottom: 2px;">';
			html += '<div class="text-center" style="margin-bottom: 2px;"><h5>';
			
			if (iday ==1 )
				html += "Today";
			else if (iday == 2) 
				html += "Tomorrow";
			else
				html += "Day " + iday; 
			html += '</h5></div>';

			for (var i=0; i < time_lottery.length; i++) 
			{ 
				var time = time_lottery[i];

                var date = new Date(time_server.year, Number(time_server.month), time_server.day);
                date.addDays(iday-1);
				//html += "Date: " + date.getFullYear() + "/" + date.getMonth() + "/" + date.getDate() + " ( " + number_ticket + " ticket(s) ) <br/>";
				// html += number_series;
				// html += "<br/>";
				var t = date.getMonth() +  "-" + date.getDate() + "-" + date.getFullYear() + "-" + time["value"] + ":00";

				html += '<div style="margin-bottom: 2px;" class="text-center">';
				html += t + "&nbsp;";
				html += '<input sf-data="spinner" sf-obj="lottery_time" data-time="'+time["value"]+'" data-iday="'+iday+'"';
                html += 'name="spanlotto[time]['+time["id"]+'_'+iday+']" onchange="javascript:spinner_time_change(this)" /> ';
				html += '</div>';

				// html += '<div class="col-md-6 col-sm-6" style="margin-bottom: 2px;">';
				// html += time["value"];
				// html += '<input sf-data="spinner" sf-obj="lottery_time" data-time="'+time["value"]+'"';
				// html += 'name="spanlotto[time]['+time["id"]+']" onchange="javascript:spinner_time_change(this)" /> ';
				// html += '<input type="checkbox" name="spanlotto[is_different]['+time["id"]+']" id="checkbox_'+time["id"]+'" value="on" onchange="javascript:other_day_change(this)" />';
				// html += '<label for="checkbox_'+time["id"]+'"></label>';
				// html += 'Other Day';
				// html += '</div>';
			}
			html += '</div>';
		}
		$('#div_choose_time_lottery').html(html);
	},
	load_notice_transaction : function (obj)
	{
		$('#price').val(obj.price);

		var html ="";
		html += '<div class="error" style="display: none;"></div>';
		html += '<div class="success" style="display: none;"></div>';
		html += '<div sf-data="first">Good luck to you! ';
		//html += ' <span class="pull-right">( '+ obj.price +' Toros / ticket )</span>';
		html += '</div>';
		html += '<div sf-data="content">';
		html += '</div>';
		$('#div_notice_transaction').html(html);
	},
};