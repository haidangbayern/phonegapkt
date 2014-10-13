/** ================ Environment ================== **/
window.is_dev = false;
/** ================ Server Information ================== **/
//window.server_ip = "192.168.3.77"; //tram
window.server_ip = "demo.games4fun.abcv.com"; //huy
window.server_post = "8000";
window.server_url = "http://" + window.server_ip + ":80";
window.is_device = window.cordova;
/** ================ Application Information ================== **/
window.version = 2;
window.version_application = "2.0.175";	//It will be updated by config.xml
/** ================ Database ================== **/
window.database = {
    name: '_abcv_kootoro_app',
    version: '1',
    displayname: 'kootoro_db',
    size: '200000',
};
/** ================ Location ================== **/
window.US = 184;
window.CA = 31;
window.US_ISO2 = "US";
window.CA_ISO2 = "CA";
/** ================ Device ================== **/
if (typeof device == "undefined") {
    device = {
        model: "laptop",
        cordova: "3.5.0",
        uuid: "192.168.3.17",
        version: "window8",
        name: "ABCV-VN-14",
        platform: "Android",
    };
}
/** ================ Other ================== **/
window.store_data = {};
window.is_connect_server = false;