$(function() {
	$.getScript( "http://"+window.server_ip+":"+window.server_post+"/socket.io/socket.io.js",
		function( response, status) {
		if (status != "success")
		{
			alert("Server Out!");
			app.exit();
			return;
		}

		if (!window.is_device)
		{
			obj_socket.initialize();
		}
	});
});



		