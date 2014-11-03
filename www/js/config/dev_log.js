var dev_log = {
	console_log: function(message){
		if (window.debug)
		{
			if (message)
			{
				if ($('#dev_log').length > 0)
				{
					$('#dev_log').append("<br/>"+ JSON.stringify(message));
				}
				else
				{
					var html = "<div id='dev_log' style=' background-color: gray;bottom: 0;color: #fff;left: 0;padding: 5px;position: absolute;width: 100%; max-height: 100px;overflow-y: scroll;z-index: 10000;'>"
					html += "<button onclick='dev_log.console_clear();'>Remove</button><br/>"
					html += JSON.stringify(message);
					html += "</div>";
					$('body').append(html);	
				}
				
			}
		}
	},
	console_clear: function()
	{
		if (window.debug)
		{
			if ($('#dev_log').length > 0)
			{
				$('#dev_log').remove();
			}
		}		
	},
};