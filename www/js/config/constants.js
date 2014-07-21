// function getApplicationXML()
// {
// 	var file_path = "../../config.xml";
// 	if (window.is_device)
// 		file_path = "file:///android_asset/www/config.xml";
// 	else
// 	{
// 		var www_index = location.pathname.indexOf("www");
// 		if (www_index != -1)
// 		{
// 			file_path = location.pathname.substring(0,www_index + 3);
// 			file_path = location.protocol + "//" + file_path;
// 			file_path += "/config.xml";
// 		}
		
// 	}
	
// 	var xmlDoc=obj_xml.loadXMLDoc(file_path);
// 	window.version_application = xmlDoc.getElementsByTagName('widget')[0].getAttribute('version')
// }

window.server_ip = "192.168.3.17";
//window.server_ip = "192.168.2.102";
window.server_post = "8000";
window.server_url = "http://" + window.server_ip + ":80";
window.is_device = window.cordova;

window.version = 2;
window.version_application = "2.0.98";	//It will be updated by config.xml

//getApplicationXML();

window.database = {
	name : '_abcv_kootoro_app',
	version : '1',
	displayname : 'kootoro_db',
	size: '200000',
};


window.store_data = {};
window.is_connect_server = false;