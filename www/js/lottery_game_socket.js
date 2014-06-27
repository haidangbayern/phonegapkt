$(function() {
	$.getScript( "http://"+window.server_ip+":"+window.server_post+"/socket.io/socket.io.js",
		function( response, status) {
		if (status != "success")
		{
			alert("Server Out!");
			app.exit();
			return;
		}

		obj_interface.changing_loading("Server Is Ready");
		if (!window.is_device)
		{
			console.log("obj_socket.initialize");
			obj_socket.initialize();
		}
		else
		{
			console.log("app.initialize");
			app.initialize();
		}
	});
});




		